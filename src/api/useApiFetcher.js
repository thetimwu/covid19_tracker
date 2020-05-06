import { useCallback, useReducer } from "react";
import axios from "axios";

const apiReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "API_REQUEST_START":
      return { ...state, loading: true };
    case "API_REQUEST_SUCCESS":
      return { ...state, data: payload.data, loading: false };
    case "API_REQUEST_FAILURE":
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

const initState = {
  data: null,
  loading: false,
  error: null,
};

const useApiFetcher = (url, { verb = "get", params = {} } = {}) => {
  const [state, dispatch] = useReducer(apiReducer, initState);

  const makeRequest = useCallback(async () => {
    dispatch({ type: "API_REQUEST_START" });

    try {
      const res = await axios[verb](url, params);
      //   console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: "API_REQUEST_SUCCESS",
          payload: { data: res.data },
        });
      }
    } catch (err) {
      dispatch({ type: "API_REQUEST_FAILURE", payload: { error: err } });
    }
  }, [url, verb, params]);

  return [state, makeRequest];
};

export default useApiFetcher;
