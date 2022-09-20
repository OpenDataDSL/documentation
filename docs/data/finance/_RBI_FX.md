## Overview

![](/img/data/rbi.png)

([https://www.rbi.org.in/HOME.ASPX](https://www.rbi.org.in/HOME.ASPX))

The Reserve Bank of India (RBI) is India's central bank, responsible for the issue and supply of the Indian rupee and 
the regulation of the Indian banking system. 
It also manages the country's main payment systems and works to promote its economic development.

All the rates are based on the Indian Rupee (INR) - click [here](/docs/data/fx) for more information on the Foreign Exchange markets.

## File Collection

![](/img/data/fbil.jpg)

Since July 10, 2018 Computation and Dissemination has been taken up by FBIL (Financial Benchmarks India Ltd.). 
Click on the following link to collect data: [www.fbil.org.in](http://www.fbil.org.in)
    

### Schedule

*   The FBIL Reference Rates will be published at around 13.30 Hours on all business days, i.e., excluding Saturday, Sunday and bank holidays in Mumbai
    
*   Schedule to process the updates at 11:00AM GMT on India business days.
    

### Sample File

Connect to [www.fbil.org.in](http://www.fbil.org.in). Select ‘FOREIGN EXCHANGE’ tab, choose the dates and fetch in XLSX format. Storage dates are taken from Date column. Exchange rates are from ‘Rates’ column. Currency Pairs like

1 USD = 74.1598 INR

1 JPY = 71.47*1/100 = 0.7147 INR ( Use the Factor 100 from ‘Currency Pair’ column)

If factor is other than 1, multiply 1/factor to Rate to get FX Rate.

![](/attachments/216367236/216367253.png)

## Type

The RBI FX Rates are stored under the type #ForeignExchange

### Data ID and Name

Example data id and name:

|Data Id|Name|
|#RBI_FX.USDINR|Reserve Bank of India Foreign Exchange Reference Rates US Dollar Per Indian Rupee|

### Attributes

|Name|Value|
|-|-|
|Source|RBI|
|Source Name|Reserve Bank of India|
|Name|Reserve Bank of India Foreign Exchange Reference Rates US Dollar Per Indian Rupee|
|Description|Reserve Bank of India Foreign Exchange Reference Rates US Dollar Per Indian Rupee|
|Dataset|RBI_FX|
|Dataset Name|Reserve Bank of India Reference Rates|
|Market|Financial|
|Commodity|Exchange Rates|
|Product|FX Spot|
|Location|India|
|Region|Asia|
|Quote Calendar|HIN|

### Validation

Data is validated for missing data points using Reserve Bank of India holiday calendar for expected absences.

### Licensing

Data is freely available from the RBI website and can be used by clients without permissions.

