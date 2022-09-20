### Overview

![](/img/data/ecb.png)

The European Central Bank (ECB) is the central bank for the euro and administers monetary policy of the Eurozone, 
which consists of 19 EU member states and is one of the largest currency areas in the world. 
It is one of the world's most important central banks and is one of the seven institutions of the European Union (EU) 
listed in the Treaty on European Union (TEU).

The FX rates that are loaded are the ECB Reference rates. 

All the rates are based on the EURO - click [here](/docs/data/fx) for more information on the Foreign Exchange markets.

### File Collection

The file is retrieved from the ECB website at [http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml](http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml)  

### Schedule

Updates are processed at 16:30 CET on Target business days.

### Sample File

Below is the excerpts of the source file for 13th November 2020:

![](/attachments/216367189/216367209.png)

### Type

The ECX FX Rates are stored under the type **#ForeignExchange**

### Data ID and Name

Example data id and name:

|**Data Id**|**Name**|
|-|-|
|ECB_FX.EURUSD|Euro Foreign Exchange Reference Rates Euro Per US Dollar|
|ECB_FX.EURGBP|Euro Foreign Exchange Reference Rates Euro Per Pound Sterling|

### Attributes

|Name|Value|
|-|-|
|Source|ECB|
|Source Name|European Central Bank|
|Name|Euro Foreign Exchange Reference Rates Euro Per US Dollar|
|Description|Euro Foreign Exchange Reference Rates Euro Per US Dollar|
|Dataset|ECB_FX|
|Dataset Name|European Central Bank Reference Rates|
|Market|Financial|
|Commodity|Exchange Rates|
|Product|FX Spot|
|Location|Europe|
|Region|Europe|
|Quote Calendar|HTR|

### Validation

Data is validated for missing data points using Target holiday calendar for expected absences.

### Licensing

Data is freely available from the ECB website and can be used by clients without permissions.

