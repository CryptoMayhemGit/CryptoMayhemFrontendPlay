import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { MainButtonModule } from '../main-button/main-button.module';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { PreSaleComponent } from './pre-sale.component';

@NgModule({
  declarations: [PreSaleComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([WalletEffects]),
    TranslocoModule,
    MainButtonModule,
    ProgressBarModule,
  ],
  exports: [PreSaleComponent],
})
export class PreSaleModule {}
