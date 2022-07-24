import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { ethers, providers } from 'ethers';
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from '@walletconnect/qrcode-modal';
import { Store } from "@ngrx/store";


interface MetamaskWallet {
    provider: Web3Provider | undefined;
    signer: any;
}

interface SignedWalletWithAmount {
    signedMessage: string;
    ustcTokenAmount: number;
    maxUsdcTokenAmount: number;
}

import * as WalletActions from '../state/wallet.actions';
import { Observable } from "rxjs";
import { SALE_TOKEN } from "./wallet.endpoints";
import { APP_CONFIG } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { UsdcTokenContractFactory } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/contract-model";
import { FormatTypes } from "ethers/lib/utils";
import { NotificationDroneEventTypes, NotificationDroneService } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone";

@Injectable({ providedIn: 'root' })
export class WalletService {

    private provider: Web3Provider | undefined = undefined;
    private connector: WalletConnect | undefined = undefined;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly store: Store,
        private readonly notificationDroneService: NotificationDroneService,
        @Inject(APP_CONFIG) private readonly appConfig: any
    ) {}

    private createMetamaskProviderHooks(provider: any): void {
        provider.provider.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) {
                this.disconnectWallet();
            } else {
                console.log('createMetamask', accounts[0]);
                this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));
            }
        });

        // Subscribe to chainId change
        provider.provider.on("chainChanged", (chainId: number) => {
            this.store.dispatch(WalletActions.chainChanged({chainId: chainId}));
            this.notificationDroneService.error(NotificationDroneEventTypes.BAD_NETWORK);
        });

        // Subscribe to session disconnection
        provider.on("disconnect", () => {
            this.store.dispatch(WalletActions.disconnectWallet());
        });

        const signer = provider.getSigner();
    }

    private createWalletConnectProviderHooks(provider: any): void {
        // Subscribe to connection events
        provider.on("connect", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

            const { accounts, chainId } = payload.params[0];

            //TODO: move config to env
            let sessionConfig = {
                chainId: 56,
                networkId: 42,
                rpcUrl: 'https://bsc-dataseed.binance.org/',
                accounts: accounts
            };

            if (chainId !== 56)
                this.connector?.updateSession(sessionConfig);
            else {
                this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: chainId}));
            }
        });

        provider.on("session_update", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

            const { accounts, chainId } = payload.params[0];
            this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: chainId}));
        });

        provider.on("disconnect", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

            this.connector = undefined;
            this.store.dispatch(WalletActions.disconnectWallet());
        });
    }

    public async connectWallet(walletType: WalletType): Promise<void> {
        switch(walletType) {
            case WalletType.metamask: {
                if (typeof window.ethereum !== 'undefined') {

                    this.provider = new providers.Web3Provider(window.ethereum, 'any');
                    this.createMetamaskProviderHooks(this.provider);
                    this.store.dispatch(WalletActions.connectWallet())
                    await this.provider.send(
                        'eth_requestAccounts',
                        []
                    )
                    .then((account) => {
                        this.store.dispatch(WalletActions.connectWalletSuccess());
                        this.store.dispatch(WalletActions.accountsChanged({account: account[0], chainId: undefined}));
                    })
                    .catch((error: any) => {
                        this.store.dispatch(WalletActions.connectWalletError());
                    });

                    const chainId = this.getAccountChain(WalletType.metamask);
                    this.store.dispatch(WalletActions.chainChanged({chainId}));

                    try {
                        await this.provider.provider.request?.({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: this.appConfig.chainIdHex }]
                        });
                    } catch (error: any) {
                        if (error.code === 4902) {
                            try {
                                await this.provider.provider.request?.({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: this.appConfig.chainIdHex,
                                            rpcUrl: this.appConfig.rpcUrl,
                                        },
                                    ],
                                });
                            } catch (addError) {
                                console.error('not this chain');
                                return
                            }
                        } else if (error.code === 4001) {
                            //TODO: Popup when user reject chain change
                            console.log('User reject chain change');
                            console.error(error)
                            return
                        }
                    }
                } else {
                    console.log('You dont have a wallet');
                    //TODO: Popup when user don't have a wallet
                }
                break;
            }
            case WalletType.walletConnect: {
                this.connector = new WalletConnect({
                    bridge: "https://bridge.walletconnect.org",
                    qrcodeModal: QRCodeModal,
                });
                if (!this.connector.connected) {
                    await this.connector.createSession({chainId: 56});
                    this.createWalletConnectProviderHooks(this.connector);
                } else {
                    //TODO: what when not connected?
                }
            }
        }
    }

    public disconnectWallet(): void {
        this.provider?.removeAllListeners();
        this.provider = undefined;
        this.store.dispatch(WalletActions.disconnectWallet());
    }

    private async getAccountBalance(walletAddress: string): Promise<void> {
        await this.provider?.getBalance(walletAddress)
        .then((balance) => console.log(balance))
        .catch(() => console.log('errorbalance'));
    }

    private getAccountChain(walletType: string): number | undefined {
        return this.provider?._network?.chainId;
    }

    public postBuyPreSaleTokens(usdcTokenAmount: number, wallet: string): Observable<SignedWalletWithAmount> {
        return this.httpClient.post<SignedWalletWithAmount>(SALE_TOKEN, {wallet, usdcTokenAmount});
    }

    public async signWalletTransaction(signedWalletWithAmount: SignedWalletWithAmount): Promise<void>{
        if (this.provider) {
            try {
                const UsdcContract = UsdcTokenContractFactory.connect(this.provider?.getSigner());
                UsdcContract.balanceOf('0x5E4E7f4D98eC366FbAFAaFAa533939b0b0e3f8Aa')
                .then((result) => console.log(result))
                .catch((err) => console.log(err));

            } catch (err: any) {
                console.log(err);
            }
        }
    }
}