import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { error, hide, success, info } from '../state/notification-drone.actions';
import { Url } from '../state/notification-drone.reducer';

import * as NotificationDroneSelectors from '../state/notification-drone.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  public show$: Observable<boolean>;
  public type$: Observable<string>;
  public title$: Observable<string>;
  public message$: Observable<string | undefined>;
  public textLink$: Observable<Url | undefined>;
  
  constructor(private readonly store: Store) 
  {
    this.show$ = this.store.select(NotificationDroneSelectors.getShow);
    this.type$ = this.store.select(NotificationDroneSelectors.getType);
    this.title$ = this.store.select(NotificationDroneSelectors.getTitle);
    this.message$ = this.store.select(NotificationDroneSelectors.getMessage);
    this.textLink$ = this.store.select(NotificationDroneSelectors.getTextLink);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly TIMEOUT = 5000;
  private timeout: any;

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
