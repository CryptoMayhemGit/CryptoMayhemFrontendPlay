import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CryptoMayhemDataAccessWalletModule } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@ngneat/transloco';
import { ModalBaseModule } from '../modal-base/modal-base.module';
import { WalletChoiceComponent } from './wallet-choice.component';

@NgModule({
  declarations: [WalletChoiceComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    ModalBaseModule,
    FontAwesomeModule,
    CryptoMayhemDataAccessWalletModule
  ],
  exports: [WalletChoiceComponent],
})
export class WalletChoiceModule {}
