---
title: Timeseries
sidebar_position: 6
slug: /tutorials/qs/mongodb/timeseries
tags:
- quickstart
- odsl
- mongodb
- timeseries
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<QuickStartModule text="This quickstart module gives an in-depth guide on creating, updating, validating and visualising Timeseries" />

## Introduction to Timeseries

:::info
Timeseries are a collection of observations recorded at a point in time.
They have many uses including but not limited to:
* Financial pricing and trading information
* Fundamental and statistical information
* Metrics collected from IOT devices
* Power plant outage information
:::

Timeseries generally are associated with a calendar which normalises the dates/times when observations are recorded.
If a timeseries does not have a calendar, we call it a ```sparse``` timeseries.

## OpenDataDSL Timeseries
There are 4 different types of timeseries in OpenDataDSL:
* Regular timeseries
* Smart timeseries
* Event timeseries
* Curve tenor timeseries

### Regular timeseries
A regular timeseries is a self-contained timeseries with actual stored values, 
this is the most common timeseries for low-frequency (daily, monthly etc.) real data collected and stored in the database.

#### An example of creating a regular timeseries

This example shows you how to create regular timeseries starting on the 1st of November using a business (Mon-Fri) calendar.
We add an array of values which represent the values for the business days from the 1st of November - the calendar determines which days they represent.

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
// Create 2 regular timeseries starting on the 1st of November using a business (Mon-Fri) calendar
ts1 = TimeSeries("2022-11-01", "BUSINESS", [12.5,12.6,12.7,12.8,12.9])
ts2 = TimeSeries("2022-11-01", "BUSINESS", [12.3,12.45,12.62,12.72,12.81])

// Add to an object
MYOBJ = Object()
MYOBJ.TS1 = ts1
MYOBJ.TS2 = ts2

// Save the object
save ${object:MYOBJ}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "MYOBJ",
  "TS1": {
        "_id": "TS1",
        "_type":"VarTimeSeries",
        "calendar": "BUSINESS",
        "start": "2022-11-01",
        "data":[ 12.5,12.6,12.7,12.8,12.9 ]
  },"TS2": {
        "_id": "TS2",
        "_type":"VarTimeSeries",
        "calendar": "BUSINESS",
        "start": "2022-11-01",
        "data":[ 12.3,12.45,12.62,12.72,12.81 ]
  }
}
```

</TabItem>
</Tabs>

### Smart timeseries
A smart timeseries is a combination of one or more regular timeseries and an expression which is evaluated on the fly.
An example of a smart timeseries is a ```spread``` which is the difference between 2 timeseries.

#### An example of creating a smart timeseries

This example shows you how to create a smart timeseries from the 2 regular timeseries we created in the section above 

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
// Create a spread smart timeseries
MYOBJ = Object()
MYOBJ.SPREAD = SmartTimeSeries(ref("data", "MYOBJ:TS1"), "BASE-OTHER")
MYOBJ.SPREAD.OTHER = ref("data", "MYOBJ:TS2")

// Save the object
save ${object:MYOBJ}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
    "_id":"MYOBJ",
    "SPREAD":
    {
        "_id":"SPREAD",
        "_type":"VarSmartTimeSeries",
        "baseTimeSeries":"${data:'MYOBJ:TS1'}",
        "expression":"BASE-OTHER",
        "properties": {
            "OTHER":"${data:'MYOBJ:TS2'}"
        }
    }    
}
```
</TabItem>
</Tabs>

### Event timeseries
An event timeseries is a timeseries that is constructed using a value from a set of documents called events.
You could see an event as a timeseries observation stored in its own document.

We use event timeseries when either the data is high frequency (hourly, 15 minutely etc.) or we need to store more information than just a time and value about the observation.

#### An example of creating a event timeseries

This example shows creating 2 events and then using them with an event timeseries.

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
// Create an object
MYOBJ = Object()

// Create some events - trade orders
ev1 = Event("2022-06-23T10:24:21")
ev1.type = "ASK"
ev1.price = 12.31
ev1.volume = 200

ev2 = Event("2022-06-23T10:24:22")
ev2.type = "BID"
ev2.price = 12.29
ev2.volume = 200

// Add the orders to the object
MYOBJ.ORDERS = [ev1, ev2]

// Create an event timeseries for the order prices
MYOBJ.ETS_PRICE = EventTimeSeries("MYOBJ:ORDERS", "price")

// Save the object
save ${object:MYOBJ}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "MYOBJ",
  "ORDERS": [{
    "_type": "VarEvent",
    "_id": "ev1",
    "eventtime": "2022-06-23T10:23:23",
    "price": 12.33,
    "type": "ASK",
    "volume": 20.0
  },{
    "_type": "VarEvent",
    "_id": "ev2",
    "eventtime": "2022-06-23T10:45:23",
    "type": "BID",
    "price": 12.43,
    "volume": 20.0
  }],
  "ETS_PRICE": {
    "_id": "ETS_PRICE",
    "_type": "VarEventTimeSeries",
    "event": "MYOBJ2:ORDERS",
    "property": "price"
  }
}
```
</TabItem>
</Tabs>

### Curve tenor timeseries
Curve tenor timeseries show the history of a specific curve tenor and are dynamically generated when requested - so we don't need to create them.

To retrieve a curve tenor timeseries, we simply need to request the curve code suffixed with : and the tenor name, e.g.

```#DCE.AG.CN.A.NO1_SOYBEAN.FUT:SETTLE:M01```

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
TS = ${data:"#DCE.AG.CN.A.NO1_SOYBEAN.FUT:SETTLE:M01"}
print TS.values
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
GET https://api.opendatadsl.com/api/data/v1/public/%23DCE.AG.CN.A.NO1_SOYBEAN.FUT:SETTLE:M01
Authorization: Bearer {{token}}
```
</TabItem>
</Tabs>
