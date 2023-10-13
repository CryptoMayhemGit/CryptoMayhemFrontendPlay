import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromVesting from './state/vesting.reducer';
import { StoreModule } from '@ngrx/store';
import { VestingFacade } from './facades/vesting.facade';
import { CryptoMayhemDataAccessWalletModule } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
    fromVesting.vestingKey,
    fromVesting.reducer
  ),
  CryptoMayhemDataAccessWalletModule],
  providers: [
    VestingFacade
  ]
})
export class CryptoMayhemDataAccessVestingModule {}
