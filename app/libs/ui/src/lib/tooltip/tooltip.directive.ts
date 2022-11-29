import { Directive, ElementRef, HostListener, Input} from "@angular/core";

type direction = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip = '';
  @Input() direction: direction = 'bottom';

  constructor(
    private elementRef: ElementRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const { offsetWidth, offsetHeight } = this.elementRef.nativeElement;
    this.elementRef.nativeElement.style.position = 'relative';
    this.elementRef.nativeElement.appendChild(this.createTooltip(this.tooltip, offsetWidth, (offsetHeight / 4),  this.direction));
  }

  createTooltip(text: string, x: number, y: number, direction: direction): HTMLElement {
    let div = document.createElement('div');
    let textNode = document.createElement('p');
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
    let tooltip = document.querySelector('.tooltip');
    if(tooltip) {
      tooltip.remove();
    }
  }
}
