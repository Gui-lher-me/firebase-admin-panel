import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttp = () => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendHttpRequest = useCallback(async (options, applyData) => {
    setIsLoading(true);
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
      if ((error.name = 'AbortError')) {
        console.log('Fetch is cancelled!');
      } else {
        setIsLoading(false);
        setHasError(error.message || 'Something went wrong!');
      }
    }
  }, []);

  return {
    isLoading,
    hasError,
    sendHttpRequest,
  };
};
