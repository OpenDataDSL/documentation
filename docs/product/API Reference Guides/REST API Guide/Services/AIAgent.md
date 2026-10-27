---
title: AI Agent Service
description: REST API for the Fusion AI agent service
slug: /api/rest/service/aiagent
tags:
  - api
  - service
  - aiagent
  - fusion-ai
---
The AI agent resource holds your Fusion AI agents: a saved list of questions that Fusion answers in order, on demand or on a schedule. See [Agents](/docs/extensions/fusion-ai/agents) for how agents are used.

## AI Agent REST API

The AI Agent REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aiagent
```

Agents belong to your tenant. Changes are not versioned.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your agents|
|GET|\{release\}/\{key\}|v1/3f0c9a52-1b7d-4c2e-9f61-0d8a2b7e4c11|Retrieve an agent|
|POST|\{release\}|v1|Create or update an agent, the agent is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/3f0c9a52-1b7d-4c2e-9f61-0d8a2b7e4c11|Delete an agent|

## Entities

### Agent

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the agent|String|
|name|The name of the agent (required)|String|
|messages|The questions the agent asks, in order, each as an object with a `content` property (required)|Object[]|
|cron|An optional schedule in the platform cron format: minute hour day-of-month month day-of-week year, and an optional timezone|String|
|enabled|False to stop a scheduled agent from running, defaults to true|Boolean|
|icon|The icon shown for the agent, defaults to person-circle text-success|String|
|user|The email of the person who last saved the agent (set by the platform)|String|
|runAs|The person a scheduled run acts as: the person who last saved the agent (set by the platform)|Object|

When an agent with a `cron` is saved and enabled, the platform adds it to the schedule. Saving it with no `cron`, or with `enabled` false, removes it from the schedule.

## Examples

```js
### List agents
GET https://api.opendatadsl.com/api/aiagent/v1
Authorization: Bearer {{token}}

### Create an agent that runs at 07:30 on weekdays
POST https://api.opendatadsl.com/api/aiagent/v1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "_id": "morning-gas-check",
  "name": "Morning gas check",
  "cron": "30 7 * * 1-5 * Europe/London",
  "messages": [
    {"content": "Did the ICE Endex TTF settlement prices arrive yesterday?"},
    {"content": "Summarise the change in the TTF front month over the last week"}
  ]
}
```
