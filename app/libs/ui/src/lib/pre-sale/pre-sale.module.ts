import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { MainButtonModule } from '../main-button/main-button.module';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { TimerModule } from '../timer/timer.module';
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
