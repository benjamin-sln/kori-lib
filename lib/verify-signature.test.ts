import koriKeys, { KoriKeys } from './kori-keys';
import verifySignature from './verify-signature';
import cryptoHash from './crypto-hash';

describe('verifySignature()', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let one: KoriKeys, other: KoriKeys, data: any[];
  beforeEach(() => {
    data = ['data to sign'];
    one = koriKeys({ passphrase: '123' });
    other = koriKeys({ passphrase: '456' });
  });

  describe('and the signature is valid', () => {
    it('return true', () => {
      expect(verifySignature({ publicKey: one.address, data, signature: one.keyPair.sign(cryptoHash(data)) })).toBe(true);
    });
  });

  describe('and the signature is invalid', () => {
    it('return false', () => {
      expect(verifySignature({ publicKey: one.address, data, signature: other.keyPair.sign(cryptoHash(data)) })).toBe(false);
    });
  });

  describe('and the publicKey is invalid', () => {
    it('return false', () => {
      expect(verifySignature({ publicKey: other.address, data, signature: one.keyPair.sign(cryptoHash(data)) })).toBe(false);
    });
  });
});
