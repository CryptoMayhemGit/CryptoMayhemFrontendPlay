import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './top-down-shooter.component.html',
  styleUrls: ['./top-down-shooter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopDownShooterComponent {

  earlyAccessTime = new Date(Date.UTC(2022, 11, 13, 11, 0, 0)).getTime();

  constructor() {}

  openBetaForm() {
    window.open('https://forms.gle/W2b6Q8n8VrN76nir5', '_blank');
  }

  addToCal() {
    window.open('https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N2UyNzNyNGo4anM4amIxdGhkZGFsbjJlbWsgZW1rYWNmQG0&tmsrc=emkacf%40gmail.com', '_blank');
  }

  downloadLauncher() {
    window.open('https://github.com/AdriaGames/CryptoMayhemLauncher/releases/latest/download/Install.Crypto.Mayhem.Launcher.exe', '_blank');
  }

}
