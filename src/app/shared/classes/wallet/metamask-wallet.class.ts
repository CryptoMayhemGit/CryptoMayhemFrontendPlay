import { Observable, Subject, from, of } from "rxjs";

import { WalletConnector } from "../../models/wallet/wallet-connector.model";

import { MetamaskWindow } from "../../models/wallet/metamask/metamask-window.model";
import { MetamaskProvider } from "../../models/wallet/metamask/metamask-provider.model";
import { MetamaskError } from "../../models/wallet/metamask/metamask-error.model";
import { MetamaskAsset } from "../../models/wallet/metamask/metamask-asset.model";
import { MetamaskChainBase } from "../../models/wallet/metamask/metamask-chain-base.model";
import { MetamaskChain } from "../../models/wallet/metamask/metamask-chain.model";

import {
    BNB_CHAIN,
    CONNECT_LISTENER, 
    DISCONNECT_LISTENER, 
    CHAIN_LISTENER, 
    ACCOUNTS_LISTENER,
    CONNECT_REQUEST, 
    CHAIN_ID_REQUEST, 
    ACCOUNTS_REQUEST, 
    ADD_ASSET_REQUEST,
    ADD_CHAIN_REQUEST,
    SWITCH_CHAIN_REQUEST,
    UNRECOGNIZED_CHAIN_ERROR_CODE
} from "../../config/wallet/metamask.config";

import { 
    CONNECTED, 
    DISCONNECTED, 
    EMPTY_ACCOUNT, 
    EMPTY_PROVIDER 
} from "../../config/wallet/wallet.config";

import { PROVIDER_NOT_FOUND, UNKNOWN_ERROR } from "../../config/notification/metamask.config";


export class MetamaskWallet implements WalletConnector {

    private connectionChanged = new Subject<boolean>();
    private chainIdChanged = new Subject<string>();
    private accountChanged = new Subject<string>();
    private providerChanged = new Subject<any>();
  
    connectionChanged$ = this.connectionChanged.asObservable();
    chainIdChanged$ = this.chainIdChanged.asObservable();
    accountChanged$ = this.accountChanged.asObservable();
    providerChanged$ = this.providerChanged.asObservable();

    constructor() {
        this.onConnect = this.onConnect.bind(this);
        this.onDisonnect = this.onDisonnect.bind(this);
        this.onChainIdChanged = this.onChainIdChanged.bind(this);
        this.onAccountChanged = this.onAccountChanged.bind(this);
    }

    private retrieveProvider(): MetamaskProvider {
        const provider = (window as MetamaskWindow).ethereum;

        if (!provider) {
            throw new Error(PROVIDER_NOT_FOUND);
        }

        return provider;
    }

    private onConnectionChanged(connected: boolean): void {
        this.connectionChanged.next(connected);
        this.onProviderChanged(connected);
    }

    private onConnect(): void {
        this.onConnectionChanged(CONNECTED);
    }

    private onDisonnect(): void {
        this.onConnectionChanged(DISCONNECTED);
    }

    private onChainIdChanged(chainId: string): void {
        this.chainIdChanged.next(chainId);
        this.onProviderChanged(CONNECTED);
    }

    private onAccountChanged(accounts: string[]): void {
        if (accounts.length === 0) {
            this.onDisonnect();
            this.accountChanged.next(EMPTY_ACCOUNT)
        } else {
            this.accountChanged.next(accounts[0]);
            this.onProviderChanged(CONNECTED);
        }   
    }

    private onProviderChanged(connected: boolean): void {
        if (connected) {
            this.providerChanged.next(this.retrieveProvider());
        } else {
            this.providerChanged.next(EMPTY_PROVIDER);
        }
    }

    connect(): Observable<boolean> {
        const provider = this.retrieveProvider();

        provider.on(CONNECT_LISTENER, this.onConnect);
        provider.on(DISCONNECT_LISTENER, this.onDisonnect);
        provider.on(CHAIN_LISTENER, this.onChainIdChanged);
        provider.on(ACCOUNTS_LISTENER, this.onAccountChanged);

        return from(
            provider
                .request(CONNECT_REQUEST)
                .then(() => true)
        );
    }

    disconnect(): Observable<boolean> {
        const provider = this.retrieveProvider();

        provider.removeListener(CONNECT_LISTENER, this.onConnect);
        provider.removeListener(DISCONNECT_LISTENER, this.onDisonnect);
        provider.removeListener(CHAIN_LISTENER, this.onChainIdChanged);
        provider.removeListener(ACCOUNTS_LISTENER, this.onAccountChanged);

        return of(true);
    }

    getChainId(): Observable<string> {
        return from(
            this.retrieveProvider()
                .request(CHAIN_ID_REQUEST)
                .then((chainId) => chainId)
        );
    }

    getAccount(): Observable<string> {
        return from(
            this.retrieveProvider()
                .request(ACCOUNTS_REQUEST)
                .then((accounts) => accounts[0])
        );
    }

    getProvider(): Observable<any> {
        return of(this.retrieveProvider());
    }

    addChain(chain: MetamaskChain): Observable<boolean> {
        const addChainRequest = Object.assign({ params: chain }, ADD_CHAIN_REQUEST);

        return from(
            this.retrieveProvider()
                .request(addChainRequest)
                .then((success) => {

                    if (!success) {
                        throw new Error(UNKNOWN_ERROR);
                    }

                    return true;

                })
        );
    }

    switchChain(chainBase: MetamaskChainBase): Observable<boolean> {
        const switchChainRequest = Object.assign({ params: chainBase }, SWITCH_CHAIN_REQUEST);

        return from(
            this.retrieveProvider()
                .request(switchChainRequest)
                .then((success) => {

                    if (!success) {
                        throw new Error(UNKNOWN_ERROR);
                    }

                    return true;

                })
                .catch((error: MetamaskError) => {

                    if (error.code === UNRECOGNIZED_CHAIN_ERROR_CODE) {
                        this.addChain(BNB_CHAIN)
                    }
                    
                    return false;

                })
        );
    }

    addAsset(asset: MetamaskAsset): Observable<boolean> {
        const addAssetRequest = Object.assign({ params: asset }, ADD_ASSET_REQUEST);

        return from(
            this.retrieveProvider()
                .request(addAssetRequest)
                .then((success) => {

                    if (!success) {
                        throw new Error(UNKNOWN_ERROR);
                    }

                    return true;

                })
        );
    }

}
