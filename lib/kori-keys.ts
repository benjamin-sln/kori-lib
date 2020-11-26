import Mnemonic from 'bitcore-mnemonic';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

export type KoriKeyPair = EC.KeyPair;

export interface KoriKeysOptions {
  passphrase: string;
  mnemonic?: string;
}

export interface KoriKeys {
  mnemonic: string;
  keyPair: KoriKeyPair;
  address: string;
}

const koriKeys = ({ passphrase, mnemonic }: KoriKeysOptions): KoriKeys => {
  if (!passphrase) {
    throw new Error('passphrase is required');
  }
  const bip = new Mnemonic(mnemonic || Mnemonic.Words.FRENCH);
  const key = bip.toHDPrivateKey(passphrase);
  const keyPair = ec.keyFromPrivate(key.privateKey.toString('hex'));
  const address = keyPair.getPublic().encode('hex', true);
  return {
    mnemonic: bip.toString(),
    keyPair,
    address
  };
};

export default koriKeys;
