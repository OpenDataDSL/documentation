---
slug: /kb/pc
title: Period Codes
description: Futures period codes used in OpenDataDSL
tags:
  - period
---
A period code represents an absolute or relative delivery period for some commodity or financial future

## Valid Period Codes

Here is a list of the standard naming portions of period codes:

|**Name**|**Definition**|**Example**|
|-|-|-|
|ABS_YEAR|yyyy|2020|
|ABS_DAY|ABS_YEAR D MONTH DAY|2020D1022|
|ABS_DAYAHEAD|ABS_YEAR DA MONTH DAY|2020DA1022|
|PERIOD|```[0-9]([0-9])*```|01|
|MONTHNAME|3 char English month name|JAN|

Here is a list of the syntax for valid period codes

### Intraday periods

|**Name**|**Definition**|**Example**|
|-|-|-|
|Quarter hour|ABS_DAY “-QH” PERIOD|2020D1022-QH01|
|Relative quarter hour|“QH” PERIOD|QH01|
|Half hour|ABS_DAY “-HH” PERIOD|2020D1022-HH01|
|Relative half hour|“HH” PERIOD|HH01|
|Hour|ABS_DAY “-H” PERIOD|2020D1022-H01|
|Relative hour|“H” PERIOD|H01|
|Day|ABS_DAY|2020D1022|
|Relative day|“D” PERIOD|D01|
|Day Ahead|ABS_DAYAHEAD|2020DA1022|
|Relative Day Ahead|“DA“ PERIOD|DA01|

### Standard periods

|**Name**|**Definition**|**Example**|
|-|-|-|
|Weekend|ABS_YEAR “WKD” PERIOD|2020WKD01|
|Relative weekend|“WKD” PERIOD|WKD01|
|Working week|ABS_YEAR “WW” PERIOD|2020WW01|
|Relative working week|“WW” PERIOD|WW01|
|Week|ABS_YEAR “W” PERIOD|2020W01|
|Relative week|“W” PERIOD|W01|
|Half month|ABS_YEAR “HM”((DAY))? PERIOD|2020HM01 or 2020HM(14)01|
|Relative half month|“HM”((DAY))? PERIOD|HM01 or HM(14)01|
|Month|ABS_YEAR “M” PERIOD|2020M01|
|Relative month|“M” PERIOD|M01|
|Quarter|ABS_YEAR “Q” PERIOD|2020Q01|
|Relative quarter|“Q” PERIOD|Q01|
|Season|ABS_YEAR “S” PERIOD|2020S01|
|Relative season|“S” PERIOD|S01|
|US Winter Season|ABS_YEAR “USW”|2020USW|
|US Winter Relative season|“USW” PERIOD|USW01|
|US Spring Season|ABS_YEAR “USP”|2020USP|
|US Spring Relative season|“USP” PERIOD|USP01|
|US Summer Season|ABS_YEAR “USS”|2020USS|
|US Summer Relative season|“USS” PERIOD|USS01|
|Half year|ABS_YEAR “HY” PERIOD|2020HY01|
|Relative half year|“HY” PERIOD|HY01|
|Year starting on month|ABS_YEAR “Y” MONTHNAME|2020YJAN|
|Relative year starting on month|“Y” MONTHNAME PERIOD|YJAN01|
|Year|ABS_YEAR “Y”|2020Y|
|Relative year|“Y” PERIOD|Y01|

### End of period periods

|**Name**|**Definition**|**Example**|
|-|-|-|
|End of month|ABS_YEAR “EOM” PERIOD|2020EOM01|
|Relative end of month|“EOM” PERIOD|EOM01|
|End of quarter|ABS_YEAR “EOQ” PERIOD|2020EOQ01|
|Relative end of quarter|“EOQ” PERIOD|EOQ01|
|End of year|ABS_YEAR “EOY” PERIOD|2020EOY01|
|Relative end of year|“EOY” PERIOD|EOY01|

### Relative only periods

|**Name**|**Definition**|**Example**|
|-|-|-|
|Balance of week|“BOW”|BOW|
|Balance of month|“BOM”|BOM|
|Balance of quarter|“BOQ”|BOQ|
|Balance of year|“BOY”|BOY|
|Within day|“WD”|WD|
|Spot|“SPOT”|SPOT|
|Prompt|“PROMPT”|PROMPT|
|Dated|“DTD”|DTD|
|Saturday|“SAT”|SAT|
|Sunday|“SUN”|SUN|

### Financial periods

|**Name**|**Definition**|**Example**|
|-|-|-|
|Spot|“SP”|SP|
|Overnight|“ON”|ON|
|Tomorrow next|“TN”|TN|
|Spot next|“SN”|SN|
|Spot week|“SW”|SW|
|Financial week|PERIOD “W”|1W|
|Financial month|PERIOD “M”|1M|
|Financial year|PERIOD “Y”|1Y|

### Spreads

|**Name**|**Definition**|**Example**|
|-|-|-|
|Absolute spread|period “-” period|2021Y-2022Y|
|Relative spread|period “-” period|M01-M02|

### Custom
You can create `custom` period codes where you can specify the following:
* Relative code
* Absolute code
* Start of delivery
* End of delivery
* Expiry/Last trade date

These custom codes can be used for one-off strange periods or in the case that the required period isn't supported in the list above.
All custom period codes start with a 'C', e.g. C2024HW

### Gas Periods
If you prefix any of the following period codes with a 'G' it turns it into a gas period which has a 6 hour offset using Central European Time.

* Within Day - GWD
* Day - GD
* Day Ahead - GDA
* Saturday - GSAT
* Sunday - GSUN
* Any of the standard period codes
* Any of the end of period codes
* Any of the balance of period codes

For years, you can choose between the following:
* Gas year (GYnn/yyyyGY) which covers a gas year (October to September)
* Gas calendar year (GCYnn/yyyyGCY) which covers a calendar year (January to December)