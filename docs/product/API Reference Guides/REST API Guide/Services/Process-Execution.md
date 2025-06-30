---
title: Process Execution Service
description: REST API for the process execution service
slug: /api/rest/service/process-execution
tags:
  - api
  - service
  - process
  - execution
---
import PS from '/shared/process-status.md'

The resource for monitoring all your processes

## Process Execution REST API

The Process Execution REST API is a read-only API allowing you to search and filter the process execution logs and accessed through the following URL:
```js
https://api.opendatadsl.com/api/process-exec
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List process executions|
|GET|\{release\}/\{key\}|v1/private/6090915ad6a48d0b3c4f663d|Retrieve a single process execution log using it’s unique id|
|POST|\{release\}|v1|Manually trigger a process, then JSON body of the post must have a name property which is the name of the process|

## Entities

### Process Execution Log

The process execution log contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|A unique execution id|String|
|service|The service name of the process that was executed|String|
|name|The name of the process|String|
|environment|The data environment that the process was executed in|String|
|trigger|How the process was triggered: 'scheduled' 'manual' 'subscription'|String|
|reason|The reason why the process was executed|String|
|start|The timestamp of when the process started|String(DateTime)|
|end|The timestamp of when the process completed|String(DateTime)|
|runAs|The user whose credentials the process was run as|String|
|status|The process execution status (see **Process status values**) |String|
|message|The current information message|String|
|phases|Information on the workflow phases of the execution|Phase Entity[]|
|loaderMessage|If this was an ETL process, this is the status message of the loader portion of the process|String|
|data|If this was an ETL process, this is the list of data items that were updated|Data Entity|

#### Process status values


<PS />

### Phase Entity

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the phase|String|
|start|The timestamp of when the process started|String(DateTime)|
|end|The timestamp of when the process completed|String(DateTime)|
|status|The status of the phase: 'running' 'success' 'failed'|String|
|message|The current phase information message|String|
|log|A list of string log messages|String[]|

### Data Entity

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the phase|String|
|curves|A map of the dates and curve ids that were updated|Date mapped list of Strings|
|series|A map of the dates and timeseries ids that were updated|Date mapped list of Strings|

### Example Process Execution JSON

```json
{
    "_id": "05f1ec1a-f2a1-4cba-87d4-b46e0f8e40b6",
    "service": "ETL",
    "name": "ECB_FX",
    "environment": "production",
    "trigger": "scheduled",
    "status": "success",
    "message": "Completed Successfully",
    "reason": "crontab(ECB_FX,Thu Jul 01 2021 16:30:00 GMT+0000 (Greenwich Mean Time))",
    "start": "2021-07-01T16:30:07.858Z",
    "runAs": "com_walkfares",
    "phases": [
      {
        "name": "EXTRACT",
        "start": "2021-07-01T16:30:10.295Z",
        "status": "success",
        "message": "Completed EXTRACT",
        "log": [
          "2021-07-01T16:30:13.390935800Z[UTC] info Completed EXTRACT"
        ],
        "end": "2021-07-01T16:30:13.390Z"
      },
      {
        "name": "TRANSFORM",
        "start": "2021-07-01T16:30:13.453Z",
        "status": "success",
        "message": "Completed TRANSFORM",
        "log": [
          "2021-07-01T16:30:16.283505300Z[UTC] info Completed TRANSFORM"
        ],
        "end": "2021-07-01T16:30:16.283Z"
      },
      {
        "name": "SEND",
        "start": "2021-07-01T16:30:16.330Z",
        "status": "success",
        "message": "Completed SEND",
        "log": [
          "2021-07-01T16:30:17.096038200Z[UTC] info Completed SEND"
        ],
        "end": "2021-07-01T16:30:17.096Z"
      },
      {
        "name": "LOAD",
        "start": "2021-07-01T16:30:17.322Z",
        "status": "success",
        "message": "Completed LOAD",
        "log": [
          "Updated 32 series for 2021-07-01"
        ],
        "end": "2021-07-01T16:30:24.445Z"
      }
    ],
    "end": "2021-07-01T16:30:24.445Z",
    "loaderMessage": "Updated 32 series for 2021-07-01",
    "data": {
      "curves": {},
      "series": {
        "2021-07-01": [
          "#ECB_FX.EURAUD:SPOT",
          "#ECB_FX.EURBGN:SPOT",
          "#ECB_FX.EURBRL:SPOT",
          "#ECB_FX.EURCAD:SPOT",
          "#ECB_FX.EURCHF:SPOT",
          "#ECB_FX.EURCNY:SPOT",
          "#ECB_FX.EURCZK:SPOT",
          "#ECB_FX.EURDKK:SPOT",
          "#ECB_FX.EURGBP:SPOT",
          "#ECB_FX.EURHKD:SPOT",
          "#ECB_FX.EURHRK:SPOT",
          "#ECB_FX.EURHUF:SPOT",
          "#ECB_FX.EURIDR:SPOT",
          "#ECB_FX.EURILS:SPOT",
          "#ECB_FX.EURINR:SPOT",
          "#ECB_FX.EURISK:SPOT",
          "#ECB_FX.EURJPY:SPOT",
          "#ECB_FX.EURKRW:SPOT",
          "#ECB_FX.EURMXN:SPOT",
          "#ECB_FX.EURMYR:SPOT",
          "#ECB_FX.EURNOK:SPOT",
          "#ECB_FX.EURNZD:SPOT",
          "#ECB_FX.EURPHP:SPOT",
          "#ECB_FX.EURPLN:SPOT",
          "#ECB_FX.EURRON:SPOT",
          "#ECB_FX.EURRUB:SPOT",
          "#ECB_FX.EURSEK:SPOT",
          "#ECB_FX.EURSGD:SPOT",
          "#ECB_FX.EURTHB:SPOT",
          "#ECB_FX.EURTRY:SPOT",
          "#ECB_FX.EURUSD:SPOT",
          "#ECB_FX.EURZAR:SPOT"
        ]
      }
    }
  }
```

## Listing Process Executions

Here are some examples of REST queries you can use with the process execution service.

### Get a list of executions for a specific process
```js
https://api.opendatadsl.com/api/process-exec/v1
  ?name=ECB_FX
```

### Get a list of executions for a process for a date range
```js
https://api.opendatadsl.com/api/process-exec/v1
  ?name=ECB_FX
  &start=range(2021-07-19,2021-07-23)
```

### Get a list of executions that failed for a date range
```js
https://api.opendatadsl.com/api/process-exec/v1
  ?status=failed
  &start=range(2021-07-19,2021-07-23)
```

## Running a Process

You can run a process by executing a POST method with a JSON body with a name property, e.g. to run the ECB_FX process:
```js
POST https://api.opendatadsl.com/api/process-exec/v1
Authorization: Bearer {{token}}

{
    "name": "ECB_FX"
}
```

To pass parameters to the process, simply add these as properties under a ‘body’ property on the JSON in the body of the request, e.g.
```JS
POST https://api.opendatadsl.com/api/process-exec/v1
Authorization: Bearer {{token}}

{
    "name": "ECB_FX",
    "body": {
      "property1": "value"
    }
}
```
