import React from "react";
import ChartComponent from "../components/ChartComponent";

const AnalyticsPage = () => {
  return (
    <div>
      <ChartComponent symbol="btc_to_usd" label="BTC to USD" />
      {/* Add more ChartComponents for other symbols as needed */}
    </div>
  );
};

export default AnalyticsPage;
