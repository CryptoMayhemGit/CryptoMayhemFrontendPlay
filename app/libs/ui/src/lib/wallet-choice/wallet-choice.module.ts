import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslocoModule } from "@ngneat/transloco";
import { WalletChoiceComponent } from "./wallet-choice.component";

@NgModule({
    declarations: [WalletChoiceComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
    exports: [WalletChoiceComponent]
})
export class WalletChoiceModule {}