import { IsString, IsNumber, IsOptional } from 'class-validator';
import { UserStatuses } from '../constants/user-statuses';

export default class RegistrationDto {
  @IsOptional()
  @IsNumber()
  public id?: number;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public status?: UserStatuses;
}
