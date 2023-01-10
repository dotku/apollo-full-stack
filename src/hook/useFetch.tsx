import { useCallback, useEffect, useState } from "react";

export enum HTTPMethod {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  CONNECT = "CONNECT",
  TRACE = "TRACE",
}

/**
 * @func useFetch
 * @description useFetch will fetch the sever data when it was created and it
 * carries some utils functions, includig post, get, remove for CRUD service.
 * Due to limited time, and the complexity of update, didn't impliment U,
 * the update, or PUT request
 * @param defaultURL
 * @returns
 */

export default function useFetch<DataType>(defaultURL: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState();

  const makeFetch = useCallback(
    () =>
      (
        method: HTTPMethod = HTTPMethod.GET,
        { data, url }: { data?: object; url?: string }
      ) => {
        return fetch(url || defaultURL, {
          method,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    [defaultURL]
  );

  const post = (data: object, postURL?: string) =>
    makeFetch()(HTTPMethod.POST, { data, url: postURL || defaultURL });
  const del = (url: string) => makeFetch()(HTTPMethod.DELETE, { url });
  const query = (queryURL: string) =>
    makeFetch()(HTTPMethod.GET, { url: queryURL });
  const get = useCallback(
    () => (getURL?: string) =>
      makeFetch()(HTTPMethod.GET, { url: getURL || defaultURL }),
    [defaultURL, makeFetch]
  );

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      get()()
        .then((rsp) => rsp.json())
        .then((rsp) => setData(rsp))
        .catch((err) => setError(err))
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, [get]);

  return {
    query,
    get,
    post,
    del,
    isLoading,
    data,
    error,
  };
}
