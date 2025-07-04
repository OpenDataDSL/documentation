## Latest release (June-2025)
This release mainly includes the addition of the following feeds and loading history:

* ENTSOE Prices of Activated Balancing Energy
* ENTSOE Volumes and Prices of Contracted Reserves
* Czech National Bank Exchange Rate Fixing
* Reserve Bank of India Foreign Exchange Reference Rates 

Additionally, this release also includes ENTSOE feeds to the dataset monitoring.

## May-2025
This release mainly includes the implementation of content monitoring for EEX feeds. The different events communicated by EEX include late uploads at the end of a trading day or updates to a historical CSV file. Our process captures these events through an RSS feed for SFTP monitoring.

Additionally, this release also includes setting up smart loader for EEX EGSI Futures, Power and Gas Futures

## Apr-2025
This release primarily includes adding data feeds to dataset monitoring.
* Testing Dataset Monitoring  
* Adding Completeness (based on the number of expected tenors) and Quality Checks for FX rates, Power and Gas Forward Curves, Intra-day updates, Gas and Power Indices
* Testing Smart Loading Service provided in the Dataset Monitoring with EEX feeds

## Mar-2025
This release mainly includes the addition of ENTSOE datasets and loading history.
* Load - Actual and Day Ahead Total Load are loaded for all major bidding zones
* Balance - Imbalance Price and Total Volume, Cross Border Balancing for all major areas are covered
* Generation - Forecast Day Ahead, Actual Generation per Unit and Production Type, Installed capacity per Production Type for all major areas
* Transmission - Cross-Border Physical Flow, Day-ahead Prices, Forecasted Transfer Capacities - Day Ahead for major control areas
* Outages - Unavailability in Transmission Grid, Offshore Grid, Production & Generation Unit, and Aggregated unavailability of Consumption Units

## Feb-2025
This release mainly includes addition of the [TENNET](https://doc.opendatadsl.com/docs/company/TENNET) feeds
* TenneT Imbalance Prices
* TenneT Settled Imbalance Volume
* TenneT Power Measured Volume
* TenneT Power Balance Delta Prices
* TenneT Power Bidding Price Ladder
* TenneT Volume of Settled aFFR and Emergency Capacity
* History loading for EEX Natural Gas EGSI Indices

## Jan-2025
This release includes, 
* Corrections for ICIS  Price Assessments and Indices
* Loading history for ICE Endex Futures

## Dec-2024
This release includes the history data loading for following feeds,
* EPEX Power Auction Day Ahead and Intraday Prices
* EPEX Power Intraday Continuous Indices
* LEBA Natural Gas Indices

## Nov-2024
This release includes the history data loading for following feeds,
* EEX Natural Gas Futures
* EEX Natural Gas EGSI Futures
* EEX Power Futures
* ICIS Natural Gas Indices

## Oct-2024
This release mainly includes addition of the [ICIS](https://doc.opendatadsl.com/docs/company/ICIS) feeds
* ICIS ESGM Assessments
* ICIS ESGM Indices

Main features:
* Relative tenors are calculated using vendor provided absolutes and contract details.
* Forward curves are built for all ICIS Indices.

## Aug-2024
This month release mainly includes addition of the [EEX](https://doc.opendatadsl.com/docs/company/EEX) feeds
* EEX Natural Gas Spot 
* EEX Natural Gas Futures
* EEX Natural Gas EGSI Futures
* EEX Natural Gas EGSI Indices
* EEX Power Futures
* EEX Emissions Futures

Main features:
* Relative tenors are calculated using vendor provided absolutes and contract details.
* Forward curves are built for all EEX products.
* Smart curves are built for power off-peak
* Natural gas futures contracts are structured in 'gas day'

## Jul-2024
This release mainly includes addition of the [EPEX](https://doc.opendatadsl.com/docs/company/EPEX) feeds
* EPEX Power Auction Day Ahead 
* EPEX Power Auction Intraday
* EPEX Power Auction Aggregated Curves
* EPEX Power Continuous Intraday

Main features:
* Added Power Day Ahead and Intraday Trading Prices (EUR/MWh) and Trading Volumes (MWh) for the above datasets.
* Updates are given in hourly,halfhourly and quarterhourly frequency are loaded as curves and timeseries.
* Base,Peak and Offpeak are calculated in SmartTImeSeries from given updates using Block calendars.
* Timezone of the data is in CET. DST has been handled carefully.
* Reports are generated for aggregated curves.

## June-2024
This release mainly includes addition of the [LEBA](https://doc.opendatadsl.com/docs/company/LEBA) feeds
* LEBA Natural Gas Prompt 
* LEBA Natural Gas Forwards
* Bloomberg Forward FX and IR snapshots and daily end of day updates
* Bloomberg Oil, Products and Emissions forwards snapsot

Main features:
* Relative tenors are calculated using vendor provided absolutes and contract details.
* Forward curves are built for all ICIS Indices Bloomberg Forwards.

## May-2024
This release mainly includes addition of the [ICE](https://doc.opendatadsl.com/docs/company/ICE) feeds
* ICE NDEX Power Futures
* ICE NDEX Natural Gas Futures
* ICE NDEX Emissions Futures
* ICE IFEU Power Futures
* ICE IFEU Natural Gas Futures
* ICE IFEU Coal Futures
* ICE IFEU Products Futures
* ICE IFEU Crudes Futures
* ICE IFEU Emissions Futures
* ICE IFLX Agriculture Futures
* ICE IFSG Crudes Futures
* ICE IFAD Products Futures

Main features:
* Relative tenors are calculated using vendor provided absolutes and contract details.
* Forward curves are built for all the ICE products.
* Smart curves are built for power off-peak
* Natural gas futures contracts are structured in 'gas day'

## Apr-2024
This release includes addition of following datafeeds:
* National Grid UK Gas Daily System Price (SAP & SMP)
* Energinet Denmark Power Day Ahead Prices
* Netztransparenz Index Balancing Energy Price (ID AEP)
* Netztransparenz Uniform Balancing Energy Price (reBAP)
* Netztransparenz Network Control Network Balance (NRV Balance)

## Mar-2024
This release includes addition of following datafeeds:

* BSP Slovenia Power Day Ahead Price and Volume [BSP](https://doc.opendatadsl.com/docs/company/BSP)
* OKTE Slovakia Power Day Ahead Price and Volume [OKTE](https://doc.opendatadsl.com/docs/company/OKTE)
* OPCOM Romania Power Day Ahead Price and Volume [OPCOM](https://doc.opendatadsl.com/docs/company/OPCOM)
* JAO Power Auction Day Ahead Price and Volume [JAO](https://doc.opendatadsl.com/docs/company/JAO)

Main features:
* Added Power Day Ahead Trading Prices (EUR/MWh) and Trading Volumes (MWh) for the above datasets.
* Updates are given in hourly frequency.
* DayAhead price and volume are loaded as curves and timeseries. 
* Base,Peak and Offpeak are calculated in SmartTImeSeries from hourly updates using Block calendars.
* Timezone of the data is in CET. DST has been handled carefully.



