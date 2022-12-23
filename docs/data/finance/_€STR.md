## Overview

![](/img/data/ecb.png)

Euro short-term rate (€STR) is a reference rate for the currency euro. It  reflects the wholesale euro unsecured overnight borrowing costs of banks located in the euro area. The €STR is calculated by the European Central Bank (ECB) and is based on the money market statistical reporting of the Eurosystem. The euro short-term rate (€STR) is published on each TARGET2 business day based on transactions conducted and settled on the previous TARGET2 business day (the reporting date “T”) with a maturity date of T+1 which are deemed to have been executed at arm’s length and thus reflect market rates in an unbiased way.The ECB published the €STR for the first time on 2 October 2019, reflecting trading activity on 1 October 2019.The working group on euro risk-free rates has recommended €STR as a replacement for the EMMI Euro Overnight Index Average (EONIA) as the Euro risk-free rate for all products and contracts.

website: https://www.ecb.europa.eu/

### Schedule

File is processed between 7:00 AM and 8:00 GMT the following target2 business day.

### Sample File

Sample file [sample file](pathname://../../static/file-samples/data.csv)

### Type

Data is stored as #ForwardCurve

### Data ID and Name

Example data id and name:

|**Data Id**|**Name**|
|-|-|
|#ECB_IR.ESTR.EURO_SHORT_TERM_RATE.FWD|Euro Short-Term Rate,Volume-weighted Trimmed Mean Rate plus Compounded Euro Short-Term Rate Index Forward Curve|

### Attributes

|Name|Value|
|-|-|
|Source|ECB|
|Source Name|European Central Bank|
|Dataset|ESTR|
|Dataset Name|Euro Short Term Rate|
|Market|Financial|
|Commodity|Forward Interest Rates|
|Product|IR Forwards|
|Location|United Kingdom|
|Region|Europe|
|Quote Calendar|HTR||

### Validation

Data is validated for missing data points using HTR calendar for expected absences.

### Licensing

Data is freely available from the ECB website and can be used by clients without permissions.

