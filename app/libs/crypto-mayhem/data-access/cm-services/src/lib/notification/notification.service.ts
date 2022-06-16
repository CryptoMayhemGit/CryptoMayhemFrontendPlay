import { Injectable, NgZone } from '@angular/core';
import { LIMIT, TIMEOUT } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { Notification, NotificationType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private id: number = 0;

  private notifications: Notification[] = [];

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  notifications$ = this.notificationsSubject.asObservable();

  constructor(private ngZone: NgZone) { }

  private add(type: NotificationType, message: string): number {

    if (this.notifications.length === LIMIT) {
      this.notifications.shift();
    }

    const id = this.id ++;

    this.notifications.push({
      id: id,
      type: type,
      message: message
    });

    if (type != NotificationType.Process) {
      this.ngZone.runOutsideAngular(() => 
        setTimeout(() => 
          this.ngZone.run(() => 
            this.close(id)
          ), TIMEOUT)
      );
    }

    this.ngZone.run(() => this.notificationsSubject.next(this.notifications));

    return id;
  }

  close(id: number): void {

    const index = this.notifications.findIndex(notification => notification.id === id);

    if (index > - 1) {
      this.notifications.splice(index, 1);
    }

    this.ngZone.run(() => this.notificationsSubject.next(this.notifications));
    
  }

  info(message: string): void {
    this.add(NotificationType.Info, message);
  }

  success(message: string): void {
    this.add(NotificationType.Success, message);
  }

  warning(message: string): void {
    this.add(NotificationType.Warning, message);
  }

  error(message: string): void {
    this.add(NotificationType.Error, message);
  }

  process(message: string): number {
    return this.add(NotificationType.Process, message);
  }

}
