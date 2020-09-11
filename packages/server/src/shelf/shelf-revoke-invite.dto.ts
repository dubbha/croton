import { IsNumber } from 'class-validator';
import ShelfGetPendingInvitesDto from './shelf-get-pending-invites.dto';

export default class ShelfRevokeInviteDto extends ShelfGetPendingInvitesDto {
  @IsNumber()
  inviteId: number;
}
