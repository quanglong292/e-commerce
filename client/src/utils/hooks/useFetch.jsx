import { useState } from "react";
import fetcher from "../helpers/fetcher";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getData = async (requestParams, body) => {
    setLoading(true);
    try {
      const data = await fetcher(requestParams, body);

      setData(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetcherHook: getData, data, loading };
};

export default useFetch;
