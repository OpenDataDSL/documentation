## Overview

![](/img/data/boe.png)

SONIA is a risk-free rate (RFR) developed by The Working Group of the Bank of England as an alternative RFR for anchored transactions. SONIA was recommended by The Working Group in April 2017 as the preferred RFR and since then has been focused on how to transition to using SONIA across sterling markets. 

SONIA is a measure of the rate at which interest is paid on sterling short-term wholesale funds in circumstances where credit, liquidity and other risks are minimal. On each London business day, SONIA is measured as the trimmed mean, rounded to four decimal places, of interest rates paid on eligible sterling denominated deposit transactions.

The Bank of England (BoE) serves as the administrator for the SONIA benchmark.

website: https://www.bankofengland.co.uk/markets/sonia-benchmark

## File Collection

Daily update file is collected from BOE website: https://www.bankofengland.co.uk/boeapps/database/fromshowcolumns.asp?Travel=NIxAZxSUx&FromSeries=1&ToSeries=50&DAT=RNG&FD=1&FM=Jan&FY=2010&TD=11&TM=May&TY=2025&FNY=Y&CSVF=TT&html.x=66&html.y=26&SeriesCodes=IUDSOIA&UsingCodes=Y&Filter=N&title=IUDSOIA&VPD=Y   

### Schedule

Daily update are processed between 10.00 AM and 12.00 GMT the following London business day.

### Sample File

Sample file [sample file](pathname://../../static/file-samples/IUDSOIA-Bank-of-England-Database.csv)

## Type

Data is stored as #ForwardCurve

### Data ID and Name

Example data id and name

|**Data Id**|**Name**|
|-|-|
|BOE_IR.SONIA.GBP.IUDSOIA.FWD.ON|Sterling Overnight Interbank Average Rate Daily|

### Attributes

|Name|Value|
|-|-|
|Source|BOE|
|Source Name|Bank of England|
|Dataset|SONIA|
|Dataset Name|Sterling Overnight Interbank Average Rate|
|Market|Financial|
|Commodity|Forward Interest Rates|
|Product|IR Forwards|
|Location|United Kingdom|
|Region|Europe|
|Quote Calendar|HENG||

### Validation

Data is validated for missing data points using HENG calendar for expected absences.

### Licensing

Data is freely available from the BOE website and can be used by customers without permissions.

