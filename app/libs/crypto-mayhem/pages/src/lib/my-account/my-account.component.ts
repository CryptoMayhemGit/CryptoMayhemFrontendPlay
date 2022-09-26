import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isFullHD, isMobile, isSmallScreen, isTablet, scrollTo } from '@crypto-mayhem-frontend/utility/functions';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crypto-mayhem-frontend-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({
          height: '0px',
        }),
        animate('300ms 0ms ease-in', style({ height: '250px' })),
      ]),
      transition(':leave', [
        style({
          height: '250px',
          opacity: 1,
        }),
        animate('300ms 0ms ease-in', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class MyAccountComponent implements OnInit {
  searchIcon = faSearch;
  submenu = false;
  caretUp = faCaretUp;
  caretDown = faCaretDown;
  comboOpened = true;
  selectedCategory: string = '';
  selectedSection!: string;
  search = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.setNftSection('loot');

    if (isFullHD()) {
      this.submenu = true;
    }

    if (isSmallScreen()) {
      this.comboOpened = false;
    }
  }

  scrollTo(elementId: string): void {
    this.setCategory(elementId);
    scrollTo(elementId);

    if (isSmallScreen()) {
      this.comboOpened = false;
    }
  }

  onScroll(event: any): void {
    let nftSections = event.target.children;
    for (let section of nftSections) {
      
      let sectionPos = section.getBoundingClientRect();
      
      if (isMobile() && !isTablet()) {
        if(sectionPos.x  >= 0) {
          this.setNftSection(section.id);
          break;
        }
      } else {
        if (sectionPos.top > 100) {
          this.setNftSection(section.id);
          break;
        }
      }
    }
    if (event.target.scrollTop > 100) {
      this.submenu = true;
    }
  }

  setNftSection(sectionId: string) {
    this.selectedSection = sectionId;
    if(sectionId !== 'not-found') {
      this.setCategory(sectionId);
    }
    //scrollTo(`menu-${sectionId}`);
  }

  setCategory(categoryName: string) {
    this.selectedCategory = categoryName.toUpperCase();
  }
}
