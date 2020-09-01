export function createShelfInvitationEmail(userName: string, redirectLink: string): string {
  return `
    Hello, ${userName}
    <br>You've been invited to help take care of a flower shelf.
    <br>Please sign in to your cabinet to accept the invitation. Alternatively you can follow the direct link below.
    <br>Please note that the invitation to the shelf expires in ${process.env.SHELF_INVITATION_EXPIRY_TIME} hours.
    <br><a href="${redirectLink}">Click here to accept the invitation</a>
  `;
}

export function createShelfInvitationEmailUnknownUser(redirectLink: string): string {
  return `
    Hello,
    <br>You've been invited to help take care of a flower shelf.
    <br>We didn't find you email in our registred users database, so please follow the link below to register.
    <br>As soon as you register and login you will see the pending invitation in you cabinet and will be able to accept it.
    <br>Please note that the invitation to the shelf expires in ${process.env.SHELF_INVITATION_EXPIRY_TIME} hours.
    <br><a href="${redirectLink}">Click here to sign up</a>
  `;
}
