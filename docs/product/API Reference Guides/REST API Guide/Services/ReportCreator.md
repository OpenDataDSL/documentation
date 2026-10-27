---
title: Report Creator Service
description: REST API for the report creator service
slug: /api/rest/service/reportcreator
tags:
  - api
  - service
  - reportcreator
  - report
---
The report creator resource holds report creators: report configurations with parameters, which people fill in to create their own reports, with an example report built from example values.

## Report Creator REST API

The Report Creator REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/reportcreator
```

Report creators are versioned and use the report policies.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/public  v1/private|List report creators|
|GET|\{release\}/\{source\}/\{key\}|v1/private/PRICE_SUMMARY|Retrieve a report creator. With `Accept: text/html`, its example is rendered with its template|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/PRICE_SUMMARY/*|List the versions of a report creator|
|POST|\{release\}/\{source\}|v1/private|Create or update a report creator|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/PRICE_SUMMARY|Roll back to the previous version, or delete it if it has only one version|

## Functions

|**Function**|**Example**|**Description**|
|-|-|-|
|build-example|v1/private/PRICE_SUMMARY?_function=build-example&ondate=2026-10-23|Runs the report with each parameter's example value and saves the result as the creator's example data. `ondate` defaults to today and `_range` sets the range|

## Entities

A report creator is a [report configuration](./reportconfig#report-configuration) with a list of `parameters`, each with:

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The parameter name, used in the report configuration|String|
|type|The type of value|String|
|description|What the parameter is for|String|
|example|The example value used to build the example report|String|
