---
title: Datasets and data quality
description: The JSON of datasets, dataset feeds, deliveries, corrections, validation configurations and records, and alerts
slug: /api/json/datasets-and-quality
sidebar_position: 11
tags:
  - api
  - json
  - dataset
  - validation
  - alert
---

# Datasets and data quality

---

## Dataset

A dataset is a set of data you expect to arrive regularly, for example one exchange product's settlement prices. The platform monitors each day's delivery against it. Service: [Dataset](/docs/api/rest/service/dataset) (`dataset/v1/info`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | `provider.feed.product`, for example `ICE.NDEX.TFM` |
| `_type` | String | No | `Dataset` |
| `dsid` | String | No | The same as `_id` |
| `name` | String | No | The name |
| `provider`, `feed`, `product` | String | No | The parts of the id |
| `source` | String | No | `private`, `common` or `public` |
| `qualityGroup` | String | No | The quality group whose checks run on each delivery |
| `expected` | Object | No | How many tenors of each kind to expect: numbers by period type, and `*` for the total |
| `checks` | Array | No | Quality checks: each with `type` (`function` or `group`), `name`, and `expression` (for a function) or `group` |
| `expectedChecks` | Array | No | Completeness checks, in the same form as `checks` |

```json
{
  "_id": "ICE.NDEX.TFM",
  "_type": "Dataset",
  "dsid": "ICE.NDEX.TFM",
  "provider": "ICE",
  "feed": "NDEX",
  "product": "TFM",
  "name": "ICE Endex Dutch TTF Gas Futures",
  "qualityGroup": "default",
  "expected": {"*": 82, "Month": 59, "Quarter": 19, "Year": 4},
  "source": "private"
}
```

### Dataset feed

A feed groups the datasets of one provider that arrive together. Service: `dataset/v1/feed`.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | `provider.feed`, for example `ICE.NDEX` |
| `_type` | String | `DatasetFeed` |
| `name`, `provider`, `feed`, `source` | String | As for a dataset |
| `calendar` | String | The holiday calendar: the days the feed is delivered |
| `time` | String | When the feed should arrive, `HH:mm` and a timezone code, for example `18:30 EU1` |
| `late` | String | When it is late, in the same form |
| `smartFeed` | Boolean | True to load the feed with the smart loader |
| `loaders` | Array | For a smart feed: each loader's `type` (`standard`, `auto` or `manual`), `id`, `process`, `calendar`, `start` and `retryStrategy` (`strategy` and `retryMinutes`) |

```json
{
  "_id": "NGE.ETRM",
  "_type": "DatasetFeed",
  "provider": "NGE",
  "feed": "ETRM",
  "name": "Northgate ETRM end of day",
  "calendar": "BUSINESS",
  "source": "private",
  "time": "19:00 EU1",
  "late": "21:00 EU1"
}
```

---

## Dataset delivery

The record of a dataset's delivery for one date, written by the platform as data arrives. Services: [Dataset Delivery](/docs/api/rest/service/dataset_delivery) (`dataset_delivery/v1/{source}`) and `dataset/v1/delivery`.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | `datasetid:date`, for example `ICE.NDEX.TFM:2026-11-18` |
| `dsid` | String | The dataset id |
| `ondate` | Date | The delivery date |
| `status` | String | `waiting`, `active`, `partial`, `loaded`, `late`, `missing` or `holiday` |
| `statusinfo` | String | More about the status |
| `complete` | Boolean | True when everything expected has arrived |
| `score`, `scoreinfo` | | 4 no issues, 3 late by under an hour, 2 late by under four hours, 1 later, 0 holiday |
| `expected`, `actual` | Object | The tenors expected and delivered |
| `timings` | Object | `expected`, `late`, `loaded` and `late_delta` (minutes late) |
| `deliveries` | Object | Each delivery: `id`, `timestamp`, `reason`, `origin`, `tenors` |
| `checks`, `expectedChecks` | Object | The results of the quality and completeness checks |
| `timeline` | String[] | Everything that happened, one message per line: time, level, origin, phase and message |
| `issues` | String[] | What stops the delivery being complete |
| `initialised`, `timestamp`, `loadedTimeUTC` | DateTime | When the record was started, last changed and when the data was loaded |

See [Dataset delivery configuration](/docs/api/rest/service/dataset#dataset-delivery-configuration) for each part in detail and a full example.

---

## Correction

A correction is a value that changed in a later delivery for the same date. Service: [Correction](/docs/api/rest/service/correction) (`correction/v1/{source}`), read-only.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `dsid` | String | The dataset id |
| `ondate` | Date | The delivery date |
| `property` | String | The property that changed |
| `tenor` | String | The tenor that changed, for curve data, as a [period code](/docs/odsl/calendar/period-code) |
| `previous`, `new` | Any | The value before and after |
| `last` | DateTime | When the previous value was delivered |
| `timestamp` | DateTime | When the correction was delivered |
| `origin` | String | Where the correction came from |
| `invocationId` | String | The request that delivered it |

---

## Validation configuration

The checks to run on one curve or timeseries. Service: [Validation Config](/docs/api/rest/service/validationconfig) (`validationconfig/v1`), versioned. The `_id` is the data id.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The data id, for example `NGE.GAS.TTF:SETTLE` |
| `kind` | String | Yes | `curve` or `timeseries` |
| `name`, `description`, `group` | String | No | Descriptive fields |
| `tags` | String[] | No | Tags |
| `enabled` | Boolean | No | False to stop the checks |
| `runOnUpdate` | Boolean | No | Run the checks when the data is updated |
| `scripts` | String[] | No | Scripts whose functions the checks use |
| `checks` | Array | No | Up to 50 checks: `id`, `name`, `expression` (one line of ODSL), `scope` (`tenor`, `curve` or `point`), `severity` (`warning`, `failed` or `severe`), `enabled` |
| `options` | Object | No | `lookback`, `curveHistory`, `writeStatus`, `maxPoints` |

```json
{
  "_id": "NGE.GAS.TTF:SETTLE",
  "kind": "curve",
  "name": "TTF settlement",
  "group": "Gas",
  "enabled": true,
  "runOnUpdate": true,
  "scripts": ["#ValidationLibrary"],
  "checks": [
    {"id": "missing", "name": "Missing", "expression": "checkMissing()", "scope": "tenor", "severity": "failed", "enabled": true},
    {"id": "gaps", "name": "Gaps", "expression": "checkCurveGaps()", "scope": "curve", "severity": "failed", "enabled": true}
  ],
  "options": {"lookback": 30, "curveHistory": 1, "writeStatus": true, "maxPoints": 250}
}
```

See [A validation configuration](/docs/extensions/validation/reference#a-validation-configuration) for each option.

## Validation record

The result of the checks for one data point, written by the platform. Service: [Validation](/docs/api/rest/service/validation) (`validation/v1`). The main fields:

| **Field** | **What it is** |
|-|-|
| `_id` | `DATA_ID:TIME` for a timeseries, `DATA_ID:ONDATE` for a curve |
| `target`, `name`, `kind`, `group`, `tags` | The data item and its configuration |
| `point`, `pointDate`, `value` | The data point checked |
| `status` | `valid`, `warning`, `failed`, `severe`, `error`, `skipped` or `overridden` |
| `checks` | The result of each check |
| `tenors`, `failedTenors`, `warningTenors`, `tenorCounts` | For curves: the result for each contract |
| `override` | `reason`, `user`, `timestamp` and the status overridden |
| `timeline` | The last 100 events |

See [A validation record](/docs/extensions/validation/reference#a-validation-record) for every field.

---

## Alert

An alert is a problem with your data that stays open until someone closes it. Service: [Alert](/docs/api/rest/service/alert) (`alert/v1/{source}`). The main fields:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | `ALR-` and the year and a number, for example `ALR-2026-000401`; `ALC-` for common and `ALP-` for public alerts |
| `title`, `message`, `description` | String | What is wrong |
| `category` | String | A grouping, such as `dataset`, `curve` or `system` |
| `issue` | String | `delivery`, `completeness`, `quality`, `metadata`, `corrections`, `build`, `export` or another |
| `severity` | String | `critical`, `high`, `medium` or `low` |
| `status` | String | `open` or `closed` |
| `agent` | String | Who has it: `client`, `opendatadsl` or a data vendor |
| `subject` | Object | What it is about: `service`, `id` and `ondate` |
| `key` | String | The id of the problem, used to count repeats |
| `occurrences`, `lastOccurred` | | How often and when it was last raised |
| `assignee`, `resolution`, `tags` | | Who is working on it, how it was resolved, your labels |
| `created`, `updated`, `closed` | Object | `at` and `by` |
| `timeline` | Array | Everything that happened: each entry has `id`, `type`, `at` and `by` |
| `_version` | Integer | Send it back with a change: the change is refused if the alert changed meanwhile |

```json
{
  "_id": "ALR-2026-000401",
  "title": "ICE.NDEX.TFM is late",
  "message": "The delivery for 2026-11-18 had not arrived by 19:30 EU1",
  "category": "dataset",
  "issue": "delivery",
  "severity": "high",
  "status": "open",
  "agent": "opendatadsl",
  "subject": {"service": "dataset", "id": "ICE.NDEX.TFM", "ondate": "2026-11-18"},
  "key": "dataset/ICE.NDEX.TFM/2026-11-18/delivery",
  "occurrences": 1,
  "tags": [],
  "created": {"at": "2026-11-18T19:30:02", "by": "system"},
  "timeline": [
    {"id": 1, "type": "created", "at": "2026-11-18T19:30:02", "by": "system", "status": "open", "agent": "opendatadsl", "severity": "high"}
  ],
  "_version": 1
}
```

See [Alert fields](/docs/extensions/alerts/reference#alert-fields) for every field, including root causes, and the timeline entry types.
