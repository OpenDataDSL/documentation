---
title: Script Log Service
description: REST API for the script log service
slug: /api/rest/service/scriptlog
tags:
  - api
  - service
  - scriptlog
  - script
---
The script log resource records each run of a script, or of a function in a script, with its status and log. See [Running](/docs/extensions/script-manager/running) in the Script Manager.

## Script Log REST API

The Script Log REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/scriptlog
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List script runs (100 at a time)|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a script run|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a log entry|
|DELETE|\{release\}?_bulk=true&_filter=...|v1?_bulk=true&_filter=\{"status":"success"\}|Delete the log entries that match the filter|

Automations can be set on script runs with the create action.

## Entities

### Script run

|**Name**|**Description**|**Type**|
|-|-|-|
|script|The script id|String|
|scriptVersion|The version of the script that ran|Integer|
|scriptType|The script language, for example odsl or javascript|String|
|function|The function that was run, if any|String|
|region|The region that was run, if any, and its first line in regionLine|String|
|status|success, warning or failed|String|
|message|A summary of the run, or the error|String|
|trigger|What ran the script|String|
|log|The log messages|String[]|
|timestamp|When the script ran|DateTime|
|invocationId|The request that ran the script|String|
|rootInvocationId|The request that started the chain of runs, if this run was started by another|String|
