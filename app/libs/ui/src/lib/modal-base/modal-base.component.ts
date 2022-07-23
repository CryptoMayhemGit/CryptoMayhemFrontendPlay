import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
})
export class ModalBaseComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  faxmark = faXmark;

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.close.emit(true);
  }
}
