import { Component } from '@angular/core';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';

@Component({
  selector: 'ui-wallet-choice',
  templateUrl: './wallet-choice.component.html',
  styleUrls: ['./wallet-choice.component.scss'],
})
export class WalletChoiceComponent {
  caretRight = faCaretRight;

  constructor(private readonly walletFacade: WalletFacade) {}

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
}
