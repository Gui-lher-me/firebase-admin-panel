import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback((options, applyData) => {
    setIsLoading(true);
    fetch(options.url, {
      method: options.method ? options.method : 'GET',
      headers: options.headers ? new Headers(options?.headers) : {},
      body: options.body ? JSON.stringify(options.body) : null,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Request failed!');
        }
        return res.json();
      })
      .then((data) => {
        applyData(data);
      })
      .catch((error) => {
        setHasError(error.message || 'Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    hasError,
    sendRequest,
  };
};
