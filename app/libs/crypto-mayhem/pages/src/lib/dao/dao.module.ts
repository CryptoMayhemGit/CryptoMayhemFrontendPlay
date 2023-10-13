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
import { CryptoMayhemDataAccessVestingModule, VestingEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/vesting';


@NgModule({
  declarations: [DaoComponent],
  imports: [
    CommonModule,
    TabNavigatorModule,
    DaoInfoModule,
    DaoVotingModule,
    DaoHistoryModule,
    EffectsModule.forFeature([DAOEffects]),
    CryptoMayhemDataAccessDaoModule,
    EffectsModule.forFeature([VestingEffects]),
    CryptoMayhemDataAccessVestingModule
  ],
  exports: [DaoComponent],
})
export class DaoModule {}
