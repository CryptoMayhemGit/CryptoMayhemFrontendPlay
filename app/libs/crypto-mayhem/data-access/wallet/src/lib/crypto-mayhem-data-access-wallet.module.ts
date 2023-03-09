import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromWallet from './state/wallet.reducer'
import { WalletFacade } from './facades/wallet.facade';
import { ApolloModule } from 'apollo-angular';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromWallet.walletKey,
      fromWallet.reducer
    ),
    ApolloModule
  ],
  providers: [
    WalletFacade
  ]
})
export class CryptoMayhemDataAccessWalletModule {}
