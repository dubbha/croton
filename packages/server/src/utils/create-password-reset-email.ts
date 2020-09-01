export function createPasswordResetEmail(userName: string, redirectLink: string): string {
  return `
    Hello, ${userName}
    <br>You are about to change your password.
    Reset password link expires in ${process.env.PASSWORD_RESET_EXPIRATION_TIME} hours.
    <br><a href="${redirectLink}">Click here to reset password</a>
    <br>If it was not you, just ignore this message.
  `;
}