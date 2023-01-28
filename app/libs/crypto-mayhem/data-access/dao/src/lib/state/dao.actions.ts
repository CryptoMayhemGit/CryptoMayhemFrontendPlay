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