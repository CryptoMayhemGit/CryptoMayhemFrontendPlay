import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { TranslocoModule } from '@ngneat/transloco';
import { InputModule, PlayerDetailsModule } from '@crypto-mayhem-frontend/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { WalletEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    InputModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    PlayerDetailsModule
  ],
  exports: [MyAccountComponent],
})
export class MyAccountModule { }
