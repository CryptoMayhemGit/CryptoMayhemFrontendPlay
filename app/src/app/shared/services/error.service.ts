import { ErrorHandler, Injectable } from '@angular/core';

import { NotificationService } from './notification.service';

import { UNKNOWN_ERROR } from '../config/notification/error.config';


@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private notificationService: NotificationService) { }

  handleError(): void {
    this.notificationService.error(UNKNOWN_ERROR);
  }

}
