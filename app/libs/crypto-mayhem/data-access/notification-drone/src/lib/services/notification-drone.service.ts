import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { error, hide, success } from "../state/notification-drone.actions";

import * as NotificationDroneSelectors from '../state/notification-drone.selectors';

@Injectable({ providedIn: 'root'})
export class NotificationDroneService {

    readonly show$ = this.store.select(NotificationDroneSelectors.getShow);
    readonly error$ = this.store.select(NotificationDroneSelectors.getError);
    readonly eventType$ = this.store.select(NotificationDroneSelectors.getEventType);

    constructor(
        private readonly store: Store
    ) {}

    public error(eventType: NotificationDroneEventTypes): void {
        this.store.dispatch(error({eventType}));
    }

    public success(eventType: NotificationDroneEventTypes): void {
        this.store.dispatch(success({eventType}));
    }

    public hide() : void {
        this.store.dispatch(hide());
    }
}

export enum NotificationDroneEventTypes {
    NONE,
    NO_CONNECTION,
    NO_WALLET,
    BAD_NETWORK
}