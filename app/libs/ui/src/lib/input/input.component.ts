import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faArrowLeft, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('100ms 0ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('100ms 0ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() value: string | number | null = null;
  @Input() placeholder: string = '';
  @Input() iconLeft!: IconDefinition;
  class: string = '';
  faTimesIcon = faTimes;
  faArrowLeft = faArrowLeft;

  public readonly inputControl = new FormControl();

  private _onChange = (value: string | null) => undefined;
  private _onTouched = () => undefined;

  @ViewChild('input') input!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.inputControl.valueChanges.subscribe((val) => {
      const fieldsAreValid = this.inputControl.valid;
      const value = fieldsAreValid ? val : null;

      this._onChange(value);
      this._onTouched();
    });
  }

  registerOnChange(fn: (value: string | null) => undefined) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => undefined) {
    this._onTouched = fn;
  }

  writeValue(value: string | null): void {
    this.inputControl.setValue(value);
  }

  clear() {
    this.inputControl.setValue(null);
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
