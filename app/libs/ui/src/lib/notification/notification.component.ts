import { Component, OnDestroy, OnInit } from '@angular/core';
import { TIMEOUT } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/cm-services';
import { Notification, NotificationType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';

import { Subscription } from 'rxjs';


@Component({
  selector: 'cm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  NotificationType = NotificationType;

  notifications: Notification[] = [];
  
  TIMEOUT = `${(TIMEOUT / 1000)}s`;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(notifications => 
      this.notifications = notifications as Notification[]
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  close(id: number): void {
    this.notificationService.close(id);
  }

}
