import { Component, EventEmitter, Output } from '@angular/core';
import { WalletFacade, WalletService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Observable, of } from 'rxjs';
@Component({
    selector: 'ui-metapro-qr',
    templateUrl: './metapro-qr.component.html',
    styleUrls: ['./metapro-qr.component.scss'],
})
export class MetaproQrComponent {
    connected$: Observable<boolean> = of(true);
    walletType$: Observable<WalletType> = of(WalletType.none);
    @Output() public readonly closeModal = new EventEmitter<void>();

    constructor(
        public readonly walletFacade: WalletFacade,
        public readonly walletService: WalletService,
    ) {
        this.connected$ = this.walletFacade.connected$;
        this.walletType$ = this.walletFacade.walletType$;
    }

    public closeMetaproQr() {
        this.walletFacade.showMetaproQr(false);
    }

    public get walletType(): typeof WalletType {
        return WalletType;
    }
}