import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromDao from './state/dao.reducer';
import { StoreModule } from '@ngrx/store';
import { DAOFacade } from './facades/dao.facade';
import { CryptoMayhemDataAccessWalletModule } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
    fromDao.daoKey,
    fromDao.reducer
  ),
  CryptoMayhemDataAccessWalletModule],
  providers: [
    DAOFacade
  ]
})
export class CryptoMayhemDataAccessDaoModule {}
