import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoComponent } from './dao.component';
import {
  AdriaTokenModule,
  HeaderFadedModule,
  MainButtonModule,
  OrderHighlightModule,
  SubmenuModule,
  TabNavigatorModule,
} from '@crypto-mayhem-frontend/ui';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [DaoComponent],
  imports: [
    CommonModule,
    HeaderFadedModule,
    TranslocoModule,
    TabNavigatorModule,
    OrderHighlightModule,
    AdriaTokenModule,
    MainButtonModule,
    SubmenuModule
  ],
  exports: [DaoComponent],
})
export class DaoModule {}
