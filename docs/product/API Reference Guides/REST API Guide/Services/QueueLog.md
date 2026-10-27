---
title: Queue Log Service
description: REST API for the queue log service
slug: /api/rest/service/queuelog
tags:
  - api
  - service
  - queuelog
  - queue
---
The queue log resource records the messages sent to your [queues](./queue).

## Queue Log REST API

The Queue Log REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/queuelog
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List the queue log entries|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a log entry|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a log entry|
|DELETE|\{release\}?_bulk=true&_filter=...|v1?_bulk=true&_filter=\{"queue":"etrm"\}|Delete the log entries that match the filter|

## Entities

### Log entry

|**Name**|**Description**|**Type**|
|-|-|-|
|timestamp|When the message was sent|DateTime|
|queue|The queue name|String|
|queueid|The full id of the queue|String|
|messageId|The id of the message|String|
|subject|The message subject|String|
|size|The size of the message|Integer|
|contentType|The type of the content sent|String|
|contentId|The id of the content sent|String|
|trigger|What sent the message|String|
|origin|Where the request came from|String|
|status|The status of the send|String|
|statusMessage|More about the status|String|
|reason|The reason given|String|
|invocationId|The request that sent the message|String|
