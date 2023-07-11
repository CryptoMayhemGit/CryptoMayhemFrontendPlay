import { Component } from "@angular/core";

@Component({
    selector: "ui-staking",
    templateUrl: "./staking.component.html",
    styleUrls: ["./staking.component.scss"]
})
export class StakingComponent {
    presaleEndTime = new Date(Date.UTC(2023, 11, 28, 10, 0, 0)).getTime();
    constructor() { }
}