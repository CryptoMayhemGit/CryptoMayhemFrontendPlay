import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  availableLangs: string[] = ['en', 'pl'];
  currentLang = 'en';

  constructor(
    private router: Router,
    private translocoService: TranslocoService,
    private readonly walletFacade: WalletFacade,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.availableLangs.includes(route.params['lang'])) {
      this.translocoService.setActiveLang(route.params['lang']);

      if (this.currentLang !== route.params['lang']) {
        this.walletFacade.setLanguage(route.params['lang']);
        this.currentLang = route.params['lang'] as 'en' | 'pl';
      }

      return true;
    } else {
      if (this.currentLang !== this.translocoService.getActiveLang()) {
        this.walletFacade.setLanguage(this.translocoService.getActiveLang());
        this.currentLang = this.translocoService.getActiveLang();
      }
      this.router.navigate([
        this.translocoService.getActiveLang(),
        route.params['lang'],
      ]);
    }

    return false;
  }
}
