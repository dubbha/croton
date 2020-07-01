import {IsString} from 'class-validator';

export default class EmailVerificationDto {
  @IsString()
  public emailVerificationToken: string;
}
