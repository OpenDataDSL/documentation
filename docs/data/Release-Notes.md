
## Latest Release - Feb-2025
This month release mainly includes data loading details of [TENNET](https://doc.opendatadsl.com/docs/company/TENNET)
#### TenneT Imbalance Prices
#### TenneT Settled Imbalance Volume
#### TenneT Power Measured Volume
#### TenneT Power Balance Delta Prices
#### TenneT Power Bidding Price Ladder
#### TenneT Volume of Settled aFFR and Emergency Capacity

## Sept-2024
This month release mainly includes data loading details of [ICIS](https://doc.opendatadsl.com/docs/company/ICIS)
#### ICIS ESGM Assessments
#### ICIS ESGM Indices

## Aug-2024
This month release mainly includes data loading details of [EEX](https://doc.opendatadsl.com/docs/company/EEX)
#### EEX Natural Gas Spot 
#### EEX Natural Gas Futures
#### EEX Natural Gas EGSI Futures
#### EEX Natural Gas EGSI Indices
#### EEX Power Futures
#### EEX Emissions Futures

## Jul-2024
This month release mainly includes data loading details of [EPEX](https://doc.opendatadsl.com/docs/company/EPEX)
#### EPEX Power Auction Day Ahead 
#### EPEX Power Auction Intraday
#### EPEX Power Auction Aggregated Curves
#### EPEX Power Continuous Intraday

## June-2024
This month release mainly includes data loading details of [LEBA](https://doc.opendatadsl.com/docs/company/LEBA)
#### LEBA Natural Gas Prompt 
#### LEBA Natural Gas Forwards

## Apr-2024
This month release mainly includes data loading details of  [ICE](https://doc.opendatadsl.com/docs/company/ICE)
#### ICE NDEX Power Futures
#### ICE NDEX Natural Gas Futures
#### ICE NDEX Emissions Futures
#### ICE IFEU Power Futures
#### ICE IFEU Natural Gas Futures
#### ICE IFEU Coal Futures
#### ICE IFEU Products Gas Futures
#### ICE IFEU Crudes Futures
#### ICE IFEU Emissions Futures
#### ICE IFLX Agriculture Futures
#### ICE IFSG Crudes Futures
#### ICE IFAD Products Futures

Main features:
* Relative tenors are calculated using vendor provided absolutes and expiry dates.
* Forward curves are built for all ICE products.
* Smart curves are built for power off-peak
* Natural gas futures contracts are structured in 'gas day'

## Mar-2024

#### BSP Slovenia Power Day Ahead Price and Volume [BSP](https://doc.opendatadsl.com/docs/company/BSP)
#### OKTE Slovakia Power Day Ahead Price and Volume [OKTE](https://doc.opendatadsl.com/docs/company/OKTE)
#### OPCOM Romania Power Day Ahead Price and Volume [OPCOM](https://doc.opendatadsl.com/docs/company/OPCOM)
#### JAO Power Auction Day Ahead Price and Volume [JAO](https://doc.opendatadsl.com/docs/company/JAO)

Main features:
* Added Power Day Ahead Trading Prices (EUR/MWh) and Trading Volumes (MWh) for the above datasets.
* Updates are given in hourly frequency.
* DayAhead price and volume are loaded as curves and timeseries. 
* Base,Peak and Offpeak are calculated in SmartTImeSeries from hourly updates using Block calendars.
* Timezone of the data is in CET. DST has been handled carefully.




