import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { providers } from 'ethers';
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from '@walletconnect/qrcode-modal';
import { Store } from "@ngrx/store";

interface SignedWalletWithAmount {
    signedMessage: string;
    ustcTokenAmount: number;
    maxUsdcTokenAmount: number;
}

import * as WalletActions from '../state/wallet.actions';
import { Observable } from "rxjs";
import { SALE_TOKEN } from "./wallet.endpoints";
import { AppConfig, APP_CONFIG } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { UsdcTokenContractFactory } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/contract-model";
import { NotificationDroneEventTypes, NotificationDroneService } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone";

const ACCOUNTS_CHANGED = 'accountsChanged';
const CHAIN_CHANGED = 'chainChanged';
const DISCONNECT = 'disconnect';
const CONNECT = 'connect';
const UPDATE_SESSION = 'session_update';

@Injectable({ providedIn: 'root' })
export class WalletService {

    private provider: Web3Provider | undefined = undefined;
    private connector: WalletConnect | undefined = undefined;

    constructor(
        private readonly httpClient: HttpClient,
        private store: Store,
        private readonly notificationDroneService: NotificationDroneService,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    private loggingInDevelopMode(where: string, message: any): void {
        !this.appConfig.production && console.log(where, message);
    }

    //Metamask handlers
    handleAccountsChangedMetamask = (accounts: string[]): void => {
        if (!Array.isArray(accounts))
            this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));

        if (accounts.length === 0) {
            this.disconnectWallet();
        } else {
            this.loggingInDevelopMode('handleAccountChanged', accounts);
            this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));
        }
    }

    handleChainChangedMetamask = (chainIdHex: string): void => {
        if (typeof chainIdHex === 'undefined')
            return;

        this.store.dispatch(WalletActions.chainChanged({chainId: chainIdHex}));

        chainIdHex !== this.appConfig.chainIdHexBinance ?
        this.notificationDroneService.error(NotificationDroneEventTypes.BAD_NETWORK) :
        this.notificationDroneService.hide();
    }

    //WalletConnect handlers
    handleConnectWalletConnect = (error: any, payload: any): void => {
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
    }

    handleUpdateSessionWalletConnect = (error: any, payload: any) => {
        if (error) {
            throw error;
        }

        const { accounts, chainId } = payload.params[0];
        this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: chainId}));
    }

    handleDisconnectWalletConnect = (error: any, payload: any): void => {
        if (error) {
            throw error;
        }

        this.connector = undefined;
        this.store.dispatch(WalletActions.disconnectWallet());
    }

    private createMetamaskProviderHooks(provider: any): void {
        provider.provider.on(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
        provider.provider.on(CHAIN_CHANGED, this.handleChainChangedMetamask);
    }

    private createWalletConnectProviderHooks(provider: any): void {
        provider.on(CONNECT, this.handleConnectWalletConnect);
        provider.on(UPDATE_SESSION, this.handleUpdateSessionWalletConnect);
        provider.on(DISCONNECT, this.handleDisconnectWalletConnect);
    }

    private removeMetamaskProviderHooks(provider: any): void {
        (this.provider?.provider as any).removeListener(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
        (this.provider?.provider as any).removeListener(CHAIN_CHANGED, this.handleChainChangedMetamask);
    }

    private setChainId() {
        if (this.provider?._network.chainId)
            this.store.dispatch(WalletActions.chainChanged({chainId: this.provider?._network.chainId.toString()}));
    }

    public async connectWallet(walletType: WalletType): Promise<void> {
        switch(walletType) {
            case WalletType.metamask: {
                if (typeof window.ethereum !== 'undefined') {
                    this.provider = new providers.Web3Provider(window.ethereum, 'any');
                    this.createMetamaskProviderHooks(this.provider);
                    this.store.dispatch(WalletActions.connectWallet());
                    await this.provider.send(
                        'eth_requestAccounts',
                        []
                    )
                    .then((account) => {
                        this.store.dispatch(WalletActions.connectWalletSuccess());
                        this.store.dispatch(WalletActions.accountsChanged({account: account[0], chainId: undefined}));
                    })
                    .catch((error: any) => {
                        this.loggingInDevelopMode('eth_requestAccounts', error);
                        this.store.dispatch(WalletActions.connectWalletError());
                    });

                    try {
                        await this.provider.provider.request?.({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: this.appConfig.chainIdHexBinance }]
                        });
                    } catch (error: any) {
                        console.log('error', error);
                        if (error.code === 4902) {
                            try {
                                await this.provider.provider.request?.({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: this.appConfig.chainIdHexBinance,
                                            rpcUrl: this.appConfig.rpcUrlBinance,
                                        },
                                    ],
                                });
                            } catch (addError) {
                                console.error('not this chain');
                                return
                            }
                        } else if (error.code === 4001) { //User reject network change
                            this.loggingInDevelopMode('error.code 4001', error);
                            return
                        }
                    }
                    this.setChainId();

                } else {
                    this.notificationDroneService.error(NotificationDroneEventTypes.NO_WALLET);
                }
                break;
            }
            case WalletType.walletConnect: {
                this.connector = new WalletConnect({
                    bridge: "https://bridge.walletconnect.org",
                    qrcodeModal: QRCodeModal,
                });
                if (!this.connector.connected) {
                    await this.connector.createSession({chainId: Number(this.appConfig.chainIdNumberBinance)});
                    this.createWalletConnectProviderHooks(this.connector);
                } else {
                    //TODO: what when not connected?
                }
            }
        }
    }

    public disconnectWallet(): void {
        this.provider?.removeAllListeners();
        this.removeMetamaskProviderHooks(this.provider);
        this.provider = undefined;
        this.store.dispatch(WalletActions.disconnectWallet());
    }

    public postSignWalletBeforeBuy(usdcTokenAmount: number, wallet: string): Observable<SignedWalletWithAmount> {
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