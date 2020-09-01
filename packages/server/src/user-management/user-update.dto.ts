import { IsString } from 'class-validator';

export default class UserUpdateDto {
  @IsString()
  public lastName: string;

  @IsString()
  public firstName: string;
}
