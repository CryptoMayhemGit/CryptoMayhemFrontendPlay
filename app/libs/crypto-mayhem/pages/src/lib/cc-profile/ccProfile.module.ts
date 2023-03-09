import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainButtonModule, ModalBaseModule, ModalDroneModule } from "@crypto-mayhem-frontend/ui";
import { CcProfileComponent } from "./ccProfile.component";

@NgModule({
    declarations: [CcProfileComponent],
    imports: [
        CommonModule,
        FormsModule,
        ModalBaseModule,
        ModalDroneModule,
        ReactiveFormsModule,
        MainButtonModule
    ],
    exports: [CcProfileComponent],
})
export class CcProfileModule {}