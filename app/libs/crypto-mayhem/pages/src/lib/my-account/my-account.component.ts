import { animate, style, transition, trigger } from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crypto-mayhem-frontend-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({
          transform: 'translate(0)',
          display: 'block'
        }),
        animate(
          '1000ms 500ms ease-out',
          style({ transform: 'translateY(10rem)', display: 'none' })
        ),
      ]),
    ]),
    trigger('show', [
      transition(':enter', [
        style({
          height: '0px',
        }),
        animate(
          '300ms 500ms ease-in',
          style({ height: '100px' })
        ),
      ]),
    ]),
  ],
})
export class MyAccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
