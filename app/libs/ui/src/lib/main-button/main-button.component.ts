import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  @Output() btnClick = new EventEmitter();
  @Input() type: 'primary' | 'secondary' | 'fancy' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  circleNotch = faCircleNotch;

  constructor() {}

  public onClick() {
    this.btnClick.emit();
  }
}
