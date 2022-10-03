import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-modal-avatar-change',
  templateUrl: './modal-avatar-change.component.html',
  styleUrls: ['./modal-avatar-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAvatarChangeComponent implements OnInit {
  @Input() show = false;

  searchIcon = faSearch;
  search = new FormControl('');
  section: string = "";

  constructor() {
    this.search.valueChanges.subscribe((value) => {
      this.section = "";
    });
  }

  ngOnInit(): void {}

  setSection(section: string) {
    this.section = section;
  }

  close() {
    this.show = false;
  }
}
