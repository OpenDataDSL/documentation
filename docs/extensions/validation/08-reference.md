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

### Checks on update

Each configuration that is enabled and runs on update has an automation on its data item: service **data**, action **update**, target **Run validation checks** (`odsl.validation`). It is created, updated and removed with the configuration. For public data the automation belongs to your tenant, so an update of public or common data runs your checks in your tenant's pool. If automations are missing (for example for configurations saved before they were used), select **Update automations** on the Configurations tab, or call `POST /validation/v1?_function=automations`.

### When data fails validation

An automation on the **data** service with the action **invalid** ("fails validation" in the automation list) tells you when a curve or timeseries fails its checks. Unlike the `failed` action on the **validation** service, it is set up on the data item itself, next to its update and validated automations.

| | Curve | Timeseries |
|-|-|-|
| id | The curve id | The timeseries id |
| When | Its record for an ondate starts failing | Observations start failing in a run |
| ondate / range | The ondate | The failing observations |

It is raised when a record starts failing (failed, severe or error), fails again with different data, or fails again because an override was removed or cleared. Running the checks again on the same failing data raises nothing. The data sent describes the failure:

| Field | Meaning |
|-|-|
| `target`, `kind`, `name` | The data item |
| `status`, `message` | The worst status and its message |
| `points` | The failing ondates or observation times |
| `records` | The failing validation records, with their check results (and tenors for a curve) |
| `failedTenors` | Curves: the failing tenors |
| `user`, `origin`, `timestamp` | Who or what ran the checks, and when |

The record's timeline shows **Sent as failing** each time. As for validated data, only full runs raise it (not tests), and automations on **all** actions do not get it.

#### Emailing failures

The public script **#email-validation-failed** turns this data into an HTML email: the failing ondates or observations, the failing tenors, and a table of the check results for each failing data point. To use it, create an email automation on the curve or timeseries with:

| Setting | Value |
|-|-|
| Service | data |
| Action | invalid ("fails validation") |
| `@transformer` | #email-validation-failed |
| attachment | false |
| subject | for example `Validation failed: AAA:TS` |

### Sending only validated data

An automation on the **data** service with the action **validated** gets a curve or timeseries only once it can be used: when it passes validation (valid, or valid with warnings) or when a user overrides its failure. Use it instead of, or as well as, an automation on **update**, which gets the data as soon as it is saved, checked or not.

| | Curve | Timeseries |
|-|-|-|
| id | The curve id | The timeseries id |
| When | Its record for an ondate passes or is overridden | Its observations pass or are overridden |
| data | The curve for the ondate | The timeseries for the observations sent, with `range` set to them |

- Each version of the data is sent once. Running the checks again on data that has not changed sends nothing; data that changes and passes again is sent again. If no validated automation exists when data passes, nothing is remembered: once you add one, the next run or override sends it.
- For an event curve or event timeseries, the validated automation is on the curve or timeseries itself, not on the event list it is built from.
- For a timeseries, consecutive passing observations are sent together. A failing observation is never sent, and splits the ones around it into separate sends.
- The data sent has a `_validation` property: `status` (valid, warning or overridden), `checkedStatus`, `records` (the validation record ids), `user`, `origin`, `timestamp`, the `override` reason and user when overridden, and the `warningTenors` of a curve.
- Only a full run sends data: tests, and runs of some checks or some tenors, do not. A failure that is not overridden is never sent, and removing an override does not take back data already sent.
- Validated data goes only to automations on the **validated** action, not to automations on **all** actions, which already get the data when it is updated.
- The record's timeline shows **Sent as validated** each time its data was sent.

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
| `POST /validation/v1?_function=suggest` | Suggest checks and parameters from the recent data of data items (nothing is stored) |
| `POST /validation/v1?_function=tune` | Suggest new parameters for the checks that fail on some data points (nothing is stored) |
| `GET /validationconfig/v1/DATA_ID/*` | List the versions of a configuration |
| `GET /validationconfig/v1/DATA_ID/VERSION` | Read one version of a configuration |
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

### suggest

Suggests checks for curves or timeseries from their recent data, and tries them on that data in test mode (nothing is stored). This is what [Suggest checks from the data](/docs/extensions/validation/bulk#suggest-checks-from-the-data) in bulk changes uses.

| Field | Meaning |
|-|-|
| `targets` | Up to 25 data ids, all of one kind |
| `kind` | `timeseries` (default) or `curve` |
| `days` | How many days back from today to read, 1 to 366 (default 30) |
| `maxCurves` | Curves: the most curves to read, the most recent first, 2 to 60 (default 25) |

```json
POST /validation/v1?_function=suggest
{"targets": ["AHDB.AG.GB.BIG_BALE_HAY.EX_FARM:PRICE"], "kind": "timeseries", "days": 30}
```

The response has `days`, `from`, `to` and `results`: for each data item its `target`, `kind`, `points` (observations or curves read), `stats` (values, missing, zeros, negatives, min, max, mean, stdev; for timeseries the longest gap and run of the same value, for curves the fewest and most contracts), `checks` and `ms`, and `error` or `message` when it could not be analysed. Each check has `name`, `expression`, `severity`, `scope` (curves), `reason`, `runs` and `failures` (on the period), `example` (a failure) and `suggested` (true when it passed on every data point it ran on).

### tune

Suggests new parameters for the checks that fail or warn on some data points. This is what [Adjust checks](/docs/extensions/validation/dashboard#adjust-checks) on the Issues tab uses.

| Field | Meaning |
|-|-|
| `items` | Up to 25 objects: `target` (the data id), `points` (the failing data points) and, for curves, `tenors` (only check these tenors) |
| `days` | How many days back to compare failures before and after, 1 to 366 (default 30) |
| `maxCurves` | Curves: the most recent curves to use for that comparison, 2 to 60 (default 25) |

```json
POST /validation/v1?_function=tune
{"items": [{"target": "ICE.IFEU.B:SETTLE", "points": ["2026-10-12", "2026-10-13"], "tenors": ["M01", "M02"]}], "days": 30}
```

The response has `days`, `from`, `to` and `results`: for each item its `target`, `kind`, `points`, `checks`, `ms`, and `error` or `message` (nothing fails any more). Each check that fails on the points has `id`, `name`, `expression`, `severity`, `scope`, `failing` and `runs` (on the points), `suggested` (the new expression, when one could be found), `reason`, and `window` (`runs`, `before` and `after`: the data points of the period that fail with the current and the new expression).

### override, removeOverride and comment

```json
POST /validation/v1?_function=override
{"ids": ["ICE.IFEU.B:SETTLE:2026-10-12"], "reason": "Confirmed with the exchange"}
```

`ids` (up to 500) and `reason` (required for an override) or `message` (for a comment). The response lists each id with `ok` and a `message`: records that are not failing are not overridden, and records without an override have none to remove.

### stats

`GET /validation/v1?_function=stats&from=2026-09-01&to=2026-10-12&kind=curve&group=Oil`

All parameters are optional: `from` and `to` filter the data point dates, and `target` gives the statistics of one data item. The response has `totals`, `targets`, `byStatus`, `byKind`, `byDay`, `byTarget`, `byCheck`, `open` (the oldest open issues), `resolved`, `activity` and `configs`.
