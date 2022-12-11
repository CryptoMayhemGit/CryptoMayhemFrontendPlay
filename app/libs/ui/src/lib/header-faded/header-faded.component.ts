import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-header-faded',
  styleUrls: ['./header-faded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>{{value}}</h1>
  `
})
export class HeaderFadedComponent {
  @Input() value!: string;
  
  constructor() {}
}
