import { redirect, type LoaderFunction } from '@remix-run/node';
import { type ValueOf } from 'type-fest';
import { home } from './home/path';
import { info } from './info/path';
import { kanji } from './kanji/path';
import { radical, radicalEdit, radicals } from './radical/path';
import { login, logout } from './user/path';

const Path = {
  home,
  login,
  logout,
  info,
  radicals,
  radical,
  radicalEdit,
  kanji,
} as const;

export default Path;

export type PathString = ValueOf<typeof Path>;

export const redirectLoader =
  (path: PathString): LoaderFunction =>
  () =>
    redirect(path);
