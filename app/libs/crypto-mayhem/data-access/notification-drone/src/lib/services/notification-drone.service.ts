import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { error, hide, success, info } from '../state/notification-drone.actions';
import { Url } from '../state/notification-drone.reducer';

import * as NotificationDroneSelectors from '../state/notification-drone.selectors';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  readonly show$ = this.store.select(NotificationDroneSelectors.getShow);
  readonly type$ = this.store.select(NotificationDroneSelectors.getType);
  readonly title$ = this.store.select(NotificationDroneSelectors.getTitle);
  readonly message$ = this.store.select(NotificationDroneSelectors.getMessage);
  readonly textLink$ = this.store.select(NotificationDroneSelectors.getTextLink);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly TIMEOUT = 5000;
  private timeout: any;

  constructor(private readonly store: Store) {}

  public error(title: string, message?: string, textLink?: Url, autoclose?: boolean,): void {
    this.store.dispatch(error({ title, message, textLink }));
    if(autoclose) this.close();
  }

  public info(title: string, message?: string, textLink?: Url, autoclose?: boolean,): void {
    this.store.dispatch(info({ title, message, textLink }));
    if(autoclose) this.close();
  }

  public success(title: string, message?: string, textLink?: Url, autoclose?: boolean): void {
    this.store.dispatch(success({ title, message, textLink }));
    if(autoclose) this.close();
  }

  private close(): void {
    this.timeout = setTimeout(() => {
      this.hide();
    }, this.TIMEOUT);
  }

  public hide(): void {
    this.store.dispatch(hide());
    if(this.timeout) { this.timeout.clearTimeout() };
  }
}
