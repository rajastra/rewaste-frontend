import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios({
          method: requestConfig.method ? requestConfig.method : 'GET',
          url: BASE_URL + requestConfig.url,
          headers: requestConfig.headers ? requestConfig.headers : {},
          data: requestConfig.body ? requestConfig.body : null,
        });

        const data = response.data;
        applyData(data);
      } catch (err) {
        const error = err.response.data.message;
        message.error(error);
      }
      setIsLoading(false);
    },
    [BASE_URL]
  );

  return {
    isLoading,
    error,
    sendRequest,
    setIsLoading,
  };
};

export default useHttp;
