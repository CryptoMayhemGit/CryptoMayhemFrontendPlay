import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  @Output() btnClick = new EventEmitter();
  @Input() type: 'primary' | 'secondary' | 'fancy' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;

  circleNotch = faCircleNotch;

  constructor() {}

  public onClick() {
    if(!this.disabled) {
      this.btnClick.emit();
    }
  }
}
