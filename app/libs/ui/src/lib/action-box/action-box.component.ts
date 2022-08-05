import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-action-box',
  templateUrl: './action-box.component.html',
  styleUrls: ['./action-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBoxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
