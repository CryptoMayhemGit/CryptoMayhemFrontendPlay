import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isSmallScreen } from '@crypto-mayhem-frontend/utility/functions';

@Component({
  selector: 'ui-token-balance',
  templateUrl: './token-balance.component.html',
  styleUrls: ['./token-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class TokenBalanceComponent implements OnInit {
  @Input() bnbBalance: number | null = 0;
  @Input() walletAddress!: string | null;

  @Output() disconnect = new EventEmitter<void>();

  isVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}


  togglePC(): void {
    if (!isSmallScreen()) {
      this.isVisible = !this.isVisible;
    }
  }

  toggleMobile(): void {
    if (isSmallScreen()) {
      this.isVisible = !this.isVisible;
    }
  }

  disconnectWallet() {
    this.disconnect.emit();
  }
}
