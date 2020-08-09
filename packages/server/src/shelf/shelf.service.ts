import { createRandomString } from '../utils/create-random-string';
import { createExpiresInHours } from '../utils/create-expires-in-hourse';

import EmailSendingService from '../services/email-sending.service';
import DBService from '../db/db.service';

import ShelfUserInviteDto from './shelf-user-invite.dto'
import WrongShelfInvitationToken from '../exceptions/wrong-shelf-invitation-token.exception';

export default class ShelfService {
  private emailSendingService = new EmailSendingService();
  private dbService = new DBService();

  async inviteUser(
    { userEmail, shelfId }: ShelfUserInviteDto,
    host: string
  ): Promise<void> {
    const { SHELF_INVITATION_EXPIRY_TIME } = process.env;
    const shelfInvitationToken = createRandomString(64);
    const expiresInHours = createExpiresInHours(Number(SHELF_INVITATION_EXPIRY_TIME));

    await this.dbService.saveShelfInvitation({
      userEmail,
      shelfId,
      shelfInvitationToken,
      expiresIn: Date.now() + expiresInHours,
    })

    const existingUser = await this.dbService.getUserByEmail(userEmail)
    if (existingUser) {
      await this.emailSendingService.sendShelfInvitationMessage(
        userEmail,
        existingUser.firstName,
        host,
        shelfInvitationToken,
      );
    } else {
      await this.emailSendingService.sendShelfInvitationMessageUnknownUser(
        userEmail,
        host,
      );
    }
  }

  async acceptInvitation(shelfInvitationToken: string): Promise<void> {
    const shelfInvitation = await this.dbService.getShelfInvitationByToken(shelfInvitationToken);
    if (!shelfInvitation) {
      throw new WrongShelfInvitationToken();
    }

    const user = await this.dbService.getUserByEmail(shelfInvitation.userEmail);

    await this.dbService.saveUserToShelf(user.id, shelfInvitation.shelf.id);
    await this.dbService.deleteShelfInvitation(shelfInvitation.id);
  }

  async deleteUser(shelfId: number, userId: number): Promise<void> {
    await this.dbService.deleteUserToShelf(userId, shelfId);
  }
}
