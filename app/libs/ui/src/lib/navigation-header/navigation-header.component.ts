import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  WalletType,
} from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { Observable, of } from 'rxjs';

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
  ],
})
export class NavigationHeaderComponent implements OnInit {
  mobileVisible = false;
  gamesVisible = false;
  tdsVisible = false;
  gsVisible = false;
  isMobile = false;

  spinner: Observable<boolean> = of(false);
  connected$: Observable<boolean> = of(false);

  constructor(public readonly walletFacade: WalletFacade) {}

  ngOnInit(): void {
    this.spinner = this.walletFacade.spinner$;
    this.connected$ = this.walletFacade.connected$;
  }

  isSmallerScreen(): boolean {
    return window.innerWidth <= 1240;
  }

  showGames(): void {
    if (this.isSmallerScreen()) {
      this.gamesVisible = !this.gamesVisible;
      this.tdsVisible = true;
      this.gsVisible = true;
    } else {
      this.gamesVisible = true;
      this.tdsVisible = false;
      this.gsVisible = false;
    }
  }

  connect(): void {
    this.walletFacade.showWallets();
  }

  disconnect(): void {
    this.walletFacade.disconnectWalletAccount(WalletType.metamask);
  }
}
