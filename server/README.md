start fetch_and_store as background process
pm2 start fetch_and_store.js --name "btc_to_usd_scraper"

stop fetch_and_store as background process
pm2 stop btc_to_usd_scraper

Delete the script from pm2 management:
pm2 delete btc_to_usd_scraper
