import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NotificationDroneEventTypes, NotificationDroneService } from 'libs/crypto-mayhem/data-access/notification-drone/src/lib/services/notification-drone.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-modal-drone',
  templateUrl: './modal-drone.component.html',
  styleUrls: ['./modal-drone.component.scss']
})
export class ModalDroneComponent implements OnInit {

  public eventType$: Observable<NotificationDroneEventTypes> = of(0);
  public show$: Observable<boolean> = of(false);
  public error$: Observable<boolean> = of(false);

  @Input() type: 'success' | 'error' = 'success';
  @Input() title!: string;
  @Input() content!: string;
  @Input() primaryButtonText!: string;
  @Input() secondaryButtonText!: string;

  @Output() primaryClick = new EventEmitter<boolean>();
  @Output() secondaryClick = new EventEmitter<boolean>();

  constructor(
    private readonly notificationDroneService: NotificationDroneService
  ) {}

  ngOnInit(): void {
    this.eventType$ = this.notificationDroneService.eventType$;
    this.show$ = this.notificationDroneService.show$;
    this.error$ = this.notificationDroneService.error$;
    this.eventType$.subscribe((value) => console.log(value));
  }

  onButtonClick(type: string): void {
    if (type === 'primary') {
      this.primaryClick.emit(true);
    } else {
      this.secondaryClick.emit(true);
    }
  }

  public get notificationDroneEventTypes(): typeof NotificationDroneEventTypes {
    return NotificationDroneEventTypes;
  }
}
