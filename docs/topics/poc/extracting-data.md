---
slug: /poc/extracting-data
title: Extracting Data
description: The different ways to get data out of the OpenDataDSL platform
sidebar_position: 7
tags:
- poc
- api
- extraction
- data
- excel
- automations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting Data

OpenDataDSL provides multiple ways to consume data, from interactive tools for analysts to programmatic APIs for application integration.

## Overview

| Method | Best for |
|-|-|
| [Web Portal](#web-portal) | Interactive browsing, charting, and ad-hoc exploration |
| [Excel Add-in](#excel-add-in) | Pulling data directly into spreadsheets |
| [REST API / SDK](#rest-api--sdk) | Application integration and programmatic access |
| [Automations](#automations) | Event-driven delivery — push data downstream when it changes |
| [Reports](#reports) | Structured, formatted output for regular distribution |

---

## Web Portal

The web portal lets you browse master data, view timeseries charts, inspect forward curves, and run reports — all without writing any code. It works in any browser and on mobile.

Use the portal for ad-hoc data exploration, monitoring process executions, and managing automations.

<a className="btn btn-primary" href="https://portal.opendatadsl.com">Open the Web Portal</a>

**Further reading:** [Web Portal guide](/docs/user/portal)

---

## Excel Add-in

The free Excel add-in connects your spreadsheets directly to the platform. You can search for objects, pull timeseries and curve data into cells, and refresh the data at any time.

The add-in supports:
- Timeseries — pull historical values into a range
- Curves — pull forward curve contracts for a given date
- Objects — pull master data properties into cells
- Reports — render a report output into a sheet

**Further reading:** [Excel Add-in guide](/docs/user/excel)

---

## REST API / SDK

Every piece of data in the platform is accessible via the REST API. SDKs wrap the API for Python, Java, .NET, MATLAB, and JavaScript.

### Example — reading a timeseries via ODSL

```js
// Read a specific timeseries property from an object
ts = ${data:"#ECB_FX.EURGBP:SPOT"}
print ts
```

### Example — reading via Python SDK

```python
from odsl import OpenDataDSL

odsl = OpenDataDSL()
ts = odsl.get("data", "#ECB_FX.EURGBP:SPOT")
print(ts)
```

### Example — reading via REST API

```js
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT
Authorization: Bearer {{token}}
```

### Filtering and projecting

The API supports rich filtering, field projection, date-range queries, and aggregation. For example, to get only the values between two dates:

```js
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT
  ?_range=between(2024-01-01,2024-06-30)
Authorization: Bearer {{token}}
```

**Further reading:** [REST API Guide](/docs/api/rest) · [Python SDK](/docs/sdk/python) · [Java SDK](/docs/sdk/java)

---

## Automations

Rather than polling for data, you can automate delivery — the platform pushes data to your system automatically whenever a watched item changes.

An automation has two parts: a **condition** that defines what to watch (which data item and which action triggers it) and a **target** that defines where to send the data.

### Automation targets

| Target | Description |
|-|-|
| `odsl.queue` | Push a message to a named queue for an internal application to consume |
| `odsl.email` | Send a formatted email |
| `odsl.email_attachment` | Send data as an email attachment, optionally transformed |
| `odsl.webhook` | POST data to an external HTTP endpoint |
| `odsl.teams` | Post a notification to a Microsoft Teams channel |
| `odsl.curve` | Trigger a Smart Curve build |

### Example — push to a queue when data updates

```json
POST https://api.opendatadsl.com/api/automation/v1
Authorization: Bearer {{token}}

{
  "_type": "VarAutomation",
  "target": "odsl.queue",
  "enabled": true,
  "properties": {
    "queue": "my-downstream-queue",
    "subject": "ECB_FX_UPDATE"
  },
  "conditions": [{
    "source": "public",
    "service": "data",
    "id": "#ECB_FX.EURGBP:SPOT",
    "action": "update"
  }]
}
```

### Example — send an email attachment when data updates

```json
POST https://api.opendatadsl.com/api/automation/v1
Authorization: Bearer {{token}}

{
  "_type": "VarAutomation",
  "target": "odsl.email_attachment",
  "enabled": true,
  "properties": {
    "to": "analyst@company.com",
    "subject": "ECB FX Update",
    "attachmentName": "ecb_fx_${date:yyyy-MM-dd}.csv",
    "attachment": true,
    "@transformer": "#VarTimeSeries_CSV"
  },
  "conditions": [{
    "source": "public",
    "service": "data",
    "id": "#ECB_FX.EURGBP:SPOT",
    "action": "update"
  }]
}
```

:::tip
To see all available automations for a specific data item, use the `listAutomations` special function:
```js
GET https://api.opendatadsl.com/api/data/v1/public/%23ECB_FX.EURGBP:SPOT?_function=listAutomations
```
This returns all valid automation templates pre-populated with the item's condition — you can use them directly as the body for a POST to create an automation.
:::

**Further reading:** [Automation REST service](/docs/api/rest/service/automation) · [Automation Target service](/docs/api/rest/service/automationtarget)

---

## Reports

Reports let you define a structured, formatted data output that is generated on a schedule or on demand. A report has a configuration (script + template) and produces a stored output that can be read via the API, rendered in the portal, downloaded in Excel, or distributed by email.

Reports are well suited to:
- Daily price summaries distributed to a team
- End-of-day curve snapshots exported to CSV
- KPI dashboards built from aggregated platform data

**Further reading:** [Reporting Basics](/docs/topics/reporting/basics)

---

## Choosing an approach

| You want to… | Use… |
|-|-|
| Browse and explore data interactively | Web Portal |
| Pull data into Excel for analysis or reporting | Excel Add-in |
| Read data from your own application | REST API / SDK |
| Push data downstream whenever it changes | Automation |
| Distribute a formatted data summary on a schedule | Report + automation (email target) |

## Next Steps

* [Loading Data](/docs/poc/loading-data) — getting data into the platform
* [Data Identities](/docs/odsl/dm/identities) — mapping data items to the IDs used by downstream systems
* [Automation REST service](/docs/api/rest/service/automation) — full automation reference
* [REST API Guide](/docs/api/rest) — complete API reference
