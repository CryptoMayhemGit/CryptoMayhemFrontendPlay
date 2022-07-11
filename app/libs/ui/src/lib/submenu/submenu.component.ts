import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmenuComponent {
  constructor() {}
}
