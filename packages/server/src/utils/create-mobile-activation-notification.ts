export function createMobileActivationNotification(mobileVerificationToken: string): string {
  return `Your activation code is: ${mobileVerificationToken}`;
}
