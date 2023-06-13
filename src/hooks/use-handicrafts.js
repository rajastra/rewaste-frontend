import { useCallback, useEffect, useState } from 'react';
import useHttp from './use-http';

const useHandicraft = (id) => {
  const [handicraft, setHandicraft] = useState(null);
  const { isLoading, sendRequest } = useHttp();
  const getDetailHandicrafts = useCallback(async () => {
    sendRequest(
      {
        url: `/api/v1/handicrafts/${id}`,
        method: 'GET',
      },
      (data) => {
        setHandicraft(data.data);
      }
    );
  }, [sendRequest, id]);

  useEffect(() => {
    if (id) getDetailHandicrafts();
  }, [id, getDetailHandicrafts]);

  return {
    handicraft,
    isLoading,
  };
};

export default useHandicraft;
