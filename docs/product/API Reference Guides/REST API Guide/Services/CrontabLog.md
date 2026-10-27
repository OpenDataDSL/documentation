---
title: Crontab Log Service
description: REST API for the schedule log (crontab log) service
slug: /api/rest/service/crontablog
tags:
  - api
  - service
  - crontablog
  - schedule
---
The crontab log resource records each time one of your schedules fired.

## Crontab Log REST API

The Crontab Log REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/crontablog
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List the schedule log entries for your current data environment|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a log entry|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a log entry|
|DELETE|\{release\}?_bulk=true&_filter=...|v1?_bulk=true&_filter=\{"name":"ECB_FX"\}|Delete the log entries that match the filter|

## Entities

### Log entry

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the schedule that fired|String|
|event|The id of the schedule in the [Crontab service](./crontab)|String|
|trigger|The time the schedule fired for|DateTime|
|timestamp|When it was logged|DateTime|
|environment|The data environment|String|
|invocationId|The id of the run that fired it|String|
