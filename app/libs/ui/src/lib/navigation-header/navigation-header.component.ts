import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-nav',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
