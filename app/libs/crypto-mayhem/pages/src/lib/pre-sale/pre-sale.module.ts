import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { MainButtonModule, ProgressBarModule, TimerModule } from '@crypto-mayhem-frontend/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
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
    FontAwesomeModule,
    TimerModule,
  ],
  exports: [PreSaleComponent],
})
export class PreSaleModule {}
