import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR,  } from '@angular/forms';

@Component({
  selector: 'ui-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') input!: ElementRef;

  @Input() value!: string | number;
  @Input() id!: string;
  @Input() name!: string;

  public readonly inputControl = new FormControl();

  private _onChange = (value: string | null) => undefined;
  private _onTouched = () => undefined;

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