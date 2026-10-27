---
title: AI Assistant Service
description: REST API for the Fusion AI assistant service
slug: /api/rest/service/aiassistant
tags:
  - api
  - service
  - aiassistant
  - fusion-ai
---
The AI assistant resource holds the Fusion AI assistants: the built-in assistants published by OpenDataDSL, and your own custom assistants. See [Assistants](/docs/extensions/fusion-ai/assistants).

## AI Assistant REST API

The AI Assistant REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aiassistant
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all the assistants you can use, built-in and custom|
|GET|\{release\}/\{source\}/\{key\}|v1/private/EPR|Retrieve an assistant. Built-in assistants are in public and have ids starting with #|
|POST|\{release\}/private|v1/private|Create or update a custom assistant, the assistant is the body of the POST request|
|DELETE|\{release\}/private/\{key\}|v1/private/EPR|Delete a custom assistant|

## Entities

### Assistant

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the assistant|String|
|name|The name of the assistant|String|
|description|What the assistant is for. Fusion uses it to choose the assistant, so write it clearly|String|
|systemPrompt|The instructions given to Fusion when this assistant is used|String|
|icon|The icon shown for the assistant|String|
|model|The Claude model to use, if not the default|String|
|effort|The effort level to use, if not the default|String|
|onlyUseCustomTools|True to let the assistant use only your custom tools|Boolean|

## Examples

```js
### List assistants
GET https://api.opendatadsl.com/api/aiassistant/v1
Authorization: Bearer {{token}}

### Create a custom assistant
POST https://api.opendatadsl.com/api/aiassistant/v1/private
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "_id": "EPR",
  "name": "EPR Assistant",
  "icon": "recycle",
  "description": "Answers questions about extended producer responsibility obligations",
  "systemPrompt": "You help the compliance team with their EPR obligations..."
}
```
