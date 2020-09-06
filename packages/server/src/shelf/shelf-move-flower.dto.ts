import { IsNumber } from 'class-validator';

export default class ShelfMoveFlowerDto {
  @IsNumber()
  flowerId: number;

  @IsNumber()
  shelfId: number;

  @IsNumber()
  targetShelfId: number;
}
