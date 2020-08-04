import { IsString } from 'class-validator';

export default class SocialProfileDto {
  @IsString()
  public pictureUrl: string;

  @IsString()
  public facebookId?: string;

  @IsString()
  public googleId?: string;
}
