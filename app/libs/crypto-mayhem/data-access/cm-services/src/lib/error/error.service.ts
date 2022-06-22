import { ErrorHandler, Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotificationService } from '../notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private notificationService: NotificationService, private translocoService: TranslocoService) { }

  handleError(): void {
    this.notificationService.error(this.translocoService.translate("NOTIFICATION.ERROR.UNKNOWN_ERROR"));
  }

}
