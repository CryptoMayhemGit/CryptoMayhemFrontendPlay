import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() value: string | number | null = null;
  @Input() placeholder: string = '';
  @Input() iconLeft!: IconDefinition;

  constructor() {}

  ngOnInit(): void {}
}
