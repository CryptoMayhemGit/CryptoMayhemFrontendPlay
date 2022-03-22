import { Observable, Subject, from, of } from "rxjs";

import { WalletConnector } from "../../models/wallet/wallet-connector.model";

import { WalletError } from "../../classes/wallet/wallet-error.class";

import { MetamaskWindow } from "../../models/wallet/metamask/metamask-window.model";
import { MetamaskProvider } from "../../models/wallet/metamask/metamask-provider.model";
import { MetamaskError } from "../../models/wallet/metamask/metamask-error.model";
import { MetamaskAsset } from "../../models/wallet/metamask/metamask-asset.model";

import {
    CONNECT_LISTENER, 
    DISCONNECT_LISTENER, 
    CHAIN_LISTENER, 
    ACCOUNTS_LISTENER,
    CONNECT_REQUEST, 
    CHAIN_ID_REQUEST, 
    ACCOUNTS_REQUEST, 
    SWITCH_CHAIN_REQUEST,
    ADD_ASSET_REQUEST,
    ADD_CHAIN_REQUEST,
    UNRECOGNIZED_CHAIN_ERROR_CODE,
    USER_REJECTED_ERROR_CODE,
    CHAIN_IDS,
    CHAINS
} from "../../config/wallet/metamask.config";

import { 
    CONNECTED, 
    DISCONNECTED, 
    EMPTY_ACCOUNT, 
    EMPTY_PROVIDER,
} from "../../config/wallet/wallet.config";

import { 
    PROVIDER_NOT_FOUND,  
    UNKNOWN_ERROR,
    UNSUPPORTED_CHAIN, 
    UNRECOGNIZED_CHAIN, 
    USER_REJECTED_CHAIN 
} from "../../config/notification/metamask.config";


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
            throw new WalletError(PROVIDER_NOT_FOUND);
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
        return new Observable(observer => {

            try {

            const provider = this.retrieveProvider();

            provider.on(CONNECT_LISTENER, this.onConnect);
            provider.on(DISCONNECT_LISTENER, this.onDisonnect);
            provider.on(CHAIN_LISTENER, this.onChainIdChanged);
            provider.on(ACCOUNTS_LISTENER, this.onAccountChanged);
    
            provider
                .request(CONNECT_REQUEST)
                .then(() => observer.next(true));

            } catch (error) {
                return observer.error(error);
            }

        });
    }

    disconnect(): Observable<boolean> {
        return new Observable(observer => {

            const provider = this.retrieveProvider();

            provider.removeListener(CONNECT_LISTENER, this.onConnect);
            provider.removeListener(DISCONNECT_LISTENER, this.onDisonnect);
            provider.removeListener(CHAIN_LISTENER, this.onChainIdChanged);
            provider.removeListener(ACCOUNTS_LISTENER, this.onAccountChanged);
    
            observer.next(true);

        });
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

    switchChain(chainId: string): Observable<boolean> {
        return new Observable(observer => {

            const chainIdObject = CHAIN_IDS.get(chainId);

            if (!chainIdObject) {
                return observer.error(new Error(UNSUPPORTED_CHAIN));
            }

            const switchChainRequest = Object.assign({ params: [chainIdObject] }, SWITCH_CHAIN_REQUEST);
            
            this.retrieveProvider()
                .request(switchChainRequest)
                .then((success) => observer.next(success))
                .catch((error: MetamaskError) => {

                    if (error.code === UNRECOGNIZED_CHAIN_ERROR_CODE) {
                        return observer.error(new WalletError(UNRECOGNIZED_CHAIN, UNRECOGNIZED_CHAIN_ERROR_CODE));
                    }

                    if (error.code === USER_REJECTED_ERROR_CODE) {
                        return observer.error(new WalletError(USER_REJECTED_CHAIN));
                    }

                    return observer.error(error);

                });

        });
    }

    addChain(chainId: string): Observable<boolean> {
        return new Observable(observer => {

            const chainObject = CHAINS.get(chainId);

            if (!chainObject) {
                return observer.error(new Error(UNSUPPORTED_CHAIN));
            }

            const addChainRequest = Object.assign({ params: [chainObject] }, ADD_CHAIN_REQUEST);
            console.log(addChainRequest)

            this.retrieveProvider()
                .request(addChainRequest)
                .then((success) => observer.next(success))
                .catch((error: MetamaskError) => {

                    if (error.code === USER_REJECTED_ERROR_CODE) {
                        return observer.error(new WalletError(USER_REJECTED_CHAIN));
                    }

                    return observer.error(error);

                });

        });
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
