import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoComponent } from './dao.component';
import {
  DaoHistoryModule,
  DaoInfoModule,
  DaoVotingModule,
  TabNavigatorModule,
} from '@crypto-mayhem-frontend/ui';
import { EffectsModule } from '@ngrx/effects';
import { CryptoMayhemDataAccessDaoModule, DAOEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao';


@NgModule({
  declarations: [DaoComponent],
  imports: [
    CommonModule,
    TabNavigatorModule,
    DaoInfoModule,
    DaoVotingModule,
    DaoHistoryModule,
    EffectsModule.forFeature([DAOEffects]),
    CryptoMayhemDataAccessDaoModule
  ],
  exports: [DaoComponent],
})
export class DaoModule {}
