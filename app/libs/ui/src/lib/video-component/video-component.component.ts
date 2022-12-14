import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ui-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponentComponent implements OnInit {
  @Input() title!: string;
  @Input() btnSecondaryTxt!: string;
  @Input() btnPrimaryTxt!: string;
  @Input() videoId!: string;
  @Input() disabled = false;

  @Output() primaryClickEvent = new EventEmitter();
  @Output() secondaryClickEvent = new EventEmitter();

  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const url = `https://www.youtube.com/embed/${this.videoId}?autoplay=0&amp;showinfo=0&amp;controls=1&amp;iv_load_policy=3&amp;modestbranding=1&amp;rel=0`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  primaryClick() {
    this.primaryClickEvent.emit();
  }

  secondaryClick() {
    this.secondaryClickEvent.emit();
  }
}
