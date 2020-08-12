import { IsNumber } from 'class-validator';
import ShelfAddFlowerDto from './shelf-add-flower.dto';

export default class ShelfEditFlowerDto extends ShelfAddFlowerDto {
  @IsNumber()
  id: number;
}
