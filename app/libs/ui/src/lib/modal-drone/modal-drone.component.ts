import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NotificationDroneService } from 'libs/crypto-mayhem/data-access/notification-drone/src/lib/services/notification-drone.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-modal-drone',
  templateUrl: './modal-drone.component.html',
  styleUrls: ['./modal-drone.component.scss'],
})
export class ModalDroneComponent implements OnInit {
  public title$: Observable<string> = of('');
  public message$: Observable<string | undefined> = of('');
  public btnText$: Observable<string | undefined> = of('');
  public show$: Observable<boolean> = of(false);
  public error$: Observable<boolean> = of(false);

  constructor(
    private readonly notificationDroneService: NotificationDroneService
  ) {}

  ngOnInit(): void {
    this.title$ = this.notificationDroneService.title$;
    this.message$ = this.notificationDroneService.message$;
    this.btnText$ = this.notificationDroneService.btnText$;
    this.show$ = this.notificationDroneService.show$;
    this.error$ = this.notificationDroneService.error$;
  }

  close() {
    this.notificationDroneService.hide();
  }
}
