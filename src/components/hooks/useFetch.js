import { useState, useEffect } from 'react';
import { fetchData } from '../util/fetchData';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      fetchData(url).then((data) => setData(data));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading };
};
