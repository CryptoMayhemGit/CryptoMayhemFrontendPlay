import { ErrorHandler, Injectable } from '@angular/core';

import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private notificationService: NotificationService) { }

  handleError(error: any): void {
    this.notificationService.error(error.message);
  }

}
