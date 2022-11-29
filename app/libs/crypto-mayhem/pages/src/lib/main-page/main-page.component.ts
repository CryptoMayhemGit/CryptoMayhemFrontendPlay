import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('droneIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-200%, 200%)',
        }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translate(0)' })
        ),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30%)',
        }),
        animate(
          '500ms 1000ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('sizeUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.5) translateX(-50%)',
        }),
        animate(
          '500ms 500ms ease-in',
          style({ opacity: 1, transform: 'scale(1) translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
