interface CreateUserAuthEntityPayload {
  userId: number;
  expiresIn: number;
}
export interface CreateEmailRelatedPayload extends CreateUserAuthEntityPayload {
  emailVerificationToken?: string;
  emailResetToken?: string;
}
export interface CreatePasswordResetPayload
  extends CreateUserAuthEntityPayload {
  passwordResetToken: string;
}

export interface ShelfInvitationPayload {
  userEmail: string;
  shelfInvitationToken: string;
  expiresIn: number;
  shelfId: number;
}
