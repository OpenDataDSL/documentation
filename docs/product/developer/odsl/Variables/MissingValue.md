---
slug: /odsl/variable/missingvalue
tags:
  - timeseries
  - timevalue
---
MissingValue
============================

A MissingValue is a real variable but it doesn’t have a value yet, it is usually used in [TimeSeries](TimeSeries) to represent a [TimeValue](TimeValue) in a [calendar](Calendar) that has no value

## Methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|isMissing()|Checks to see if the value is null or missing|Boolean|
|isZero()|Checks to see if the value is zero|Boolean|
|setPrecisionRoundingMode(mode)|Set the rounding mode for numbers|Scalar|
|setPrecisionScale(scale)|Set the number of decimal places to round to|Scalar|

