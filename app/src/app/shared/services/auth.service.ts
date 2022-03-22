import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { RegisterRequest } from '../models/auth/register/register-request.model';
import { RegisterResponse } from '../models/auth/register/register-response.model';

import { LoginRequest } from '../models/auth/login/login-request.model';
import { LoginResponse } from '../models/auth/login/login-response.model';

import { TOKEN_KEY } from '../config/auth.config';

import { environment } from '../../../environments/environment';

import { 
  REGISTER_ERROR ,
  LOGIN_ERROR
} from '../config/notification/auth.config';


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

  constructor(private http: HttpClient) { }

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

  register(registerRequest: RegisterRequest): Observable<boolean> {
    return new Observable(observer => {

      if (environment.debug) {
        console.log('Register request: ', registerRequest);
      }

      this.http.post<RegisterResponse>(`${environment.baseUrl}api/Account/Register`, registerRequest)
        .subscribe({

            next: (response) => {

              observer.next(response.success);

              if (environment.debug) {
                console.log('Register response: ', response);
              }

            },

            error: () => observer.error(new Error(REGISTER_ERROR))

        });

    });
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return new Observable(observer => {

      if (environment.debug) {
        console.log('Login request: ', loginRequest);
      }

      this.http.post<LoginResponse>(`${environment.baseUrl}api/Account/Login`, loginRequest)
        .subscribe({

            next: (response) => {

              sessionStorage.setItem(TOKEN_KEY, response.token);
              this.updateAccount(loginRequest.wallet);
              this.updateAuthentication(true);
              observer.next(true);

              if (environment.debug) {
                console.log('Login response: ', response);
              }

            },

            error: () => observer.error(new Error(LOGIN_ERROR))

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
