import { Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR,  } from '@angular/forms';

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
export class RadioButtonComponent {
  @Input() value!: string | number;
  @Input() id!: string;
  @Input() name!: string;
}