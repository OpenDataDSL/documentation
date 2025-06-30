---
title: Report Service
description: REST API for the report service
slug: /api/rest/service/report
tags:
- api
- service
- report
---
The report service gives you access to reports generated from the [report configurations](reportconfig)

## Report REST API
The report REST API is a full CRUD API and is accessed through the following URL:
```js
https://api.opendatadsl.com/api/report
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|'v1/public' 'v1/private'|List public or private reports|
|GET|\{release\}/\{source\}/\{key\}|v1/private/TEST|Get a ReportDates timeseries containing the dates for which the report is available|
|GET|\{release\}/\{source\}/\{key\}:\{ondate\}|v1/private/TEST:2024-06-12|Retrieve the latest version of the report for the supplied date|
|GET|\{release\}/\{source\}/\{key\}:\{ondate\}/\{version\}|v1/private/TEST:2024-06-12/1|Retrieve a version of a report for the supplied date|
|GET|\{release\}/\{source\}/\{key\}:\{ondate\}/*|v1/private/TEST:2024-06-12/*|Get a list of versions for a specific report for the supplied date|
|PUT|\{release\}/\{source\}/\{key\}:\{ondate\}/\{version\}/\{tag\}|v1/private/TEST:2024-06-12/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|\{release\}/\{source\}/\{key\}:\{ondate\}|v1|Update a manual report, the data is in the body of the POST request|
|POST|\{release\}/\{source\}/\{key\}:\{ondate\}|v1|Run the report, the POST body must be empty|
|DELETE|\{release\}/\{source\}/\{key\}:\{ondate\}|v1/private/TEST|Delete a report version, this has the effect of rolling back to the previous version|
|DELETE|\{release\}/\{source\}/\{key\}:\{ondate\}/\{version\}|v1/private/TEST:2024-06-12/1|Delete a version of a report|
|DELETE|\{release\}/\{source\}/\{key\}:\{ondate\}/*|v1/private/TEST:2024-06-12/*|Fully delete a report, including all versions|

## Entities

### Report
A report is a [Report Configuration](reportconfig#report-configuration) with the following additional proeprties:

|Name|Description|Type|
|-|-|-|
|ondate|The date of the report|String|
|data|The actual data for the report, can be any json data|Object|
|scriptVersion|The version of the script used to run this report|Integer|
|errorMessage|The error message if this report failed to run|String|
|start|The start date used for the report|String|
|end|The end date used for the report|String|

## Examples

```js
### Get build info
GET {{url}}/report
Authorization: Bearer {{token}}

### List all private reports
GET {{url}}/report/v1/private
Authorization: Bearer {{token}}

### List all private report names
GET {{url}}/report/v1/private?_project=name
Authorization: Bearer {{token}}

### Get a list of report dates
GET {{url}}/report/v1/private/METRICS
Authorization: Bearer {{token}}

### Dynamically run a report using the default range
GET {{url}}/report/v1/private/METRICS
    ?_run=true
Authorization: Bearer {{token}}

### Dynamically run a report using a specified range
GET {{url}}/report/v1/private/METRICS
    ?_run=true
    &_range=between(2023-01-01,2023-05-28)
Authorization: Bearer {{token}}

### Run and save a report - with ondate and range
POST {{url}}/report/v1/private/TEST3:2023-07-01
    ?_range=between(2023-05-18,2023-05-18T23:59:59)
Authorization: Bearer {{token}}

### Get a dated report
GET {{url}}/report/v1/private/METRICS:2023-05-18
Authorization: Bearer {{token}}

### Get a dated report HTML
GET {{url}}/report/v1/private/METRICS:2023-05-18
Authorization: Bearer {{token}}
Accept: text/html

### Get a dated report version
GET {{url}}/report/v1/private/METRICS:2023-05-18/1
Authorization: Bearer {{token}}

### Get a list of dated report versions
GET {{url}}/report/v1/private/METRICS:2023-05-18/*
Authorization: Bearer {{token}}

### Tag a dated report version
PUT {{url}}/report/v1/private/METRICS:2023-05-18/1/PROD
Authorization: Bearer {{token}}

### Get a tagged dated report version
GET {{url}}/report/v1/private/METRICS:2023-05-18/PROD
Authorization: Bearer {{token}}

### Delete a version of a report
DELETE {{url}}/report/v1/private/METRICS:2023-05-18
Authorization: Bearer {{token}}

### Fully delete a report date
DELETE {{url}}/report/v1/private/METRICS:2023-05-18/*
Authorization: Bearer {{token}}

```