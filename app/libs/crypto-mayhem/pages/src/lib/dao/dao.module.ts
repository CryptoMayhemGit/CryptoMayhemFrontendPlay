import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoComponent } from './dao.component';
import {
  DaoInfoModule,
  TabNavigatorModule,
} from '@crypto-mayhem-frontend/ui';


@NgModule({
  declarations: [DaoComponent],
  imports: [
    CommonModule,
    TabNavigatorModule,
    DaoInfoModule
  ],
  exports: [DaoComponent],
})
export class DaoModule {}
