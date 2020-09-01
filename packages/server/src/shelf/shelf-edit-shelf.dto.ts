import { IsNumber } from 'class-validator';
import ShelfAddShelfDto from './shelf-add-shelf.dto';

export default class ShelfEditShelfDto extends ShelfAddShelfDto {
  @IsNumber()
  id: number;
}
