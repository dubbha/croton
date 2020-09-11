import { IsString } from 'class-validator';
import RegistrationDto from '../models/registration.dto';

export default class MobileRegistrationDto extends RegistrationDto {
  @IsString()
  public token: string;
}
