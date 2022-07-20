import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { providers } from 'ethers';
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import WalletConnect from "@walletconnect/client";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Store } from "@ngrx/store";


import * as WalletActions from '../state/wallet.actions';

@Injectable({ providedIn: 'root' })
export class WalletService {

    private provider: Web3Provider | undefined = undefined;
    private connector: WalletConnect | undefined = undefined;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly store: Store
    ) {}

    private createMetamaskProviderHooks(provider: any) {
        provider.provider.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) {
                this.disconnectWallet();
            } else {
                this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));
                this.getAccountBalance(accounts[0]);
            }
        });

        // Subscribe to chainId change
        provider.provider.on("chainChanged", (chainId: number) => {
            this.store.dispatch(WalletActions.chainChanged({chainId: chainId}))
            console.log(chainId);
        });

        // Subscribe to session disconnection
        provider.on("disconnect", () => {
            this.store.dispatch(WalletActions.disconnectWallet());
        });

        const signer = provider.getSigner();
    }

    private removeMetamaskProviderHooks(provider: any) {

    }

    private createWalletConnectProviderHooks(provider: any) {
        // Subscribe to connection events
        provider.on("connect", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        });

        provider.on("session_update", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
        });

        provider.on("disconnect", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

        // Delete connector
        });
    }

    public async connectWallet(walletType: WalletType) {
        switch(walletType) {
            case WalletType.metamask: {
                if (typeof window.ethereum !== 'undefined') {
                    const account: string | undefined = undefined;
                    this.provider = new providers.Web3Provider(window.ethereum, 'any');
                    this.createMetamaskProviderHooks(this.provider);
                    await this.provider.send(
                        'eth_requestAccounts',
                        []
                    )
                    .then((account) => {
                        this.store.dispatch(WalletActions.connectWallet())
                        this.store.dispatch(WalletActions.accountsChanged({account: account, chainId: undefined}))
                    })
                    .catch((error: any) => console.log(error))
                    console.log(this.provider);
                    const chainId = this.getAccountChain(WalletType.metamask);
                    this.store.dispatch(WalletActions.chainChanged({chainId}));
                } else {
                    //TODO: user not have a wallet
                }
                break;
            }
            case WalletType.walletConnect: {
                this.connector = new WalletConnect({
                    bridge: "https://bridge.walletconnect.org", // Required
                    qrcodeModal: QRCodeModal,
                });
                if (!this.connector.connected) {
                    // create new session
                    this.connector.createSession();
                    this.createWalletConnectProviderHooks(this.connector);
                } else {
                    //TODO: what when not connected?
                }
            }
        }
    }

    public async disconnectWallet() {
        //this.removeMetamaskProviderHooks(this.provider);
        this.provider = undefined;
        this.store.dispatch(WalletActions.disconnectWallet());
    }

    private async getAccountBalance(walletAddress: string) {
        await this.provider?.getBalance(walletAddress)
        .then((balance) => console.log(balance))
        .catch(() => console.log('errorbalance'));
    }

    private getAccountChain(walletType: string) {
        console.log(this.provider);
        return this.provider?._network?.chainId;
    }
}