import { IsArray, IsNumber } from 'class-validator';

export default class ShelfAddImageDto {
  @IsNumber()
  flowerId: number;

  @IsArray()
  images: string[];
}
