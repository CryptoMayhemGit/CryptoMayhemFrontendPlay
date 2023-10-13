/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable } from '@angular/core';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { VestingService } from '../services/vesting.service';
import { WalletService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
/*import {
  SetVoteRequest,
  SignData,
} from '@crypto-mayhem-frontend/crypto-mayhem/data-access/vesting-model';*/

import * as VestingActions from './vesting.actions';
import * as DAOSelectors from './vesting.selectors';
import * as WalletSelectors from '../../../../wallet/src/lib/state/wallet.selectors';
import * as WalletActions from '../../../../wallet/src/lib/state/wallet.actions';

@Injectable({ providedIn: 'root' })
export class VestingEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly vestingService: VestingService,
    private readonly walletService: WalletService,
    private readonly notificationsService: NotificationsService,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {
  }

  showDaoLargeSpinnerActive$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      WalletActions.connectWalletSuccess,
      VestingActions.getBlockedTokens,
      WalletActions.disconnectWallet,
      WalletActions.setLanguage
    ),
    map(() => VestingActions.showVestingLargeSpinnerActive())
  )
);

hideDaoLargeSpinnerActive$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      VestingActions.getBlockedTokensSuccess,
      VestingActions.getBlockedTokensFailure
    ),
    map(() => VestingActions.hideVestingLargeSpinnerActive())
  )
);

  getBlockedTokens$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      VestingActions.getBlockedTokens,
      WalletActions.connectWalletSuccess,
      WalletActions.disconnectWallet,
      WalletActions.setLanguage
    ),
    concatLatestFrom(() => [
      this.store.select(WalletSelectors.getAccount),
      this.store.select(WalletSelectors.getLanguage),
    ]),
    switchMap(([, wallet, lang]) =>
      this.vestingService.getBlockedTokens(wallet, lang).pipe(
        map((response) => response.vestingTokens),
        map((count) => {return VestingActions.getBlockedTokensSuccess({ result: count.toString() });} ),
        catchError((error) =>
          of(VestingActions.getBlockedTokensFailure({ error }))
        )
      )
    )
  )
);
}
