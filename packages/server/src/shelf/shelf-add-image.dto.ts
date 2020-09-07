import { IsArray, IsNumber } from 'class-validator';

export default class ShelfAddImageDto {
  @IsNumber()
  shelfId: number;

  @IsNumber()
  flowerId: number;

  @IsArray()
  images: string[];
}
