import React, { useEffect } from "react";
import useApiFetcher from "../../api/useApiFetcher";

const Chart = () => {
  const urlConfirmed = "https://covid19.mathdro.id/api/confirmed";
  const [
    { data: dataConfirmed, loading: loadingConfirmed, error: errorConfirmed },
    makeRequest,
  ] = useApiFetcher(urlConfirmed, {
    verb: "get",
  });

  //   useEffect(() => {
  //     makeRequest();
  //   }, [urlConfirmed]);

  return (
    <>
      {/* {console.log(loadingConfirmed)} */}
      {loadingConfirmed && <h1>loading</h1>}

      {!loadingConfirmed && dataConfirmed && (
        <ul>
          {dataConfirmed.map((data) => (
            <li key={data.uid}>{data.deaths}</li>
          ))}
        </ul>
      )}

      {errorConfirmed && <h1>Error</h1>}
    </>
  );
};

export default Chart;
