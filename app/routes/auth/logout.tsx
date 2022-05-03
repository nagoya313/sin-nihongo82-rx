import { redirect, type ActionFunction } from '@remix-run/node';
import Path, { redirectLoader } from '~/features/path';
import sessionStorage from '~/features/user/sessionStorage.server';

export const loader = redirectLoader(Path.home);

export const action: ActionFunction = async ({ request }) => {
  if (!process.env['AUTH0_CLIENT_ID']) throw new Error('Missing AUTH0_CLIENT_ID env');
  if (!process.env['AUTH0_DOMAIN']) throw new Error('Missing AUTH0_DOMAIN env');
  if (!process.env['AUTH0_LOGOUT_URL']) throw new Error('Missing AUTH0_LOGOUT_URL env');
  if (!process.env['AUTH0_RETURN_TO_URL']) throw new Error('Missing AUTH0_RETURN_TO_URL env');

  const { destroySession, getSession } = sessionStorage;

  const session = await getSession(request.headers.get('Cookie'));
  const logoutURL = new URL(`https://${process.env['AUTH0_DOMAIN']}/v2/logout`);
  logoutURL.searchParams.set('client_id', process.env['AUTH0_CLIENT_ID']);
  logoutURL.searchParams.set('returnTo', process.env['AUTH0_RETURN_TO_URL']);

  return redirect(logoutURL.toString(), { headers: { 'Set-Cookie': await destroySession(session) } });
};
