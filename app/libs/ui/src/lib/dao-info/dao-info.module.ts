import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoInfoComponent } from './dao-info.component';
import { HeaderFadedModule } from '../header-faded/header-faded.module';
import { TranslocoModule } from '@ngneat/transloco';
import { OrderHighlightModule } from '../order-highlight/order-highlight.module';
import { AdriaTokenModule } from '../adria-token/adria-token.module';
import { MainButtonModule } from '../main-button/main-button.module';
import { SubmenuModule } from '../submenu/submenu.module';

@NgModule({
  declarations: [DaoInfoComponent],
  imports: [
    CommonModule,
    HeaderFadedModule,
    TranslocoModule,
    OrderHighlightModule,
    AdriaTokenModule,
    MainButtonModule,
    SubmenuModule,
  ],
  exports: [DaoInfoComponent],
})
export class DaoInfoModule {}
