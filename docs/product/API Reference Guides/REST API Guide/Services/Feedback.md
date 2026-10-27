---
title: Feedback Service
description: REST API for the Fusion AI feedback service
slug: /api/rest/service/feedback
tags:
  - api
  - service
  - feedback
  - fusion-ai
---
The feedback resource holds the ratings people give Fusion AI answers, with their comments. See [Feedback](/docs/extensions/fusion-ai/insights#feedback).

## Feedback REST API

The Feedback REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/feedback
```

Feedback belongs to your tenant. Users with the admin role see the feedback of every tenant.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List feedback|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a feedback entry|
|POST|\{release\}|v1|Save feedback. The platform adds your tenant id and email|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a feedback entry|
