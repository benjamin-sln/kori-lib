import koriKeys, { KoriKeys } from './kori-keys';

describe('koriKeys()', () => {
  let one: KoriKeys, two: KoriKeys;

  describe('generate new keys from passphrase', () => {
    beforeEach(() => {
      one = koriKeys({ passphrase: '123' });
      two = koriKeys({ passphrase: '123' });
    });

    it('throw error if no passphrase', () => {
      const passphrase = undefined;
      expect(() => koriKeys({ passphrase })).toThrow('passphrase is required');
    });

    it('return new keys object', () => {
      expect(one).toHaveProperty('keyPair');
      expect(one).toHaveProperty('address');
      expect(one).toHaveProperty('mnemonic');
    });

    it('return different keys object from same passphrase', () => {
      expect(one).not.toEqual(two);
    });
  });

  describe('regenerate keys from passphrase and mnemonic', () => {
    let mnemonic: KoriKeys['mnemonic'], other: KoriKeys;
    beforeEach(() => {
      one = koriKeys({ passphrase: '123' });
      mnemonic = one.mnemonic;
      two = koriKeys({ passphrase: '123', mnemonic });
      other = koriKeys({ passphrase: '789', mnemonic });
    });

    it('return same keys object from same passphrase with mnemonic', () => {
      expect(one).toEqual(two);
    });

    it('return different keys object from same mnemonic but different passphrase', () => {
      expect(one).not.toEqual(other);
    });
  });
});
