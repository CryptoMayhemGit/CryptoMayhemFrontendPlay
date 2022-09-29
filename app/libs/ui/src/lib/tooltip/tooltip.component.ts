import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  template: `
  <div
    class="tooltip"
    [ngClass]="direction"
    [style.left]="left + 'px'"
    [style.top]="top + 'px'"
    [style.marginTop]="marginTop + 'px'"
  >
    <p>{{ tooltip }}</p>
  </div>`,
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit {
  tooltip!: string;
  left: number = 0;
  top: number = 0;
  marginTop: number = 0;
  direction!: 'top' | 'bottom' | 'left' | 'right';

  constructor() {}

  ngOnInit(): void {}
}
