import { Component } from "@angular/core";
import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { WalletFacade } from "libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade";

@Component({
    selector: 'iu-wallet-choice',
    templateUrl: './wallet-choice.component.html',
    styleUrls: ['./wallet-choice.component.scss']
})
export class WalletChoiceComponent {

    constructor(
        private readonly walletFacade: WalletFacade
    ) {}

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