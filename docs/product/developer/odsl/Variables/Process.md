---
slug: /odsl/variable/process
tags:
  - process
---
Process
=======================

A process variable contains all the information to configure and run a process

## Introduction

Process variables are used to configure a process that is run in the ODSL cloud. The process is run in 1 of 3 ways:

*   Time triggered using a cron expression    
*   Event triggered usually from a subscription    
*   Manually triggered using the run command in ODSL or sending a REST API request
    

## Defining a Process

Below is a table with all the properties of a process:

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|service|String|ETL|The service name of this process, this is used to categorise processes|
|name|String|TEST|The name of the process|
|description|String|My test process|A descriptive name for the process|
|enabled|Boolean|true|True if it is enabled, false to disable it from running|
|processType|String|Ristretto|'Ristretto - short running, low resources' 'Lungo - longer running, more resources'|
|workflow/script|String|test_wf|The name of the workflow or script|
|settings|Object|factor=12|A list of variables that are set before the process is run|
|input|Object|date=”2021-05-17”|An object used as input to the process which can be overridden if manually running the process. In the case of a workflow, this can be used in the actions|
|cron|String|25 12 ? * MON-FRI *|[CRON Expression](/docs/kb/cron)
|properties|Object|process.properties.vendor = "European Central Bank"|User definable meta-data about the process|

Example process definition:
```js
print "Create a process"
process = Process()
process.service = "ETL"
process.name = "ECB\_FX\_TEST"
process.description = "TEST ETL Process for ECB_TEST"
process.processType = "Ristretto"
process.enabled = true
process.input.url="https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
process.input.tx = "#ECB_FX"
process.workflow="#wf\_xml\_data_loader"
process.cron = "38 07 ? * * *"
process.properties.vendor = "European Central Bank"
process.settings.factor = 1.2
save ${process:process}
```

## Updating, Finding and Deleting Processes

### Saving a process

To save a process in OpenDataDSL code, use the save command as follows:
```js
process = Process()
process.service = "ETL"
process.name = "ECB\_FX\_TEST"
save ${process:process}
```

### Listing processes

To find processes, you use the ODSL find command, e.g.
```js
processes = find ${process}
```
You can use the unique keyword to just get all the names of your processes, e.g.
```js
processnames = find unique name from ${process}
```

### Retrieving a specific process

To get a specific named process, you use the process active variable. You can then examine the information on the process, e.g.
```js
proc = ${process:"ECB_FX"}
print proc.cron
```

### Rolling back changes to a process

Whenever you change a process and save it, it saves as a new version of the process and archives the old version. If you need to roll back to the previous version, you issue a delete command with no specific version information. This removes the current version and un-archives the previous version to make it the new current version, e.g.
```js
delete ${process:"ECB_FX"}
```

### Completely removing a process

To completely remove a process, you issue the delete command with * as the version number, e.g.
```js
delete ${process:"ECB_FX":*}
```

## Running a Process

You can manually run any process and optionally pass input data to the process.

### Running a process in OpenDataDSL

To run a process in ODSL code, use the run command, e.g.
```js
run ECB_FX
```

To pass input data to a process, e.g. for running a curve for a specific date - use run with, e.g.
```js
ondate = Object()
ondate.date = "2021-05-17"
run WHEAT_CURVE with ondate
```
### Running a process using the API

To run a process using the REST API, you call the **process-exec** resource as follows:

```JSON
POST https://api.opendatadsl.com/api/process-exec/v1?_reason=test
Authorization: Bearer {{token}}

{
  "name": "ECB_FX"
}
```

To pass input data, add an input object into the body, e.g.

```json
POST https://api.opendatadsl.com/api/process-exec/v1?_reason=test
Authorization: Bearer {{token}}

{
  "name": "WHEAT_CURVE",
  "input": {
    "date": "2021-05-17"
  }
}
```

## Further Reading
* [Process service](/docs/odsl/service/process)