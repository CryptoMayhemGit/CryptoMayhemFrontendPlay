import { NgModule } from "@angular/core";
import { VestingComponent } from "./vesting.component";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { FormsModule } from "@angular/forms";
import { ProgressBarModule } from "../progress-bar/progress-bar.module";
import { MainButtonModule } from "../main-button/main-button.module";

@NgModule({
    declarations: [VestingComponent],
    imports: [
        CommonModule,
        TranslocoModule,
        FormsModule,
        ProgressBarModule,
        MainButtonModule
    ],
    exports: [VestingComponent]
})
export class VestingModule {}