import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isFullHD, isSmallScreen, scrollTo } from '@crypto-mayhem-frontend/utility/functions';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crypto-mayhem-frontend-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({
          transform: 'translate(0)',
          display: 'block',
        }),
        animate(
          '1000ms 500ms ease-out',
          style({ transform: 'translateY(10rem)', display: 'none' })
        ),
      ]),
    ]),
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
      if (section.getBoundingClientRect().top > 0) {
        this.setNftSection(section.id);
        break;
      }
    }
    if (event.target.scrollTop > 100) {
      this.submenu = true;
    }
  }

  setNftSection(sectionId: string) {
    this.selectedSection = sectionId;
    this.setCategory(sectionId);
    scrollTo(`menu-${sectionId}`);
  }

  setCategory(categoryName: string) {
    this.selectedCategory = categoryName.toUpperCase();
  }
}
