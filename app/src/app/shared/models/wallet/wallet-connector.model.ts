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

}

// error x2
// RPCError

// isAuthorized
// isUnlocked
// isConnected

// add after switch

// <head>
//   <link rel="shortcut icon" href="https://your-site.com/your-icon.png" />
// </head>



// ErrorInterceptor
// MessageComponent

// supportedChainId
// walletSupports

// addAsset

// tokenInterceptor
// NavDisabled