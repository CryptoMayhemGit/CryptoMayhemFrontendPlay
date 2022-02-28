import { Component, OnDestroy, OnInit } from '@angular/core';

import { first } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { WalletService } from '../../shared/services/wallet.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { SubscriptionRegister } from '../../shared/classes/subscription-register.class';

import { WalletType } from '../../shared/models/wallet/wallet-type.model';

import { RegisterRequest } from '../../shared/models/auth/register/register-request.model';
import { LoginRequest } from '../../shared/models/auth/login/login-request.model';

import { generateRegisterMessageDeprecated, generateLoginMessageDeprecated } from '../../shared/util/auth.util';

import { 
  CONNECTION_FAILED,
  CONNECTION_SUCCESS,
  DISCONNECTION_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_REQUIRED,
  REGISTRATION_SUCCESS
} from 'src/app/shared/config/notification/navbar.config';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private walletType = WalletType.Metamask;

  private walletSubscriptionRegister = new SubscriptionRegister();
  private authSubscriptionRegister = new SubscriptionRegister();

  processing = false;

  connected = false;
  registered = true;
  authenticated = false;

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

  private wrap(process: () => any) {
    try {
      this.processing = true;
      process();
    } finally {
      this.processing = false;
    }
  }

  connect(): void {
    this.wrap(() =>
      this.walletService
        .connect(this.walletType)
        .pipe(first())
        .subscribe(success => {

          if (!success) {
            this.notificationService.error(CONNECTION_FAILED);
            return;
          }

          this.notificationService.success(CONNECTION_SUCCESS);

          this.walletSubscriptionRegister.add(
            this.walletService.connection$.subscribe(connection => 
              this.connected = connection
            )
          );
      

          this.walletSubscriptionRegister.add(
            this.walletService.chainId$.subscribe(chainId => 
              this.chainId = chainId
            )
          );
      
          this.walletSubscriptionRegister.add(
            this.walletService.account$.subscribe(account => 
              this.account = account
            )
          );

        })
    );
  }

  disconnect(): void {
    this.wrap(() =>
      this.walletService
        .disconnect()
        .pipe(first())
        .subscribe(success => {

          if (success) {
            this.walletSubscriptionRegister.clear();
            this.notificationService.success(DISCONNECTION_SUCCESS);
          }
          
        })
    );
  }

  register(): void {
    this.wrap(() => {

      const registerMessage = generateRegisterMessageDeprecated();

      this.walletService
        .signMessage(`${registerMessage.message} ${registerMessage.nonce}`)
        .pipe(first())
        .subscribe(signedRegisterMessage => {

          const registerRequest: RegisterRequest = {
            wallet: this.walletService.getAccount(),
            signedMessage: signedRegisterMessage,
            messageToSign: registerMessage
          };

          this.authService
            .register(registerRequest)
            .pipe(first())
            .subscribe(success => {

              if (success) {
                this.registered = true;
                this.notificationService.success(REGISTRATION_SUCCESS);
              } else {
                this.notificationService.error(REGISTRATION_FAILED);
              }

            });

        });

    });
  }

  login(): void {
    this.wrap(() => {

      const loginMessage = generateLoginMessageDeprecated();

      this.walletService
        .signMessage(`${loginMessage.message} ${loginMessage.nonce}`)
        .pipe(first())
        .subscribe(signedLoginMessage => {

          const loginRequest: LoginRequest = {
            wallet: this.walletService.getAccount(),
            signedMessage: signedLoginMessage,
            messageToSign: loginMessage
          };

          this.authService
            .login(loginRequest)
            .pipe(first())
            .subscribe(success => {

              if (!success) {
                this.registered = false;
                this.notificationService.info(REGISTRATION_REQUIRED);
                return;
              }

              this.notificationService.success(LOGIN_SUCCESS);
    
              this.authSubscriptionRegister.add(
                this.authService.authentication$.subscribe(authentication => 
                  this.authenticated = authentication
                )
              );

            });

        });

    });
  }

  logout(): void {
    this.wrap(() =>
    this.authService
      .logout()
      .pipe(first())
      .subscribe(success => {

        if (success) {
          this.authSubscriptionRegister.clear();
          this.notificationService.success(LOGOUT_SUCCESS);
        }

      })
    );
  }

}
