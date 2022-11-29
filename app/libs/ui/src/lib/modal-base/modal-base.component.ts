import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
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
  ],
})
export class ModalBaseComponent implements OnDestroy, OnChanges {
  @Input() width = '26rem';
  @Input() show = false;
  @Input() showClose = true;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<boolean>();
  faxmark = faXmark;

  @ViewChild('modal') modal!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.showClose) {
      this.renderer.destroy();
      this.renderer.listen('window', 'click', (e: Event) => {
        const target = e.target as HTMLElement;
  
        if (
          !this.modal.nativeElement.contains(e.target) &&
          target.tagName === 'UI-MODAL-BASE'
        ) {
          this.closeModal();
        }
      });
    }
  }
  

  closeModal() {
    this.close.emit(true);
  }

  ngOnDestroy(): void {
    this.renderer.destroy();
  }
}
