import { createContext } from 'react';

type ServerStyleContextData = {
  key: string;
  ids: string[];
  css: string;
};

const ServerStyleContext = createContext<ServerStyleContextData[] | null>(null);

export default ServerStyleContext;
