import { createAction, props } from '@ngrx/store';

export const success = createAction(
  '[Notification Drone] Success notification drone',
  props<{ title: string; message?: string; btnText?: string }>()
);

export const error = createAction(
  '[Notification Drone] Error notification drone',
  props<{ title: string; message?: string; btnText?: string }>()
);

export const hide = createAction(
  '[Notification Drone] Hide notification drone'
);
