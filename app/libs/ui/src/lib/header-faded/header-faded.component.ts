import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-header-faded',
  styleUrls: ['./header-faded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>{{value}}</h1>
  `
})
export class HeaderFadedComponent implements OnInit {
  @Input() value!: string;
  
  constructor() {}

  ngOnInit(): void {}
}
