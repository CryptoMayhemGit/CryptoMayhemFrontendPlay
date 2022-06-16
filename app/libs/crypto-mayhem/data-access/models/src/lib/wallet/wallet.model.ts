import { Observable } from "rxjs";


export interface WalletConnector {
    connect(): Observable<boolean>;
    disconnect(): Observable<boolean>;

    getChainId(): Observable<string>;
    getAccount(): Observable<string>;
    getProvider(): Observable<any>;
    
    connectionChanged$: Observable<boolean>;
    chainIdChanged$: Observable<string>;
    accountChanged$: Observable<string>;
    providerChanged$: Observable<any>;

    switchChain(chainId: string): Observable<boolean>;
    addChain(chainId: string): Observable<boolean>;
    addAsset(symbol: string): void;
}

export enum WalletType {
    Metamask = 'Metamask'
}
