import { createAction, props } from "@ngrx/store";
import { NotificationDroneEventTypes } from "../services/notification-drone.service";

export const success = createAction(
    '[Notification Drone] Success notification drone',
    props<{eventType: NotificationDroneEventTypes}>()
)

export const error = createAction(
    '[Notification Drone] Error notification drone',
    props<{eventType: NotificationDroneEventTypes}>()
);

export const hide = createAction(
    '[Notification Drone] Hide notification drone'
);