/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { DAOService } from '../services/dao.service';
import { WalletService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { SetVoteRequest, SignData } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';

import * as DAOActions from './dao.actions';
import * as DAOSelectors from './dao.selectors';
import * as WalletSelectors from '../../../../wallet/src/lib/state/wallet.selectors';
import * as WalletActions from '../../../../wallet/src/lib/state/wallet.actions';

@Injectable({ providedIn: 'root' })
export class DAOEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly daoService: DAOService,
        private readonly walletService: WalletService,
        private readonly notificationsService: NotificationsService,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    showDaoSmallSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                WalletActions.connectWallet,
            ),
            map(() => DAOActions.showDaoSmallSpinner())
        ));

    hideDaoSmallSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                DAOActions.getAllActiveTopicsSuccess,
            ),
            map(() => DAOActions.hideDaoSmallSpinner())
        ));

    showDaoLargeSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                DAOActions.getAllActiveTopics,
                DAOActions.postDaoVoteWithSignature,
                WalletActions.setLanguage
            ),
            map(() => DAOActions.showDaoLargeSpinner())
        ));

    hideDaoLargeSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                DAOActions.getAllActiveTopicsSuccess,
                DAOActions.postDaoVoteWithSignatureSuccess,
            ),
            map(() => DAOActions.hideDaoLargeSpinner())
        ));

    getAllActiveTopics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                    DAOActions.getAllActiveTopics,
                    WalletActions.connectWalletSuccess,
                    DAOActions.postDaoVoteWithSignatureSuccess,
                    WalletActions.setLanguage
                ),
            concatLatestFrom(() => [
                this.store.select(WalletSelectors.getAccount),
                this.store.select(WalletSelectors.getLanguage),
            ]),
            switchMap(([,wallet, lang]) =>
                this.daoService.getDaoAllActiveTopics(wallet, lang).pipe(
                    map((response) => response.topics),
                    map((topics) => DAOActions.getAllActiveTopicsSuccess({ topics })),
                    catchError((error) => of(DAOActions.getAllActiveTopicsFailure({ error })))
                )
            )
        )
    );

    getAllHistoricTopics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                    WalletActions.connectWalletSuccess,
                    DAOActions.getAllHistoricTopics,
                    DAOActions.postDaoVoteWithSignatureSuccess,
                    WalletActions.setLanguage
                ),
            concatLatestFrom(() =>
            [
                this.store.select(WalletSelectors.getAccount),
                this.store.select(WalletSelectors.getLanguage),
                this.store.select(DAOSelectors.selectAllHistoricTopics)
            ]),
            switchMap(([action, wallet, localization, storeTopic]) => //TODO SKIP AND TAKE to improve for pagination - 0 - 20 per page.
                this.daoService.getAllHistoricTopics(wallet, 0, 25, localization).pipe( //TODO SKIP AND TAKE to improve for pagination - 0 - 20 per page.
                    map((response) => response.topics),
                    map((topics) =>
                    {
                        return topics.length === 0 ?
                        DAOActions.getAllHistoricTopicsSuccess({ topics: storeTopic }) :
                        DAOActions.getAllHistoricTopicsSuccess({ topics })

                    }),
                    catchError((error) => of(DAOActions.getAllHistoricTopicsFailure({ error })))
                )
            )
        )
    );

    signMessageForDao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAOActions.signMessageForDao),
      mergeMap(({messages}) => from(this.walletService.signMessage(messages)).pipe(
          map((dataAndSignedMessage) => DAOActions.signMessageForDaoSuccess({ dataAndSignedMessage })),
        ))
    )
  );

    postDaoVoteWithSignature$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DAOActions.signMessageForDaoSuccess),
            concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
            map(([{dataAndSignedMessage}, wallet]) => {
                const signData: SignData = {
                    topicId: parseInt(dataAndSignedMessage[0], 10),
                    answerId: parseInt(dataAndSignedMessage[1], 10),
                    nonce: parseInt(dataAndSignedMessage[2], 10),
                };

                const setVoteRequest: SetVoteRequest = {
                    wallet: wallet,
                    signedMessage: dataAndSignedMessage[3],
                    signData: signData,
                }

                return setVoteRequest;
            }),
            switchMap((setVoteRequest) =>
                this.daoService.postDaoVoteWithSignature(setVoteRequest).pipe(
                    map(() => {
                        this.notificationsService.success('DAO.VOTE_SUCCESS', 'DAO.VOTE_SUCCESS_DESCRIPTION')
                        return DAOActions.postDaoVoteWithSignatureSuccess()
                    }),
                    catchError((error) => {
                        console.log('error:', error)
                        switch (error.error) {
                            case DaoResponseErrorCodes.WALLET_NOT_EXIST_IN_SNAPSHOT:
                                this.notificationsService.error(
                                    'NOTIFICATION.DAO.WALLET_NOT_EXIST_IN_SNAPSHOT_TITLE',
                                    'NOTIFICATION.DAO.WALLET_NOT_EXIST_IN_SNAPSHOT_MESSAGE',
                                );
                                break;
                            case DaoResponseErrorCodes.WALLET_NOT_EXIST:
                                this.notificationsService.error(
                                    'NOTIFICATION.DAO.WALLET_NOT_EXIST_TITLE',
                                    'NOTIFICATION.DAO.WALLET_NOT_EXIST_MESSAGE',
                                );
                                break;
                            case DaoResponseErrorCodes.VOTING_IS_NOT_ACTIVE:
                                this.notificationsService.error(
                                    'NOTIFICATION.DAO.VOTING_IS_NOT_ACTIVE_TITLE',
                                    'NOTIFICATION.DAO.VOTING_IS_NOT_ACTIVE_MESSAGE',
                                );
                                break;
                            case DaoResponseErrorCodes.WALLET_ALREADY_VOTED:
                                this.notificationsService.error(
                                    'NOTIFICATION.DAO.WALLET_ALREADY_VOTED_TITLE',
                                    'NOTIFICATION.DAO.WALLET_ALREADY_VOTED_MESSAGE',
                                );
                                break;
                            default:
                                this.notificationsService.error(
                                    'NOTIFICATION.ERROR.UNKNOWN_ERROR',
                                    '',
                                );
                              break;
                          }
                          return of();
                    })
                )
            )
        )
    );
}

export enum DaoResponseErrorCodes {
    WALLET_NOT_EXIST_IN_SNAPSHOT = 'WALLET_NOT_EXIST_IN_SNAPSHOT',
    WALLET_NOT_EXIST = 'WALLET_NOT_EXIST',
    VOTING_IS_NOT_ACTIVE = 'VOTING_IS_NOT_ACTIVE',
    WALLET_ALREADY_VOTED = 'WALLET_ALREADY_VOTED'
}