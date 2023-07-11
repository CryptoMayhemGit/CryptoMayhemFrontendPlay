import { Component } from "@angular/core";

@Component({
    selector: "ui-vesting",
    templateUrl: "./vesting.component.html",
    styleUrls: ["./vesting.component.scss"]
})
export class VestingComponent {
    public details = [
        'VESTING.INFO.DETAILS.1',
        'VESTING.INFO.DETAILS.2',
        'VESTING.INFO.DETAILS.3',
        'VESTING.INFO.DETAILS.4',
    ];
    constructor() {}
}