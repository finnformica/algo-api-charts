import React, { useState, useEffect } from "react";

const useRequest = (initUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        setError({});
        const response = await fetch(initUrl);
        if (!ignore) setData(await response.json());
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [initUrl]);

  return { data, loading, error };
};

export default useRequest;
