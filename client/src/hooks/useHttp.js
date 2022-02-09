import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sendHttpRequest = useCallback(async (options, applyData) => {
    try {
      const res = await axios({
        url: options.url,
        method: options.method ? options.method : 'get',
        headers: options.headers ? options.headers : {},
        data: options.data ? JSON.stringify(options.data) : null,
        cancelToken: options.cancelToken ? options.cancelToken : null,
      });
      if (res.statusText !== 'OK') {
        throw new Error('Request failed!');
      }
      setIsLoading(false);
      applyData(res.data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch has been cancelled!');
        return;
      }
      setIsLoading(false);
      setError(error.message || 'Something went wrong!');
    }
  }, []);

  return {
    isLoading,
    error,
    sendHttpRequest,
  };
};
