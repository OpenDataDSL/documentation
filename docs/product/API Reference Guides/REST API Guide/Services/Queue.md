---
title: Queue Service
description: REST API for the queue service
slug: /api/rest/service/queue
tags:
  - api
  - service
  - queue
---
The queue resource is used to manage message queues

## REST API

The Queue REST API is a full CRUD API and is accessed through the following URL:

```js
https://api.opendatadsl.com/api/queue
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all your queues|
|GET|\{release\}/\{key\}|v1/TEST|Retrieve a single queue using its name|
|GET|\{release\}/\{key\}/*|v1/TEST/*|Get a list of versions of a queue configuration|
|POST|\{release\}|v1|Create or update a queue, the queue configuration is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/TEST|Delete a queue|

Queue configurations are versioned, so the version and tag calls in [Versions and tags](../standards#versions-and-tags) also work. The messages that pass through your queues are logged in the [Queue Log service](./queuelog).

## Entities

### Queue configuration

The queue configuration contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|queue|Unique name for the queue. It can only contain letters, numbers, '-', '.' and '_', and must start and end with a letter or number|String|
|description|A description of the process configuration|String|
|retention|A duration string in [ISO 8601 duration format](/docs/kb/duration) specifying the amount of time to retain messages on the queue, defaults to P14D|String|
|timeout|A duration string in [ISO 8601 duration format](/docs/kb/duration) specifying the amount of time a receiving client has to process a message before it is made available to other clients, defaults to PT1M, at most 5 minutes (PT5M)|String|

## Examples

```js
### Get build info
GET {{url}}/queue
Authorization: Bearer {{token}}

### Add a queue
POST {{url}}/queue/v1
Authorization: Bearer {{token}}

{
  "queue": "test2",
  "description": "Test 2 queue",
  "retention": "P7D",
  "timeout": "PT5M"
}

### Get all queues
GET {{url}}/queue/v1
Authorization: Bearer {{token}}

### Get a queue
GET {{url}}/queue/v1/default
Authorization: Bearer {{token}}

### Delete a queue
DELETE {{url}}/queue/v1/secondQueue
Authorization: Bearer {{token}}

```
