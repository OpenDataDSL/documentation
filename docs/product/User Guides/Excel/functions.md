---
title: Excel Functions
description: Excel Functions
sidebar_position: 10
slug: /user/excel/functions
tags:
- excel
- functions
---

Documentation for the functions available in Excel

## ODSL.REFID
Represents the ID for the referenced entity.

The REFID function is used in conjunction with one of the range functions:
* OBJECTRANGE - when the reference id is master data
* SERIESRANGE - when the referenced data is a timeseries
* CURVERANGE - when the referenced data is a curve
* CURVEDATA - when the referenced data is a curve and you want to display the full curve information
* CURVESERIESRANGE - when the referenced data is a curve series

### Parameters
#### id
The full id of the entity:

* Object: ```objectid```
* TimeSeries: ```objectid:seriesid```
* Curve: ```objectid:curveid:curvedate```
* Event: ```objectid:eventid```

#### source
The source of the object, can be one of:

* public
* private
* custom MongoDB collection reference

#### options
This is a key=value pair list of options separated by semi-colons(;).

These options override the options provided in the range functions

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
|expression|An expression used to transform the data|expression=scale(BASE,'MONTHLY','averaged')
|currency|Specify which currency you want to convert the data to|currency=USD|
|units|Specify the units you want to convert the data to|units=MWH|
|precision|Specify the number of decimal places to round the data to|precision=2|
|roundingMode|Using with precision to define the [rounding method](/docs/kb/precision#setting-the-rounding-method) to use|roundingMode=DOWN|

### Example

```
=ODSL.REFID("#ABN_FX.EURAED")
```

## ODSL.CURVERANGE
Represents a curve range

### Parameters
#### ondate

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
|currency|Specify which currency you want to convert the data to|currency=USD|
|units|Specify the units you want to convert the data to|units=MWH|
|precision|Specify the number of decimal places to round the data to|precision=2|
|roundingMode|Using with precision to define the [rounding method](/docs/kb/precision#setting-the-rounding-method) to use|roundingMode=DOWN|

Additional options when creating a curve series:

|option|description|example|
|-|-|-|
|$objtype|The type used when creating the object, defaults to #Object|$type=#MarketData|
|$expirycalendar|The expiry calendar to use for the curve|$expirycalendar=#REOMHENG|
|$currency|The currency that this data is in|$currency=EUR|
|$unit|The units that this data is measured in|$unit=MWH|
|$timezone|The timezone that this data is in, only relevant for intraday data|$timezone=Europe/London|

### Example

```
=ODSL.CURVERANGE("2024-11-11")
```

## ODSL.CURVEDATA
Represents curve data, this is an alternative to CURVERANGE which displays a more detailed curve structure rather than just the tenor and value.

### Parameters
#### id
This is the full id of the curve in the format ```objectid:curveid:curvedate```

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
|currency|Specify which currency you want to convert the data to|currency=USD|
|units|Specify the units you want to convert the data to|units=MWH|
|precision|Specify the number of decimal places to round the data to|precision=2|
|roundingMode|Using with precision to define the [rounding method](/docs/kb/precision#setting-the-rounding-method) to use|roundingMode=DOWN|

### Example

```
=ODSL.CURVEDATA("#BSP.EL.SI.BASE.DA:PRICE:2022-12-12","$timezone=Europe/Ljubljana")
```

## ODSL.CURVESERIESRANGE
Represents a curveseries range

### Parameters
#### ondate
The curve date for the curve series

#### start
The start date or rule of the range of timeseries data to return, e.g. "01-11-2022"

#### end
The end date or rule of the range of timeseries data to return, e.g. "30-11-2022"

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
|$sortorder|The sort order of the indexes|$sortorder=descending|
|currency|Specify which currency you want to convert the data to|currency=USD|
|units|Specify the units you want to convert the data to|units=MWH|
|precision|Specify the number of decimal places to round the data to|precision=2|
|roundingMode|Using with precision to define the [rounding method](/docs/kb/precision#setting-the-rounding-method) to use|roundingMode=DOWN|

Additional options when creating a curve series:

|option|description|example|
|-|-|-|
|$objtype|The type used when creating the object, defaults to #Object|$type=#MarketData|
|$calendar|The calendar to use for the observations in the series|$calendar=#DAILY|
|$currency|The currency that this data is in|$currency=EUR|
|$unit|The units that this data is measured in|$unit=MWH|
|$timezone|The timezone that this data is in, only relevant for intraday data|$timezone=Europe/London|

### Example

```
=ODSL.CURVESERIESRANGE("2024-10-28",t-10d","t-1d","$sortorder=descending;$timezone=Europe/Berlin")
```

## ODSL.EVENTDATA
Represents event data

### Parameters
#### id
This is the full id of the event in the format ```objectid:eventid```

#### start
The start date or rule of the range of timeseries data to return, e.g. "01-11-2022"

#### end
The end date or rule of the range of timeseries data to return, e.g. "30-11-2022"

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
|$sortorder|The sort order of the indexes|$sortorder=descending|

Additional options when creating a curve series:

|option|description|example|
|-|-|-|
|$objtype|The type used when creating the object, defaults to #Object|$type=#MarketData|
|$eventtype|The event type for this event|$eventtype=#Event|

### Example

```
=ODSL.EVENTDATA("#AEMO.EL.AU.WEM.OUTAGES.WPGENER.COLLIE_G1:UMM","01-01-2022","31-12-2022","$sortorder=descending")
```

## ODSL.OBJECTRANGE
Represents an object range

### Parameters
#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|

## ODSL.SERIESRANGE
Represents a series range

### Parameters
#### start
The start date or rule of the range of timeseries data to return, e.g. "01-11-2022"

#### end
The end date or rule of the range of timeseries data to return, e.g. "30-11-2022"

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
|$sortorder|The sort order of the indexes|$sortorder=descending|
|currency|Specify which currency you want to convert the data to|currency=USD|
|units|Specify the units you want to convert the data to|units=MWH|
|precision|Specify the number of decimal places to round the data to|precision=2|
|roundingMode|Using with precision to define the [rounding method](/docs/kb/precision#setting-the-rounding-method) to use|roundingMode=DOWN|

Additional options when creating a time series:

|option|description|example|
|-|-|-|
|$objtype|The type used when creating the object, defaults to #Object|$type=#MarketData|
|$calendar|The calendar to use for the observations in the series|$calendar=#DAILY|
|$currency|The currency that this data is in|$currency=EUR|
|$unit|The units that this data is measured in|$unit=MWH|
|$timezone|The timezone that this data is in, only relevant for intraday data|$timezone=Europe/London|

### Example

```
=ODSL.SERIESRANGE("t-10d","t-1d","$sortorder=descending;$timezone=Europe/Berlin")
```

## ODSL.RTD
Represents real-time data which will refresh when the referenced item is updated in the server

### Parameters
#### id
The full id of the entity:

* Object: ```objectid```
* TimeSeries: ```objectid:seriesid```
* Curve: ```objectid:curveid:curvedate```
* Event: ```objectid:eventid```

#### index
The index of the entity, see the description below for what this can be depending on the type of entity.

##### Object
The name of the property in the object

##### Timeseries
The date/time of the observation

##### Curve
The tenor of the curve

##### Event
The name of the property on the event

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|$timezone|The timezone you want the data represented in|$timezone=Australia/Perth|
