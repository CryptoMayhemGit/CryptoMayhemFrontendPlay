import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-order-highlight',
  templateUrl: './order-highlight.component.html',
  styleUrls: ['./order-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHighlightComponent{

  constructor() {}

}
