import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromDao from './state/dao.reducer';
import { StoreModule } from '@ngrx/store';
import { DAOFacade } from './facades/dao.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
    fromDao.daoKey,
    fromDao.reducer
  )],
  providers: [
    DAOFacade
  ]
})
export class CryptoMayhemDataAccessDaoModule {}
