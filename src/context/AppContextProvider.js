import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHttp } from '../hooks/useHttp';
import { AppContext } from './AppContext';

const transformData = (data) => {
  const rows = [];
  for (const item in data) {
    rows.push({
      id: item,
      name: data[item].name, // hard coded
      age: data[item].age, // hard coded
    });
  }
  return rows;
};

export const AppContextProvider = ({ children }) => {
  const { sendHttpRequest, hasError: error, isLoading } = useHttp();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    // I am only fetching the users table for now
    (async () => {
      await sendHttpRequest(
        {
          url: `https://frontly-acb60-default-rtdb.firebaseio.com/users.json`,
          cancelToken: source.token,
        },
        (data) => {
          setRows(transformData(data));
        }
      );
    })();
    return () => source.cancel();
  }, [sendHttpRequest]);

  const addTable = async (fields, table) => {
    const data = fields.reduce(
      (obj, item) => Object.assign(obj, { [item.column]: item.value }),
      {}
    );
    // Add a table of tables
    await sendHttpRequest(
      {
        url: `https://frontly-acb60-default-rtdb.firebaseio.com/tables.json`,
        headers: { 'Content-Type': 'application/json' },
        data: { name: table },
        method: 'post',
      },
      (response) => console.log(response)
    );
    // Add a table
    await sendHttpRequest(
      {
        url: `https://frontly-acb60-default-rtdb.firebaseio.com/${table}.json`,
        headers: { 'Content-Type': 'application/json' },
        data: data,
        method: 'post',
      },
      (response) => console.log(response)
    );
    toast.success('Table create successfully.');
  };

  const context = {
    addTable,
    error,
    isLoading,
    rows,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
