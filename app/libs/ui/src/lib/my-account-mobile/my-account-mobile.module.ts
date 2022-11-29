import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountMobileComponent } from './my-account-mobile.component';
import { PlayerDetailsModule } from '../player-details/player-details.module';
import { TokenBalanceModule } from '../token-balance/token-balance.module';
import { SubmenuModule } from '../submenu/submenu.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MainButtonModule } from '../main-button/main-button.module';

@NgModule({
  declarations: [MyAccountMobileComponent],
  imports: [CommonModule, PlayerDetailsModule, TokenBalanceModule, SubmenuModule, TranslocoModule, MainButtonModule],
  exports: [MyAccountMobileComponent],
})
export class MyAccountMobileModule {}
