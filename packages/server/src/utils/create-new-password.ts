import { hash } from 'bcrypt';

export async function createNewPassword(password: string): Promise<string> {
  return await hash(password, 10)
}