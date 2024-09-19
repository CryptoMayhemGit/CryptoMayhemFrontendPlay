import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/cm-services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('droneIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-200%, 200%)',
        }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translate(0)' })
        ),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30%)',
        }),
        animate(
          '500ms 1000ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('sizeUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.5) translateX(-50%)',
        }),
        animate(
          '500ms 500ms ease-in',
          style({ opacity: 1, transform: 'scale(1) translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router, private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.SendAnalyticsData();
  }

  private SendAnalyticsData() {
    this.analyticsService.trackPageView();
    this.analyticsService.trackEvent('GiercowatyTypAndrzeja', 'AndrzejZrobilKlik', 777);
  }

  downloadLauncher() {
    window.open('https://github.com/AdriaGames/CryptoMayhemLauncher/releases/latest/download/Install.Crypto.Mayhem.Launcher.exe', '_blank');
  }

  goToTds() {
    this.router.navigate(['tds']);
  }

  goToTglp() {
    window.open('https://www.okx.com/pl/web3/marketplace/nft/collection/bsc/tenset-tglp-mayhem', '_blank')
  }
}