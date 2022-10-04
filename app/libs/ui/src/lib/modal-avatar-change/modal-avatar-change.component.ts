import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModalBaseComponent } from '../modal-base/modal-base.component';

@Component({
  selector: 'ui-modal-avatar-change',
  templateUrl: './modal-avatar-change.component.html',
  styleUrls: ['./modal-avatar-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAvatarChangeComponent {
  @Input() show!: boolean;

  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchIcon = faSearch;
  search = new FormControl('');
  section: string = '';

  @ViewChild('modal') modal!: ModalBaseComponent;

  constructor() {
    this.search.valueChanges.subscribe(() => {
      this.section = '';
    });
  }

  setSection(section: string) {
    this.section = section;
  }

  close() {
    this.showChange.emit(false);
    this.search.setValue('');
  }
}
