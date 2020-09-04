import { createRandomString } from '../utils/create-random-string';
import { createExpiresInHours } from '../utils/create-expires-in-hours';
import { verifyToken } from '../utils/verify-token';

import EmailSendingService from '../services/email-sending.service';
import DBService from '../db/db.service';

import ShelfUserInviteDto from './shelf-user-invite.dto';
import ShelfAddShelfDto from './shelf-add-shelf.dto';
import ShelfEditShelfDto from './shelf-edit-shelf.dto';
import ShelfAddFlowerDto from './shelf-add-flower.dto';
import ShelfEditFlowerDto from './shelf-edit-flower.dto';
import ShelfMoveFlowerDto from './shelf-move-flower.dto';

import { Actions } from '../constants/actions';

import WrongShelfInvitationToken from '../exceptions/wrong-shelf-invitation-token.exception';
import ShelfInvitation from '../models/shelf-invitation.entity';
import UserToShelf from '../models/user-to-shelf.entity';
import ShelfAddImageDto from './shelf-add-image.dto';
import ShelfDeleteImageDto from './shelf-delete-image.dto';

export default class ShelfService {
  private emailSendingService = new EmailSendingService();
  private dbService = new DBService();

  async inviteUser(
    { userEmail, shelfId }: ShelfUserInviteDto,
    host: string
  ): Promise<void> {
    const { SHELF_INVITATION_EXPIRY_TIME } = process.env;
    const shelfInvitationToken = createRandomString(64);
    const expiresInHours = createExpiresInHours(
      Number(SHELF_INVITATION_EXPIRY_TIME)
    );

    await this.dbService.saveShelfInvitation({
      userEmail,
      shelfId,
      shelfInvitationToken,
      expiresIn: Date.now() + expiresInHours,
    });

    const existingUser = await this.dbService.getUserByEmail(userEmail);
    if (existingUser) {
      await this.emailSendingService.sendShelfInvitationMessage(
        userEmail,
        existingUser.firstName,
        host,
        shelfInvitationToken
      );
    } else {
      await this.emailSendingService.sendShelfInvitationMessageUnknownUser(
        userEmail,
        host
      );
    }
  }

  async acceptInvitation(shelfInvitationToken: string): Promise<void> {
    const shelfInvitation = await this.dbService.getShelfInvitationByToken(
      shelfInvitationToken
    );
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

  async getShelfUsers(shelfId: number): Promise<UserToShelf[]> {
    return await this.dbService.getUsersToShelf(shelfId);
  }

  async addShelf(
    { name, location, description, pictureUrl = '' }: ShelfAddShelfDto,
    authToken: string
  ): Promise<void> {
    const { id: userId } = verifyToken(authToken);
    const shelf = await this.dbService.saveShelf(
      name,
      location,
      description,
      pictureUrl
    );
    await this.dbService.saveUserToShelf(userId, shelf.id, true);
  }

  async editShelf({
    id,
    name,
    location,
    description,
    pictureUrl = '',
  }: ShelfEditShelfDto): Promise<void> {
    await this.dbService.updateShelf(
      id,
      name,
      location,
      description,
      pictureUrl
    );
  }

  async deleteShelf(id: number): Promise<void> {
    await this.dbService.deleteShelf(id);
  }

  getShelves(authToken: string) {
    const { id } = verifyToken(authToken);
    const userId = Number(id);
    return this.dbService.getShelvesByUserId(userId);
  }

  async addFlower({
    shelfId,
    name,
    description,
    order,
    rrules = {
      [Actions.WATERING]: '',
      [Actions.HYDRATION]: '',
      [Actions.FERTILIZING]: '',
    },
    pictureUrls = [],
  }: ShelfAddFlowerDto): Promise<void> {
    if (order === undefined) {
      order = await this.dbService.countFlowersByShelfId(shelfId);
    }
    await this.dbService.saveFlower(
      shelfId,
      name,
      description,
      order,
      rrules,
      pictureUrls
    );
  }

  async editFlower({
    id,
    shelfId,
    name,
    description,
    order,
    rrules = {
      [Actions.WATERING]: '',
      [Actions.HYDRATION]: '',
      [Actions.FERTILIZING]: '',
    },
    pictureUrls = [],
  }: ShelfEditFlowerDto): Promise<void> {
    await this.dbService.updateFlower(
      id,
      shelfId,
      name,
      description,
      order,
      rrules,
      pictureUrls
    );
  }

  async deleteFlower(id: number): Promise<void> {
    await this.dbService.deleteFlower(id);
  }

  async addImagesToFlower({ flowerId, images }: ShelfAddImageDto): Promise<void> {
    await this.dbService.addImagesToFlower(flowerId, images);
  }

  async deleteImagesFromFlower({ images }: ShelfDeleteImageDto): Promise<void> {
    await this.dbService.deleteImagesFromFlower(images);
  }

  async moveFlower({
    currentShelfId,
    targetShelfId,
    flowerId,
  }: ShelfMoveFlowerDto) {
    return await this.dbService.moveFlower(
      flowerId,
      currentShelfId,
      targetShelfId
    );
  }

  getFlowers(shelfId: number) {
    return this.dbService.getFlowersByShelfId(shelfId);
  }

  getFlowerById(id: number) {
    return this.dbService.getFlowerById(id);
  }

  async addAction(
    { action, flowerId }: { action: Actions; flowerId: number },
    authToken: string
  ) {
    const { id: userId } = verifyToken(authToken);
    const timestamp = Math.ceil(Date.now() / 1000);
    return this.dbService.saveAction(userId, flowerId, action, timestamp);
  }

  async getLastActions(flowerId: number) {
    const lastActions = await Promise.all(
      Object.values(Actions).map(action =>
        this.dbService.getLastAction(flowerId, action)
      )
    );
    return lastActions.filter(Boolean).reduce(
      (acc, cur) => ({
        ...acc,
        [cur.action]: {
          timestamp: cur.timestamp,
          user: {
            id: cur.user.id,
            firstName: cur.user.firstName,
            lastName: cur.user.lastName,
          },
        },
      }),
      {}
    );
  }

  getActions(flowerId: number) {
    return this.dbService.getActionsByFlowerId(flowerId);
  }

  async getPendingInvites(shelfId: number): Promise<ShelfInvitation[]> {
    return await this.dbService.getShelfInvitationsByShelfId(shelfId);
  }

  async revokeInvite(inviteId: number): Promise<void> {
    await this.dbService.deleteShelfInvitation(inviteId);
  }
}
