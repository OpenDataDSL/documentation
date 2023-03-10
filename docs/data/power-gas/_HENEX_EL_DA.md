### Schedule

HENEX day ahead power updates are retrieved around 11:00 GMT daily.

### Sample File

[Sample file for OMIE Power Day Ahead Updates](pathname:///file-samples/20220429_EL-DAM_ResultsSummary_EN_v01.xlsx) 

### Type

HENEX Power day ahead data is stored under the type: #Electricity

|**Data Id**|**Name**|
|-|-|
|#HENEX.EL.GR.MARKET_CLEARING_PRICE.GREECE_MAINLAND.DA|Hellenic Energy Exchange Power Day Ahead Spot BUY Greece Mainland Price Curve|
|#HENEX.EL.GR.DEMAND_MTU.MV_LOAD.DA|Hellenic Energy Exchange Power Day Ahead Spot Buy MV Load Price Curve|


### Daylight Savings Treatment

The hourly power updates are provided by HENEX in CET. These are loaded to ODSL database in UTC.

During the change to summertime OMIE delivers 23hourly pricing and volume updates. These are adjusted to the correct UTC hours during the Summer time changeover.

During the change to Winter time OMIE delivers 25 hourly updates. These are adjusted to the correct UTC hours during the Winter time changeover.

### Attributes
|Name|Value|
|-|-|
|Source|HENEX|
|Source Name|Hellenic Energy Exchange S.A.|
|Dataset|HENEX_EL_DA|
|Dataset Name|Hellenic Energy Exchange Greece Power Day Ahead Prices|
|Currency|EUR|
|Unit|MWH|
|Frequency|Hourly|
|Market|Day Ahead|
|Commodity|Power|
|Location|Greece|
|Quote Calendar|Hourly|
|Expiry Calendar|REOD|

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available in the vendor website and can be used by clients without permissions.
