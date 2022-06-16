import { ErrorHandler, Injectable } from '@angular/core';
import { UNKNOWN_ERROR } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationService } from '../notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private notificationService: NotificationService) { }

  handleError(): void {
    this.notificationService.error(UNKNOWN_ERROR);
  }

}
