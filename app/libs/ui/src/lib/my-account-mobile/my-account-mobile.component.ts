import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-my-account-mobile',
  templateUrl: './my-account-mobile.component.html',
  styleUrls: ['./my-account-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountMobileComponent implements OnInit {
  @Input() playerName!: string;
  @Input() walletConnected: boolean | null = false;

  @Output() playerNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() nftListChange: EventEmitter<string> = new EventEmitter<string>();

  avatarChange = false;
  bnbBalanceOf$: Observable<number> = of(0);
  walletAddress$: Observable<string> = of('');

  constructor(
    private readonly walletFacade: WalletFacade,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.bnbBalanceOf$ = this.walletFacade.bnbBalanceOf$;
    this.walletAddress$ = this.walletFacade.account$;
  }

  disconnect(): void {
    this.walletFacade.disconnectWalletAccount();
    this.router.navigate(['/']);
  }

  connect(): void {
    this.walletFacade.showWallets();
  }

  goToNft(header: string): void {
    this.nftListChange.emit(header);
  }

}