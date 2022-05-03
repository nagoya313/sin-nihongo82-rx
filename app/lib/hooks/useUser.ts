import { useLoaderData } from '@remix-run/react';
import { type User } from '~/models/user';

type UserLoaderData = {
  user: User;
};

const useUser = () => useLoaderData<UserLoaderData>();

export default useUser;
