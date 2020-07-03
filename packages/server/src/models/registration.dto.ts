import { IsString } from 'class-validator';

export default class RegistrationDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public facebookId?: string;

  @IsString()
  public googleId?: string;
}
