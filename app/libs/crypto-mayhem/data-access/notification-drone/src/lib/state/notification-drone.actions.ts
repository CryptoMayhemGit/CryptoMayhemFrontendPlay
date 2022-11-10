import { createAction, props } from '@ngrx/store';

export const success = createAction(
  '[Notification Drone] Success notification',
  props<{ title: string; message?: string; textLink?: {url: string, text: string} }>()
);

export const error = createAction(
  '[Notification Drone] Error notification',
  props<{ title: string; message?: string; textLink?: {url: string, text: string} }>()
);

export const info = createAction(
  '[Notification Drone] Info notification',
  props<{ title: string; message?: string; textLink?: {url: string, text: string} }>()
);

export const hide = createAction(
  '[Notification Drone] Hide notification'
);
