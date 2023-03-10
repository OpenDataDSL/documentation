### Schedule

The end of day file is retrieved around 14:00 GMT daily.

### Sample File

[Sample file for OMIE Power Day Ahead Updates](pathname:///file-samples/INT_PBC_EV_H_1_26_06_2021_26_06_2021.XLS) 

### Type

OMIP Power Futures data is stored under the type: #Electricity

|**Data Id**|**Name**|
|-|-|
|#OMIE.EL.ES.DA|OMI-Polo Spanish SA Spain Power Day Ahead Price Curve|
|#OMIE.EL.PT.DA|OMI-Polo Spanish SA Portugal Power Day Ahead Price Curve|
|#OMIE.EL.IBER.DA|OMI-Polo Spanish SA Iberian Market Power Day Ahead Price Curve|

### Daylight Savings Treatment

The hourly power updates are provided by OMIE in CET. These are loaded to database in UTC.

During the change to summertime OMIE delivers 23hourly pricing and volume updates. These are adjusted to the correct UTC hours during the Summer time changeover.

During the change to Winter time OMIE delivers 25 hourly updates. These are adjusted to the correct UTC hours during the Winter time changeover.

### Attributes
|Name|Value|
|-|-|
|Source|OMIE|
|Source Name|OMI-Polo Español S.A.|
|Dataset|OMIE_EL_DA|
|Dataset Name|OMI-Polo Spanish SA Power Day Ahead Market Price|
|Currency|EUR|
|Unit|MWH|
|Frequency|Hourly|
|Market|Day Ahead|
|Commodity|Power|
|Location|Spain|
|Quote Calendar|Hourly|
|Expiry Calendar|REOD|

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available in the vendor website and can be used by clients without permissions.