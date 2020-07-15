import { IsString } from 'class-validator';

import { UserStatuses } from '../constants/user-statuses';

import RegistrationDto from './registration.dto';

export default class SocialRegistrationDto extends RegistrationDto {
  @IsString()
  public status: UserStatuses;
}
