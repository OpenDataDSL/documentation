---
title: Data Service
description: REST API for the data service
slug: /api/rest/service/data
tags:
  - api
  - service
  - data
---
The data resource contains all the complex data types like TimeSeries and Curve

## Data REST API

The Data REST API lets you search, filter and read the complex data types, and delete them, and is accessed through the following URL:
```js
https://api.opendatadsl.com/api/data
```

:::note
You save data through the [Object service](./object): a data entity always belongs to an object, so saving an object with data properties saves those data entities. The data service reads them, deletes them, and runs functions on them.
:::

### REST Methods
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|'v1/public' 'v1/private'|List public or private data items|
|GET|\{release\}|v1|List the sources you can read: public, private, and morningstar if you have Morningstar credentials|
|GET|\{release\}/\{source\}/\{key\}|v1/private/TEST:SPOT|Retrieve a single data item using its id|
|GET|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/TEST:SPOT/2|Retrieve a version of a data item|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/TEST:SPOT/*|List the versions of a data item|
|GET|\{release\}/all|v1/all?_id=TEST:SPOT&_id=%23ECB_FX.EURGBP:SPOT|Retrieve several data items from public and private in one call|
|PUT|\{release\}/\{source\}/\{key\}/\{version\}/\{tag\}|v1/private/TEST:SPOT/2/PROD|Tag a version of a data item|
|PUT|\{release\}/\{source\}?_function=identity|v1/private?_function=identity|Read or set the identities (external codes) of data items, see [Identities](#identities)|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/TEST:SPOT|Roll back to the previous version of a data item, or delete it if it has only one version|
|DELETE|\{release\}/\{source\}/\{key\}/*|v1/private/TEST:SPOT/*|Delete a data item and all its versions|

:::note
A smart curve or smart timeseries that other smart curves or timeseries use as their base or as an input cannot be deleted completely: the request fails and the error lists the items that use it. Rolling back to an earlier version is still allowed. Use the `dependents` function to see what uses an item.
:::

### Query Parameters
Below is a table of the query parameters that are usable with the data REST API

|**Parameter**|**Usable On**|**Example**|**Description**|
|-|-|-|-|
|_tenor|Curve|_tenor=M01|Retrieves an historic TimeSeries of a specific tenor of a curve. You can also put the tenor at the end of the id, e.g. TEST:CURVE:M01|
|_function=list|Curve|_function=list|Lists all the relative tenors available in this curve|
|_ondate|Curve|_ondate=2026-10-23|The curve date to use with the dynamic curve dates -ONDATE, &lt;ONDATE and -ABSOLUTE, see [Data ids](#data-ids)|
|_run|Smart data|_run=true|Rebuilds a smart curve or timeseries instead of reading the stored build|
|expression|Curve|expression=BASE * 1.1|Previews a smart curve built on this curve with the expression, without saving it, see [Previewing a smart curve](#previewing-a-smart-curve)|
|_range last|TimeSeries|_range=last(3)|Returns the last n observations|
|_range from|TimeSeries|_range=from(2021-03-01)|Returns all observations from the specified date|
|_range from|TimeSeries|_range=from(2021-03-01,Europe/Paris)|Returns all observations from the specified date converted to the specified timezone|
|_range between|TimeSeries|_range=between(2021-03-01,2021-03-31)|Returns only the observation within the specified range|
|_range between|TimeSeries|_range=between(2021-03-01,2021-03-31,Europe/Paris)|Returns only the observation within the specified range in the specified timezone|
|_id|Any|_id=MYCURVE:2021-03-01|Used when retrieving multiple data entities from anywhere (use all as source)|
|currency|Any|currency=USD|Converts the TimeSeries or Curve to the supplied currency|
|units|Any|units=MT|Converts the TimeSeries or Curve to the supplied units|
|__density|Any|__density=980|When used in conjunction with unit conversion, this overrides the default density of the product being converted|
|__timefactor|Any|__timefactor=24|When used in conjunction with unit conversion, this overrides the time factor used to convert between energy and power units|


## Data ids

A data id is the object id and the data property name, separated by a colon, for example `#ECB_FX.EURGBP:SPOT`. A curve adds its curve date: `#IPEX.EL.IT.BL.MTE.FWD.CURVE:PRICE:2023-12-12`. You can add one more part to the id to read the data in a different way:

|**Id**|**Example**|**What you get**|
|-|-|-|
|curve:L|TEST:CURVE:L|The latest curve|
|curve:L-n|TEST:CURVE:L-1|The curve n dates before the latest one|
|curve:-date|TEST:CURVE:-2026-10-23|The curve for the date, or the latest one before it|
|curve:&lt;date|TEST:CURVE:&lt;2026-10-23|The latest curve before the date|
|curve:tenor|TEST:CURVE:M01|A timeseries of the values of one tenor, one value for each curve date|
|curve:date:TS|TEST:CURVE:2026-10-23:TS|The curve converted to a timeseries of its delivery periods|
|curve:date:MX|TEST:CURVE:2026-10-23:MX|The curve converted to a matrix|
|timeseries:MX|TEST:SPOT:MX|The timeseries converted to a matrix|
|curve:-ONDATE|TEST:CURVE:-ONDATE?_ondate=2026-10-23|The curve for the _ondate, or the latest one before it|
|curve:&lt;ONDATE|TEST:CURVE:&lt;ONDATE?_ondate=2026-10-23|The latest curve before the _ondate|
|curve:-ABSOLUTE|TEST:CURVE:-ABSOLUTE?_ondate=2026-10-23|The curve for the _ondate or the latest one before it, rolled forward to the _ondate so its tenors are relative to that date|

---

## Functions

Functions are run with the `_function` query parameter:

|**Function**|**Method**|**Example**|**Description**|
|-|-|-|-|
|list|GET|v1/public/%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:SETTLE?_function=list|List the tenors available in a curve|
|info|GET|v1/private/TEST:SPOT?_function=info|The data item without its values. For an event timeseries it adds the start and end of the events|
|dependents|GET|v1/private/TEST:CURVE?_function=dependents|The smart curves and timeseries that use this item as their base or as an input|
|matrix|GET|v1/private/TEST:SPOT?_function=matrix(day)|Converts a timeseries or curve to a matrix with one row per day, week, month or year. For a timeseries, an optional second parameter of true fills the missing values, e.g. matrix(day,true)|
|convert|GET|v1/all?_function=convert|Reads the data items whose ids are in the JSON array in the request body, applying the query parameters (such as currency and units) to each|
|help-curve|GET|v1/public?_function=help-curve|The functions you can use in a smart curve expression. Pass `script` to name a script other than `#CurveScript`|
|help-timeseries|GET|v1/public?_function=help-timeseries|The functions you can use in a smart timeseries expression. Pass `script` to name a script other than `#TimeSeriesScript`|
|identity|PUT|v1/private?_function=identity|Read or set the identities of data items, see [Identities](#identities)|

---

## Identities

Data items can carry identities: the codes other systems use for them, kept in the `_identity` property by identity provider. Use a PUT with `_function=identity`.

To read the identities of some data items, set `action` to GET, list the ids and, optionally, the identity providers you want (all of them if empty):

```js
PUT https://api.opendatadsl.com/api/data/v1/private?_function=identity
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "action": "GET",
  "_id": ["NGE.POWER.DE:BASE", "NGE.GAS.TTF:MID"],
  "identity": ["ETRM"]
}
```

The response has a `data` list with one entry for each id, holding the identities found and the data type.

To set identities, set `action` to PUT and give a `data` list of the data item id and its identities by provider. A provider set to null is removed:

```js
{
  "action": "PUT",
  "data": [
    {"_id": "NGE.POWER.DE:BASE", "ETRM": "PWR_DE_BASE"}
  ]
}
```

---

## Previewing a smart curve

Add an `expression` query parameter to a curve request to see what a smart curve built on that curve would give, without saving it. The curve in the path is the base curve. You can also pass `script`, `currency`, `units` and `timezone`, and other query parameters become properties of the smart curve: a value with a colon is a reference to another data item, for example `gas=NGE.GAS.TTF:MID`.

```js
GET https://api.opendatadsl.com/api/data/v1/private/NGE.POWER.DE:BASE:2026-10-23
    ?expression=BASE - gas * 2
    &gas=NGE.GAS.TTF:MID
Authorization: Bearer {{token}}
```

---

## Entities

There are currently 2 types of data entities (and their sub-entities):

*   TimeSeries    
    *   TimeValue        
        *   Status            
*   Curve    
    *   Contract        
        *   Status
            

### TimeSeries Entity

Here are the properties of a TimeSeries

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the TimeSeries (or object id if this is not the latest version)|String|
|_type|The type of the entity - always VarTimeSeries|String|
|description|A description of the TimeSeries|String|
|start|The start timestamp of the TimeSeries|String(DateTime)|
|calendar|The code for the calendar that this TimeSeries maps to|String|
|timezone|The timezone of the observations|String|
|currency|The currency code|String|
|units|The units code|String|
|properties|An object containing custom dynamic properties|Object|
|_objid|The id of the object that this belongs to|String|
|_dataid|The name of the data id in the object|String|
|_access|The data access role that this data belongs to|String|
|_objtype|The object type of the object that this belongs to|String|
|_oid|The id of the calendar - will match _id if this is the latest version of the calendar|String|
|_timestamp|Timestamp of when this calendar version was created|String(DateTime)|
|_user|The user id (email) of the user that created this calendar verision|String|
|_tag|A list of version tag names for this calendar version|String[]|
|_version|The version number of this calendar version|int|
|data|The time series observations|TimeValue[]|

### TimeValue Entity

The TimeValue entity represents a single observation on a TimeSeries

|**Name**|**Description**|**Type**|
|-|-|-|
|time|The time point for this observation|String(DateTime)|
|value|The value of this observation|String or Numeric|
|status|A status object|Status|

### Status Entity

The Status entity represents the quality, source and reliability status of a TimeValue or Contract entity

|**Name**|**Description**|**Type**|
|-|-|-|
|quality|The data quality 'UNCHECKED' 'VALID' 'FAILED'|String|
|source|The data source 'NEW' 'CHANGED' 'IMPLIED' 'FILLED' 'CONVERTED' 'CALCULATED'|String|
|reliability|The reliability status 'UNKNOWN' 'QUOTED' 'OBSERVED' 'UNOBSERVED'|String|

:::note
Each status value can optionally be suffixed with a ':' and some information about the status, e.g. quality=FAILED:Failed Spike Check of 5%
:::

### Curve Entity

Here are the properties of a curve

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the curve (or object id if this is not the latest version)|String|
|_type|The type of the entity - always VarCurve|String|
|ondate|An object representing a [CurveDate](/docs/odsl/variable/CurveDate)|CurveDate|
|currency|The currency code|String|
|units|The units code|String|
|properties|An object containing custom dynamic properties|Object|
|_objid|The id of the object that this belongs to|String|
|_dataid|The name of the data id in the object|String|
|_access|The data access role that this data belongs to|String|
|_objtype|The object type of the object that this belongs to|String|
|_oid|The id of the calendar - will match _id if this is the latest version of the calendar|String|
|_timestamp|Timestamp of when this calendar version was created|String(DateTime)|
|_user|The user id (email) of the user that created this calendar verision|String|
|_tag|A list of version tag names for this calendar version|String[]|
|_version|The version number of this calendar version|int|
|contracts|An array of Contract entities|Contract[]|

### Contract Entity

The contract entity represents a single tenor or contract on a forward curve

|**Name**|**Description**|**Type**|
|-|-|-|
|tenor|The tenor [period code](/docs/odsl/calendar/period-code)|String|
|value|The value of this tenor|Numeric|
|status|The status object|Status|
|ondate|An object representing a [CurveDate](/docs/odsl/variable/CurveDate)|CurveDate|
|properties|An object containing some standard properties and any custom dynamic properties|Object|


The standard properties on a Contract are:

*   absolute - The absolute [period code](/docs/odsl/calendar/period-code) of the tenor    
*   relative - The relative [period code](/docs/odsl/calendar/period-code) of the tenor    
*   expiry - The expiry or last trading date of the tenor    
*   start - The start of delivery if it is a delivered commodity    
*   end - The end of delivery if it is a delivered commodity

## Examples

```js
### Get build info
GET https://api.opendatadsl.com/api/data
Authorization: Bearer {{token}}

### Get all public data types
GET https://api.opendatadsl.com/api/data/v1/public?_distinct=_objtype
Authorization: Bearer {{token}}

### Get a public data
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT
Authorization: Bearer {{token}}

### Get a time-series range using last(n)
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT?_range=last(3)
Authorization: Bearer {{token}}

### Get a time-series range using from(d)
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT?_range=from(2021-03-08)
Authorization: Bearer {{token}}

### Get a time-series range using between(d,d)
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT?_range=between(2021-02-26,2021-03-01)
Authorization: Bearer {{token}}

### Get a time-series range for a list of data
GET https://api.opendatadsl.com/api/data/v1/public
    ?_filter={"_objtype":"%23ForeignExchange"}
    &_range=last(1)
Authorization: Bearer {{token}}

### Get a time-series range for a list of data using object filtering
GET https://api.opendatadsl.com/api/object/v1/public
    ?_filter={"_type":"%23ForeignExchange"}
    &_profile=SPOT
    &_range=last(1)
Authorization: Bearer {{token}}

### Get a time-series range using from(n) with a rule date
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT?_range=from(t-D1h0m0s0)
Authorization: Bearer {{token}}

### Get a curve
GET https://api.opendatadsl.com/api/data/v1/private/TUTORIAL_ODSL_CURVE:PREMIUM:2021-07-06
Authorization: Bearer {{token}}

### Get ALL
GET https://api.opendatadsl.com/api/data/v1/public
    ?_project={"_type":1}
    &_sort={"_id":1}
    &_limit=-1
Authorization: Bearer {{token}}

### Get data for multiple ids both private and public
GET https://api.opendatadsl.com/api/data/v1/all
    ?_id=%23ECB_FX.EURGBP:SPOT
    &_id=tsobj:SPOT
Authorization: Bearer {{token}}

### Get data for multiple ids both private and public
GET https://api.opendatadsl.com/api/data/v1/all
    ?_id=%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:OI:2021-11-30
    &_id=TUTORIAL_ODSL_CURVE:PREMIUM:2021-07-06
Authorization: Bearer {{token}}

### Get Curve TimeSeries
GET https://api.opendatadsl.com/api/data/v1/public/%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:OI?_tenor=M02
Authorization: Bearer {{token}}

### List curve tenors
GET https://api.opendatadsl.com/api/data/v1/public/%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:SETTLE?_function=list
Authorization: Bearer {{token}}
```

