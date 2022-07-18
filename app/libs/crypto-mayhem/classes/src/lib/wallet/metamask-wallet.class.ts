import { Observable, Subject } from "rxjs";

import { WalletError } from "./wallet-error.class";

import { ContractsMetadata, MetamaskAsset, MetamaskError, MetamaskProvider, MetamaskWindow, WalletConnector } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/models";
import { ACCOUNTS_LISTENER, ACCOUNTS_REQUEST, ADD_ASSET_REQUEST, ADD_CHAIN_REQUEST, CHAINS, CHAIN_IDS, CHAIN_ID_REQUEST, CHAIN_LISTENER, CONNECTED, CONNECT_LISTENER, CONNECT_REQUEST, DISCONNECTED, DISCONNECT_LISTENER, EMPTY_ACCOUNT, EMPTY_PROVIDER, PENDING_REQUEST_CODE, SWITCH_CHAIN_REQUEST, UNRECOGNIZED_CHAIN_ERROR_CODE, USER_REJECTED_ERROR_CODE } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { prepareMetamaskAssets } from "@crypto-mayhem-frontend/utils";
import { TranslocoService } from "@ngneat/transloco";


export class MetamaskWallet implements WalletConnector {

    private assets: Map<string, MetamaskAsset>;

    private connectionChanged = new Subject<boolean>();
    private chainIdChanged = new Subject<string>();
    private accountChanged = new Subject<string>();
    private providerChanged = new Subject<any>();

    private url: string;
    private transloco: TranslocoService;
  
    connectionChanged$ = this.connectionChanged.asObservable();
    chainIdChanged$ = this.chainIdChanged.asObservable();
    accountChanged$ = this.accountChanged.asObservable();
    providerChanged$ = this.providerChanged.asObservable();

    constructor(contractsMetadata: ContractsMetadata, rpcUrl?: string, externalUrl?: string, translocoService?: TranslocoService) {
        this.assets = prepareMetamaskAssets(contractsMetadata, externalUrl as string);
        this.url = rpcUrl as string;
        this.transloco = translocoService as TranslocoService;
        
        this.onConnect = this.onConnect.bind(this);
        this.onDisonnect = this.onDisonnect.bind(this);
        this.onChainIdChanged = this.onChainIdChanged.bind(this);
        this.onAccountChanged = this.onAccountChanged.bind(this);
    }


    private retrieveProvider(): MetamaskProvider {
        //const provider = (window as MetamaskWindow).ethereum;
        const provider = null;

        if (!provider) {
            throw new WalletError(this.transloco.translate("NOTIFICATION.METAMASK.PROVIDER_NOT_FOUND"));
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
                    .then(() => observer.next(true))
                    .catch((error: MetamaskError) => {

                        if (error.code === USER_REJECTED_ERROR_CODE) {
                            return observer.error(new WalletError(this.transloco.translate("NOTIFICATION.METAMASK.USER_REJECTED_CONNECTION")));
                        }

                        if (error.code === PENDING_REQUEST_CODE) {
                            return observer.error(new WalletError(this.transloco.translate("NOTIFICATION.METAMASK.PENDING_CONNECTION"), PENDING_REQUEST_CODE));
                        }

                        observer.error(error);

                    });

            } catch (error) {

                observer.error(error);

            }

        });
    }

    disconnect(): Observable<boolean> {
        return new Observable(observer => {

            try {

                const provider = this.retrieveProvider();

                provider.removeListener(CONNECT_LISTENER, this.onConnect);
                provider.removeListener(DISCONNECT_LISTENER, this.onDisonnect);
                provider.removeListener(CHAIN_LISTENER, this.onChainIdChanged);
                provider.removeListener(ACCOUNTS_LISTENER, this.onAccountChanged);
        
                observer.next(true);

            } catch (error) {

                observer.error(error);

            }

        });
    }

    getChainId(): Observable<string> {
        return new Observable(observer => {

            try {

                this.retrieveProvider()
                    .request(CHAIN_ID_REQUEST)
                    .then(chainId => observer.next(chainId))
                    .catch(error => observer.error(error));

            } catch (error) {

                observer.error(error);

            }

        });
    }

    getAccount(): Observable<string> {
        return new Observable(observer => {

            try {

                this.retrieveProvider()
                    .request(ACCOUNTS_REQUEST)
                    .then(accounts => observer.next(accounts[0]))
                    .catch(error => observer.error(error));

            } catch (error) {

                observer.error(error);

            }

        });
    }

    getProvider(): Observable<any> {
        return new Observable(observer => {

            try {

                observer.next(this.retrieveProvider());

            } catch (error) {

                observer.error(error);

            }

        });
    }

    switchChain(chainId: string): Observable<boolean> {
        return new Observable(observer => {

            try {

                const chainIdObject = CHAIN_IDS.get(chainId);

                if (!chainIdObject) {
                    return observer.error(new Error(this.transloco.translate("NOTIFICATION.METAMASK.UNSUPPORTED_CHAIN")));
                }

                const switchChainRequest = Object.assign({ params: [chainIdObject] }, SWITCH_CHAIN_REQUEST);
                
                this.retrieveProvider()
                    .request(switchChainRequest)
                    .then((success) => observer.next(success))
                    .catch((error: MetamaskError) => {

                        if (error.code === UNRECOGNIZED_CHAIN_ERROR_CODE) {
                            return observer.error(new WalletError(this.transloco.translate("NOTIFICATION.METAMASK.UNRECOGNIZED_CHAIN"), UNRECOGNIZED_CHAIN_ERROR_CODE));
                        }

                        if (error.code === USER_REJECTED_ERROR_CODE) {
                            return observer.error(new WalletError(this.transloco.translate("NOTIFICATION.METAMASK.USER_REJECTED_CHAIN")));
                        }

                        observer.error(error);

                    });

            } catch (error) {

                observer.error(error);

            }

        });
    }

    addChain(chainId: string): Observable<boolean> {
        return new Observable(observer => {

            try {

                let chainObject = CHAINS.get(chainId);

                if(!chainObject?.rpcUrls) { 
                    chainObject = {
                        ...chainObject,
                        rpcUrls: [this.url]
                    }
                }

                if (!chainObject) {
                    return observer.error(new Error(this.transloco.translate("NOTIFICATION.METAMASK.UNSUPPORTED_CHAIN")));
                }

                const addChainRequest = Object.assign({ params: [chainObject] }, ADD_CHAIN_REQUEST);

                this.retrieveProvider()
                    .request(addChainRequest)
                    .then((success) => observer.next(success))
                    .catch((error: MetamaskError) => {

                        if (error.code === USER_REJECTED_ERROR_CODE) {
                            return observer.error(new WalletError(this.transloco.translate("NOTIFICATION.METAMASK.USER_REJECTED_CHAIN")));
                        }

                        observer.error(error);

                    });

            } catch (error) {

                observer.error(error);

            }

        });
    }

    addAsset(symbol: string): void {

        const assetObject = this.assets.get(symbol);

        if (!assetObject) {
            throw new Error();
        } 

        const addAssetRequest = Object.assign({ params: assetObject }, ADD_ASSET_REQUEST);

        this.retrieveProvider()
            .request(addAssetRequest);
        
    }

}
