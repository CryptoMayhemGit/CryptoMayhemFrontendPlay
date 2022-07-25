import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform the miliseconds to days, hours, minutes and seconds', () => {
    const pipe = new FormatTimePipe();
    expect(pipe.transform(1000)).toBe('0 D | 0 H | 0 M | 1 S');
    expect(pipe.transform(60000)).toBe('0 D | 0 H | 1 M | 0 S');
    expect(pipe.transform(3600000)).toBe('0 D | 1 H | 0 M | 0 S');
    expect(pipe.transform(86400000)).toBe('1 D | 0 H | 0 M | 0 S');
  });
});
