import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { AppContext } from './AppContext';
import { db } from '../firebase.config';
import { useHttp } from '../hooks/useHttp';

export const AppContextProvider = ({ children }) => {
  const { sendHttpRequest, hasError: error, isLoading } = useHttp();
  const [tables, setTables] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    // get tables
    (async () => {
      await sendHttpRequest(
        {
          url: `http://localhost:5000/tables`,
          cancelToken: source.token,
        },
        (tables) => setTables(tables)
      );
    })();
    return () => source.cancel();
  }, [sendHttpRequest]);

  const getRows = (table) => {
    getDocs(collection(db, table))
      .then((data) => {
        const loadedData = [];
        data.docs.map((doc) => {
          loadedData.push({
            id: doc.id,
            keys: Object.keys(doc.data()),
            values: Object.values(doc.data()),
            table,
          });
        });
        setRows(loadedData);
      })
      .catch((error) => console.log(error));
  };

  const addTablesAndRows = (fields, table) => {
    const data = fields.reduce(
      (obj, item) => Object.assign(obj, { [item.column]: item.value }),
      {}
    );
    addDoc(collection(db, table), data)
      .then(() => {
        setTables((previousTables) => {
          const hasTable = previousTables.find((tab) => tab === table);
          if (hasTable) {
            toast.success('Data added to the database successfully.');
            return [...previousTables];
          }
          toast.success('Table created successfully.');
          return [...previousTables, table];
        });
        getRows(table);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Could not create database, try later!');
      });
  };

  const deleteRow = (id, table) => {
    const newRows = rows.filter((row) => row.id !== id);
    deleteDoc(doc(db, table, id))
      .then(() => setRows(newRows))
      .catch((error) => console.log(error));
  };

  const context = {
    error,
    isLoading,
    tables,
    rows,
    getRows,
    addTablesAndRows,
    deleteRow,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
