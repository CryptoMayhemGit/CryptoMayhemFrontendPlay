import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { providers, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { select, State, Store } from '@ngrx/store';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';

import * as WalletSelectors from '../state/wallet.selectors';

interface SignedWalletWithAmount {
  signature: string;
  stage: number;
  usdcTokenAmount: number;
  maxUsdcTokenAmount: number;
}

import * as WalletActions from '../state/wallet.actions';
import { Observable, of } from 'rxjs';
import { SALE_TOKEN } from './wallet.endpoints';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';
import {
  AdriaTokenContractFactory,
  AdriaVestingContractFactory,
  UsdcTokenContractFactory,
} from '@crypto-mayhem-frontend/crypto-mayhem/data-access/contract-model';
import { NotificationDroneService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { WalletEffects } from '../state/wallet.effects';
import { WalletState } from '../state/wallet.reducer';
import { FormatTypes } from 'ethers/lib/utils';

const ACCOUNTS_CHANGED = 'accountsChanged';
const CHAIN_CHANGED = 'chainChanged';
const DISCONNECT = 'disconnect';
const CONNECT = 'connect';
const UPDATE_SESSION = 'session_update';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private provider: Web3Provider | undefined = undefined;
  private connector: WalletConnect | undefined = undefined;
  private walletType: WalletType = WalletType.none;

  constructor(
    private readonly httpClient: HttpClient,
    private store: Store,
    private readonly notificationDroneService: NotificationDroneService,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {
    this.store
      .pipe(select(WalletSelectors.getWalletType))
      .subscribe((walletType: WalletType) => (this.walletType = walletType));
  }

  private loggingInDevelopMode(where: string, message: any): void {
    !this.appConfig.production && console.log(where, message);
  }

  //Metamask handlers
  handleAccountsChangedMetamask = (accounts: string[]): void => {
    if (!Array.isArray(accounts)) {
      this.store.dispatch(
        WalletActions.accountsChanged({
          account: accounts[0],
          chainId: undefined,
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
          account: accounts[0],
          chainId: undefined,
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

    this.store.dispatch(WalletActions.chainChanged({ chainId: chainIdHex }));

    chainIdHex !== this.appConfig.chainIdHexBinance
      ? this.notificationDroneService.error(
          'NOTIFICATIONS.BAD_NETWORK',
          'NOTIFICATIONS.BAD_NETWORK_MESSAGE',
          'NOTIFICATIONS.CLOSE'
        )
      : this.notificationDroneService.hide();
  };

  handleDisconnectWalletConnect = (code: number, reason: string): void => {
    console.log('disconnect', code, reason);

    this.store.dispatch(WalletActions.disconnectWallet());
  };

  private createProviderHooks(provider: any): void {
    provider.on(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
    provider.on(CHAIN_CHANGED, this.handleChainChangedMetamask);
    provider.on(DISCONNECT, this.handleDisconnectWalletConnect);
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
  }

  private setChainId() {
    if (this.provider?._network.chainId)
      this.store.dispatch(
        WalletActions.chainChanged({
          chainId: this.provider?._network.chainId.toString(),
        })
      );
  }

  public async connectWallet(walletType: WalletType): Promise<void> {
    switch (walletType) {
      case WalletType.metamask: {
        if (typeof window.ethereum !== 'undefined') {
          this.provider = new providers.Web3Provider(window.ethereum, 'any');
          this.createProviderHooks(this.provider.provider);
          this.store.dispatch(WalletActions.connectWallet());
          await this.provider
            .send('eth_requestAccounts', [])
            .then((accounts: string[]) => {
              this.store.dispatch(
                WalletActions.accountsChanged({
                  account: accounts[0],
                  chainId: undefined,
                })
              );

              this.store.dispatch(
                WalletActions.connectWalletSuccess({
                  walletType: WalletType.metamask,
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
            });
          } catch (error: any) {
            console.log('error', error);
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
                });
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
          this.setChainId();
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
          chainId: 56,
          rpc: {
            56: 'https://bsc-dataseed.binance.org/',
            97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          },
        });

        this.createProviderHooks(provider);
        await provider.enable().then(() => console.log('test'));
      }
    }
  }

  public disconnectWallet(): void {
    if (this.walletType === WalletType.metamask) {
      this.provider?.removeAllListeners();
      this.removeMetamaskProviderHooks(this.provider);
      this.provider = undefined;
      this.store.dispatch(WalletActions.disconnectWallet());
    } else if (this.walletType === WalletType.walletConnect) {
      //TODO: Disconnect wallet connect
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
          this.provider?.getSigner()
        );
        const adriaVesting = AdriaVestingContractFactory.connect(
          this.provider.getSigner()
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
}
