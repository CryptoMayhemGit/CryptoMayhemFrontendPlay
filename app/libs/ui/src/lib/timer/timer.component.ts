import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { scan, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'ui-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() startTime: number = 0;
  @Output() complete = new EventEmitter<void>();

  private now = Date.now();

  timer$!: Observable<number>;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.timer$ = timer(0, 1000).pipe(
      scan((acc) => acc - 1000, this.startTime - this.now),
      takeWhile((x) => x >= 0)
    );
    this.timer$.subscribe({
      complete: () => this.complete.emit(),
    });
  }

  ngOnDestroy(): void {}
}
