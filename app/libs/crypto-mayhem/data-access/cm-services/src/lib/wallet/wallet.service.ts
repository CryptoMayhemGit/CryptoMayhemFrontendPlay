import { Inject, Injectable, NgZone } from '@angular/core';

import { Web3Provider } from '@ethersproject/providers';

import { BehaviorSubject, Observable, first, zip } from 'rxjs';

import { WalletConnector, WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';
import { ADD_CHAIN_ERROR, AppConfig, APP_CONFIG, CONNECTED, CONNECT_ERROR, DENIED_BY_USER, DISCONNECTED, DISCONNECT_ERROR, EMPTY_ACCOUNT, EMPTY_CHAIN_ID, EMPTY_PROVIDER, SING_MESSAGE_ERROR, SWITCH_CHAIN_ERROR } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { ConfigService } from '../config/config.service';
import { MetamaskWallet, SubscriptionRegister } from '@crypto-mayhem-frontend/crypto-mayhem/classes';



@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private wallet?: WalletConnector;

  private subscriptionRegister = new SubscriptionRegister();

  private connectionSubject = new BehaviorSubject<boolean>(DISCONNECTED);
  private chainIdSubject = new BehaviorSubject<string>(EMPTY_CHAIN_ID);
  private accountSubject = new BehaviorSubject<string>(EMPTY_ACCOUNT);
  private providerSubject = new BehaviorSubject<any>(EMPTY_PROVIDER);
  private web3ProviderSubject = new BehaviorSubject<Web3Provider | undefined>(EMPTY_PROVIDER);

  private connection: boolean = DISCONNECTED;
  private chainId: string = EMPTY_CHAIN_ID
  private account: string = EMPTY_ACCOUNT
  private provider: any = EMPTY_PROVIDER;
  private web3Provider?: Web3Provider = EMPTY_PROVIDER;

  connection$ = this.connectionSubject.asObservable();
  chainId$ = this.chainIdSubject.asObservable();
  account$ = this.accountSubject.asObservable();
  provider$ = this.providerSubject.asObservable();
  web3Provider$ = this.web3ProviderSubject.asObservable();

  constructor(
    private ngZone: NgZone,
    private configService: ConfigService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  private updateConnection(connection: boolean): void {
    this.connection = connection;
    this.connectionSubject.next(connection);
  }

  private updateChainId(chainId: string): void {
    this.chainId = chainId;
    this.chainIdSubject.next(chainId);
  }

  private updateAccount(account: string): void {
    this.account = account;
    this.accountSubject.next(account);
  }

  private updateProviders(provider: any): void {
    this.provider = provider;
    this.web3Provider = provider && new Web3Provider(provider);
    this.providerSubject.next(provider);
    this.web3ProviderSubject.next(this.web3Provider);
  }

  connect(walletType: WalletType): Observable<boolean> {
    return new Observable(observer => {

      this.configService.getContractsMetadata()
        .pipe(first())
        .subscribe({
          
          next: (contractsMetadata) => {

            switch (walletType) {

              case WalletType.Metamask: {
                this.wallet = new MetamaskWallet(contractsMetadata, this.config.rpcUrl, this.config.externalUrl);
                break;
              }
        
            }
      
            if (!this.wallet) {
              return observer.error(new Error(CONNECT_ERROR));
            }
      
            this.wallet.connect()
              .pipe(first())
              .subscribe({
      
                next: (connected) => {
      
                  if (!this.wallet || !connected) {
                    return observer.error(new Error(CONNECT_ERROR));
                  }
            
                  this.subscriptionRegister.add(
                    this.wallet.connectionChanged$.subscribe(connection => 
                      this.ngZone.run(
                        () => this.updateConnection(connection)
                      )
                    )  
                  );
          
                  this.subscriptionRegister.add(
                    this.wallet.chainIdChanged$.subscribe(chainId => 
                      this.ngZone.run(
                        () => this.updateChainId(chainId)
                      )
                    )  
                  );
          
                  this.subscriptionRegister.add(
                    this.wallet.accountChanged$.subscribe(account => 
                      this.ngZone.run(
                        () => this.updateAccount(account)
                      )
                    )  
                  );
          
                  this.subscriptionRegister.add(
                    this.wallet.providerChanged$.subscribe(provider => 
                      this.ngZone.run(
                        () => this.updateProviders(provider)
                      )
                    )  
                  );
      
                  zip(
                    this.wallet.getChainId(),
                    this.wallet.getAccount(),
                    this.wallet.getProvider()
                  )
                  .subscribe({
                    
                    next: ([chainId, account, provider]) => {
      
                      this.updateChainId(chainId);
                      this.updateAccount(account);
                      this.updateProviders(provider)
                      this.updateConnection(CONNECTED);
      
                      observer.next(CONNECTED);
      
                    },
      
                    error: () => observer.error(new Error(CONNECT_ERROR))
      
      
                  });
        
                },
            
                error: (error) => {
                  
                  if (error.name === 'WalletError') {
                    return observer.error(error);
                  }
      
                  observer.error(new Error(CONNECT_ERROR));
      
                }
              
              });

            },

            error: (error) => observer.error(error)

          });

      });

  }

  disconnect(): Observable<boolean> {
    return new Observable((observer) => {

      this.updateConnection(DISCONNECTED);
      this.updateChainId(EMPTY_CHAIN_ID);
      this.updateAccount(EMPTY_ACCOUNT);
      this.updateProviders(EMPTY_PROVIDER);
  
      this.subscriptionRegister.clear();

      this.wallet?.disconnect()
        .pipe(first())  
        .subscribe({

          next: (success) => {
            this.wallet = undefined;
            observer.next(success);
          },

          error: () => observer.error(new Error(DISCONNECT_ERROR))

        });

    });

  }

  getConnection(): boolean {
    return this.connection;
  }

  getChainId(): string {
    return this.chainId;
  }

  getAccount(): string {
    return this.account;
  }

  getProvider(): any {
    return this.provider;
  }

  getWeb3Provider(): Web3Provider | undefined {
    return this.web3Provider;
  }

  signMessage(message: string): Observable<string> {
    return new Observable(observer => {

      if (!this.web3Provider) {
        return observer.error(new Error(SING_MESSAGE_ERROR));
      }
  
      this.web3Provider
        .getSigner()
        .signMessage(message)
        .then(signature => observer.next(signature))
        .catch(_ => observer.error(new Error(DENIED_BY_USER)));

    });

  }

  switchChain(chainId: string): Observable<boolean> {
    return new Observable(observer => {

      if (!this.wallet) {
        return observer.error(new Error(SWITCH_CHAIN_ERROR));
      }
  
      this.wallet.switchChain(chainId)
        .pipe(first())
        .subscribe({

          next: () => observer.next(),

          error: (error) => {

            if (error.name === 'WalletError') {
              return observer.error(error);
            }

            observer.error(new Error(SWITCH_CHAIN_ERROR));

          }

        });

    });
  } 

  addChain(chainId: string): Observable<boolean> {
    return new Observable(observer => {

      if (!this.wallet) {
        return observer.error(new Error(ADD_CHAIN_ERROR));
      }
  
      this.wallet.addChain(chainId)
        .pipe(first())
        .subscribe({

          next: () => observer.next(),

          error: (error) => {

            if (error.name === 'WalletError') {
              return observer.error(error);
            }

            observer.error(new Error(ADD_CHAIN_ERROR));

          }

        });

    });
  } 

  addAsset(asset: string): void {

      if (!this.wallet) {
        throw new Error();
      }
  
      this.wallet.addAsset(asset);

  } 

}
