import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, ViewContainerRef } from "@angular/core";
import { TooltipComponent } from "./tooltip.component";

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip = '';
  @Input() direction: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private componentRef: ComponentRef<TooltipComponent> | undefined;

  constructor(
    private elementRef: ElementRef,
    private vcRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.componentRef) {
      this.componentRef = this.vcRef.createComponent(TooltipComponent);
      this.componentRef.instance.tooltip = this.tooltip;
      this.componentRef.instance.direction = this.direction;
      const { offsetHeight, offsetWidth } = this.elementRef.nativeElement;
      const { left, right, top } = this.elementRef.nativeElement.getBoundingClientRect();
      if(this.direction === 'bottom') {
        this.setBottom(left, right, offsetHeight);
      } else if(this.direction === 'left') {
        this.setLeft(left, top, offsetWidth, offsetHeight);
      }
    }
  }

  setBottom(left: number, right: number, offsetHeight: number) {
    this.componentRef!.instance.left = (right - left) / 2 + left;
    this.componentRef!.instance.marginTop = offsetHeight / 2;
  }

  setLeft(left: number, top: number, offsetWidth: number, offsetHeight: number) {
    this.componentRef!.instance.left = left - (offsetWidth/2);
    this.componentRef!.instance.top = offsetHeight / 2;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
