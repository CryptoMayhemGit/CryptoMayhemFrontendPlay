import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cryptoMayhemShellRoutes } from './shell.routes';
import { EffectsModule } from '@ngrx/effects';
import { CryptoMayhemDataAccessDaoModule, DAOEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao';
import { CryptoMayhemDataAccessVestingModule, VestingEffects } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/vesting';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(cryptoMayhemShellRoutes, {
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      anchorScrolling: 'enabled'
    }),
    EffectsModule.forFeature([DAOEffects]),
    CryptoMayhemDataAccessDaoModule,
    EffectsModule.forFeature([VestingEffects]),
    CryptoMayhemDataAccessVestingModule
  ],
  exports: [RouterModule],
})
export class ShellModule {}
