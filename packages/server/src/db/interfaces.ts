interface CreateUserAuthEntityPayload {
  userId: string;
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
