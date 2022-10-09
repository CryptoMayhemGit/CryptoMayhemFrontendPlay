import { BnbTokenPipe } from './bnb-token.pipe';

describe('BnbTokenPipe', () => {
  let pipe: BnbTokenPipe;

  beforeAll(() => {
    pipe = new BnbTokenPipe();
  });

  it('should format BNB token amount', () => {
    expect(pipe.transform(1.1234567)).toBe('1.12345');
    expect(pipe.transform(10.1234567)).toBe('10.1234');
  });

  it('should not format BNB token amount', () => {
    expect(pipe.transform(0.1234)).toBe('0.1234');
    expect(pipe.transform(0.12345)).toBe('0.12345');
    expect(pipe.transform(1.1)).toBe('1.1');
  });
});
