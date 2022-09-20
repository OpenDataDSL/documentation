### Schedule

The schedule for collecting the file is around 20:00 GMT on Spain business days.

### Sample File

Sample file

### Type

OMIP Power Futures data is stored under the type: #Electricity

### Data Id and name

Some of the contract identifiers from OMIP are given below. These are used in object and data Id creation to make unique.

|Contract identifier|Description|
|-|-|
|FTB|Spain Base Load Futures(Physical and Financial)|
|FTK|Spain Peak Load Futures(Physical and Financial)|
|FWB|Spain Base Load Forwards (Physical)|
|SWB|Spain Base Load Swaps (Financial)|
|FPB|Portugal Base Load Futures (Financial)|

Examples of data Id and names:

|Data Id|Name|
|-|-|
|OMIP.EL.SP.FTB.BL.FUT|The Iberian Energy Derivatives Exchange Spain Baseload Power Futures Curve|
|OMIP.EL.SP.FTK.PL.FUT|The Iberian Energy Derivatives Exchange Spain Peakload Power Futures Curve|
|OMIP.EL.PT.FPB.BL.FUT|The Iberian Energy Derivatives Exchange Portugal Baseload Power Futures Curve|


### Expiry Calendar

Below set of expiry calendars are used in calculating rolling forward data. The expiry and rollover calendars remain same.

|**contract**|**Expiry Calendar**|
|-|-|
|Days|ROMIPD|
|Weekend|ROMIPWKD|
|Week|ROMIPWK|
|Month|ROMIPM|
|Quarter|ROMIPELFQY|
|Year|ROMIPELFQY|

### Attributes

Attributes with example values:

|Name|Value|
|-|-|
|Source*|OMIP|
|Source Name|The Iberian Energy Derivatives Exchange|
|Dataset|OMIP_EL_FUT|
|Dataset Name|The Iberian Energy Derivatives Exchange Power Futures|
|Base|EUR|
|Unit|MWH|
|Frequency|Business|
|Market|Futures|
|Commodity|Power|
|Location|Spain|
|Quote Calendar|HOMIP|

### Validation

Data is validated for missing data points using OMIP holiday calendar for expected absences.

### Licensing

This data requires agreement with OMIP before it can be supplied.

https://www.omip.pt/en/ftp-omip
