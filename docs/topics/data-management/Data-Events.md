---
slug: /odsl/dm/events
title: Loading Data using Events
description: This guide shows you how to use events to load transactional data
tags:
- data_management
- events
- topics
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide explains how to load data to your own data models using events and then define curves using that data.

## Introduction

Events are a thing that has happened at a point in time, similar to an observation in a TimeSeries only with a lot more information.

Example events are:

* An order placed with a broker, exchange etc.
* A trade made with a broker, exchange etc.
* A planned or unplanned outage (REMIT Urgent Market Message)

## An Event

This section describes the features of an event. 

### Event Time
An event has an event time - this can be used as the time that event was captured or, in the case of futures, the trade/curve/ondate for the valuation.

### Start and End Time
An event has a start and end time, this is used to specify the date/time range that the event covers.

### Event List Id
This is the id that relates all similar events together

### Event Type
Much like objects (master data), events have types which define the basic structure and properties of the event.

## Creating an Event Type
Creating an event type is the same as creating an object type, you then simply need to add the boolean property **event** as true.

### Example Event Type

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
TestEventType = type
	PRICE as number()
end
TestEventType.event = true
save TestEventType
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/type
Authorization: Bearer {{token}}

{
  "_id": "TestEventType",
  "_type": "Type",
  "_name": "Test Event Type",
  "_event": true,
  "PRICE": {
    "name": "PRICE",
    "type": "number",
    "_ptype": "Property"
  }
}
```

</TabItem>
</Tabs>


## Creating Events
Events need to be added to master data in the same way as timeseries, curves etc.

### Use of a DSID
If you intend to use the dataset monitoring tools, you can add a _dsid (Dataset ID) property to your events.
A _dsid comprises of 3 sections separated by dots - ```PROVIDER.FEED.PRODUCT```

For example: ODSL.TRADER1.NBP

All events for the same combination of provider, feed and product should use the same _dsid.

:::info
It is recommended that you use your own company name/code for the provider so as not to be confused with data providers 
:::

### Create events for use with curves

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

You can create events using curve date and tenor which will populate the eventtime, eventstart, eventend, absolute, relative and expiry fields automatically.


```js
expcal = ${expiry:"#REOD"}
ondate = CurveDate("2024-05-30", expcal)

e1 = Event(ondate, "M01")
e1.id = "ID_2024-05-30_M01"
e1._dsid = "ODSL.TRADER1.NBP"
e1.eventtype = "TestEventType"
e1.PRICE = 35.025
e2 = Event(ondate, "M02")
e2.id = "ID_2024-05-30_M02"
e2._dsid = "ODSL.TRADER1.NBP"
e2.eventtype = "TestEventType"
e2.PRICE = 35.125
e3 = Event(ondate, "M03")
e3.id = "ID_2024-05-30_M03"
e3._dsid = "ODSL.TRADER1.NBP"
e3.eventtype = "TestEventType"
e3.PRICE = 35.155

EXAMPLE = Object()
EXAMPLE.EVENTS = [e1, e2, e3]

save EXAMPLE
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/object
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
      "PRICE": 35.125
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

</TabItem>
</Tabs>

## Creating Event Curves
An event curve dynamically creates curves from an event list.
In order to use events for curves, they must have at a minimum:
* The **eventtime** must represent the curve date
* It must have a property named **relative** containing a relative [period code](/docs/kb/pc)
* It must have a property named **absolute** containing an absolute [period code](/docs/kb/pc)
* It can optionally have a property called **expiry** containing the last trade date of the tenor, if this exists, the contract will use the eventstart and eventend properties as the start and end of delivery  

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

The EventCurve is constructed using the following properties:
* Event list id
* Expiry Calendar
* Property on the event containing the values
* Property on the event containing the absolute or relative tenor

```js
EXAMPLE = Object()
EXAMPLE.PRICE = EventCurve("EXAMPLE:EVENTS", "#REOD", "PRICE", "absolute")
save EXAMPLE
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/type
Authorization: Bearer {{token}}

{
  "_id": "EXAMPLE",
  "_type": "#Object",
  "PRICE": {
    "_id": "PRICE",
    "_type": "VarEventCurve",
    "event": "EXAMPLE:EVENTS",
    "property": "PRICE",
    "tenor": "absolute",
    "calendar": "#REOD"
  }
}
```

</TabItem>
</Tabs>
