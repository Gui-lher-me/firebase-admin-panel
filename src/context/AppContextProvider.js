import { useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHttp } from '../hooks/useHttp';
import axios from 'axios';

export const AppContextProvider = ({ children }) => {
  const { sendHttpRequest, hasError: error, isLoading } = useHttp();
  const [fields, setFields] = useState();

  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchFields = async () => {
      await sendHttpRequest(
        {
          url: `https://frontly-acb60-default-rtdb.firebaseio.com/products.json`,
          cancelToken: source.token,
        },
        (data) => {
          const loadedData = [];
          for (const item in data) {
            loadedData.push({
              id: item,
              name: data[item].name,
              price: data[item].price,
            });
          }
          setFields(loadedData);
        }
      );
    };
    fetchFields();
    return () => {
      source.cancel();
    };
  }, []);

  const addTable = async (fields, table) => {
    const data = fields.reduce(
      (obj, item) => Object.assign(obj, { [item.field]: item.value }),
      {}
    );
    await sendHttpRequest(
      {
        url: `https://frontly-acb60-default-rtdb.firebaseio.com/${table}.json`,
        headers: { 'Content-Type': 'application/json' },
        data: data,
        method: 'post',
      },
      (data) => data
    );
    toast.success('Table create successfully.');
  };

  const context = {
    addTable,
    error: error,
    isLoading: isLoading,
    fields: fields,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
