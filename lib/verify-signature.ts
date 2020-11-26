import cryptoHash from './crypto-hash';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

export type KoriSignature = EC.Signature;

export interface VerifySignatureOptions {
  publicKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  signature: KoriSignature;
}

const verifySignature = ({ publicKey, data, signature }: VerifySignatureOptions): boolean => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
  return keyFromPublic.verify(cryptoHash(data), signature);
};

export default verifySignature;
