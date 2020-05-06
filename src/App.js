import React, { useEffect } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import useApiFetcher from "./api/useApiFetcher";

const App = () => {
  const url = "https://covid19.mathdro.id/api";
  const [{ data, loading, error }, makeRequest] = useApiFetcher(url, {
    verb: "get",
  });

  useEffect(() => {
    makeRequest();
  }, [url]);

  return (
    <div className={styles.container}>
      {loading ? <h2>Loading</h2> : data && <Cards data={data} />}
      {/* {loading ? <h2>Loading...</h2> : console.log(data)} */}
      {error && console.log(error)}
      <CountryPicker />
      <Chart />
    </div>
  );
};

export default App;
