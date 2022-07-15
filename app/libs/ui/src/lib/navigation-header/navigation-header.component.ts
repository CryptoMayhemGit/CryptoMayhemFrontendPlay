import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MetaMaskWallet } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';

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

  constructor(
    private readonly walletFacade: WalletFacade
  ) {}

  ngOnInit(): void {}

  isSmallerScreen(): boolean {
    return window.innerWidth <= 1240;
  }

  showGames() {
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

  connect() {
    const wallet = new MetaMaskWallet();
    wallet.connect()
    .then(() => this.walletFacade.setWalletAddress(wallet.walletAddress ?? ''));
  }
}
