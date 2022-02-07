import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContextProvider';
import { NewTable } from './components/NewTable';
import { Tables } from './components/Tables';
import { TableContent } from './components/TableContent';

export const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <NewTable />
      <hr />
      <h1>Tables</h1>
      <Tables />
      <h3>Table Content</h3>
      <TableContent />
    </AppContextProvider>
  );
};
