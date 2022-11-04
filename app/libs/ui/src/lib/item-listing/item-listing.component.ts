import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListingComponent implements OnInit {
  @Input() title!: string;
  @Input() image!: string;
  @Input() reverse: boolean = false;
  
  constructor() {}

  ngOnInit(): void {}
}
