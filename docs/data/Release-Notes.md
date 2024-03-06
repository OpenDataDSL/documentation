## Latest Release - Mar24

#### BSP Slovenia Power Day Ahead Price and Volume [BSP](http://localhost:3000/docs/company/BSP)
#### OKTE Slovakia Power Day Ahead Price and Volume [OKTE](http://localhost:3000/docs/company/OKTE)
#### OPCOM Romania Power Day Ahead Price and Volume [OPCOM](http://localhost:3000/docs/company/OPCOM)
#### JAO Power Auction Day Ahead Price and Volume [JAO](http://localhost:3000/docs/company/JAO)

Main features:
* Added Power Day Ahead Trading Prices (EUR/MWh) and Trading Volumes (MWh) for the above datasets.
* Updates are given in hourly frequency.
* DayAhead price and volume are loaded as curves and timeseries. 
* Base,Peak and Offpeak are calculated in SmartTImeSeries from hourly updates using Block calendars.
* Timezone of the data is in CET. DST has been handled carefully.
