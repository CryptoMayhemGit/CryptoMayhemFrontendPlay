import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  availableLangs: string[] = ['en', 'pl'];

  constructor(
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.availableLangs.includes(route.params['lang'])) {
      this.translocoService.setActiveLang(route.params['lang']);
      return true;
    } else {
      this.router.navigate([
        this.translocoService.getActiveLang(),
        route.params['lang'],
      ]);
    }

    return false;
  }
}
