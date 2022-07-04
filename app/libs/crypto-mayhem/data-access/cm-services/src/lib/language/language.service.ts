import { Injectable } from '@angular/core';
import { Language } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languages: Array<Language> = [
    {
      symbol: 'en',
      name: 'ENGLISH',
      flag: './assets/flags/en.svg',
    },
    {
      symbol: 'pl',
      name: 'POLISH',
      flag: './assets/flags/pl.svg',
    },
  ];

  constructor() {}

  getLanguage(languageSymbol: string) {
    return this.languages.find(
      (language) => language.symbol === languageSymbol
    );
  }

  getAll() {
    return this.languages;
  }
}
