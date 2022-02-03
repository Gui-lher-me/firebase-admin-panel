import { AppContextProvider } from './context/AppContextProvider';
import { NewTable } from './components/NewTable';
import { ShowTables } from './components/ShowTables';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <NewTable />
      <ShowTables />
    </AppContextProvider>
  );
};
