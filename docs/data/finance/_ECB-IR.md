## Overview

![](/img/data/ecb.png)

Euro short-term rate (€STR) is a reference rate for the currency euro. It  reflects the wholesale euro unsecured overnight borrowing costs of banks located in the euro area. The €STR is calculated by the European Central Bank (ECB) and is based on the money market statistical reporting of the Eurosystem. The euro short-term rate (€STR) is published on each TARGET2 business day based on transactions conducted and settled on the previous TARGET2 business day (the reporting date “T”) with a maturity date of T+1 which are deemed to have been executed at arm’s length and thus reflect market rates in an unbiased way.The ECB published the €STR for the first time on 2 October 2019, reflecting trading activity on 1 October 2019.The working group on euro risk-free rates has recommended €STR as a replacement for the EMMI Euro Overnight Index Average (EONIA) as the Euro risk-free rate for all products and contracts.

website: https://www.ecb.europa.eu/

## File Collection

Daily update file is collected from ECB website:https://sdw.ecb.europa.eu/browseSelection.do?node=9698302   

### Schedule

File collection is between 7:00 AM and 8:00 GMT the following target2 business day.

### Sample File

Sample file [sample file](pathname://../../static/file-samples/ecb_ir_inputfile.xml)

## Type

Data is stored as #InterestRates

### Data ID and Name

Example data id and name

|**Data Id**|**Name**|
|-|-|
|#ECB_IR.FM.B.U2.EUR.4F.KR.MRR_FR.LEV.SPOT|European Central Bank Main Refinancing Operations - Fixed Rate Tenders (Fixed Rate) (date of changes)-Leve -Daily|
|#ECB_IR.FM.B.U2.EUR.4F.KR.MRR_MBR.LEV.SPOT|European Central Bank Main Refinancing Operations - Variable Rate Tenders (Minimun Bid Rate) (Date of Changes)-Level-Daily|

### Attributes

|Name|Value|
|-|-|
|Source|ECB|
|Source Name|European Central Bank|
|Dataset|ECB_IR|
|Dataset Name|European Central Bank Refinancing Rates|
|Market|Financial|
|Commodity|Interest Rates|
|Product|IR Spot|
|Location|Europe|
|Region|Europe|
|Quote Calendar|Daily||

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available from the ECB website and can be used by clients without permissions.