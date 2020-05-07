import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = (props) => {
  const modifiedData = props.data.map((item) => ({
    confirmed: item.confirmed.total,
    deaths: item.deaths.total,
    date: item.reportDate,
  }));

  const lineChart = (
    <Line
      data={{
        labels: modifiedData.map(({ date }) => date),
        datasets: [
          {
            data: modifiedData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#333fff",
            fill: true,
          },
          {
            data: modifiedData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
          },
        ],
      }}
    />
  );

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
