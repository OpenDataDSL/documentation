---
title: AI Usage Service
description: REST API for the Fusion AI token usage service
slug: /api/rest/service/aiusage
tags:
  - api
  - service
  - aiusage
  - fusion-ai
---
The AI usage resource holds the Fusion AI token usage: one record per conversation per day. It is read-only. See [Billing](/docs/extensions/fusion-ai/billing).

## AI Usage REST API

The AI Usage REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aiusage
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List the usage records of your tenant|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a usage record|

Users with the admin role see the usage of every tenant. Use [Aggregation](../aggregation) to summarise the usage, for example by user or by day.

## Entities

### Usage record

|**Name**|**Description**|**Type**|
|-|-|-|
|conversation|The id of the conversation in the [AI Studio service](./aistudio)|String|
|user|The person who had the conversation|String|
|tid|The tenant id|String|
|date|The day of the usage|String|
|timestamp|When the record was last updated|DateTime|
|input|Input tokens|Long|
|output|Output tokens|Long|
|cacheWrite|Tokens written to the prompt cache|Long|
|cacheRead|Tokens read from the prompt cache|Long|
|billedTokens|The billed tokens: (input + output + 1.25 x cacheWrite + 0.1 x cacheRead) x the model weight (Haiku 1, Sonnet 2, Opus 4)|Long|

Records saved before cache tokens were recorded have no cache fields. Filter date ranges on `timestamp`.

## Examples

```js
### Billed tokens by user
GET https://api.opendatadsl.com/api/aiusage/v1
    ?_aggregate=[{"$group":{"_id":"$user","tokens":{"$sum":"$billedTokens"}}}]
Authorization: Bearer {{token}}
```
