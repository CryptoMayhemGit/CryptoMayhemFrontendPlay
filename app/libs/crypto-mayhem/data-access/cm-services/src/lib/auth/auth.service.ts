import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';
import { AppConfig, APP_CONFIG, TOKEN_KEY } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { TranslocoService } from '@ngneat/transloco';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationSubject = new BehaviorSubject<boolean>(false);
  private userIdSubject = new BehaviorSubject<number>(- 1);
  private accountSubject = new BehaviorSubject<string>('');

  private authentication = false;
  private userId = - 1;
  private account = '';

  authentication$ = this.authenticationSubject.asObservable();
  userId$ = this.authenticationSubject.asObservable();
  account$ = this.accountSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private translocoService: TranslocoService
  ) {}

  private updateAuthentication(authentication: boolean): void {
    this.authentication = authentication;
    this.authenticationSubject.next(authentication);
  }

  private updateUserId(userId: number): void {
    this.userId = userId;
    this.userIdSubject.next(userId);
  }

  private updateAccount(account: string): void {
    this.account = account;
    this.accountSubject.next(account);
  }

  getAuthentication(): boolean {
    return this.authentication;
  }

  getUserId(): number {
    return this.userId;
  }

  getAccount(): string {
    return this.account;
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
     return this.http.post<RegisterResponse>(`${this.config.baseUrl}api/Account/Register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return new Observable(observer => {

      if (this.config.debug) {
        console.log('Login request: ', loginRequest);
      }

      this.http.post<LoginResponse>(`${this.config.baseUrl}api/Account/Login`, loginRequest)
        .subscribe({

            next: (response) => {

              sessionStorage.setItem(TOKEN_KEY, response.token);
              this.updateAccount(loginRequest.wallet);
              this.updateAuthentication(true);
              observer.next(true);

              if (this.config.debug) {
                console.log('Login response: ', response);
              }

            },

            error: () => observer.error(new Error(this.translocoService.translate("NOTIFICATION.AUTH.LOGIN_ERROR")))

        });

    });
  }

  logout(): Observable<boolean> {
    this.updateAuthentication(false);
    this.updateAccount('');
    this.updateUserId(- 1);
    sessionStorage.removeItem(TOKEN_KEY);
    return of(true);
  }

}
