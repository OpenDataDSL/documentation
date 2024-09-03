### Schedule

The end of day updates are processed at 17:30 GMT on DCE business days.

### Sample File

[Sample file for DCE Futures](pathname:///file-samples/DCE_20211028_1635487856657_Daily.txt)

### Type

The data is stored as #Agriculture.

### Data ID and Name

Example data id and name:

|**Data Id**|**Name**|
|-|-|
|DCE.AG.CN.C.CORN.FUT|Dalian Commodity Exchange China Corn Futures Curve|
|DCE.AG.CN.A.NO1_SOYBEAN.FUT|Dalian Commodity Exchange China No1_Soybean Futures Curve|
|DCE.AG.CN.RR.POLISHED_ROUND_GRAINED_RICE.FUT|Dalian Commodity Exchange China Polished_Round_grained_Rice Futures Curve|

## Expiry Calendar

Below set of expiry calendars are used in calculating rolling forward data. The expiry and rollover calendars remain same.

|Expiry Calendar|Rule|
|-|-|
|RDCEM|The 10th trading day of the contract month|
|RDCE3M|The 3rd trading day after the last trading day|


### Attributes

|Name|Value|
|-|-|
|Source|DCE|
|Source Name|Dalian Commodity Exchange|
|Dataset|DCE_AG_FUT|
|Dataset Name|Dalian Commodity Exchange Agriculture Futures|
|Currency|CNY|
|Unit|MT|
|Market|Futures|
|Commodity|Agriculture|
|Product|Grains Futures|
|Location|China|
|Region|Asia|
|Quote Calendar|HDCE|

### Validation

Data is validated for missing data points using HDCE calendar for expected absences.

### Licensing

This data requires agreement with Euronext before it can be supplied.

http://www.dce.com.cn/DCE/Market_Data/License_Guide/index.html