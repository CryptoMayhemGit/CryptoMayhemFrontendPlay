import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';
import pl from '../../../../crypto-mayhem/assets/i18n/pl.json';
import en from '../../../../crypto-mayhem/assets/i18n/en.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: {
      en,
      pl,
    },
    translocoConfig: {
      availableLangs: ['en', 'pl'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
