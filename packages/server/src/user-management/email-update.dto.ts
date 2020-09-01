import { IsString } from 'class-validator';

export default class EmailUpdateDto {
  @IsString()
  public emailResetToken: string;

  @IsString()
  public email: string;
}
