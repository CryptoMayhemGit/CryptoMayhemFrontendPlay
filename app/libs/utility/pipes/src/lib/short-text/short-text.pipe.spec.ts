import { ShortTextPipe } from './short-text.pipe';

describe('TextShorterPipe', () => {
  it('should transform text into shorter form', () => {
    const pipe = new ShortTextPipe();
    expect(pipe.transform('Hello World', 5)).toBe('Hello...');
    expect(pipe.transform('Hello World', 11)).toBe('Hello World');
    expect(pipe.transform('', 0)).toBe('');
  });
});
