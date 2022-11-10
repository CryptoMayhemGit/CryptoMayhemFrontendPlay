import { Action, createReducer, on } from '@ngrx/store';

import * as NotificationDroneActions from './notification-drone.actions';

export const notificationDroneKey = 'notificationDrone';

export type url = {
  url: string;
  text: string;
}

export interface NotificationDroneState {
  show: boolean;
  type: 'error' | 'success' | 'info';
  title: string;
  message?: string | undefined;
  textLink?: url | undefined;
}

export const initialState: NotificationDroneState = {
  show: false,
  type: 'info',
  title: '',
  message: undefined,
  textLink: undefined,
};

export const notificationDroneReducer = createReducer(
  initialState,
  on(
    NotificationDroneActions.success,
    (state, { title, message, textLink }) => ({
      ...state,
      type: 'success',
      show: true,
      title: title,
      message: message,
      textLink: textLink,
    })
  ),
  on(NotificationDroneActions.error, (state, { title, message, textLink }) => ({
    ...state,
    type: 'error',
    show: true,
    title: title,
    message: message,
    textLink: textLink,
  })),
  on(NotificationDroneActions.info, (state, { title, message, textLink }) => ({
    ...state,
    type: 'info',
    show: true,
    title: title,
    message: message,
    textLink: textLink,
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
