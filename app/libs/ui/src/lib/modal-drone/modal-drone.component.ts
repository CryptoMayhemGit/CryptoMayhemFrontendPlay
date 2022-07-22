import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-modal-drone',
  templateUrl: './modal-drone.component.html',
  styleUrls: ['./modal-drone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDroneComponent implements OnInit {
  @Input() type: 'success' | 'error' = 'success';
  @Input() title!: string;
  @Input() content!: string;
  @Input() primaryButtonText!: string;
  @Input() secondaryButtonText!: string;

  @Output() primaryClick = new EventEmitter<boolean>();
  @Output() secondaryClick = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(type: string) {
    if (type === 'primary') {
      this.primaryClick.emit(true);
    } else {
      this.secondaryClick.emit(true);
    }
  }
}
