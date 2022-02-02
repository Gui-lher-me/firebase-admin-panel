import { createContext } from 'react';

export const AppContext = createContext({
  addTable: () => {},
  error: null,
  isLoading: true,
  fields: [],
});
