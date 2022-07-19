import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { Observable, of } from 'rxjs';
import { IWeb3Wallet } from './wallet.interface';

export class MetaMaskWallet implements IWeb3Wallet {
  private static _instance: MetaMaskWallet;

  private _provider: any = undefined;
  private _signer: any;
  public walletAddress: string | undefined;

  private constructor() {}

  public static getInstance(): MetaMaskWallet {
    if (!MetaMaskWallet._instance) {
      this._instance = new MetaMaskWallet();
    }

    return MetaMaskWallet._instance;
  }

  public connect(): Observable<any> {
    if (typeof window.ethereum !== 'undefined') {
      if (MetaMaskWallet._instance._provider === undefined) {
        MetaMaskWallet._instance._provider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        MetaMaskWallet._instance._provider.on('chainChanged', () => console.log('ok'));
        MetaMaskWallet._instance._provider.on('accountsChanged', () => console.log('ok'));
        const walletAccount = async () => {
          return await MetaMaskWallet._instance._provider.send(
            'eth_requestAccounts',
            []
          );
        };
        this._signer = this._provider.getSigner();

        return new Observable((subscriber) => {
          walletAccount()
            .then((walletAddress) => {
              subscriber.next(walletAddress);
              subscriber.complete();
            })
            .catch((error) => {
              MetaMaskWallet._instance._provider = undefined;
              subscriber.error(error);
            });
        });
      } else {
        //TODO: handle message/exception that we are already connected or do nothing?
      }
    } else {
      //TODO: handle message to user when they don't have metamask
    }
    return of(false);
  }

  private accountChanged() {
    MetaMaskWallet._instance._provider.on('accountsChanged', async () => {
      console.log('change');
    })
  }

  public disconnect(): Observable<boolean> {
    MetaMaskWallet._instance._provider = undefined;
    MetaMaskWallet._instance._signer = undefined;
    MetaMaskWallet._instance.walletAddress = undefined;
    return this.onDisconnect();
  }

  onDisconnect(): Observable<any> {
    return new Observable((subscriber) => {
      MetaMaskWallet._instance._provider.on('disconnect', (error: any) => {
        if (error) {
          subscriber.error(error);
        }

        subscriber.complete();
      });
    });
  }

  private setWalletAccount(walletAddress: string): void {
    MetaMaskWallet._instance.walletAddress = walletAddress;
  }
}
