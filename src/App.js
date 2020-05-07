import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker, BarChart } from "./components";
import styles from "./App.module.css";
import useApiFetcher from "./api/useApiFetcher";
import coronaImage from "./images/corona.jpg";

const App = () => {
  const url = "https://covid19.mathdro.id/api";
  const urlDaily = url + "/daily";
  const urlContries = url + "/countries";
  const [country, setCountry] = useState("");
  const [showGlobe, setShowGlobe] = useState(true);

  const [{ data, loading, error }, makeRequest] = useApiFetcher(url, {
    verb: "get",
  });

  const [
    { data: dataDaily, loading: loadingDaily, error: errorDaily },
    makeRequestDaily,
  ] = useApiFetcher(urlDaily, {
    verb: "get",
  });

  const [
    { data: dataCountries, loading: loadingCountries, error: errorCountries },
    makeRequestCountries,
  ] = useApiFetcher(urlContries, {
    verb: "get",
  });

  const [
    { data: dataCountry, loading: loadingCountry, error: errorCountry },
    makeRequestCountry,
  ] = useApiFetcher(urlContries + `/${country}`, {
    verb: "get",
  });

  useEffect(() => {
    makeRequest();
    makeRequestDaily();
    makeRequestCountries();
    if (country && country !== "globe") {
      setShowGlobe(false);
      makeRequestCountry();
    } else if (country === "globe") {
      setShowGlobe(true);
    }
  }, [url, country]);

  return (
    <div className={styles.container}>
      <img className={styles.images} src={coronaImage} alt="corona-19" />
      <div>
        {loading ? (
          <h2>Loading Cards</h2>
        ) : (
          data && showGlobe && <Cards data={data} />
        )}
        {error && console.log(error)}
      </div>

      <div>
        {loadingCountry ? (
          <h2>Loading Country Cards</h2>
        ) : (
          dataCountry && !showGlobe && <Cards data={dataCountry} />
        )}
      </div>

      {loadingCountries ? (
        <h2>Loading CountryPicker</h2>
      ) : (
        dataCountries && (
          <CountryPicker data={dataCountries} setCountry={setCountry} />
        )
      )}

      {loadingCountry ? (
        <h2>Loading Country</h2>
      ) : (
        dataCountry &&
        !showGlobe && <BarChart data={dataCountry} country={country} />
      )}

      {loadingDaily ? (
        <h2>Loading Chart</h2>
      ) : (
        dataDaily && showGlobe && <Chart data={dataDaily} />
      )}
    </div>
  );
};

export default App;
