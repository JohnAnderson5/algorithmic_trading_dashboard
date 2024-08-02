const axios = require("axios");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const cron = require("node-cron");
const moment = require("moment-timezone");

// URL to fetch BTC to USD data from CoinGecko
const url =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

// CSV Writer setup
const csvWriter = createCsvWriter({
  path: "btc_to_usd.csv",
  header: [
    { id: "timestamp", title: "Timestamp" },
    { id: "exchangeRate", title: "BTC to USD" },
  ],
  append: true, // Append new data to the file
});

// Function to fetch BTC to USD price data and store in CSV
async function fetchBTCtoUSD() {
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.bitcoin && data.bitcoin.usd) {
      const exchangeRate = data.bitcoin.usd;
      console.log(`BTC to USD Exchange Rate: ${exchangeRate}`);

      // Convert the timestamp to EST and format it
      const estTime = moment().tz("America/New_York");
      const formattedTime = estTime.format("MM-DD-YY_hh:mm:ss A");

      const record = {
        timestamp: formattedTime,
        exchangeRate: exchangeRate,
      };

      await csvWriter.writeRecords([record]);
      console.log("Data successfully written to CSV");
    } else {
      console.log("Failed to fetch data.");
    }
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

// Schedule the fetch function to run every minute
cron.schedule("* * * * *", fetchBTCtoUSD);

console.log("Scheduled task to fetch BTC to USD data every minute");
