import { WalletShorterPipe } from "./wallet-shorter.pipe";

describe('FormatTimePipe', () => {
    it('create an instance', () => {
      const pipe = new WalletShorterPipe();
      expect(pipe).toBeTruthy();
    });
  
    it('should transform wallet address into shorter form', () => {
      const pipe = new WalletShorterPipe();
      expect(pipe.transform('0xd20A336057A940BCae44554B1B5CbC2C716bED5d')).toBe('0xd2...ED5d');
      expect(pipe.transform('')).toBe('');
      expect(pipe.transform('0xd20A336057A940BCae44554B1B5CbC212345678')).toBe('0xd2...5678');
      expect(pipe.transform('00000000000000000000000000000000000000000')).toBe('0000...0000');
    });
  });