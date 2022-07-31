import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import { providers, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import WalletConnectProvider from '@walletconnect/web3-provider';

interface SignedWalletWithAmount {
  signature: string;
  stage: number;
  usdcTokenAmount: number;
  maxUsdcTokenAmount: number;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

import * as WalletActions from '../state/wallet.actions';
import { Observable } from 'rxjs';
import { SALE_TOKEN } from './wallet.endpoints';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';
import {
  AdriaVestingContractFactory,
  UsdcTokenContractFactory,
} from '@crypto-mayhem-frontend/crypto-mayhem/data-access/contract-model';
import { NotificationDroneService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';

const ACCOUNTS_CHANGED = 'accountsChanged';
const CHAIN_CHANGED = 'chainChanged';
const DISCONNECT = 'disconnect';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private provider: Web3Provider | undefined = undefined;

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
    if (!Array.isArray(accounts)) {
      this.store.dispatch(
        WalletActions.accountsChanged({
          account: accounts[0]
        })
      );

      this.store.dispatch(
        WalletActions.connectWalletSuccess({
          walletType: WalletType.metamask,
        })
      );
    }

    if (accounts.length === 0) {
      this.disconnectWallet();
    } else {
      this.loggingInDevelopMode('handleAccountChanged', accounts);
      this.store.dispatch(
        WalletActions.accountsChanged({
          account: accounts[0]
        })
      );

      this.store.dispatch(
        WalletActions.connectWalletSuccess({
          walletType: WalletType.metamask,
        })
      );
    }
  };

  handleChainChangedMetamask = (chainIdHex: string): void => {
    if (typeof chainIdHex === 'undefined') return;
    if(chainIdHex != this.appConfig.chainIdHexBinance){
      this.notificationDroneService.error(
        'NOTIFICATIONS.BAD_NETWORK',
        'NOTIFICATIONS.BAD_NETWORK_MESSAGE',
        'NOTIFICATIONS.CLOSE'
        );
        this.disconnectWallet();
      } else {
        this.store.dispatch(WalletActions.chainChanged({ chainId: chainIdHex }));
        this.notificationDroneService.hide();
    }
  };

  handleDisconnectMetamask = (reason: ProviderRpcError): void => {
    if (reason.code !== 1013) { //MetaMask: Disconnected from chain. Attempting to connect.
      this.disconnectWallet();
    }
  };

  private createProviderHooks(provider: any): void {
    provider.on(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
    provider.on(CHAIN_CHANGED, this.handleChainChangedMetamask);
    provider.on(DISCONNECT, this.handleDisconnectMetamask);
  }

  private removeMetamaskProviderHooks(provider: any): void {
    (this.provider?.provider as any).removeListener(
      ACCOUNTS_CHANGED,
      this.handleAccountsChangedMetamask
    );
    (this.provider?.provider as any).removeListener(
      CHAIN_CHANGED,
      this.handleChainChangedMetamask
    );
    (this.provider?.provider as any).removeListener(
      DISCONNECT,
      this.handleDisconnectMetamask
    );
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  public async connectWallet(walletType: WalletType): Promise<void> {
    switch (walletType) {
      case WalletType.metamask: {
        if (typeof window.ethereum === 'undefined' && this.isMobile()) {
          window.location.href =
            'https://metamask.app.link/dapp/black-mushroom-0ae7fe803-develop.westeurope.1.azurestaticapps.net/presale';

        } else if (typeof window.ethereum !== 'undefined') {
          this.provider = new providers.Web3Provider(window.ethereum, 'any');
          this.createProviderHooks(this.provider.provider);
          this.store.dispatch(WalletActions.connectWallet());
          await this.provider
            .send('eth_requestAccounts', [])
            .then((accounts: string[]) => {
              this.store.dispatch(
                WalletActions.accountsChanged({
                  account: accounts[0]
                })
              );
            })
            .catch((error: any) => {
              this.loggingInDevelopMode('eth_requestAccounts', error);
              this.store.dispatch(WalletActions.connectWalletError());
            });

          try {
            await this.provider.provider.request?.({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: this.appConfig.chainIdHexBinance }],
            }).then(() => {
              this.loggingInDevelopMode('wallet_switchEthereumChain', 'ok');
              this.store.dispatch(
              WalletActions.connectWalletSuccess({
                walletType: WalletType.metamask,
              }
              ))
            });
          } catch (error: any) {
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
                }).then(() => {
                  this.loggingInDevelopMode('wallet_addEthereumChain', 'ok');
                  this.store.dispatch(
                  WalletActions.connectWalletSuccess({
                    walletType: WalletType.metamask,
                  })
                )});
              } catch (addError) {
                console.error('not this chain');
                return;
              }
            } else if (error.code === 4001) {
              //User reject network change
              this.loggingInDevelopMode('error.code 4001', error);
              return;
            }
          }
        } else {
          this.notificationDroneService.error(
            'NOTIFICATIONS.NO_WALLET',
            'NOTIFICATIONS.NO_WALLET_MESSAGE',
            'NOTIFICATIONS.CLOSE'
          );
        }
        break;
      }
      case WalletType.walletConnect: {
        let provider = new WalletConnectProvider({
          qrcode: true,
          bridge: 'https://polygon.bridge.walletconnect.org',
          chainId: this.appConfig.chainIdNumberBinance,
          rpc: {
            56: 'https://bsc-dataseed.binance.org/',
            97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          },
        });

        this.provider = new providers.Web3Provider(provider, 'any');
        this.createProviderHooks(provider);
        await (this.provider.provider as any)
          .enable()
          .then(() => {
            console.log('Done');
          });
      }
    }
  }

  public disconnectWallet(): void {
    if (this.provider) {
      this.provider?.removeAllListeners();
      this.removeMetamaskProviderHooks(this.provider);
      this.provider = undefined;
      this.store.dispatch(WalletActions.disconnectWallet());
    }
  }

  public postSignWalletBeforeBuy(
    usdcTokenAmount: number,
    wallet: string
  ): Observable<SignedWalletWithAmount> {
    return this.httpClient.post<SignedWalletWithAmount>(SALE_TOKEN, {
      wallet,
      usdcTokenAmount,
    });
  }

  public async signWalletTransaction(
    signedWalletWithAmount: SignedWalletWithAmount
  ): Promise<void> {
    if (this.provider) {
      try {
        const usdcContract = UsdcTokenContractFactory.connect(
          this.provider?.getSigner(),
          this.appConfig.usdcContractAddress,
          this.appConfig.adriaVestingContractAddress
        );
        const adriaVesting = AdriaVestingContractFactory.connect(
          this.provider.getSigner(),
          this.appConfig.adriaVestingContractAddress
        );
        const sig = ethers.utils.splitSignature(
          signedWalletWithAmount.signature
        );

        usdcContract
          .approve(signedWalletWithAmount.usdcTokenAmount)
          .then((result) => {
            if (result)
              adriaVesting
                .buy(
                  signedWalletWithAmount.usdcTokenAmount,
                  signedWalletWithAmount.maxUsdcTokenAmount,
                  signedWalletWithAmount.stage,
                  sig.v,
                  sig.r,
                  sig.s
                )
                .then(() => {
                  this.notificationDroneService.success(
                    'NOTIFICATIONS.TRANSACTION_SUCCESS',
                    'NOTIFICATIONS.THANK_YOU',
                    'NOTIFICATIONS.CLOSE'
                  );
                  this.store.dispatch(WalletActions.buyAdriaSuccess());
                })
                .catch(() => {
                  this.notificationDroneService.error(
                    'NOTIFICATIONS.TRANSACTION_ERROR',
                    '',
                    'NOTIFICATIONS.TRY_AGAIN'
                  );
                });
          })
          .catch((error) => console.log(error));
      } catch (err: any) {
        console.log(err);
      }
    }
  }

  public async getNumberOfUsdcPerStageByUser(account: string) {
    if (this.provider) {
      const adriaVesting = AdriaVestingContractFactory.connect(
        this.provider.getSigner(),
        this.appConfig.adriaVestingContractAddress
      );

      const result = await adriaVesting.investors(
        account,
        this.appConfig.stage
      );
      return result;
    }
    return '0.0';
  }
}
