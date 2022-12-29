import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-header-gradient',
  templateUrl: './header-gradient.component.html',
  styleUrls: ['./header-gradient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderGradientComponent{
  constructor() {}
}
