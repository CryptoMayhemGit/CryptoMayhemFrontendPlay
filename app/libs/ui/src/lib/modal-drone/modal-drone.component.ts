import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-modal-drone',
  templateUrl: './modal-drone.component.html',
  styleUrls: ['./modal-drone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDroneComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() btnText: string = '';
  @Input() show: boolean = false;
  @Input() error: boolean = false;
  
  constructor() {}

  close() {
    this.show = false;
  }
}
