import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "@crypto-mayhem-frontend/utility/pipes";
import { TranslocoModule } from "@ngneat/transloco";
import { AdriaTokenModule } from "../adria-token/adria-token.module";
import { HeaderGradientModule } from "../header-gradient/header-gradient.module";
import { MainButtonModule } from "../main-button/main-button.module";
import { OrderHighlightModule } from "../order-highlight/order-highlight.module";
import { RadioButtonModule } from "../radio-button/radio-button.module";
import { SpinnerModule } from "../spinner/spinner.module";
import { TabNavigatorModule } from "../tab-navigator/tab-navigator.module";
import { TimerModule } from "../timer/timer.module";
import { VotingResultItemModule } from "../voting-result-item/voting-result-item.module";
import { DaoVotingDetailComponent } from "./dao-voting-detail.component";

@NgModule({
    declarations: [DaoVotingDetailComponent],
    imports: [
        CommonModule,
        HeaderGradientModule,
        TimerModule,
        RadioButtonModule,
        VotingResultItemModule,
        TranslocoModule,
        FormsModule,
        ReactiveFormsModule,
        MainButtonModule,
        OrderHighlightModule,
        AdriaTokenModule,
        TabNavigatorModule,
        PipesModule,
        SpinnerModule
    ],
    exports: [DaoVotingDetailComponent]
})
export class DaoVotingDetailModule {}