import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigatorComponent{
  @Input() tabs!: string[];
  @Input() activeTab = 0;
  @Input() styleType = 'center-without-background';
  @Input() showTabNumbers = false;
  @Output() activeTabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onTabClick(index: number) {
    this.activeTabChange.emit(index);
  }
}

