import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-modal-drone',
  templateUrl: './modal-drone.component.html',
  styleUrls: ['./modal-drone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDroneComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() btnText = '';
  @Input() show = false;
  @Input() error = false;

  constructor() {}

  close() {
    this.show = false;
  }
}
