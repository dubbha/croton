export function createEmailResetEmail(userName: string, redirectLink: string): string {
  return `
    Hello, ${userName}
    <br>You are about to change your email.
    Reset email link expires in ${process.env.EMAIL_RESET_EXPIRATION_TIME} hours.
    <br><a href="${redirectLink}">Click here to reset email</a>
    <br>If it was made by mistake, just ignore this message.
  `;
}
