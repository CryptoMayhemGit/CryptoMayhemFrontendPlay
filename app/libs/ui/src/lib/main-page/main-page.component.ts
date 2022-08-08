import { animate, style, transition, trigger } from '@angular/animations';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('droneIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-300%, 100%)',
        }),
        animate(
          '1000ms ease-in',
          style({ opacity: 1, transform: 'translate(0)' })
        ),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(50%)',
        }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
