## Overview

![](/img/data/sarb.png)

All the rates are based on the South African Rand (SAR) - click [here](/docs/data/fx) for more information on the Foreign Exchange markets.

## File Collection

Collect South African Reserve Bank Daily Exchange Rates from [Selected Historical Rates (resbank.co.za)](https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/selected-historical-rates)

### Schedule

Process is scheduled to collect data at 14:00 GMT on business days.

### Sample File

Excerpts of input file for date 17/11/2020 is provided below.

Indicators where [Rand per US Dollar](https://wwwrs.resbank.co.za/webindicators/ExchangeRateDetail.aspx?DataItem=EXCX135D) results in #SARB_FX.USDZAR where Base=USD and Currency=ZAR

Another set of indicators , [India: Rupee per Rand](https://wwwrs.resbank.co.za/webindicators/ExchangeRateDetail.aspx?DataItem=EXCB123D) results in #SARB_FX.ZARINR where Base=ZAR and Currency=INR

![](/attachments/216367329/216367350.png)

## Type

The SARB FX Rates are stored under the type #ForeignExchange

### Data ID and Name

Example data id and name:

|Data Id|Name|
|-|-|
|#SARB_FX.USDZAR|South African Reserve Bank Daily Exchange Rates US Dollar Per South African Rand|

### Attributes

|Name|Value|
|-|-|
|Source|SARB|
|Source Name|South African Reserve Bank|
|Name|South African Reserve Bank Daily Exchange Rates US Dollar Per South African Rand|
|Description|South African Reserve Bank Daily Exchange Rates US Dollar Per South African Rand|
|Dataset|SARB_FX|
|Dataset Name|South African Reserve Bank Foreign Exchange Rates|
|Market|Financial|
|Commodity|Exchange Rates|
|Product|FX Spot|
|Location|South Africa|
|Quote Calendar|HZA|

### Validation

Data is validated for missing data points using the South African holiday calendar for expected absences.

### Licensing

Data is freely available from the SARB website and can be used by clients without permissions.

