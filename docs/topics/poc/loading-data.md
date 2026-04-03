---
slug: /poc/loading-data
title: Loading Data
description: The different ways to get data into the OpenDataDSL platform
sidebar_position: 6
tags:
- poc
- etl
- loading
- data
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Loading Data

OpenDataDSL supports several patterns for getting data into the platform. This page introduces each approach so you can choose what fits your use case.

## Overview

| Method | Best for |
|-|-|
| [ETL Workflows](#etl-workflows) | Scheduled collection from external sources — websites, APIs, FTP |
| [Events](#events) | Transactional or tick data where each record has its own timestamp and properties |
| [Queue ingestion](#queue-ingestion) | Pushing data from external systems into the platform asynchronously |
| [Direct API / SDK](#direct-api--sdk) | Writing data programmatically from your own application |

---

## ETL Workflows

The most common pattern for loading public or vendor data is an ETL (Extract, Transform, Load) workflow. You build a workflow from reusable actions, schedule it as a process, and the platform runs it automatically.

The typical steps are:

1. **Extract** — pull raw data from an HTTP URL, FTP server, file store, or API using a built-in extractor action
2. **Transform** — map the raw data into your declared types using a transformer
3. **Load** — save the resulting objects and timeseries/curve data to the platform

### Example — loading ECB FX data daily

```js
// Create a process that runs the public ECB FX workflow every weekday at 17:00
process = Process()
process.service = "ETL"
process.name = "ECB_FX_WORKFLOW"
process.description = "Daily ETL for ECB foreign exchange rates"
process.enabled = true
process.workflow = "#xml_data_loader"
process.input.url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
process.input.tx = "ECB_FX"
process.cron = "0 17 ? * MON,TUE,WED,THU,FRI *"
save ${process:process}
```

:::tip
The public action library includes ready-made extractors for XML, JSON, CSV, HTML, FTP, and more. Start from a public workflow and customise it for your source.
:::

**Further reading:** [Workflows and Processes](/docs/odsl/dm/workflow)

---

## Events

Events are used for transactional or tick-level data where each record carries its own timestamp, start/end time, and a set of typed properties. They are well suited to trade data, exchange settlement prices, and REMIT market messages.

Events are grouped by a shared ID (`_dsid`) that identifies the provider, feed, and product — for example `ICE.IFEU.B`. This ID is also used by the [dataset monitoring](/docs/poc/dataset-monitoring) system to track completeness and quality.

### Creating an event type

<Tabs groupId="tool">
<TabItem value="odsl" label="ODSL" default>

```js
TradeEvent = type
    PRICE as number()
    VOLUME as number()
end
TradeEvent.event = true
save TradeEvent
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/type
Authorization: Bearer {{token}}

{
  "_id": "TradeEvent",
  "_type": "Type",
  "_event": true,
  "PRICE": { "name": "PRICE", "type": "number", "_ptype": "Property" },
  "VOLUME": { "name": "VOLUME", "type": "number", "_ptype": "Property" }
}
```

</TabItem>
</Tabs>

**Further reading:** [Loading Data using Events](/docs/odsl/dm/events)

---

## Queue Ingestion

If you have an external system that generates data — a trading platform, risk system, or custom application — you can push that data into OpenDataDSL via a message queue. The platform listens on the queue and triggers a script or workflow to process and save each message.

### Setup steps

**1. Create a trigger queue**

```js
inbound = Queue("inbound")
inbound.handler = "trigger"
save inbound
```

**2. Create an automation to route queue messages to a processing script**

```json
POST https://api.opendatadsl.com/api/automation/v1
Authorization: Bearer {{token}}

{
  "_type": "VarAutomation",
  "target": "odsl.script",
  "enabled": true,
  "properties": {
    "script": "#my-load-script"
  },
  "conditions": [{
    "source": "private",
    "service": "queue",
    "id": "inbound",
    "action": "message"
  }]
}
```

**3. Send data to the queue**

Any application can publish a message to the queue. Include an `origin` property in the message so the platform knows the source queue.

:::note
Queue ingestion decouples the data producer from the platform — your external system does not need to know anything about OpenDataDSL's API, only the queue endpoint.
:::

**Further reading:** [Loading data from a message queue](/docs/odsl/dl/queue) · [Automation REST service](/docs/api/rest/service/automation)

---

## Direct API / SDK

For applications that need to write data directly, OpenDataDSL provides a REST API and SDKs for Python, Java, .NET, MATLAB, and JavaScript.

### Example — saving a timeseries via Python SDK

```python
from odsl import OpenDataDSL

odsl = OpenDataDSL()

ts = odsl.TimeSeries("BUSINESS")
ts.add("2024-01-02", 101.5)
ts.add("2024-01-03", 102.1)

obj = odsl.Object()
obj["MY_PRICE"] = ts
odsl.save("object", "MY_OBJECT", obj)
```

### Example — saving an object via REST API

```js
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "MY_OBJECT",
  "_type": "MyType",
  "name": "My Object"
}
```

**Further reading:** [Python SDK](/docs/sdk/python) · [Java SDK](/docs/sdk/java) · [REST API Guide](/docs/api/rest)

---

## Choosing an approach

| You want to… | Use… |
|-|-|
| Collect data from a public website or vendor API on a schedule | ETL workflow + process |
| Load tick-by-tick or transactional data with rich per-record metadata | Events |
| Push data from an existing internal system without API integration | Queue ingestion |
| Write data from your own application using a typed SDK | Direct API / SDK |
| Load data once or interactively during development | Direct API / ODSL script |

## Next Steps

* [Extracting Data](/docs/poc/extracting-data) — getting data back out of the platform
* [Dataset Monitoring](/docs/poc/dataset-monitoring) — track completeness and quality of loaded data
* [Workflows and Processes](/docs/odsl/dm/workflow) — full workflow reference
