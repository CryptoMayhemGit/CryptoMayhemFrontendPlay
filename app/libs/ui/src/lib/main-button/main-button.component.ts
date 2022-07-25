import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  @Output() btnClick = new EventEmitter();
  @Input() type: 'primary' | 'secondary' | 'fancy' = 'primary';
  @Input() disabled: boolean = false;

  constructor() {}

  public onClick() {
    this.btnClick.emit();
  }
}
