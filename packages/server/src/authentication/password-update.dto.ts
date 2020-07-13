import { IsString } from 'class-validator';

export default class PasswordUpdateDto {
  @IsString()
  public passwordResetToken: string;

  @IsString()
  public password: string;
}
