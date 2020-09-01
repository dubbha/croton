import { IsString } from 'class-validator';

export default class NotificationRegisterDto {
  @IsString()
  public registrationToken: string;
}
