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
|GET|\{release\}/\{source\}|v1/private|Get a list of events|
|GET|\{release\}/\{source\}/\{id\}|v1/private/EXAMPLE:EVENTS|Get events for an event list|
|PUT|\{release\}/\{source\}/\{id\}/\{version\}/\{tag\}|v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|DELETE|\{release\}/\{source\}/\{id\}|v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03|Rollback an event to the previous version, if there are no other previous versions, the event will be deleted|
|DELETE|\{release\}/\{source\}/\{id\}/\{version\}|v1/private/EXAMPLE:EVENTS:ID_2024-05-30_M03/*|Delete a specific version or use * to delete all versions|

:::info
Note: You cannot update events directly, they must be updated attached to a master data record - see Examples
:::


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

\{
  "_id": "EVENT_TEST",
  "_type": "#Object",
  "_links": \{\},
  "ASK_TS": \{
    "_id": "ASK_TS",
    "_type": "VarEventTimeSeries",
    "event": "EVENT_TEST:ORDERS",
    "property": "price",
    "filter": "\{'side': 'ASK'\}"
  \}
\}

### Create an event curve
POST {{url}}/object
Authorization: Bearer {{token}}

\{
  "_id": "PZEM.ZTP.TEST",
  "_type": "#Object",
  "SETTLE": \{
    "_id": "SETTLE",
    "_type": "VarEventCurve",
    "event": "PZEM.ZTP.TEST:EVENTS",
    "property": "SETTLEMENT_PRICE",
    "tenor": "absolute",
    "calendar": "#REOD",
    "timezone": "Europe/Amsterdam"
  \}
\}

### Create an event curve with value transformation
POST {{url}}/object
Authorization: Bearer {{token}}

\{
  "_id": "AAA",
  "_type": "#Object",
  "_links": \{\},
  "VTEC": \{
    "_id": "VTEC",
    "_type": "VarEventCurve",
	"name": "test",
    "event": "AAA:ECE",
    "property": "price",
    "valueTransformation": "value * 1.1",
    "tenor": "absolute",
    "calendar": "#REOMB"
  \}
\}

```