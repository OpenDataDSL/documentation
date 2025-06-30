---
title: Automation Log Service
description: REST API for the automation log service
slug: /api/rest/service/automationlog
tags:
- api
- service
- automation
- log
---
The automation log resource contains all the automation logs

## Automation Log REST API
The Automation Log REST API is a READONLY API allowing you to search and filter automation logs.

It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/automationlog
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all automation logs|
|GET|\{release\}/\{id\}|v1/68527adfe438ee467f057624|Get a specific automation log using its _id|

## Entities

### Automation Log Entity

The automation log entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the automation log entry (an object id)|ObjectId|
|_type|Always VarAutomationLogEntry|String|
|source|The source of the item that triggered the automation|String|
|service|The service of the item that triggered the automation|String|
|key|The id of the item that triggered the automation|String|
|action|The action that triggered the automation|String|
|method|How the automation was triggered|String|
|reason|The reason why the automation was triggered|String|
|invocationId|The id of the request that triggered the automation|String|
|rootInvocationId|The root id of the request that triggered the automation|String|
|target|The id of the target that was triggered|String|
|automation|The id of the automation that was triggered|String|
|timestamp|The timestamp of the when the trigger occurred|DateTime|
|status|The status of the automation (success,failed,running)|String|
|message|The response message from the target|String|

## Examples

### An example of a success message

```json
{
  "_id": "685526aa1001b079c8ed0c7e",
  "_type": "VarAutomationLogEntry",
  "source": "private",
  "service": "object",
  "key": "AAA",
  "action": "update",
  "method": "Direct (api)",
  "reason": "Update from: 39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d",
  "invocationId": "ba8b8f10-4009-40d7-80b2-310c99762fcb",
  "rootInvocationId": "ba8b8f10-4009-40d7-80b2-310c99762fcb",
  "target": "odsl.email_attachment",
  "automation": "68527adfe438ee467f057624",
  "timestamp": "2025-06-20T09:15:22.7572293",
  "status": "success",
  "message": "Successfully sent email(Automation Test) to user@company.com"
}
```
