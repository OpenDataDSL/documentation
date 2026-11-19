---
title: Reports and dashboards
description: The JSON of report configurations, reports, report creators and dashboards
slug: /api/json/reports
sidebar_position: 10
tags:
  - api
  - json
  - report
---

# Reports and dashboards

---

## Report configuration

A report configuration says how a report is made: the script and expression that produce its data, the template that shows it, and when it runs. Service: [Report Config](/docs/api/rest/service/reportconfig) (`reportconfig/v1/{source}`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The report id |
| `_type` | String | No | `VarReportConfiguration` |
| `reportType` | String | No | `Default`, `Fixed` (updated by hand or by a process, not calculated), `Dynamic` (run for the latest date when read), `Insight`, `Widget`, `Composition` or `CompositionTemplate` |
| `name` | String | No | The name |
| `description` | String | No | A description |
| `category`, `subCategory` | String | No | Used to organise reports |
| `script` | String | No | The script that runs the report |
| `expression` | String | No | The expression to run, usually a function in the script, for example `dailySummary()` |
| `template` | String | No | The mustache template that shows the report as HTML |
| `defaultRange` | String | No | The date range used when the report runs without one, for example `last(5)` |
| `cron` | String | No | The schedule, see [Cron](/docs/kb/cron). Saving a schedule records you as `runAs` |
| `enabled` | Boolean | No | True to run the report on its schedule |
| `currency`, `units`, `timezone` | String | No | Passed to the report |
| `properties` | Object | No | Values passed to the report and its template |
| `tags` | String[] | No | Tags |
| `hideExcel` | Boolean | No | Leave the report out of the Excel add-in's lists |
| `hideList` | Boolean | No | Leave the report out of report lists |
| `mergeUpdates` | Boolean | No | For a fixed report: merge each update for a date into the stored report instead of making a new version |
| `mergeKeys` | String[] | No | With `mergeUpdates`: the field names used to match list elements when merging; the first one present in an element is used |
| `cacheOptions` | Object | No | When a run is stored: `type` is `OnDemand` (the default), `Never`, `OnSchedule` or `External`; `schedule` and `store` (the source, defaults to `private`). Insight and Widget reports are never stored |
| `_odg` | Object | No | An ondate generator: how the report dates are worked out |

```json
{
  "_id": "NGE_GAS_DAILY",
  "_type": "VarReportConfiguration",
  "reportType": "Default",
  "name": "Gas daily summary",
  "category": "Gas",
  "script": "northgate\\reports\\gas-daily",
  "expression": "dailySummary()",
  "template": "northgate\\reports\\gas-daily-template",
  "defaultRange": "last(5)",
  "cron": "0 19 * * 1-5 * Europe/London",
  "enabled": true,
  "properties": {"region": "NW"},
  "tags": ["gas", "daily"],
  "hideExcel": false,
  "hideList": false,
  "cacheOptions": {"type": "OnDemand", "store": "private"}
}
```

---

## Report

A report is the result of running a report configuration for a date. It has every field of its [configuration](#report-configuration), with `_type` `VarReport`, and:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | `reportid:date`, for example `NGE_GAS_DAILY:2026-11-18` |
| `report` | String | The report configuration id |
| `ondate` | Date | The report date |
| `start`, `end` | Date | The date range the report ran for |
| `data` | Any | The report data: whatever the expression returned |
| `scriptVersion` | Integer | The version of the script that ran |
| `ErrorMessage` | String | Why the report failed, if it did. Note the capital E |

Service: [Report](/docs/api/rest/service/report) (`report/v1/{source}`). To save a fixed report yourself, POST the report with its `data` to `report/v1/private/NGE_GAS_DAILY:2026-11-18`.

```json
{
  "_id": "NGE_GAS_DAILY:2026-11-18",
  "_type": "VarReport",
  "report": "NGE_GAS_DAILY",
  "reportType": "Default",
  "name": "Gas daily summary",
  "ondate": "2026-11-18",
  "start": "2026-11-12",
  "end": "2026-11-18",
  "scriptVersion": 7,
  "data": {
    "rows": [
      {"product": "TTF", "settle": 42.15, "change": 0.35},
      {"product": "NBP", "settle": 104.30, "change": 1.10}
    ]
  }
}
```

---

## Report creator

A report creator is a report configuration with parameters that people fill in to make their own reports. Service: [Report Creator](/docs/api/rest/service/reportcreator) (`reportcreator/v1/{source}`), versioned. It has the fields of a [report](#report), with `_type` `VarReportCreator`, and `parameters`: an object with an entry per parameter name.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `type` | String | The type of value |
| `description` | String | What the parameter is for |
| `example` | String | The value used to build the example report |

```json
"parameters": {
  "curve": {"type": "String", "description": "The curve to summarise", "example": "NGE.GAS.TTF:SETTLE"},
  "days": {"type": "Number", "description": "How many days to compare", "example": "5"}
}
```

---

## Dashboard

A dashboard built in the portal. Service: [Dashboard](/docs/api/rest/service/dashboard) (`dashboard/v1`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | No | Made for you when you create a dashboard |
| `name` | String | Yes | The name |
| `shared` | Boolean | No | True to share it with everyone in your company, defaults to false |
| `owner` | String | No | The owner's email, defaults to the person who creates it |
| (layout) | Any | No | The rest of the dashboard is its layout, as saved by the portal |
