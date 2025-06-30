---
slug: /odsl/service/date
tags:
  - service
  - date
---
Date Service
=============

Create and utilise [dates](/docs/odsl/variable/date)

## Assignment - creating a date

To use the date service to create a new date, use the Active Variable assign statement syntax as shown below:
```js
var = ${date:"\[calendar\]/key"}
```
Where:

*   var is the name of the variable to create    
*   date is the name of the service    
*   calendar is an optional calendar to use defaulting to daily    
*   key is the key which defines what date to assign to the variable
    

The following assignment keys are available (case-insensitive):

|**Key**|**Description**|
|-|-|
|now|The current day and time|
|today or \{empty\}|The current backwards aligned day using the supplied calendar|
|yesterday|The day prior to today according to the supplied calendar|
|tomorrow|The day after today according to the supplied calendar|
|named, e.g. monday|The next or current named day|
|ISO Date|The supplied parsed absolute date i.e. doesn’t use the supplied calendar|
|ISO Date Time|The supplied parsed absolute date time|
|Period Code|The start date of the supplied period code|

:::note
All dates in OpenDataDSL are stored in the UTC timezone
:::
