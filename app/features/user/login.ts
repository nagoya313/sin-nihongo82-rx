import { type Auth0Profile } from 'remix-auth-auth0';
import { type User } from './types';

const login = async (profile: Auth0Profile): Promise<User> => ({
  email: profile.emails[0].value,
  displayName: profile.displayName,
  picture: profile.photos[0].value,
});

export default login;
