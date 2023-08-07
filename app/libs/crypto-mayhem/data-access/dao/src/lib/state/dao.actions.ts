import { DaoTopic } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { createAction, props } from "@ngrx/store";

export const getAllActiveTopics = createAction(
    '[Dao] Get All Active Topics'
);

export const getAllActiveTopicsSuccess = createAction(
    '[Dao] Get All Active Topics Success',
    props<{ topics: DaoTopic[] }>()
);

export const getAllActiveTopicsFailure = createAction(
    '[Dao] Get All Active Topics Failure',
    props<{ error: any }>()
);

export const getAllHistoricTopics = createAction(
    '[Dao] Get All Historic Topics',
    props<{ skip: number, take: number }>()
);

export const getAllHistoricTopicsSuccess = createAction(
    '[Dao] Get All Historic Topics Success',
    props<{ topics: DaoTopic[] }>()
);

export const getAllHistoricTopicsFailure = createAction(
    '[Dao] Get All Historic Topics Failure',
    props<{ error: any }>()
);

export const signMessageForDao = createAction(
    '[Wallet] Sign message for DAO',
    props<{ messages: string[] }>()
  );

  export const signMessageForDaoSuccess = createAction(
    '[Wallet] Send signed data to DAO',
    props<{ dataAndSignedMessage: string[] }>()
  );

  export const signMessageForDaoError = createAction(
    '[Wallet] Send signed data to DAO error',
    props<{ data: string }>()
  );

export const postDaoVoteWithSignature = createAction(
    '[Dao] Post Dao Vote With Signature',
    props<{ dataAndSignedMessage: string[] }>()
);

export const postDaoVoteWithSignatureSuccess = createAction(
    '[Dao] Post Dao Vote With Signature Success',
);

export const postDaoVoteWithSignatureFailure = createAction(
    '[Dao] Post Dao Vote With Signature Failure',
    props<{ error: any }>()
);

export const showDaoSmallSpinnerActive = createAction(
    '[Dao] Show Small Spinner Active'
);

export const hideDaoSmallSpinnerActive = createAction(
    '[Dao] Hide Small Spinner Active'
);

export const showDaoLargeSpinnerActive = createAction(
    '[Dao] Show Large Spinner Active'
);

export const hideDaoLargeSpinnerActive = createAction(
    '[Dao] Hide Large Spinner Active'
);

export const showDaoSmallSpinnerHistoric = createAction(
    '[Dao] Show Small Spinner Historic'
);

export const hideDaoSmallSpinnerHistoric = createAction(
    '[Dao] Hide Small Spinner Historic'
);

export const showDaoLargeSpinnerHistoric = createAction(
    '[Dao] Show Large Spinner Historic'
);

export const hideDaoLargeSpinnerHistoric = createAction(
    '[Dao] Hide Large Spinner Historic'
);