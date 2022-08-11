import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { getBrowserLang } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.params['lang'] === 'en' || route.params['lang'] === 'pl') {
      return true;
    } else {
      console.log('guard');
      this.router.navigate([getBrowserLang(), 'presale']);
    }

    return false;
  }
}
