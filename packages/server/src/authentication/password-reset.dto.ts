import { IsString } from 'class-validator';

export default class PasswordResetDto {
  @IsString()
  public email: string;
}
