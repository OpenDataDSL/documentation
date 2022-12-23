### Schedule

The schedule for collecting the file is 20:00GMT on Hungarian business days.

### Sample File

[Sample file for HUDEX Power Futures](pathname:///file-samples/power_daily_data_export_19-07-2021.xlsx)

### Type

The dataset is stored as #Electricity

### Data ID and Name

Example data id and name

|**Data Id**|**Name**|
|-|-|
|HUDEX.EL.HU.PL.FUT.CURVE|Hungarian Derivative Energy Exchange PeakLoad Power Futures Curve|

### Expiry Calendar

Below set of expiry calendars are used in calculating rolling forward data. The expiry and rollover calendars remain same.

|**contract**|**Expiry Calendar**|
|-|-|-|
|Baseload|Day|REOD|
|Baseload|WKD|RHUDEXELFWKD|
|Baseload|WK|RHUDEXELFWK|
|Baseload,Peakload|Month|RHUDEXELFM|
|Baseload,Peakload|Quarter|RHUDEXELFQY|
|Baseload,Peakload|Year|RHUDEXELFQY|

### Attributes

|Name|Value|
|-|-|
|Source|HUDEX|
|Source Name|Hungarian Derivative Energy Exchange|
|Dataset|HUDEX_EL_FUT|
|Dataset Name|Hungarian Derivative Energy Exchange Power Financial Futures|
|Frequency|Business|
|Currency|EUR|
|Unit|MWH|
|Market|Futures|
|Commodity|Power|

|Location|Hungary|
|Region|Europe|
|Quote Calendar|HHUDEXF|

### Validation

Data is validated for missing data points using HHUDEXF calendar for expected absences.

### Licensing

This data requires agreement with HUDEX before it can be supplied.

https://hudex.hu/en/data-services/market-data-subscription/data-vendor