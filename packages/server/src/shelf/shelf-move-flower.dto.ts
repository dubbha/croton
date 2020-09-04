import { IsNumber } from 'class-validator';

export default class ShelfMoveFlowerDto {
  @IsNumber()
  flowerId: number;
  @IsNumber()
  currentShelfId: number;
  @IsNumber()
  targetShelfId: number;
}
