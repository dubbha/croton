export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  facebookId?: string;
  googleId?: string;
}
