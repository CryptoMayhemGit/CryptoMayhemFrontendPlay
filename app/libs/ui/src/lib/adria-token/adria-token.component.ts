import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-adria-token',
  templateUrl: './adria-token.component.html',
  styleUrls: ['./adria-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdriaTokenComponent{
  @Input() value!: number | string;

  constructor() {}
}
