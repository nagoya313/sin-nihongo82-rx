import { useState } from 'react';
import createEmotionCache from '~/lib/createEmotionCache';

const useEmotionCache = () => {
  const [cache, setCache] = useState(createEmotionCache());

  return { cache, reset: () => setCache(createEmotionCache()) };
};

export default useEmotionCache;
