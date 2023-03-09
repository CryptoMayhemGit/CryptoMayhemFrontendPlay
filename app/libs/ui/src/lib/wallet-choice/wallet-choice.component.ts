import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-wallet-choice',
  templateUrl: './wallet-choice.component.html',
  styleUrls: ['./wallet-choice.component.scss'],
})
export class WalletChoiceComponent {
  caretRight = faCaretRight;
  closeWallets$: Observable<boolean | undefined> = of(true);
  showCcProfile$: Observable<boolean | undefined> = of(false);
  public closeHandlerPrompt = false;
  public handle = '';
  account$!: Observable<string>

  constructor(
    private readonly walletFacade: WalletFacade,
    private router: Router
    ) {
    this.closeWallets$ = this.walletFacade.closeWallets$
    this.showCcProfile$ = this.walletFacade.showCcProfile$
  }

  public hideWallets() {
    this.walletFacade.hideWallets();
  }

  public choiceWallet(walletType: WalletType) {
    this.hideWallets();
    this.walletFacade.connectWalletAccount(walletType);
  }

  public get walletType(): typeof WalletType {
    return WalletType;
  }

  public ccProfileConnect() {
    this.hideWallets();
    this.router.navigate(['/ccprofile']);
  }
}
