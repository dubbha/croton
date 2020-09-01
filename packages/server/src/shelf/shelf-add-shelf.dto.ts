import { IsString, IsOptional } from 'class-validator';

export default class ShelfAddShelfDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  pictureUrl?: string;
}
