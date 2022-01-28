import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const sendRequest = useCallback((url, options) => {
    setIsLoading(true);
    fetch(url, {
      method: options?.method,
      body: options?.body,
      headers: new Headers(options?.headers),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((responseData) => {
        const loadedData = [];
        for (const item in responseData) {
          loadedData.push({
            id: item,
            product: responseData[item].product,
          });
        }
        setIsLoading(false);
        setData(loadedData);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(error.message);
      });
  }, []);

  return {
    isLoading,
    data,
    hasError,
    sendRequest,
  };
};
