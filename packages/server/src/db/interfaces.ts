interface CreateUserAuthEntityPayload {
  userId: string;
  expiresIn: number;
}
export interface CreateEmailVerificationPayload
  extends CreateUserAuthEntityPayload {
  emailVerificationToken?: string;
  emailResetToken?: string;
}
export interface CreatePasswordResetPayload
  extends CreateUserAuthEntityPayload {
  passwordResetToken: string;
}
