import { Directive, ElementRef, HostListener, Input} from "@angular/core";

type Direction = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip = '';
  @Input() direction: Direction = 'bottom';

  constructor(
    private elementRef: ElementRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const { offsetWidth, offsetHeight } = this.elementRef.nativeElement;
    this.elementRef.nativeElement.style.position = 'relative';
    this.elementRef.nativeElement.appendChild(this.createTooltip(this.tooltip, offsetWidth, (offsetHeight / 4),  this.direction));
  }

  createTooltip(text: string, x: number, y: number, direction: Direction): HTMLElement {
    const div = document.createElement('div');
    const textNode = document.createElement('p');
    textNode.innerText = text;
    div.appendChild(textNode);
    div.classList.add('tooltip', direction);
    div.style.position = 'absolute';

    if (direction === 'bottom') {
      div.style.left = x * -1 + 'px';
    } else if (direction === 'left') {
      div.style.top = y + 'px';
    } else if (direction === 'right') {
      div.style.top = x / 2 * -1 + 'px';
    }
    return div;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const tooltip = document.querySelector('.tooltip');
    if(tooltip) {
      tooltip.remove();
    }
  }
}
