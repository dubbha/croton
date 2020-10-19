import * as typeorm from 'typeorm';

import UserEntity from '../models/user.entity';
import EmailVerificationEntity from '../models/email-verification.entity';
import PasswordResetEntity from '../models/password-reset.entity';
import SocialProfileEntity from '../models/social-profile.entity';
import EmailResetEntity from '../models/email-reset.entity';
import ShelfEntity from '../models/shelf.entity';
import ShelfInvitationEntity from '../models/shelf-invitation.entity';
import UserToShelfEntity from '../models/user-to-shelf.entity';
import FlowerEntity from '../models/flower.entity';

import DBService from './db.service';
import { UserStatuses } from '../constants/user-statuses';
import { ProvidersIdDBFieldName } from '../providers-auth/providers-auth.interfaces';

type GetRepositoryPayload =
  | typeof UserEntity
  | typeof EmailVerificationEntity
  | typeof PasswordResetEntity
  | typeof SocialProfileEntity
  | typeof EmailResetEntity
  | typeof ShelfEntity
  | typeof ShelfInvitationEntity
  | typeof UserToShelfEntity
  | typeof FlowerEntity;

const mockUserRepository = {
  findOne: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockEmailVerificationRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockPasswordResetRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockSocialProfileRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockResetEmailRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockShelfRepository = {
  findOne: jest.fn(),
};

const mockShelfInvitationRepository = {
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockUserToShelfRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
};

const mockFlowerRepository = {
  findOne: jest.fn(),
};

const id = 123456789;
const email = 'some_mock@test.com';
const firstName = 'John';
const lastName = 'Doe';
const facebookId = 'someMockFacebook123456765';
const password = 'qwertyu12345678';
const status = UserStatuses.PENDING_VERIFICATION;
const emailVerificationToken = 'emailVerificationToken';
const passwordResetToken = 'passwordResetToken';
const emailResetToken = 'emailResetToken';
const shelfInvitationToken = 'shelfInvitationToken';

const mockUser = {
  id,
  email,
  firstName,
  lastName,
  password,
  status,
} as UserEntity;

const mockBaseUserRelatedEntity = {
  id: 987654321,
  userId: id,
  expiresIn: 100050005,
};

const mockEmailVerificationEntity = {
  ...mockBaseUserRelatedEntity,
  emailVerificationToken,
};

const mockResetEmailEntity = {
  ...mockEmailVerificationEntity,
  emailResetToken,
};

const mockPasswordResetEntity = {
  ...mockBaseUserRelatedEntity,
  passwordResetToken,
};

const mockShelfInvitationEntity = {
  shelfInvitationToken,
  userEmail: email,
  expiresIn: 1234567890,
  shelfId: 42,
};

const mockUserToShelfEntity = {
  userId: 12,
  shelfId: 34,
  isAdmin: false,
};

const mockShelfEntity = {
  id: 42,
  name: 'name',
  description: 'description',
  location: 'location',
  pictureUrl: 'http://picture.url',
};

const mockGetRepository = function (entity: GetRepositoryPayload) {
  switch (entity) {
    case UserEntity:
      return mockUserRepository;
    case EmailVerificationEntity:
      return mockEmailVerificationRepository;
    case PasswordResetEntity:
      return mockPasswordResetRepository;
    case SocialProfileEntity:
      return mockSocialProfileRepository;
    case EmailResetEntity:
      return mockResetEmailRepository;
    case ShelfEntity:
      return mockShelfRepository;
    case ShelfInvitationEntity:
      return mockShelfInvitationRepository;
    case UserToShelfEntity:
      return mockUserToShelfRepository;
    case FlowerEntity:
      return mockFlowerRepository;
  }
} as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.spyOn(typeorm, 'getRepository').mockImplementation(mockGetRepository);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.spyOn(typeorm, 'getConnection').mockImplementation((() => { }) as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.spyOn(typeorm, 'EntityManager').mockImplementation(function () {
  return { getRepository: mockGetRepository };
} as any);

describe('DBService', () => {
  it('should create', () => {
    const providersAuthService = new DBService();
    expect(providersAuthService).toBeTruthy();
  });

  it('should get user by id', async () => {
    await new DBService().getUserById(id);
    expect(mockUserRepository.findOne).toBeCalledWith(id);
  });

  it('should get user by email', async () => {
    await new DBService().getUserByEmail(email);
    expect(mockUserRepository.findOne).toBeCalledWith(
      { email },
      { relations: ['socialProfile'] }
    );
  });

  it('should update user', async () => {
    await new DBService().updateUser(mockUser);
    expect(mockUserRepository.update).toBeCalledWith(id, mockUser);
  });

  it('should save user', async () => {
    await new DBService().saveUser(mockUser);
    expect(mockUserRepository.save).toBeCalledWith(mockUser);
  });

  it('should get user by social provider', async () => {
    await new DBService().getUserBySocialProvider(
      ProvidersIdDBFieldName.FACEBOOK,
      facebookId
    );
    expect(mockSocialProfileRepository.findOne).toBeCalledWith({ facebookId }, { relations: ['user'] });
  });

  it('should get email verification by token', async () => {
    await new DBService().getEmailVerificationByToken(emailVerificationToken);
    expect(mockEmailVerificationRepository.findOne).toBeCalledWith({
      emailVerificationToken,
    });
  });

  it('should remove email verification', async () => {
    await new DBService().removeEmailVerification(mockEmailVerificationEntity);
    expect(mockEmailVerificationRepository.delete).toBeCalledWith(
      mockEmailVerificationEntity.id
    );
  });

  it('should create email verification', async () => {
    await new DBService().createEmailVerification(mockEmailVerificationEntity);
    expect(mockEmailVerificationRepository.save).toBeCalledWith(
      mockEmailVerificationEntity
    );
  });

  it('should get password reset by token', async () => {
    await new DBService().getPasswordResetByToken(passwordResetToken);
    expect(mockPasswordResetRepository.findOne).toBeCalledWith({
      passwordResetToken,
    });
  });

  it('should remove password reset', async () => {
    await new DBService().removePasswordReset(mockPasswordResetEntity);
    expect(mockPasswordResetRepository.delete).toBeCalledWith(
      mockPasswordResetEntity.id
    );
  });

  it('should create password reset', async () => {
    await new DBService().createPasswordReset(mockPasswordResetEntity);
    expect(mockPasswordResetRepository.save).toBeCalledWith(
      mockPasswordResetEntity
    );
  });

  it('should create email reset', async () => {
    await new DBService().createEmailReset(mockResetEmailEntity);
    expect(mockResetEmailRepository.save).toBeCalledWith(mockResetEmailEntity);
  });

  it('should find email reset by token', async () => {
    await new DBService().getEmailResetByToken(emailResetToken);
    expect(mockResetEmailRepository.findOne).toBeCalledWith({
      emailResetToken,
    });
  });

  it('should remove email reset', async () => {
    await new DBService().removeEmailReset(mockResetEmailEntity);
    expect(mockResetEmailRepository.delete).toBeCalledWith(
      mockResetEmailEntity.id
    );
  });

  it('should get shelf invitation by token', async () => {
    await new DBService().getShelfInvitationByToken(shelfInvitationToken);
    expect(mockShelfInvitationRepository.findOne).toBeCalledWith(
      { shelfInvitationToken },
      { relations: ['shelf'] },
    );
  });

  it('should save shelf invitation', async () => {
    mockShelfInvitationRepository.create
      .mockImplementationOnce(() => mockShelfInvitationEntity);
    mockShelfRepository.findOne
      .mockImplementationOnce(() => ({ id: mockShelfInvitationEntity.shelfId }));

    await new DBService().saveShelfInvitation(mockShelfInvitationEntity);

    expect(mockShelfInvitationRepository.create).toBeCalledWith(mockShelfInvitationEntity);
    expect(mockShelfRepository.findOne).toBeCalledWith(mockShelfInvitationEntity.shelfId);
    expect(mockShelfInvitationRepository.save).toBeCalledWith({
      ...mockShelfInvitationEntity,
      shelf: { id: mockShelfInvitationEntity.shelfId },
    });
  });

  it('should delete shelf invitation', async () => {
    await new DBService().deleteShelfInvitation(mockShelfInvitationEntity.shelfId);
    expect(mockShelfInvitationRepository.delete).toBeCalledWith(mockShelfInvitationEntity.shelfId);
  });

  it('should get shelf invitation by user email', async () => {
    const { userEmail } = mockShelfInvitationEntity;
    await new DBService().getShelfInvitationsByUserEmail(userEmail);
    expect(mockShelfInvitationRepository.find).toBeCalledWith({ where: { userEmail }, relations: ['shelf'] });
  });

  it('should get user-to-shelf', async () => {
    const { userId, shelfId } = mockUserToShelfEntity;
    await new DBService().getUserToShelf(userId, shelfId);
    expect(mockUserToShelfRepository.findOne).toBeCalledWith({ where: { userId, shelfId } });
  });

  it('should save user-to-shelf', async () => {
    const { userId, shelfId, isAdmin } = mockUserToShelfEntity;
    mockUserRepository.findOne
      .mockImplementationOnce(() => mockUser);
    mockShelfRepository.findOne
      .mockImplementationOnce(() => mockShelfEntity);
    mockUserToShelfRepository.count
      .mockImplementationOnce(() => 5);


    await new DBService().saveUserToShelf(userId, shelfId, isAdmin);

    expect(mockUserRepository.findOne).toBeCalledWith(userId);
    expect(mockShelfRepository.findOne).toBeCalledWith(shelfId);
    expect(mockUserToShelfRepository.count).toBeCalledWith({ where: { userId } });

    expect(mockUserToShelfRepository.save).toBeCalledWith({
      user: mockUser,
      shelf: mockShelfEntity,
      isAdmin: false,
      order: 5,
    });
  });

  it('should delete user-to-shelf', async () => {
    const { userId, shelfId } = mockUserToShelfEntity;
    mockUserRepository.findOne
      .mockImplementationOnce(() => mockUser);
    mockShelfRepository.findOne
      .mockImplementationOnce(() => mockShelfEntity);

    await new DBService().deleteUserToShelf(userId, shelfId);

    expect(mockUserRepository.findOne).toBeCalledWith(userId);
    expect(mockShelfRepository.findOne).toBeCalledWith(shelfId);

    expect(mockUserToShelfRepository.delete).toBeCalledWith({
      user: mockUser,
      shelf: mockShelfEntity
    });
  });

  it('should get shelf by id, including flower relations', async () => {
    await new DBService().getShelfById(id);
    expect(mockShelfRepository.findOne).toBeCalledWith(id, { relations: ['flowers'] });
  });

  it('should get flower by id', async () => {
    await new DBService().getFlowerById(id);
    expect(mockFlowerRepository.findOne).toBeCalledWith(id, { relations: ['shelf', 'images'] });
  });
});
