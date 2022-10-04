import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent {
  @Input() playerName: string = '';
  @Input() walletNumber: string = '0x12...3456';

  @Output() playerNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() editAvatarChange: EventEmitter<void> = new EventEmitter<void>();

  newName = new FormControl('');
  editName = false;
  showAvatars = false;

  constructor() {}

  edit() {
    this.editName = !this.editName;
    this.newName.setValue(this.playerName);
  }

  save() {
    this.playerName = this.newName.value;
    this.editName = false;
  }

  editAvatar() {
    this.editAvatarChange.emit();
  }
}
