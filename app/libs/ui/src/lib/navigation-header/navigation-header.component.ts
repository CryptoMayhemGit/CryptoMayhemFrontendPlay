import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-nav',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavigationHeaderComponent implements OnInit {
  mobileVisible = false;
  gamesVisible = false;
  tdsVisible = false;
  gsVisible = false;
  isMobile = false;

  constructor() {}

  ngOnInit(): void {}

  isSmallerScreen(): boolean {
    return window.innerWidth <= 1240;
  }

  showGames() {
    if (this.isSmallerScreen()) {
      this.gamesVisible = !this.gamesVisible;
      this.tdsVisible = true;
      this.gsVisible = true;
    } else {
      this.gamesVisible = true;
      this.tdsVisible = false;
      this.gsVisible = false;
    }
  }
}
