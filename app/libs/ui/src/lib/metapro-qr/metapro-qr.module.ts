import { NgModule } from '@angular/core';
import { MetaproQrComponent } from './metapro-qr.component';
import { CryptoMayhemDataAccessWalletModule } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { ModalBaseModule } from '../modal-base/modal-base.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
        MetaproQrComponent
    ],
    imports: [
        CommonModule,
        TranslocoModule,
        CryptoMayhemDataAccessWalletModule,
        ModalBaseModule
    ],
    exports: [
        MetaproQrComponent
    ]
})
export class MetaproQrModule {}