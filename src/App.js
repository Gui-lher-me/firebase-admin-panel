import { AppContextProvider } from './context/AppContextProvider';
import { NewTable } from './components/NewTable';
import { ToastContainer } from 'react-toastify';
import { FieldList } from './components/FieldList';

export const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <NewTable />
      <FieldList />
    </AppContextProvider>
  );
};
