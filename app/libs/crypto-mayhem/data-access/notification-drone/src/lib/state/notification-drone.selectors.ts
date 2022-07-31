import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNotificationDrone from './notification-drone.reducer';

export const selectNotificationDrone =
  createFeatureSelector<fromNotificationDrone.NotificationDroneState>(
    'notificationDrone'
  );

export const getShow = createSelector(
  selectNotificationDrone,
  (state) => state.show
);

export const getError = createSelector(
  selectNotificationDrone,
  (state) => state?.error
);

export const getTitle = createSelector(
  selectNotificationDrone,
  (state) => state?.title
);

export const getMessage = createSelector(
  selectNotificationDrone,
  (state) => state?.message
);

export const getBtnText = createSelector(
  selectNotificationDrone,
  (state) => state?.btnText
);
