import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/cm-services';
import { Language } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LangSwitchComponent implements OnInit, OnDestroy {
  languages!: Array<Language>;
  activeLanguage!: Language;
  isVisible = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private translocoService: TranslocoService,
    private languageService: LanguageService
  ) {
    const subs = translocoService.langChanges$.subscribe({
      next: (_) => {
        this.setActiveLanguage();
      },
    });

    this.subscription.add(subs);
  }

  ngOnInit(): void {
    this.setActiveLanguage();
    this.languages = this.languageService.getAll();
  }

  setLang(languageSymbol: string): void {
    this.translocoService.setActiveLang(languageSymbol);
  }

  setActiveLanguage(): void {
    this.activeLanguage = this.languageService.getLanguage(
      this.translocoService.getActiveLang()
    ) as Language;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  togglePC(): void {
    if (window.innerWidth >= 1240) {
      this.isVisible = !this.isVisible;
    }
  }
  toggleMobile(): void {
    if (window.innerWidth < 1240) {
      this.isVisible = !this.isVisible;
    }
  }
}
