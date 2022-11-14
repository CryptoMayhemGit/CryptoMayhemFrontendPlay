import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationsService, url } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('droneIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(200%, 0%)',
        }),
        animate(
          '1000ms ease-in',
          style({ opacity: 1, transform: 'translate(0)' })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translate(0)',
        }),
        animate(
          '1000ms ease-out',
          style({ opacity: 0, transform: 'translate(200%, 0%)' })
        ),
      ]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  public title$: Observable<string> = of('');
  public message$: Observable<string | undefined> = of('');
  public textLink$!: Observable<url | undefined>;
  public show$: Observable<boolean> = of(false);
  public type$: Observable<string> = of('');

  constructor(
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.title$ = this.notificationsService.title$;
    this.message$ = this.notificationsService.message$;
    this.textLink$ = this.notificationsService.textLink$;
    this.show$ = this.notificationsService.show$;
    this.type$ = this.notificationsService.type$;
  }

  close(): void {
    this.notificationsService.hide();
  }
}
