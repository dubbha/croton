import { IsNumber } from 'class-validator';

export default class ShelfGetPendingInvitesDto {
  @IsNumber()
  shelfId: number;
}
