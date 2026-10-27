---
title: AI Tool Service
description: REST API for the Fusion AI custom tool service
slug: /api/rest/service/aitool
tags:
  - api
  - service
  - aitool
  - fusion-ai
---
The AI tool resource holds your Fusion AI custom tools: functions in your own scripts that Fusion can call. See [Tools](/docs/extensions/fusion-ai/tools).

## AI Tool REST API

The AI Tool REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aitool
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your custom tools|
|GET|\{release\}/\{key\}|v1/2b8f7d1e-5c3a-4e9b-a0d2-7f6e1c9b3a45|Retrieve a tool|
|POST|\{release\}|v1|Create or update a tool, the tool is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/2b8f7d1e-5c3a-4e9b-a0d2-7f6e1c9b3a45|Delete a tool|

## Entities

### Tool

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the tool|String|
|name|The function name of the tool: letters, numbers, underscores and hyphens|String|
|script|The private script, with category aitool, that implements the function|String|
|description|What the tool does. Fusion uses it to decide when to call the tool|String|
|properties|The tool's inputs, each with `name`, `type`, `description` and `required`|Object[]|
|assistant|Limits the tool to one assistant|String|
|icon|The icon shown for the tool|String|
