---
title: Reference
description: Validation records, automations, the quality status, and the REST API behind the Validation extension
slug: /extensions/validation/reference
sidebar_position: 8
tags: [extension, validation, reference, api]
---

# Reference

Validation keeps its data in two private services:

| Service | Holds | Written by |
|-|-|-|
| `validationconfig` | One validation configuration per curve or timeseries, id = the data id. Every change keeps a version | You: the extension, the REST API or ODSL |
| `validation` | One validation record per data point: per observation of a timeseries, per ondate of a curve | The platform only: runs, overrides and comments go through the service functions below |

Both can be read from ODSL, for example `${validationconfig:"ICE.IFEU.B:SETTLE"}`, and listed with `find`.

---

## A validation configuration

```json
{
  "_id": "ICE.IFEU.B:SETTLE",
  "kind": "curve",
  "name": "Brent settlement",
  "description": "",
  "group": "Oil",
  "tags": ["ice"],
  "enabled": true,
  "runOnUpdate": true,
  "scripts": ["#ValidationLibrary", "validation\\my_checks"],
  "checks": [
    {"id": "missing", "name": "Missing", "expression": "checkMissing()", "scope": "tenor", "severity": "failed", "enabled": true},
    {"id": "gaps", "name": "Gaps", "expression": "checkCurveGaps()", "scope": "curve", "severity": "failed", "enabled": true}
  ],
  "options": {"lookback": 30, "curveHistory": 1, "writeStatus": true, "maxPoints": 250}
}
```

| Field | Notes |
|-|-|
| `kind` | `curve` or `timeseries` (required) |
| `checks[].id` | Made from the name when not given, and kept unique |
| `checks[].expression` | One line of ODSL |
| `checks[].scope` | Curves: `tenor` (default, runs on each contract) or `curve` (runs once). Timeseries: always `point` |
| `checks[].severity` | `warning`, `failed` (default) or `severe` |
| `options.lookback` | Earlier observations in `#HISTORY` for timeseries (0 to 1000) |
| `options.curveHistory` | Previous curves read for tenor history (0 to 30) |
| `options.writeStatus` | Write the quality status to private data |
| `options.maxPoints` | A manual run over more data points runs in the background (1 to 5000) |

A configuration can have up to 50 checks.

---

## A validation record

| Field | Meaning |
|-|-|
| `_id` | `DATA_ID:TIME` for a timeseries, `DATA_ID:ONDATE` for a curve |
| `target`, `name`, `kind`, `group`, `tags` | The data item and its configuration |
| `point`, `pointDate` | The data point: the observation time or the ondate |
| `value` | Timeseries: the value checked |
| `status` | The status that applies: `valid`, `warning`, `failed`, `severe`, `error`, `skipped` or `overridden` |
| `checkedStatus` | The result of the last run |
| `checks` | The result of each check: `id`, `name`, `scope`, `severity`, `status`, `message`, `failures`, `log` (details the check recorded), `ms`. For a tenor check, the worst result over the tenors, and `tenorsFailed` |
| `message` | A summary |
| `tenors` | Curves: every contract, `{tenor, value, status, message, checks: [{id, status, message}]}` |
| `failedTenors`, `warningTenors` | Curves: the tenors that failed, and that warned |
| `tenorCounts` | Curves: the number of tenors with each status |
| `contracts` | Curves: the number of contracts |
| `override` | `reason`, `user`, `timestamp`, and the status that was overridden |
| `runs`, `firstRun`, `lastRun`, `lastRunBy`, `lastOrigin` | How often and when it was checked, and how: `update`, `build`, `manual` or `background` |
| `openSince` | When it started failing (open issues only) |
| `resolvedAt`, `resolution`, `resolveMinutes` | When it stopped failing, how (`override` or `rerun`) and how long it took |
| `timeline` | The last 100 events: `timestamp`, `action` (`run`, `override`, `override-removed`, `override-cleared`, `comment`), `user`, `origin`, `status`, `previous`, `message` |

To find the curves that failed for a tenor, filter on `failedTenors`, for example `_filter={"failedTenors":"M01"}`.

---

## The quality status of the data

With **Write status to the data** on, private data gets a quality status after each run and override, the same way curve quality groups set it:

| Validation | Quality status |
|-|-|
| valid, skipped, overridden | `VALID` |
| warning | `VALID:Warnings` |
| failed, severe, error | `FAILED` |

A curve gets the status of its record for the ondate; a timeseries gets the status of its latest checked observation.

