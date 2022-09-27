import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent implements OnInit {
  @Input() playerName: string = '';
  @Input() walletNumber: string = '0x12...3456';

  newName = new FormControl('');
  editName = false;

  constructor() {}

  ngOnInit(): void {}

  edit() {
    this.editName = !this.editName;
    this.newName.setValue(this.playerName);
  }

  save() {
    this.playerName = this.newName.value;
    this.editName = false;
  }
}
