import { useEffect, useState } from "react";

export default function useFetch<DataType>(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((rsp) => rsp.json())
      .then((rsp) => setData(rsp))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return {
    isLoading,
    data,
    error,
  };
}
