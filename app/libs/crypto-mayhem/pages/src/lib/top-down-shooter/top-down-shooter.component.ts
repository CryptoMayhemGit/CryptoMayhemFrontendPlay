import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './top-down-shooter.component.html',
  styleUrls: ['./top-down-shooter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopDownShooterComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
