import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { error, hide, success } from '../state/notification-drone.actions';

import * as NotificationDroneSelectors from '../state/notification-drone.selectors';

@Injectable({ providedIn: 'root' })
export class NotificationDroneService {
  readonly show$ = this.store.select(NotificationDroneSelectors.getShow);
  readonly error$ = this.store.select(NotificationDroneSelectors.getError);
  readonly title$ = this.store.select(NotificationDroneSelectors.getTitle);
  readonly message$ = this.store.select(NotificationDroneSelectors.getMessage);
  readonly btnText$ = this.store.select(NotificationDroneSelectors.getBtnText);

  constructor(private readonly store: Store) {}

  public error(title: string, message?: string, btnText?: string): void {
    this.store.dispatch(error({ title, message, btnText }));
  }

  public success(title: string, message?: string, btnText?: string): void {
    this.store.dispatch(success({ title, message, btnText }));
  }

  public hide(): void {
    this.store.dispatch(hide());
  }
}
