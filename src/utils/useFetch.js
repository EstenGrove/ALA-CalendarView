import { useState } from "react";
import { test } from "../auth/auth_env";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  async function makeRequest(
    url,
    token,
    method = "GET",
    params = {},
    callback = null
  ) {
    url += "?" + new URLSearchParams(params);

    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method: method,
        headers: new Headers({
          Authorization: "Basic " + btoa(test.user + ":" + test.password),
          SecurityToken: token,
          "Content-Type": "application/json; charset=utf-8"
        })
      });
      const json = await res.json();
      console.log(json);

      setIsLoading(false); // reset loading state
      setError(null); // reset error state

      return json.Data && callback ? callback() : json;
    } catch (err) {
      setIsLoading(false); // reset loading state
      setError(err); // set error state

      return console.log("An error occured: " + err);
    }
  }

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    data,
    setData,
    makeRequest
  };
};
