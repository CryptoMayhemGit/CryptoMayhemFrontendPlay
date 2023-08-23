import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
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
  public closeHandlerPrompt = false;
  public handle = '';
  account$!: Observable<string>
  isMetaProWallet = false;

  constructor(
    public readonly walletFacade: WalletFacade,
    public readonly walletService: WalletService,
    private router: Router
    ) {
    this.closeWallets$ = this.walletFacade.closeWallets$
  }

  public hideWallets() {
    this.walletFacade.hideWallets();
  }

  public choiceWallet(walletType: WalletType) {
    console.log(walletType);
    this.walletFacade.connectWalletAccount(walletType);
    this.hideWallets();
  }

  public get walletType(): typeof WalletType {
    return WalletType;
  }
}
