import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { isFullHD, scrollTo } from '@crypto-mayhem-frontend/utility/functions';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crypto-mayhem-frontend-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({
          transform: 'translate(0)',
          display: 'block',
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
          '300ms 0ms ease-in',
          style({ height: '200px'})
        ),
      ]),
      transition(':leave', [
        style({
          height: '200px',
          opacity: 1,
        }),
        animate(
          '300ms 0ms ease-in',
          style({ height: '0px', opacity: 0})
        ),
      ]),
    ]),
  ],
})
export class MyAccountComponent implements OnInit {
  searchIcon = faSearch;
  submenu = false;
  caretUp = faCaretUp;
  caretDown = faCaretDown;

  constructor() {}

  scrollTo(elementId: string): void {
    scrollTo(elementId);
  }

  ngOnInit(): void {
    if(isFullHD()) {
      this.submenu = true;
    }
  }
}
