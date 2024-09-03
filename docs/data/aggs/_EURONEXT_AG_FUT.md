### Schedule

The end of day updates are processed at 20:00 GMT on business days.

### Type

The data is stored as #Agriculture.

### Data ID and Name

Example data id and name:

|**Data Id**|**Name**|
|-|-|
|EURONEXT.AG.FR.CORN_EMA.FUT|Euronext Paris Corn Futures|
|EURONEXT.AG.FR.MILLING_WHEAT_EBM.FUT|Euronext Paris Milling Wheat Futures|
|EURONEXT.AG.FR.RAPESEED_ECO.FUT|Euronext Paris Rapeseed Futures|

## Expiry Calendar

Below set of expiry calendars are used in calculating rolling forward data. The expiry and rollover calendars remain same.

|Product|Expiry Calendar|Rule|
|-|-|-|
|Corn|REURONEXTEMA|18:30 on the fifth calendar day of the delivery month (if not a business day, then the following business day|
|Rapeseed|REURONEXTECO|18:30 on the last business day of the calendar month immediately preceding the delivery month|
|Milling Wheat|REURONEXTEBM|18:30 on the tenth calendar day of the delivery month (if not a business day, then the following business day)|

### Attributes

|Name|Value|
|-|-|
|Source|EURONEXT|
|Source Name|Euronext|
|Dataset|EURONEXT_AG_FUT|
|Dataset Name|Euronext Agricultural Futures|
|Currency|EUR|
|Unit|MT|
|Market|Futures|
|Commodity|Agriculture|
|Product|Grains Futures|
|Location|Paris|
|Region|Europe|
|Quote Calendar|HEURONEXT|

### Validation

Data is validated for missing data points using HEURONEXT calendar for expected absences.

### Licensing

This data requires agreement with Euronext before it can be supplied.

https://www.euronext.com/en/data/market-data/market-data-pricing-policies