import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
