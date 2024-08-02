import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchData } from "../services/api";
import "chartjs-adapter-moment";

const ChartComponent = ({ symbol, label }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData(symbol);
        const timestamps = data.map((row) => row.timestamp);
        const exchangeRates = data.map((row) => parseFloat(row.exchangeRate));

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label,
              data: exchangeRates,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [symbol, label]);

  return (
    <div>
      <h1>{label} Exchange Rate</h1>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                unit: "minute",
              },
            },
            y: {
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};

export default ChartComponent;
