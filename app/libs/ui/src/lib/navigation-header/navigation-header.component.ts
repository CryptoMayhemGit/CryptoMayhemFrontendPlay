import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/cm-services';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import {
  isMobile,
  isSmallScreen,
  isTablet,
} from '@crypto-mayhem-frontend/utility/functions';
import { News } from 'libs/crypto-mayhem/data-access/cm-services/src/lib/news/news.model';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'ui-nav',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
    trigger('slideUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
          height: 0,
        }),
        animate(
          '400ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)', height: '100%' })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)',
          height: '100%',
        }),
        animate(
          '400ms ease-out',
          style({ opacity: 0, transform: 'translateY(-100%)', height: 0 })
        ),
      ]),
    ]),
  ],
})
export class NavigationHeaderComponent implements OnInit {
  mobileVisible = false;
  gamesVisible = false;
  tdsVisible = false;
  gsVisible = false;
  isMobile = false;
  isVisible = false;
  activePage!: string;
  news!: News;

  spinner: Observable<boolean> = of(false);
  connected$: Observable<boolean> = of(false);
  bnbBalanceOf$: Observable<number> = of(0);
  walletAddress$: Observable<string> = of('');

  constructor(
    public readonly walletFacade: WalletFacade,
    private router: Router,
    private renderer: Renderer2,
    public newsService: NewsService
  ) {
    if (!isTablet()) {
      this.renderer.listen('window', 'mouseover', (e: Event) => {
        const target = e.target as HTMLElement;

        if (!target.closest('.games-menu')) {
          this.gamesVisible = false;
        }
      });
    }
  }
  ngOnInit(): void {
    this.spinner = this.walletFacade.spinner$;
    this.connected$ = this.walletFacade.connected$;
    this.bnbBalanceOf$ = this.walletFacade.bnbBalanceOf$;
    this.walletAddress$ = this.walletFacade.account$;
    this.activePage = this.getActivePage();
    this.getNews();
  }

  getActivePage(): string {
    return window.location.pathname.split('/')[2];
  }

  showGames(): void {
    this.gamesVisible = !this.gamesVisible;

    if (isSmallScreen()) {
      this.tdsVisible = true;
      this.gsVisible = true;
    } else {
      this.tdsVisible = false;
      this.gsVisible = false;
    }
  }

  getNews(): void {
    this.newsService
      .getMediumFeed()
      .pipe(take(1))
      .subscribe((news) => {
        this.news = news;
      });
  }

  connect(): void {
    this.walletFacade.showWallets();
  }

  disconnect(): void {
    this.walletFacade.disconnectWalletAccount();
    this.isVisible = false;
  }

  getBalance(): void {
    this.walletFacade.getBalance();
  }

  isSmallScreen(): boolean {
    return isSmallScreen();
  }

  isTablet(): boolean {
    return isTablet();
  }

  isMobileDevice(): boolean {
    return isMobile();
  }

  goToMyAccount() {
    this.router.navigate(['account']);
  }

  goToGame(game: string) {
    this.mobileVisible = false;
    this.activePage = '';
    this.router.navigate([game]);
  }
}
