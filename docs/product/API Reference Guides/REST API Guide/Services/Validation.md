---
title: Validation Service
description: REST API for the validation record service
slug: /api/rest/service/validation
tags:
  - api
  - service
  - validation
  - data quality
---
The validation resource holds the validation records: the result of each validation check for each data point of your curves and timeseries. Records are written by the platform when checks run; you run checks, override results and add comments through the service functions. See [Validation](/docs/extensions/validation/overview).

## Validation REST API

The Validation REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/validation
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List validation records|
|GET|\{release\}/\{key\}|v1/NGE.GAS.TTF:MID:2026-10-23:M01|Retrieve a record. The id is the data id, the date and, for a curve, the tenor (* for a whole curve check)|
|POST|\{release\}?_function=...|v1?_function=run|Run a validation function, see below. A POST without a function is rejected|
|DELETE|\{release\}/\{key\}|v1/NGE.GAS.TTF:MID:2026-10-23:M01|Delete a record|
|DELETE|\{release\}?_bulk=true&_filter=...|v1?_bulk=true&_filter=\{"target":"NGE.GAS.TTF:MID"\}|Delete the records that match the filter|

Use `_search` to search the target, name and message. Automations can be set on records with the actions create, update, delete, success, warning and failed.

## Functions

|**Function**|**Method**|**Description**|
|-|-|-|
|run|POST|Runs the checks for one data item: the latest data point, a date (`ondate` or `point`), a list of `points`, or a `from` and `to` range. Large runs run in the background|
|test|POST|The same as run, or with an unsaved configuration in `config`, but stores nothing (at most 100 data points)|
|runMany|POST|Runs the stored checks of several data items in `targets` (at most 5000). More than 25 items, or a from and to range, run in the background|
|override|POST|Overrides the records in `ids` (at most 500), with a `reason`|
|removeOverride|POST|Removes the override from the records in `ids`, with a `reason`|
|comment|POST|Adds a `message` to the records in `ids`|
|stats|GET|Counts of results for the `from` and `to` dates, optionally for one `kind` (curve or timeseries), `target` or `group`|
|suggest|POST|Suggests checks and parameters for the `targets`, backtested on their recent data. Nothing is stored|
|tune|POST|Suggests new parameters for the checks that fail on the given points. Nothing is stored|
|automations|POST|Makes the automations that run the checks when data is updated match your validation configurations|

See [REST API](/docs/extensions/validation/reference#rest-api) in the Validation reference for the request and response of each function, and [A validation record](/docs/extensions/validation/reference#a-validation-record) for the record format.
