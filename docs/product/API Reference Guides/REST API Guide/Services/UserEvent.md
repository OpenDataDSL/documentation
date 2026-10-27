---
title: User Event Service
description: REST API for the user event service
slug: /api/rest/service/user-event
tags:
  - api
  - service
  - user-event
  - user
---
The user event resource records when users were added to, removed from or invited to your tenant, with the number of users at the time. It is read-only and is used for billing.

## User Event REST API

The User Event REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/user-event
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your tenant's user events|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a user event|

## Entities

### User event

|**Name**|**Description**|**Type**|
|-|-|-|
|email|The user|String|
|action|add, delete or invite|String|
|users|The number of users in your tenant after the event|Integer|
|timestamp|When it happened|DateTime|
