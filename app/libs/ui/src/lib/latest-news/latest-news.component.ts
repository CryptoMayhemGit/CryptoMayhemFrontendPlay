import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from 'libs/crypto-mayhem/data-access/cm-services/src/lib/news/news.model';

@Component({
  selector: 'ui-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(click)": "onClick($event)"
  },
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
export class LatestNewsComponent implements OnInit {
  @Input() latest!: Item

  constructor() {}
  
  ngOnInit(): void {
    this.latest.content = this.latest.content.replace(/<[^>]*>/g, '');
  }

  onClick(event: any) {
    window.open(this.latest.link, '_blank')
  }

}