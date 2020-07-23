import { IsString } from 'class-validator';
import { UserStatuses } from '../constants/user-statuses';

export default class RegistrationDto {
  @IsString()
  public id?: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public status?: UserStatuses;
}
