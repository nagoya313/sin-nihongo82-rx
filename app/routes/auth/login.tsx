import { type ActionFunction } from '@remix-run/node';
import Path, { redirectLoader } from '~/features/path';
import authenticator from '~/features/user/authenticator.server';

export const loader = redirectLoader(Path.home);

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate('auth0', request);
};
