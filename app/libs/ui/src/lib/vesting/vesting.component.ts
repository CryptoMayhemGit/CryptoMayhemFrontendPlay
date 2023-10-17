import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable, of } from 'rxjs';
import { VestingFacade,  } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/vesting";

@Component({
    selector: "ui-vesting",
    templateUrl: "./vesting.component.html",
    styleUrls: ["./vesting.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VestingComponent
{
    spinnerLargeActive$: Observable<boolean> = of(true);
    tokenCount$!: Observable<string>;
    public details = [
        'VESTING.INFO.DETAILS.1',
        'VESTING.INFO.DETAILS.2',
        'VESTING.INFO.DETAILS.3'
    ];

    constructor(private readonly vestingFacade: VestingFacade) 
    {    
        this.tokenCount$ = this.vestingFacade.signedIn$;
        this.spinnerLargeActive$ = this.vestingFacade.vestingLargeSpinnerActive$;
    }

    isPositive (value: string | null): number {
      const valueString = value || "0"
      return parseInt(valueString, 10);
    }
}