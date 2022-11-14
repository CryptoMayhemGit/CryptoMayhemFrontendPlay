import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
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
export class ProgressBarComponent implements OnChanges {
  @Input() maxValue = 0;
  @Input() currentValue = 0;
  @Output() completeProgress: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnChanges(): void {
    if (this.currentValue === this.maxValue) {
      this.completeProgress.emit(true);
    }
  }
}
