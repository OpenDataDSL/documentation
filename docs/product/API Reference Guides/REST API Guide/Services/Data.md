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

The Data REST API is a read-only API allowing you to search and filter the complex data types and is accessed through the following URL:
```js
https://api.opendatadsl.com/api/data
```

:::note
The API is read-only because you must relate the data entity to an object entity - so saving and deleting object entities with data properties will save and delete those related data entities
:::

### REST Methods
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|'v1/public' 'v1/private'|List public or private data items|
|GET|{release}/{source}/{key}|v1/private/TEST:SPOT|Retrieve a single data item using its id|

### Query Parameters
Below is a table of the query parameters that are usable with the data REST API

|**Parameter**|**Usable On**|**Example**|**Description**|
|-|-|-|-|
|tenor|Curve|tenor=M01|Retrieves an historic TimeSeries of a specific tenor of a curve|
|listTenors|Curve|listTenors|Lists all the relative tenors available in this curve|
|_range last|TimeSeries|_range=last(3)|Returns the last n observations|
|_range from|TimeSeries|_range=from(2021-03-01)|Returns all observations from the specified date|
|_range from|TimeSeries|_range=from(2021-03-01,Europe/Paris)|Returns all observations from the specified date converted to the specified timezone|
|_range between|TimeSeries|_range=between(2021-03-01,2021-03-31)|Returns only the observation within the specified range|
|_range between|TimeSeries|_range=between(2021-03-01,2021-03-31,Europe/Paris)|Returns only the observation within the specified range in the specified timezone|
|_id|Any|_id=MYCURVE:2021-03-01|Used when retrieving multiple data entities from anywhere (use all as source)|
|currency|Any|currency=USD|Converts the TimeSeries or Curve to the supplied currency|
|units|Any|units=MT|Converts the TimeSeries or Curve to the supplied units|
|__density|Any|__density=980|When used in conjunction with unit conversion, this overrides the default density of the product being converted|


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
|ondate|An object representing a [CurveDate](/docs/odsl/variable/curvedate)|CurveDate|
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
|ondate|An object representing a [CurveDate](/docs/odsl/variable/curvedate)|CurveDate|
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
GET https://api.opendatadsl.com/api/data/v1/public/%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:OI?tenor=M02
Authorization: Bearer {{token}}

### List curve tenors
GET https://api.opendatadsl.com/api/data/v1/public/%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:SETTLE?listTenors
Authorization: Bearer {{token}}
```

