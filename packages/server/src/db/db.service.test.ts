import * as typeorm from 'typeorm';

import UserEntity from '../models/user.entity';
import EmailVerificationEntity from '../models/email-verification.entity';
import PasswordResetEntity from '../models/password-reset.entity';
import SocialProfileEntity from '../models/social-profile.entity';
import EmailResetEntity from '../models/email-reset.entity';

import DBService from './db.service';
import { UserStatuses } from '../constants/user-statuses';
import { ProvidersIdDBFieldName } from '../providers-auth/providers-auth.interfaces';

type GetRepositoryPayload =
  | typeof UserEntity
  | typeof EmailVerificationEntity
  | typeof PasswordResetEntity
  | typeof SocialProfileEntity
  | typeof EmailResetEntity;

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

const id = 'mock123456765';
const email = 'some_mock@test.com';
const firstName = 'John';
const lastName = 'Doe';
const facebookId = 'someMockFacebook123456765';
const googleId = 'someMockGoogle123456765';
const password = 'qwertyu12345678';
const status = UserStatuses.PENDING_VERIFICATION;
const emailVerificationToken = 'emailVerificationToken';
const passwordResetToken = 'passwordResetToken';
const emailResetToken = 'emailResetToken';

const mockUser = {
  id,
  email,
  firstName,
  lastName,
  facebookId,
  googleId,
  password,
  status,
};

const mockBaseUserRelatedEntity = {
  id: 'ergrthtyjyj234567',
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest
  .spyOn(typeorm, 'getRepository')
  .mockImplementation(function(entity: GetRepositoryPayload) {
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
    }
  } as any);

describe('DBService', () => {
  it('should create', () => {
    const providersAuthService = new DBService();
    expect(providersAuthService).toBeTruthy();
  });

  it('should get user by id', async () => {
    await new DBService().getUserById(id);
    expect(mockUserRepository.findOne).toBeCalledWith({ id });
  });

  it('should get user by email', async () => {
    await new DBService().getUserByEmail(email);
    expect(mockUserRepository.findOne).toBeCalledWith({ email });
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
    expect(mockSocialProfileRepository.findOne).toBeCalledWith({ facebookId });
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
});
