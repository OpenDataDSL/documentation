---
title: Excel Functions
description: Excel Functions
sidebar_position: 6
slug: /user/excel/functions
tags:
- excel
- functions
---

Documentation for the functions available in Excel

## ODSL.CURVEDATA
Represents curve data

### Parameters
#### id
This is the full id of the curve in the format ```objectid:curveid:curvedate``` 

#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|timezone|The timezone you want the data represented in|timezone=Australia/Perth|

### Example

```
=ODSL.CURVEDATA("#BSP.EL.SI.BASE.DA:PRICE:2022-12-12","timezone=Europe/Ljubljana")
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
|timezone|The timezone you want the data represented in|timezone=Australia/Perth|

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
|timezone|The timezone you want the data represented in|timezone=Australia/Perth|
|sortOrder|The sort order of the indexes|sortOrder=descending|

### Example

```
=ODSL.EVENTDATA("#AEMO.EL.AU.WEM.OUTAGES.WPGENER.COLLIE_G1:UMM","01-01-2022","31-12-2022","sortOrder=descending")
```

## ODSL.OBJECTRANGE
Represents an object range

### Parameters
#### options
This is a key=value pair list of options separated by semi-colons(;).

Options can be any of the following:

|option|description|example|
|-|-|-|
|timezone|The timezone you want the data represented in|timezone=Australia/Perth|

## ODSL.REFID
Represents the ID for the referenced entity

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

Options can be any of the following:

|option|description|example|
|-|-|-|

### Example

```
=ODSL.REFID("#ABN_FX.EURAED")
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
|timezone|The timezone you want the data represented in|timezone=Australia/Perth|

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
|timezone|The timezone you want the data represented in|timezone=Australia/Perth|
|sortOrder|The sort order of the indexes|sortOrder=descending|

### Example

```
=ODSL.SERIESRANGE("t-10d","t-1d","sortOrder=descending;timezone=Europe/Berlin")
```