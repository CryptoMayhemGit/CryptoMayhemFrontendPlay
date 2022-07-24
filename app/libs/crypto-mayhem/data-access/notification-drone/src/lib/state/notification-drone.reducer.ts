import { Action, createReducer, on } from '@ngrx/store';
import { NotificationDroneEventTypes } from '../services/notification-drone.service';

import * as NotificationDroneActions from './notification-drone.actions';

export const notificationDroneKey = 'notificationDrone';

export interface NotificationDroneState {
    show: boolean,
    error: boolean,
    eventType: number
}

export const initialState: NotificationDroneState = {
    show: false,
    error: false,
    eventType: NotificationDroneEventTypes.NONE
}

export const notificationDroneReducer = createReducer(
    initialState,
    on(NotificationDroneActions.success, (state, {eventType}) => ({...state, error: false, eventType, show: true})),
    on(NotificationDroneActions.error, (state, {eventType}) => ({...state, error: true, eventType, show: true})),
    on(NotificationDroneActions.hide, state => ({...state, show: false, eventType: NotificationDroneEventTypes.NONE.valueOf()}))
);

export function reducer(state: NotificationDroneState | undefined, action: Action) {
    return notificationDroneReducer(state, action);
}