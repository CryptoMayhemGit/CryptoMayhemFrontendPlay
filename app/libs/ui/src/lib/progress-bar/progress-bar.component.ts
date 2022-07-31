import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class ProgressBarComponent implements OnInit {
  @Input() maxValue: number = 100;
  @Input() currentValue: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
