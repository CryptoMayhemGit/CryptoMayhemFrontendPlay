import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { RegisterRequest } from '../models/auth/register/register-request.model';
import { RegisterResponse } from '../models/auth/register/register-response.model';

import { LoginRequest } from '../models/auth/login/login-request.model';
import { LoginResponse } from '../models/auth/login/login-response.model';

import { TOKEN_KEY } from '../config/auth.config';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationSubject = new BehaviorSubject<boolean>(false);
  private userIdSubject = new BehaviorSubject<number>(- 1);

  private authentication = false;
  private userId = - 1;

  authentication$ = this.authenticationSubject.asObservable();
  userId$ = this.authenticationSubject.asObservable();

  constructor(private http: HttpClient) { }

  private updateAuthentication(authentication: boolean): void {
    this.authentication = authentication;
    this.authenticationSubject.next(authentication);
  }

  private updateUserId(userId: number): void {
    this.userId = userId;
    this.userIdSubject.next(userId);
  }

  getAuthentication(): boolean {
    return this.authentication;
  }

  getUserId(): number {
    return this.userId;
  }

  register(registerRequest: RegisterRequest): Observable<boolean> {
    return new Observable(observer => {

      this.http.post<RegisterResponse>(`${environment.baseUrl}api/Account/Register`, registerRequest)
        .subscribe(response => {
          
          const success = response.success;

          if (success) {
            this.userId = response.userId;
          }

          observer.next(success);

        });

    });
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return new Observable(observer => {

      this.http.post<LoginResponse>(`${environment.baseUrl}api/Account/Login`, loginRequest)
        .subscribe({

            next: (response) => {
              sessionStorage.setItem(TOKEN_KEY, response.token);
              this.updateAuthentication(true);
              observer.next(true);
            },

            error: () => observer.next(false)

        });

    });
  }

  logout(): Observable<boolean> {
    this.updateAuthentication(false);
    this.updateUserId(- 1);
    sessionStorage.removeItem(TOKEN_KEY);
    return of(true);
  }

}
