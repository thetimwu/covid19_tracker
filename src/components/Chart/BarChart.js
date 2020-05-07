import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const BarChart = (props) => {
  const { confirmed, recovered, deaths } = props.data;

  const barChart = (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${props.country}` },
      }}
    />
  );

  return <div className={styles.container}>{barChart}</div>;
};

export default BarChart;
