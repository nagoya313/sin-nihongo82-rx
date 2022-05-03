import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import ClientStyleContext from '~/lib/contexts/ClientStyleContext';
import useEmotionCache from '~/lib/hooks/useEmotionCache';
import { type PropsWithChildren } from '~/lib/types/util';

type ClientCacheProviderProps = PropsWithChildren;

const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const { cache, reset } = useEmotionCache();

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
};

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
);
