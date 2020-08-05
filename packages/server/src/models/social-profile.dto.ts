import { IsString, IsOptional } from 'class-validator';

export default class SocialProfileDto {
  @IsString()
  public pictureUrl: string;

  @IsOptional()
  @IsString()
  public facebookId?: string;

  @IsOptional()
  @IsString()
  public googleId?: string;
}