---

## Automations

When the status of a record changes, the platform raises an automation on the **validation** service, private source, with:

| | |
|-|-|
| id | The data id (or `*` for any) |
| action | `failed` (failed, severe or error), `warning`, or `success` (valid, skipped or overridden) |
| data | The validation record |

For example, an email automation on `failed` for `ICE.IFEU.B:SETTLE` tells you as soon as a Brent curve fails validation. A new record that passes does not raise `success`; only a change does.

---

## REST API

| Call | Does |
|-|-|
| `GET /validationconfig/v1` | List the configurations |
| `GET /validationconfig/v1/DATA_ID` | Read a configuration |
| `POST /validationconfig/v1` | Save a configuration (the body as above) |
| `DELETE /validationconfig/v1/DATA_ID` | Delete a configuration (its records are kept) |
| `GET /validation/v1?_filter=...&_sort=...&_skip=...&_limit=...` | List records; the total is in the `x-total-count` header |
| `GET /validation/v1/RECORD_ID` | Read a record |
| `POST /validation/v1?_function=run` | Run the checks and store the records |
| `POST /validation/v1?_function=test` | Run the checks without storing anything (at most 100 data points) |
| `POST /validation/v1?_function=runMany` | Run the checks of several data items and store the records |
| `POST /validation/v1?_function=override` | Override records |
| `POST /validation/v1?_function=removeOverride` | Remove overrides |
| `POST /validation/v1?_function=comment` | Comment on records |
| `GET /validation/v1?_function=stats` | Dashboard statistics |

### run and test

| Field | Meaning |
|-|-|
| `target` | The data id (test can send `config` instead) |
| `config` | test only: a configuration to try, saved or not |
| `points` | Data points: ondates, or observation dates or times. `ondate` or `point` for one |
| `from`, `to` | A date range instead of points (for a curve: its ondates in the range, up to today). With no points and no range: the latest data point (for a curve: the newest ondate whose curve can be read) |
| `checks` | Check ids, to run only some checks |
| `tenors` | Curves: only check these tenors |
| `background` | run only: run in the background (needs a range, not points) |

```json
POST /validation/v1?_function=run
{"target": "AHDB.AG.GB.BIG_BALE_HAY.EX_FARM:PRICE", "from": "2026-01-01", "to": "2026-10-12"}
```

The response has `target`, `kind`, `test`, `points`, `records`, `counts` (by status), `truncated` (only the latest data points were run), `timings` (milliseconds spent loading the scripts, reading data, running the checks and saving), `message` (when nothing could be run, why) and `results`: for each record its `_id`, `point`, `value`, `status`, `previous` status, `message` and `checks`, and for a curve its `tenors`, `failedTenors`, `warningTenors`, `tenorCounts` and `contracts`. A background run answers `{"background": true, "message": ...}`. If the data cannot be read, the call fails with the platform's error in the `x-odsl-error` header.

### runMany

Runs the saved checks of several data items for the same data points. `targets` is a list of data ids; `points` (or `ondate`), `from` and `to` are as for run.

```json
POST /validation/v1?_function=runMany
{"targets": ["ICE.IFEU.B:SETTLE", "ICE.IFEU.T:SETTLE"], "ondate": "2026-10-12"}
```

The response has `targets`, `counts` (data items by status) and `results`: for each data item its `target`, `kind`, `name`, `points`, `counts`, `status` (its worst record), `message`, `ids` and `pointList` (the records made), `failedTenors` (curves), `ms`, and `error` when it could not run (no validation, disabled, or the data could not be read). Up to 25 data items with no range run straight away; more, a range, or `"background": true` run in the background and answer `{"background": true, "message": ...}`.

### override, removeOverride and comment

```json
POST /validation/v1?_function=override
{"ids": ["ICE.IFEU.B:SETTLE:2026-10-12"], "reason": "Confirmed with the exchange"}
```

`ids` (up to 500) and `reason` (required for an override) or `message` (for a comment). The response lists each id with `ok` and a `message`: records that are not failing are not overridden, and records without an override have none to remove.

### stats

`GET /validation/v1?_function=stats&from=2026-09-01&to=2026-10-12&kind=curve&group=Oil`

All parameters are optional: `from` and `to` filter the data point dates, and `target` gives the statistics of one data item. The response has `totals`, `targets`, `byStatus`, `byKind`, `byDay`, `byTarget`, `byCheck`, `open` (the oldest open issues), `resolved`, `activity` and `configs`.
