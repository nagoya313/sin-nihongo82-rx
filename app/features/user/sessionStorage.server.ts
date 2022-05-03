import { createCookieSessionStorage } from '@remix-run/node';

if (!process.env['SESSION_KEY']) throw new Error('Missing SESSION_KEY env');

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env['SESSION_KEY']],
    secure: process.env.NODE_ENV === 'production',
  },
});

export default sessionStorage;
