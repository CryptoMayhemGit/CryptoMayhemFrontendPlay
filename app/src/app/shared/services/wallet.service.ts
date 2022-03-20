import { Injectable, NgZone } from '@angular/core';

import { Web3Provider } from '@ethersproject/providers';

import { BehaviorSubject, Subscription, Observable, forkJoin, first, from } from 'rxjs';

import { WalletConnector } from '../models/wallet/wallet-connector.model'
import { WalletType } from '../models/wallet/wallet-type.model';

import { SubscriptionRegister } from '../classes/subscription-register.class';
import { MetamaskWallet } from '../classes/wallet/metamask-wallet.class';

import {
  CONNECTED,
  DISCONNECTED,
  EMPTY_CHAIN_ID,
  EMPTY_ACCOUNT,
  EMPTY_PROVIDER
} from "../config/wallet/wallet.config";

import { UNKNOWN_ERROR } from '../config/notification/wallet.config';


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

  constructor(private ngZone: NgZone) { }

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

    switch (walletType) {

      case WalletType.Metamask: {
        this.wallet = new MetamaskWallet();
        break;
      }

    }
    
    return new Observable((observer) => {

      if (!this.wallet) {
        throw new Error(UNKNOWN_ERROR);
      }

      this.wallet.connect()
        .pipe(first())
        .subscribe(connected => {

          if (!this.wallet || !connected) {
            observer.next(DISCONNECTED);
            return;
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

          forkJoin({
            chainId: this.wallet.getChainId(),
            account: this.wallet.getAccount(),
            provider: this.wallet.getProvider()
          })
          .subscribe(({ chainId, account, provider }) => {

            this.updateChainId(chainId);
            this.updateAccount(account);
            this.updateProviders(provider)
            this.updateConnection(CONNECTED);

            observer.next(CONNECTED);

          });
  
        });

      });

  }

  disconnect(): Observable<boolean> {

    this.updateConnection(DISCONNECTED);
    this.updateChainId(EMPTY_CHAIN_ID);
    this.updateAccount(EMPTY_ACCOUNT);
    this.updateProviders(EMPTY_PROVIDER);

    this.subscriptionRegister.clear();

    return new Observable((observer) => {

      this.wallet?.disconnect()
        .pipe(first())  
        .subscribe(success => {

          this.wallet = undefined;
          observer.next(success);

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
    if (!this.web3Provider) {
      throw new Error(UNKNOWN_ERROR);
    }

    return from(
      this.web3Provider
        .getSigner()
        .signMessage(message)
    );
  }

}
