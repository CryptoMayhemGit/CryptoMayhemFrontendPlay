import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
    this.search.valueChanges.subscribe((value) => {
      this.section = '';
    });
  }

  setSection(section: string) {
    this.section = section;
  }

  close() {
    this.showChange.emit(false);
  }
}
