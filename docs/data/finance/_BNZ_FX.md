## Overview

![](/img/data/bnz.png)

The Bank of New Zealand was founded in 1861.

All the rates are based on the New Zealand Dollar (NZD) - click [here](/docs/data/fx) for more information on the Foreign Exchange markets.

## File Collection

URL to extract Bank of New Zealand Exchange Rates is [https://www.bnz.co.nz/support/rates-and-fees/essentials/currencyselect-exchange-rates](https://www.bnz.co.nz/support/rates-and-fees/essentials/currencyselect-exchange-rates)

### Schedule

Process is scheduled at 05:00AM GMT on business days.

### Sample File

Rates under ‘YOU SEND INTL PAYMENT’ column is loaded.

![](/attachments/216367356/216367373.png)


## Type

The BNZ FX Rates are stored under the type #ForeignExchange

### Data ID and Name

Example data id and name:

|Data Id|Name|
|-|-|
|BNZ_FX.NZDINR|Bank of New Zealand Spot FX Exchange Rate New Zealand Dollar Per India Rupee|

### Attributes

|Name|Value|
|-|-|
|Source|BNZ|
|Source Name|Bank of New Zealand|
|Name|Bank of New Zealand Spot FX Exchange Rate New Zealand Dollar Per India Rupee|
|Description|Bank of New Zealand Spot FX Exchange Rate New Zealand Dollar Per India Rupee|
|Dataset|BNZ_FX|
|Dataset Name|Bank of New Zealand Foreign Exchange Rates|
|Market|Financial|
|Commodity|Exchange Rates|
|Product|FX Spot|
|Location|New Zealand|
|Quote Calendar|HNZ|

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available from the BNZ website and can be used by clients without permissions.

