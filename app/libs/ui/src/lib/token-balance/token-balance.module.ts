import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenBalanceComponent } from './token-balance.component';
import { PipesModule } from '@crypto-mayhem-frontend/utility/pipes';
import { SubmenuModule } from '../submenu/submenu.module';
import { TranslocoModule } from '@ngneat/transloco';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [TokenBalanceComponent],
  imports: [CommonModule, PipesModule, SubmenuModule, TranslocoModule, RouterModule],
  exports: [TokenBalanceComponent],
})
export class TokenBalanceModule {}
