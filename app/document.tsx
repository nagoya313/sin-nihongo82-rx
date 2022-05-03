import { ChakraProvider } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { useContext } from 'react';
import Layout from '~/components/layout/index';
import ClientStyleContext from '~/lib/contexts/ClientStyleContext';
import ServerStyleContext from '~/lib/contexts/ServerStyleContext';
import useClientEffect from '~/lib/hooks/useClientEffect';
import { type PropsWithChildren } from '~/lib/types/util';

type DocumentProps = PropsWithChildren & {
  title?: string;
};

const Document = withEmotionCache(({ title, children }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  useClientEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData?.reset();
  });

  return (
    <html lang="ja">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style key={key} data-emotion={`${key} ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
        ))}
      </head>
      <body>
        <ChakraProvider>
          <Layout>{children}</Layout>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default Document;
