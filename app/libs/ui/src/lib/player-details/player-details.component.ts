import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
          height: 0,
        }),
        animate(
          '200ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)', height: '100%' })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)',
          height: '100%',
        }),
        animate(
          '200ms ease-out',
          style({ opacity: 0, transform: 'translateY(-100%)', height: 0 })
        ),
      ]),
    ]),
  ]
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
