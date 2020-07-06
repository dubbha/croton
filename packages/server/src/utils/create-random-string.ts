import crypto from 'crypto';

export function createRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}