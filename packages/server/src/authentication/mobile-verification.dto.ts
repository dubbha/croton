import { IsString } from 'class-validator';

export default class MobileVerificationDto {
  @IsString()
  public mobileVerificationToken: string;
}
