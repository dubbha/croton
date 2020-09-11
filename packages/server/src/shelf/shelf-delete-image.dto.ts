import { IsArray, IsNumber } from 'class-validator';

export default class ShelfDeleteImageDto {
  @IsNumber()
  flowerId: number;

  @IsArray()
  imageIds: number[];
}
