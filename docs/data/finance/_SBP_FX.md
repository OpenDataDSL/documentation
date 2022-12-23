## Overview

![](/img/data/sbp.png)

All the rates are based on the Pakistan Rupee (PKR) - click [here](/docs/data/fx) for more information on the Foreign Exchange markets.

## File Collection

State Bank of Pakistan Weighted Average Customer Exchange Rates from [https://www.sbp.org.pk/ecodata/rates/war/2020/Nov/11-Nov-2020.pdf](https://www.sbp.org.pk/ecodata/rates/war/2020/Nov/11-Nov-2020.pdf)

### Schedule

Process is scheduled to run at 14:15 GMT on business days.

### Sample File

![](/attachments/216367314/229572805.png)

### Type

The SBP FX Rates are stored under the type #ForeignExchange

### Data ID and Name

Example data id and name:

|Data Id|Name|
|-|-|
|#SBP_FX.USDPKR|Bank of Pakistan Exchange Rates|

### Attributes

|Name|Value|
|-|-|
|Source|SBP|
|Source Name|State Bank of Pakistan|
|Name|State Bank of Pakistan Weighted Average Customer Exchange Rates US Dollar Per Pakistan Rupee|
|Description|State Bank of Pakistan Weighted Average Customer Exchange Rates US Dollar Per Pakistan Rupee|
|Dataset|SBP_FX|
|Dataset Name|State Bank of Pakistan Foreign Exchange Rates|
|Market|Financial|
|Commodity|Exchange Rates|
|Product|FX Spot|
|Location|Pakistan|
|Region|Asia|
|Quote Calendar|HPK|

### Validation

Data is validated for missing data points using the Pakistan Bank holiday calendar for expected absences.

### Licensing

Data is freely available from the SBP website and can be used by clients without permissions.

