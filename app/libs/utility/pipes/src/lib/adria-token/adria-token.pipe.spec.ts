import { getTranslocoModule } from '@crypto-mayhem-frontend/utility/functions';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';
import { AdriaTokenPipe } from './adria-token.pipe';

describe('AdriaTokenPipe', () => {
  let pipe: AdriaTokenPipe;
  let transloco: TranslocoService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
    });
    transloco = TestBed.inject(TranslocoService);
    pipe = new AdriaTokenPipe(transloco);
  });

  it('should format amount given as a string', () => {
    expect(pipe.transform('1000000')).toBe('1M');
    expect(pipe.transform('12300500')).toBe('12.3005M');
  });

  it('should format token amount in English', () => {
    transloco.setActiveLang('en');
    expect(pipe.transform(1000000)).toBe('1M');
    expect(pipe.transform(1000000)).toBe('1M');
    expect(pipe.transform(100000000)).toBe('100M');
    expect(pipe.transform(12300500)).toBe('12.3005M');
    expect(pipe.transform(1050000)).toBe('1.05M');
  });

  it('should format token amount in Polish', () => {
    transloco.setActiveLang('pl');
    expect(pipe.transform(1000000)).toBe('1 mln');
    expect(pipe.transform(100000000)).toBe('100 mln');
    expect(pipe.transform(12300500)).toBe('12.3005 mln');
    expect(pipe.transform(1050000)).toBe('1.05 mln');
  });

  it('should not format token amount', () => {
    expect(pipe.transform(100)).toBe('100');
    expect(pipe.transform(999999)).toBe('999999');
  });
});
