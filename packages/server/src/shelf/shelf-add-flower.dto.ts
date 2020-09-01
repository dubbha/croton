import { IsString, IsArray, IsOptional, IsNumber, IsObject } from 'class-validator';
import { Actions } from '../constants/actions';

export default class ShelfAddFlowerDto {
  @IsNumber()
  shelfId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  order?: number

  @IsObject()
  @IsOptional()
  rrules?: { [key in Actions]: string }

  @IsArray()
  @IsOptional()
  pictureUrls?: string[]
}
