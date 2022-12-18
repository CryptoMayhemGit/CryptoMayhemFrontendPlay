import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-voting-result-item',
  templateUrl: './voting-result-item.component.html',
  styleUrls: ['./voting-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingResultItemComponent {
  @Input() answer!: string;
  @Input() votes!: number;
  @Input() index!: string;
  @Input() active = false;
  
  constructor() {}

}
