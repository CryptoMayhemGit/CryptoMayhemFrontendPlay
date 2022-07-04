import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-nav',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent {
  mobileVisible = false;

  constructor() {}
}
