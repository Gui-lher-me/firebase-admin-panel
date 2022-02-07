import { createContext } from 'react';

export const AppContext = createContext({
  error: null,
  isLoading: true,
  tables: [],
  rows: [],
  getRows: () => {},
  addTablesAndRows: () => {},
  deleteRow: () => {},
});
