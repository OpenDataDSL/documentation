### Schedule

OKTE power day ahead updates are retrieved around 11:00 GMT daily.

### Sample File

[Sample file for OKTE Power Day Ahead Updates](pathname:///file-samples/Total_results_DAM_2024-02-21_2024-02-21.xlsx)

### Type

OKTE Power day ahead data is stored under the type: #Electricity

|**Data Id**|**Name**|
|-|-|
|#OKTE.EL.SK.DA|Short-term Electricity Market Operator Slovakia Day Ahead Prices|

### Daylight Savings Treatment

The hourly power updates are provided by OKTE in CET. 

In the last Sunday of March, the transition from the wintertime to summertime takes place. The 
day will have 23 hourly intervals. In CET hours, 02:00 hrs. will become 03:00 hrs. 

During the change to summertime OKTE delivers 23hourly pricing and volume updates. These are adjusted to the correct UTC hours during the Summer time changeover.

In the last Sunday of October, the transition from the summertime to the wintertime takes place. 
That day, clock is shifted back. The day will have 25 hourly intervals. In CET hours, 03:00 hrs. will 
become 02:00. 

During the change to Winter time OKTE delivers 25 hourly updates. These are adjusted to the correct UTC hours during the Winter time changeover.

### Attributes
|Name|Value|
|-|-|
|Source|OKTE|
|Source Name|Short-term electricity Market Operator|
|Dataset|OKTE_EL_DA|
|Dataset Name|Short-term electricity Market Operator Slovakia Power Day Ahead Prices|
|Currency|EUR|
|Unit|MWH|
|Frequency|Hourly|
|Market|Day Ahead|
|Commodity|Power|
|Location|Slovakia|
|Quote Calendar|Hourly|
|Expiry Calendar|REOD|

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available in the vendor website and can be used by clients without permissions.