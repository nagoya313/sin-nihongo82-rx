import { type LoaderFunction } from '@remix-run/node';
import authenticator from '~/features/user/authenticator.server';

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate('auth0', request, {
    successRedirect: '/',
    failureRedirect: '/',
  });
};
