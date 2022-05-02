import { createContext } from "react";

type ServerStyleContextData = {
  key: string;
  ids: Array<string>;
  css: string;
};

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);

type ClientStyleContextData = {
  reset: () => void;
};

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
);
