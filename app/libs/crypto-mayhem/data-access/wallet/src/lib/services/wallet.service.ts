import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { providers, ethers } from 'ethers';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import WalletConnectProvider from '@walletconnect/web3-provider';

interface SignedWalletWithAmount {
  signature: string;
  stage: number;
  usdcTokenAmount: number;
  maxUsdcTokenAmount: number;
}

interface SignedMessage {
  signature: string;
  data: string;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

export const LOGIN_GET_MESSAGE = gql`
  mutation LoginGetMessage($input: LoginGetMessageInput!) {
    loginGetMessage(input: $input) {
      message
    }
  }
`;

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
import { isMobile } from 'libs/utility/functions/src';
import { NotificationsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FetchResult } from '@apollo/client';

const ACCOUNTS_CHANGED = 'accountsChanged';
const CHAIN_CHANGED = 'chainChanged';
const DISCONNECT = 'disconnect';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private provider: Web3Provider | undefined = undefined;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly apollo: Apollo,
    private store: Store,
    private readonly notificationsService: NotificationsService,
    private router: Router,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {}

  private loggingInDevelopMode(where: string, message: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !this.appConfig.production && console.log(where, message);
  }

  //Metamask handlers
  handleAccountsChangedMetamask = (accounts: string[]): void => {
    if (!Array.isArray(accounts)) {
      this.store.dispatch(
        WalletActions.accountsChanged({
          account: accounts[0],
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
    if (chainIdHex !== this.appConfig.chainIdHexBinance) {
      this.notificationsService.error(
        'NOTIFICATIONS.BAD_NETWORK',
        'NOTIFICATIONS.BAD_NETWORK_MESSAGE',
      );
      this.disconnectWallet();
    } else {
      this.store.dispatch(WalletActions.chainChanged({ chainId: chainIdHex }));
      this.notificationsService.hide();
    }
  };

  handleDisconnectMetamask = (reason: ProviderRpcError): void => {
    if (reason.code !== 1013) {
      //MetaMask: Disconnected from chain. Attempting to connect.
      this.disconnectWallet();
    }
  };

  private createProviderHooks(provider: any): void {
    provider.on(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
    provider.on(CHAIN_CHANGED, this.handleChainChangedMetamask);
    provider.on(DISCONNECT, this.handleDisconnectMetamask);
  }

  private removeMetamaskProviderHooks(): void {
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

  public async connectWallet(walletType: WalletType): Promise<void> {
    switch (walletType) {
      case WalletType.metamask: {
        if (typeof window.ethereum === 'undefined' && isMobile()) {
          window.location.href = this.appConfig.metamaskDeepLink;
        } else if (typeof window.ethereum !== 'undefined') {
          this.provider = new providers.Web3Provider(window.ethereum, 'any');
          this.createProviderHooks(this.provider.provider);
          this.store.dispatch(WalletActions.connectWallet());
          await this.provider
            .send('eth_requestAccounts', [])
            .then((accounts: string[]) => {
              this.store.dispatch(
                WalletActions.accountsChanged({
                  account: accounts[0],
                })
              );
            })
            .catch((error: any) => {
              this.loggingInDevelopMode('eth_requestAccounts', error);
              this.store.dispatch(WalletActions.connectWalletError());
            });

          try {
            await this.provider.provider
              .request?.({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: this.appConfig.chainIdHexBinance }],
              })
              .then(() => {
                this.loggingInDevelopMode('wallet_switchEthereumChain', 'ok');
                this.store.dispatch(
                  WalletActions.connectWalletSuccess({
                    walletType: WalletType.metamask,
                  })
                );
              });
          } catch (error: any) {
            if (error.code === 4902) {
              try {
                await this.provider.provider
                  .request?.({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: this.appConfig.chainIdHexBinance,
                        rpcUrl: this.appConfig.rpcUrlBinance,
                      },
                    ],
                  })
                  .then(() => {
                    this.loggingInDevelopMode('wallet_addEthereumChain', 'ok');
                    this.store.dispatch(
                      WalletActions.connectWalletSuccess({
                        walletType: WalletType.metamask,
                      })
                    );
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
        } else {
          this.notificationsService.error(
            'NOTIFICATIONS.NO_WALLET',
            'NOTIFICATIONS.NO_WALLET_MESSAGE',
            {url: 'NOTIFICATIONS.NO_WALLET_VIDEO.URL', text: 'NOTIFICATIONS.NO_WALLET_VIDEO.MESSAGE'}
          );
        }
        break;
      }
      case WalletType.walletConnect: {
        const provider = new WalletConnectProvider({
          qrcode: true,
          bridge: 'https://polygon.bridge.walletconnect.org',
          chainId: this.appConfig.chainIdNumberBinance,
          rpc: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            56: 'https://bsc-dataseed.binance.org/',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          },
        });

        this.provider = new providers.Web3Provider(provider, 'any');
        this.createProviderHooks(provider);
        await (this.provider.provider as any).enable().then(() => {
          console.log('Done');
        });
      }
    }
  }

  public disconnectWallet(): void {
    if (this.provider) {
      this.provider?.removeAllListeners();
      this.removeMetamaskProviderHooks();
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

  public async getCyberConnectLoginMessage(address: string): Promise<string> {
    const result = await this.apollo.mutate({
      mutation: LOGIN_GET_MESSAGE,
      variables: {
        input: {
          domain: this.appConfig.domain,
          address: address
        }
      }
    }).toPromise();

    const fetchResult = result as FetchResult<{ loginGetMessage: { message: string } }>;

    return fetchResult?.data?.loginGetMessage?.message || '';
  }

  public async signMessageForLauncher(wallet: string, nonce: number, handle?: string): Promise<void>{
    if(this.provider) {
      try{
        let message = '';
        let data: any = '';

        if (handle !== '' && handle !== undefined && handle !== 'undefined') {
          try {
            message  = await this.getCyberConnectLoginMessage(wallet);
          }
          catch(error) {
            console.error(error);
            this.notificationsService.error(
              'ccProfile is not available. Try different provider.',
            );
            return;
          }
        }

        if (message) {
          data = {wallet, nonce, message, handle};
          const signer = await this.provider.getSigner();
          signer.signMessage(message)
          .then((signature) => {
            const dataJson: SignedMessage = {
              data: JSON.stringify(data),
              signature
            }

            const baseData = window.btoa(JSON.stringify(dataJson));
            this.router.navigate(['']);
            window.open(`MayhemLauncher://?data=${baseData}`);

          },
          (error) => {
            console.error(error);
            this.notificationsService.error(
              'NOTIFICATIONS.ERROR_OCCURRED',
            );
          });
        } else {
          data = {wallet, nonce};
          const signer = await this.provider.getSigner();
          signer.signMessage(JSON.stringify(data))
          .then((signature) => {
            const dataJson: SignedMessage = {
              data: JSON.stringify(data),
              signature
            }
  
            const baseData = window.btoa(JSON.stringify(dataJson));
            this.router.navigate(['']);
            window.open(`MayhemLauncher://?data=${baseData}`);
  
          },
          (error) => {
            console.error(error);
            this.notificationsService.error(
              'NOTIFICATIONS.ERROR_OCCURRED',
            );
          });
        }

      }
      catch(error){
        console.error(error);
        this.notificationsService.error(
          'NOTIFICATIONS.ERROR_OCCURRED',
        );
      }
    }
  }

  public async signMessage(message: string[]): Promise<string[]> {
    if (this.provider) {
      const data = message.join(' ');

      try {
        const signer = await this.provider.getSigner();
        const signature = await signer.signMessage(data);
        return [...message, signature];
      }
      catch (error) {
        console.error('signMessage: ',error);
        this.notificationsService.error(
          'NOTIFICATIONS.ERROR_OCCURRED',
        );
      }
    }

    return new Promise(() => ['']);
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

        this.store.dispatch(WalletActions.transaction());
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
                  this.notificationsService.success(
                    'NOTIFICATIONS.TRANSACTION_SUCCESS',
                    'NOTIFICATIONS.THANK_YOU',
                  );
                  this.store.dispatch(WalletActions.buyAdriaSuccess());
                })
                .catch((error) => {
                  this.store.dispatch(WalletActions.transactionSuccess());
                  this.notificationsService.error(
                    'NOTIFICATIONS.TRANSACTION_ERROR',
                  );
                });
          })
          .catch((error) => {
            this.store.dispatch(WalletActions.transactionSuccess());
          });
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

  public async getStageDetails() {
    if (this.provider) {
      const adriaVesting = AdriaVestingContractFactory.connect(
        this.provider.getSigner(),
        this.appConfig.adriaVestingContractAddress
      );

      const result = await adriaVesting.stages(this.appConfig.stage);
      return result;
    }
    return false;
  }

  public async getBalance() {
    if (this.provider) {
      const address = await this.provider.getSigner().getAddress();
      const bnb = await this.provider.getBalance(address);
      return +ethers.utils.formatEther(bnb);
    }

    return 0;
  }
}
