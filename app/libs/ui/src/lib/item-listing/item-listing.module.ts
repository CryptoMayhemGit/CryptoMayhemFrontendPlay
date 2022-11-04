import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListingComponent } from './item-listing.component';
import { SubmenuModule } from '../submenu/submenu.module';



@NgModule({
  declarations: [ItemListingComponent],
  imports: [
    CommonModule,
    SubmenuModule
  ],
  exports: [ItemListingComponent]
})
export class ItemListingModule { }
