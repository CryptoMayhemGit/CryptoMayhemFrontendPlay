import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { NotificationService } from '../../services/notification.service';

import { Notification } from '../../models/notification/notification.model';
import { NotificationType } from '../../models/notification/notification-type.model';

import { TIMEOUT } from '../../config/notification/notification.config';


@Component({
  selector: 'app-notification',
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
      this.notifications = notifications
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  close(id: number): void {
    this.notificationService.close(id);
  }

}
