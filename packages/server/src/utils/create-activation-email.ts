export function createActivationEmail(userName: string, redirectLink: string): string {
  return `
    Hello, ${userName}
    <br> Please Click on the link to verify your email.
    Verification link expires in ${process.env.EMAIL_VERIFICATION_EXPIRATION_TIME} hours.
    <br><a href="${redirectLink}">Click here to verify</a>
  `;
}