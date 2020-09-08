import { IsArray, IsNumber } from 'class-validator';

export default class ShelfDeleteImageDto {
  @IsNumber()
  shelfId: number;

  @IsArray()
  images: number[];
}
