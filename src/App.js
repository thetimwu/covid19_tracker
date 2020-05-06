import React, { useEffect } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import useApiFetcher from "./api/useApiFetcher";

const App = () => {
  const url = "https://covid19.mathdro.id/api";
  const urlDaily = "https://covid19.mathdro.id/api/daily";
  const [{ data, loading, error }, makeRequest] = useApiFetcher(url, {
    verb: "get",
  });
  const [
    { data: dataDaily, loading: loadingDaily, error: errorDaily },
    makeRequestDaily,
  ] = useApiFetcher(urlDaily, {
    verb: "get",
  });

  useEffect(() => {
    makeRequest();
    makeRequestDaily();
  }, [url]);

  return (
    <div className={styles.container}>
      <div>
        {loading ? <h2>Loading Cards</h2> : data && <Cards data={data} />}
        {error && console.log(error)}
      </div>

      {loadingDaily ? (
        <h2>Loading Chart</h2>
      ) : (
        dataDaily && <Chart data={dataDaily} />
      )}

      <div>
        <CountryPicker />
      </div>
    </div>
  );
};

export default App;
