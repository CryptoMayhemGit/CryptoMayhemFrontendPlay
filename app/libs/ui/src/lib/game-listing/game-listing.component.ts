import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ui-game-listing',
  templateUrl: './game-listing.component.html',
  styleUrls: ['./game-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class GameListingComponent implements OnInit {
  @Input() title!: string;
  @Input() img!: string;
  @Input() color = `#0B3F90`;

  gradient!: string;

  constructor() {}

  ngOnInit(): void {
    this.gradient = `linear-gradient(172.35deg, ${this.color} 30%, #1c1b1b 78.29%`;
  }
}
