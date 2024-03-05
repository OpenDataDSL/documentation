### Schedule

JAO auctions day ahead power updates are retrieved around 11:00 GMT daily.

### Sample File

[Sample file for JAO Power Day Ahead Updates](pathname:///file-samples/JAO_CH_IT_Daily_28Feb.xlsx) 

### Type

JAO Power day ahead data is stored under the type: #Electricity

|**Data Id**|**Name**|
|-|-|
|#JAO.EL.DE-CH.DAILY|Joint Allocation Office Daily Auction Prices for Border DE-CH|


### Daylight Savings Treatment

The hourly power updates are provided by HENEX in CET. These are loaded to ODSL database in UTC.

During the change to summertime HENEX delivers 23hourly pricing and volume updates. These are adjusted to the correct UTC hours during the Summer time changeover.

During the change to Winter time HENEX delivers 25 hourly updates. These are adjusted to the correct UTC hours during the Winter time changeover.

### Attributes
|Name|Value|
|-|-|
|Source|JAO|
|Source Name|Joint Allocation Office|
|Dataset|JAO_EL_DA|
|Dataset Name|Joint Allocation Office Actions Day Ahead Prices|
|Currency|EUR|
|Unit|MWH|
|Frequency|Hourly|
|Market|Day Ahead|
|Commodity|Power|
|Location|Luxembourg|
|Quote Calendar|Hourly|
|Expiry Calendar|REOD|

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available in the vendor website and can be used by clients without permissions.