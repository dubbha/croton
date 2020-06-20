import {IsString} from 'class-validator';

export default class LoginDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}
