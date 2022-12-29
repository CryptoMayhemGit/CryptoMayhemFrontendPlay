import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoComponent } from './dao.component';
import {
  DaoHistoryModule,
  DaoInfoModule,
  DaoVotingModule,
  TabNavigatorModule,
} from '@crypto-mayhem-frontend/ui';


@NgModule({
  declarations: [DaoComponent],
  imports: [
    CommonModule,
    TabNavigatorModule,
    DaoInfoModule,
    DaoVotingModule,
    DaoHistoryModule,
  ],
  exports: [DaoComponent],
})
export class DaoModule {}
