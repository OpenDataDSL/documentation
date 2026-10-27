---
title: Event Service
description: REST API for the event service
slug: /api/rest/service/event
tags:
- api
- service
- event
---

## Event REST API

The Event REST API gives to access to Events.

It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/event
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List the sources you can read|
|GET|\{release\}/\{source\}|v1/private|Get a list of the event lists, or of events when you pass a _filter or _aggregate|
|GET|\{release\}/\{source\}/\{id\}|v1/private/EXAMPLE:EVENTS|Get events for an event list (an id of objectid:eventlist), or a single event|
|POST|\{release\}/\{source\}/\{id\}|v1/private/EXAMPLE:EVENTS|Add or update events in an event list from a DataFrame, see [Updating events with a DataFrame](#updating-events-with-a-dataframe)|
|POST|\{release\}/\{source\}|v1/private|Add or update events from a DataFrame with an event column holding objectid:eventlist for each row|
|PUT|\{release\}/\{source\}/\{id\}/\{version\}/\{tag\}|v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|DELETE|\{release\}/\{source\}/\{id\}|v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03|Rollback an event to the previous version, if there are no other previous versions, the event will be deleted|
|DELETE|\{release\}/\{source\}/\{id\}/\{version\}|v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03/*|Delete a specific version or use * to delete all versions|

:::info
Events are stored on master data, so you can add and update them by saving the master data record with the events in an event list property (see Examples), or by posting a DataFrame to the event service, which does the same for you.
:::

### Query parameters

|**Parameter**|**Example**|**Description**|
|-|-|-|
|_objfilter|_objfilter=\{"region":"NW"\}|Only returns events whose master data matches the filter|
|_search|_search=TTF|Searches the events of an event list|
|_count|_count=true|Event lists are not counted by default, which keeps paging fast on large lists: the response has **x-odsl-moredata** set to true while there are more pages. Pass `_count=true` to get the exact total|
|_history|_history=true|With a DataFrame POST, writes the events as a history load: faster, and no automations are triggered|
|_fast|_fast=true|With a DataFrame POST, writes the events in fast mode|

### Updating events with a DataFrame

The body is a DataFrame: a list of `columns`, and `data` with one list of values per row. Each row becomes an event with a property for each column. Post it to the event list id, or to the source with an `event` column holding the objectid:eventlist of each row. The master data must already exist.

```js
POST https://api.opendatadsl.com/api/event/v1/private/NGE.TRADES:FILLS
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "columns": ["_id", "eventtime", "price", "volume"],
  "data": [
    ["T1001", "2026-10-23T09:15:00", 42.15, 10],
    ["T1002", "2026-10-23T09:32:00", 42.40, 5]
  ]
}
```

### Functions

|**Function**|**Example**|**Description**|
|-|-|-|
|timeseries|v1/private/EXAMPLE:EVENTS?_function=timeseries&_tsprop=price|Builds a timeseries from the events, using the `_tsprop` property as the value. Optional: `_calendar` for the timeseries calendar, `_range` and a `_filter` on the events|
|curve|v1/private/EXAMPLE:EVENTS:2026-10-23?_function=curve&_vprop=price&_tprop=relative&_calendar=%23ICE.NBP|Builds a curve for the ondate in the id from the events, using `_vprop` as the value, `_tprop` as the tenor and `_calendar` as the expiry calendar (all required). An optional `_filter` selects the events|


### Event Object

An event is freeform apart from some fixed properties as shown below:

|**Name**|**Description**|**Type**|
|-|-|-|
|_type|Always 'VarEvent'|String|
|_id|A unique id for this event, it must be unique within the event list|String|
|eventtime|Date when the event is recorded|String Date|
|eventstart|Date the event starts, defaults to eventtime|String date|
|eventend|Date the event ends, defailts to eventtime|String date|

If the event is used to create a curve, the following properties are also required:

|**Name**|**Description**|**Type**|
|-|-|-|
|absolute|The absolute tenor period code|String|
|relative|The relative tenor period code|String|

## Using events
The power of events if to use them to dynamically create timeseries and curves.
These are created using VarEventTimeseries and VarEventCurve

### Event Timeseries
An event timeseries is dynamically created using events, the configuration of an event timeseries is shown below:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|A unique id for the timeseries|String|
|_type|Always 'VarEventTimeseries'|String|
|event|The name of the eventlist|String|
|property|The property name to use for the value of the observations|String|
|filter|An optional filter to use on the events|String|
|calendar|An optional calendar to align the indexes, defaults to SPARSE|String|
|index|Optional date field to use for the index used to build this TimeSeries, defaults to start|String|

### Event Curve
The configuration of an event curve is shown below:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|A unique id for the curve|String|
|_type|Always 'VarEventCurve'|String|
|event|The name of the eventlist|String|
|property|The property name to use for the value of the contracts|String|
|filter|An optional filter to use on the events|String|
|tenor|The name of the property in the event that this Curve uses as the tenor/maturity code|String|
|calendar|The expiry calendar for this Curve|String|
|holidayCalendar|The holiday calendar for this Curve - this is used to determine what dates this curve should be published on|String|
|source|Optional source of the events used to build this Curve|String|
|valueTransformation|Optional value transformation expression to change all values in the curve|String|

#### Additional properties in curve contracts
If you want to add more properties to a curve contract such as a vendor provided identifier you can an ```include``` property containing either a string or array of strings, e.g.

```json
{
  "_id": "#ECB_IR.ESTR.EURO_SHORT_TERM_RATE:RATE",
  "_type": "VarEventCurve",
  "currency": "EUR",
  "units": "PCT",
  "name": "Euro short-term rate Curve",
  "description": "",
  "timezone": "UTC",
  "event": "#ECB_IR.ESTR:CURVE",
  "property": "obs_value",
  "tenor": "relative",
  "calendar": "#FEXPESTR",
  "properties": {
    "include": "key"
  }
}
```

## Examples

### Example updating events

```js
POST {{url}}/object
Authorization: Bearer {{token}}

{
  "_id":"EXAMPLE",
  "_type":"#Object",
  "EVENTS":[
    {
      "_type": "VarEvent",
      "_id": "ID_2024-05-30_M01",
      "_dsid": "ODSL.TRADER1.NBP",
      "eventtype": "TestEventType",
      "eventtime": "2024-05-30",
      "eventstart": "2024-06-01",
      "eventend": "2024-06-30",
      "absolute": "2024M06",
      "relative": "M01",
      "PRICE": 35.025
    },
    {
      "_type": "VarEvent",
      "_id": "ID_2024-05-30_M02",
      "_dsid": "ODSL.TRADER1.NBP",
      "eventtype": "TestEventType",
      "eventtime": "2024-05-30",
      "eventstart": "2024-07-01",
      "eventend": "2024-07-31",
      "absolute": "2024M07",
      "relative": "M02",
      "PRICE": 35.135
    },
    {
      "_type": "VarEvent",
      "_id": "ID_2024-05-30_M03",
      "_dsid": "ODSL.TRADER1.NBP",
      "eventtype": "TestEventType",
      "eventtime": "2024-05-30",
      "eventstart": "2024-08-01",
      "eventend": "2024-08-31",
      "absolute": "2024M08",
      "relative": "M03",
      "PRICE": 35.155
    }
  ]
}
```

### General examples

```js
### Get example events
GET {{url}}/event/v1/private/EXAMPLE:EVENTS
Authorization: Bearer {{token}}

### Get some events with projection
GET {{url}}/event/v1/private
  ?event=EVENT_TEST:ORDERS
  &_sort=eventtime
  &_project=eventtime,price
Authorization: Bearer {{token}}

### Get an event
GET {{url}}/event/v1/private/EVENT_TEST:ORDERS:ORDER1
Authorization: Bearer {{token}}

### Rollback an event to the previous version
DELETE {{url}}/event/v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03
Authorization: Bearer {{token}}

### Delete an event
DELETE {{url}}/event/v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03/*
Authorization: Bearer {{token}}

### Get a list of versions of an event
GET {{url}}/event/v1/private/EVENT_TEST:ORDERS:ORDER1/*
Authorization: Bearer {{token}}

### Get a version of an event
GET {{url}}/event/v1/private/EVENT_TEST:ORDERS:ORDER1/1
Authorization: Bearer {{token}}

### Tag a version of an event
PUT {{url}}/event/v1/private/EVENT_TEST:ORDERS:ORDER1/3/TEST
Authorization: Bearer {{token}}

### Get a tagged version of an event
GET {{url}}/event/v1/private/EVENT_TEST:ORDERS:ORDER1/TEST
Authorization: Bearer {{token}}
```

### Event timeseries and curves

```js
### Create an event timeseries
POST {{url}}/object
Authorization: Bearer {{token}}

{
  "_id": "EVENT_TEST",
  "_type": "#Object",
  "_links": {},
  "ASK_TS": {
    "_id": "ASK_TS",
    "_type": "VarEventTimeSeries",
    "event": "EVENT_TEST:ORDERS",
    "property": "price",
    "filter": "{'side': 'ASK'}"
  }
}

### Create an event curve
POST {{url}}/object
Authorization: Bearer {{token}}

{
  "_id": "PZEM.ZTP.TEST",
  "_type": "#Object",
  "SETTLE": {
    "_id": "SETTLE",
    "_type": "VarEventCurve",
    "event": "PZEM.ZTP.TEST:EVENTS",
    "property": "SETTLEMENT_PRICE",
    "tenor": "absolute",
    "calendar": "#REOD",
    "timezone": "Europe/Amsterdam"
  }
}

### Create an event curve with value transformation
POST {{url}}/object
Authorization: Bearer {{token}}

{
  "_id": "AAA",
  "_type": "#Object",
  "_links": {},
  "VTEC": {
    "_id": "VTEC",
    "_type": "VarEventCurve",
	"name": "test",
    "event": "AAA:ECE",
    "property": "price",
    "valueTransformation": "value * 1.1",
    "tenor": "absolute",
    "calendar": "#REOMB"
  }
}

```