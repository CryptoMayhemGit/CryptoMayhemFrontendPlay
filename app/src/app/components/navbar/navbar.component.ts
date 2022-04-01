import { Component, OnDestroy, OnInit } from '@angular/core';

import { first, Observable, Observer } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { WalletService } from '../../shared/services/wallet.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { SubscriptionRegister } from '../../shared/classes/subscription-register.class';

import { WalletType } from '../../shared/models/wallet/wallet-type.model';

import { RegisterRequest } from '../../shared/models/auth/register/register-request.model';
import { LoginRequest } from '../../shared/models/auth/login/login-request.model';

import { generateRegisterMessageDeprecated, generateLoginMessageDeprecated } from '../../shared/util/auth.util';

import { 
  CONNECT_SUCCESS,
  CONNECT_PROCESS,
  CONNECT_ACCEPT,
  DISCONNECT_SUCCESS,
  DISCONNECT_PROCESS,
  REGISTER_SUCCESS,
  REGISTER_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_PROCESS,
  LOGOUT_SUCCESS,
  LOGOUT_PROCESS,
  SWITCH_CHAIN_SUCCESS,
  SWITCH_CHAIN_PROCESS,
  SWITCH_CHAIN_ADD,
  ADD_CHAIN_SUCCESS,
  ADD_CHAIN_PROCESS
} from 'src/app/shared/config/notification/navbar.config';

import { 
  SUPPORTED_CHAIN_ID, 
  UNRECOGNIZED_CHAIN_ERROR_CODE, 
  PENDING_REQUEST_CODE, 
  DEFAULT_ASSET
} from 'src/app/shared/config/wallet/wallet.config';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private walletType = WalletType.Metamask;

  private walletSubscriptionRegister = new SubscriptionRegister();
  private authSubscriptionRegister = new SubscriptionRegister();

  DEFAULT_ASSET = DEFAULT_ASSET

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
    private authService: AuthService
  ) { }

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
      .pipe(first())
      .subscribe(() => this.stopProcessing(id));
  }

  connect(): void {
    this.wrap(CONNECT_PROCESS, () =>
      new Observable(observer => 
        this.walletService
          .connect(this.walletType)
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.notificationService.success(CONNECT_SUCCESS);

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

                  this.supportedChain = chainId === SUPPORTED_CHAIN_ID;
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

            },

            error: (error) => {

              if (error.name === 'WalletError' && error.code === PENDING_REQUEST_CODE) {
                this.notificationService.info(CONNECT_ACCEPT);
              }

              this.completeWithError(error, observer);

            }

          })
      )
    );
  }

  disconnect(): void {
    this.wrap(DISCONNECT_PROCESS, () =>
      new Observable(observer => 
        this.walletService
          .disconnect()
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.walletSubscriptionRegister.clear();
              this.notificationService.success(DISCONNECT_SUCCESS);

            },

            error: (error) => this.completeWithError(error, observer)
              
          })
      )
    );
  }

  register(): void {
    this.wrap(REGISTER_PROCESS, () => 
      new Observable(observer => {

        const registerMessage = generateRegisterMessageDeprecated();

        this.walletService
          .signMessage(`${registerMessage.message} ${registerMessage.nonce}`)
          .pipe(first())
          .subscribe({

            next: (signedRegisterMessage) => {

              const registerRequest: RegisterRequest = {
                wallet: this.walletService.getAccount(),
                signedMessage: signedRegisterMessage,
                messageToSign: registerMessage
              };

              this.authService
                .register(registerRequest)
                .pipe(first())
                .subscribe({

                  next: () => {

                    observer.next();

                    this.registered = true;
                    this.notificationService.success(REGISTER_SUCCESS);

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
    this.wrap(LOGIN_PROCESS, () =>
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

                    this.notificationService.success(LOGIN_SUCCESS);
          
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
    this.wrap(LOGOUT_PROCESS, () =>
      new Observable(observer => 
        this.authService
          .logout()
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.authSubscriptionRegister.clear();
              this.notificationService.success(LOGOUT_SUCCESS);

            }

          })
      )
    );
  }

  switchChain(): void {
    this.wrap(SWITCH_CHAIN_PROCESS, () =>
      new Observable(observer => 
        this.walletService
          .switchChain(SUPPORTED_CHAIN_ID)
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.notificationService.success(SWITCH_CHAIN_SUCCESS);

            },

            error: (error) => {

              if (error.name === 'WalletError' && error.code === UNRECOGNIZED_CHAIN_ERROR_CODE) {
                this.notificationService.info(SWITCH_CHAIN_ADD);
                this.unrecognizedChain = true;
              }
              
              this.completeWithError(error, observer);
            
            }

          })
      )
    );
  }

  addChain(): void {
    this.wrap(ADD_CHAIN_PROCESS, () =>
      new Observable(observer => 
        this.walletService
          .addChain(SUPPORTED_CHAIN_ID)
          .pipe(first())
          .subscribe({

            next: () => {

              observer.next();

              this.unrecognizedChain = false;
              this.notificationService.success(ADD_CHAIN_SUCCESS);

            },

            error: (error) => this.completeWithError(error, observer)

          })
      )
    );
  }

  addAsset(): void {
      this.walletService.addAsset(DEFAULT_ASSET);
  }

}
