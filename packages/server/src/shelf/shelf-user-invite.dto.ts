import { IsString, IsNumber } from 'class-validator';

export default class ShelfUserInviteDto {
  @IsString()
  userEmail: string;

  @IsNumber()
  shelfId: number;
}
