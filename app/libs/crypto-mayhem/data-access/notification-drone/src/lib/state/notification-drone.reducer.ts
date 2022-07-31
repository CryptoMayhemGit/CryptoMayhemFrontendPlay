import { Action, createReducer, on } from '@ngrx/store';

import * as NotificationDroneActions from './notification-drone.actions';

export const notificationDroneKey = 'notificationDrone';

export interface NotificationDroneState {
  show: boolean;
  error: boolean;
  title: string;
  message?: string | undefined;
  btnText?: string | undefined;
}

export const initialState: NotificationDroneState = {
  show: false,
  error: false,
  title: '',
  message: undefined,
  btnText: undefined,
};

export const notificationDroneReducer = createReducer(
  initialState,
  on(
    NotificationDroneActions.success,
    (state, { title, message, btnText }) => ({
      ...state,
      error: false,
      show: true,
      title: title,
      message: message,
      btnText: btnText,
    })
  ),
  on(NotificationDroneActions.error, (state, { title, message, btnText }) => ({
    ...state,
    error: true,
    show: true,
    title: title,
    message: message,
    btnText: btnText,
  })),
  on(NotificationDroneActions.hide, (state) => ({
    ...state,
    show: false,
  }))
);

export function reducer(
  state: NotificationDroneState | undefined,
  action: Action
) {
  return notificationDroneReducer(state, action);
}
