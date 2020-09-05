import { IsNumber } from 'class-validator';

export default class ShelfGetUsersDto {
  @IsNumber()
  shelfId: number;
}
