import { Component, Input } from "@angular/core";

@Component({
    selector: 'ui-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    @Input() marginTop = 0;
    constructor() {}
}