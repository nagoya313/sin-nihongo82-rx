import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import login from './login';
import sessionStorage from './sessionStorage.server';
import { type User } from './types';

const authenticator = new Authenticator<User>(sessionStorage);

if (!process.env['AUTH0_CALLBACK_URL']) throw new Error('Missing AUTH0_CALLBACK_URL env');
if (!process.env['AUTH0_CLIENT_ID']) throw new Error('Missing AUTH0_CLIENT_ID env');
if (!process.env['AUTH0_CLIENT_SECRET']) throw new Error('Missing AUTH0_CLIENT_SECRET env');
if (!process.env['AUTH0_DOMAIN']) throw new Error('Missing AUTH0_DOMAIN env');

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: process.env['AUTH0_CALLBACK_URL'],
    clientID: process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    domain: process.env['AUTH0_DOMAIN'],
  },
  async ({ profile }) => login(profile)
);

authenticator.use(auth0Strategy);

export default authenticator;
