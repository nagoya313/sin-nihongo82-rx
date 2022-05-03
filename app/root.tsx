import { Text } from '@chakra-ui/react';
import {
  type ErrorBoundaryComponent,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';
import { Outlet, useCatch } from '@remix-run/react';
import PageInfo from '~/components/elements/PageInfo';
import authenticator from '~/features/user/authenticator.server';
import Document from './document';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return { user };
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: '新日本語',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstaticom' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
  },
];

export const CatchBoundary = () => {
  const caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title="新日本語｜404">
          <PageInfo avatar="404" title="Page Not Found" />
          <Text mt={4}>お探しのページは見つかりませんでした。</Text>
        </Document>
      );

    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  return (
    <Document title="新日本語｜500">
      <PageInfo avatar="500" title="Internal Server Error" />
      <Text mt={4}>なんらかのエラーが発生しました。</Text>
    </Document>
  );
};

const App = () => (
  <Document>
    <Outlet />
  </Document>
);

export default App;
