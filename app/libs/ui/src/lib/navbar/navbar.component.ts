import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionRegister } from '@crypto-mayhem-frontend/crypto-mayhem/classes';
import { AppConfig, APP_CONFIG, PENDING_REQUEST_CODE, UNRECOGNIZED_CHAIN_ERROR_CODE } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { AuthService, NotificationService, WalletService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/cm-services';
import { LoginRequest, RegisterRequest, WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';
import { TranslocoService } from '@ngneat/transloco';

import { first, map, Observable, Observer } from 'rxjs';
import { generateRegisterMessageDeprecated, generateLoginMessageDeprecated } from '../../../../utils/src/lib/auth.util';


@Component({
  selector: 'cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private walletType = WalletType.Metamask;

  private walletSubscriptionRegister = new SubscriptionRegister();
  private authSubscriptionRegister = new SubscriptionRegister();

  DEFAULT_ASSET!: string;

  processing = false;

  connected = false;
  registered = true;
  authenticated = false;

  supportedChain = false;
  unrecognizedChain = false;

  chainId = '';
  account = '';

  constructor(
    private notificationService: NotificationService,
    private walletService: WalletService,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private translocoService: TranslocoService
  ) {
    this.DEFAULT_ASSET = config.defaultAsset;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.walletSubscriptionRegister.clear();
    this.authSubscriptionRegister.clear();
  }

  private startProcessing(message: string): number {
    this.processing = true;
    return this.notificationService.process(message);
  }

  private stopProcessing(id: number): void {
    this.processing = false;
    this.notificationService.close(id);
  }

  private completeWithError(error: Error, observer: Observer<void>): void {
    this.notificationService.error(error.message);
    observer.next();
  }

  private wrap(message: string, process: () => Observable<any>) {
    const id = this.startProcessing(message);
    process()
      .pipe()
      .subscribe(() => this.stopProcessing(id));
  }

  /*connect(): void {
    this.walletService.connect(this.walletType).subscribe({
      next: (data) => { console.log(data) },
      error: (error) => {}
    })
  }*/

  connect(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.CONNECT_PROCESS"), () =>
      new Observable(observer => {
        console.log(observer);
        this.walletService
          .connect(this.walletType)
          .pipe(
            first(),
            map(
              () => {
                observer.next();

                this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.CONNECT_SUCCESS"));
  
                this.walletSubscriptionRegister.add(
                  this.walletService.connection$.subscribe(connection => {
  
                    this.connected = connection;
  
                    if (this.authenticated && !connection) {
                      this.logout();
                    }
  
                  })
                );
  
                this.walletSubscriptionRegister.add(
                  this.walletService.chainId$.subscribe(chainId => {
  
                    this.supportedChain = chainId === this.config.rpcChainId;
                    this.chainId = chainId;
  
                    if (this.authenticated && !this.supportedChain) {
                      this.logout();
                    }
  
                  })
                );
  
                this.walletSubscriptionRegister.add(
                  this.walletService.account$.subscribe(account => {
  
                    this.account = account;
  
                    if (this.authenticated) {
                      const authenticatedAccount = this.authService.getAccount();
  
                      if (account != authenticatedAccount) {
                        this.logout();
                      }
                    }
  
                  })
                );
              }
            )
          )
          .subscribe(
            {
              error: (error) => {
  
                if (error.name === 'WalletError' && error.code === PENDING_REQUEST_CODE) {
                  this.notificationService.info(this.translocoService.translate("NOTIFICATION.NAVBAR.CONNECT_ACCEPT"));
                }
  
                this.completeWithError(error, observer);
  
              }
            }
          )
      }
      )
    );
  }

  disconnect(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.DISCONNECT_PROCESS"), () =>
      new Observable(observer =>
        this.walletService
          .disconnect()
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.walletSubscriptionRegister.clear();
              this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.DISCONNECT_SUCCESS"));

            },

            error: (error) => this.completeWithError(error, observer)

          })
      )
    );
  }

  register(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.REGISTER_PROCESS"), () =>
      new Observable(observer => {

        const registerMessage = generateRegisterMessageDeprecated();

        this.walletService
          .signMessage(`${registerMessage.message} ${registerMessage.nonce}`)
          .pipe(first())
          .subscribe({

            next: (signedRegisterMessage) => {

              const registerRequest: RegisterRequest = {
                activationNotificationToken: signedRegisterMessage,
              };

              this.authService
                .register(registerRequest)
                .pipe(first())
                .subscribe({

                  next: () => {

                    observer.next();

                    this.registered = true;
                    this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.REGISTER_SUCCESS"));

                  },

                  error: (error) => this.completeWithError(error, observer)

                });

            },

            error: (error) => this.completeWithError(error, observer)

          });

      })
    );
  }

  login(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.LOGIN_PROCESS"), () =>
      new Observable(observer => {

        const loginMessage = generateLoginMessageDeprecated();

        this.walletService
          .signMessage(`${loginMessage.message} ${loginMessage.nonce}`)
          .pipe(first())
          .subscribe({

            next: (signedLoginMessage) => {

              const loginRequest: LoginRequest = {
                wallet: this.walletService.getAccount(),
                signedMessage: signedLoginMessage,
                messageToSign: loginMessage
              };

              this.authService
                .login(loginRequest)
                .pipe(first())
                .subscribe({

                  next: () => {

                    observer.next();

                    this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.LOGIN_SUCCESS"));

                    this.authSubscriptionRegister.add(
                      this.authService.authentication$.subscribe(authentication =>
                        this.authenticated = authentication
                      )
                    );

                  },

                  error: (error) => {
                    this.registered = false;
                    this.completeWithError(error, observer);
                  }

                });

            },

            error: (error) => this.completeWithError(error, observer)

          });

      })
    );
  }

  logout(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.LOGOUT_PROCESS"), () =>
      new Observable(observer =>
        this.authService
          .logout()
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.authSubscriptionRegister.clear();
              this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.LOGOUT_SUCCESS"));

            }

          })
      )
    );
  }

  switchChain(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.SWITCH_CHAIN_PROCESS"), () =>
      new Observable(observer =>
        this.walletService
          .switchChain(this.config.rpcChainId)
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.SWITCH_CHAIN_SUCCESS"));

            },

            error: (error) => {

              if (error.name === 'WalletError' && error.code === UNRECOGNIZED_CHAIN_ERROR_CODE) {
                this.notificationService.info(this.translocoService.translate("NOTIFICATION.NAVBAR.SWITCH_CHAIN_ADD"));
                this.unrecognizedChain = true;
              }

              this.completeWithError(error, observer);

            }

          })
      )
    );
  }

  addChain(): void {
    this.wrap(this.translocoService.translate("NOTIFICATION.NAVBAR.ADD_CHAIN_PROCESS"), () =>
      new Observable(observer =>
        this.walletService
          .addChain(this.config.rpcChainId)
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.unrecognizedChain = false;
              this.notificationService.success(this.translocoService.translate("NOTIFICATION.NAVBAR.ADD_CHAIN_SUCCESS"));

            },

            error: (error) => this.completeWithError(error, observer)

          })
      )
    );
  }

  addAsset(): void {
    this.walletService.addAsset(this.DEFAULT_ASSET);
  }

}
