---
title: AI Studio Service
description: REST API for the Fusion AI conversation service
slug: /api/rest/service/aistudio
tags:
  - api
  - service
  - aistudio
  - fusion-ai
---
The AI studio resource holds your Fusion AI conversations, including agent runs and playbook runs. See [Studio](/docs/extensions/fusion-ai/studio).

## AI Studio REST API

The AI Studio REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aistudio
```

Conversations belong to your tenant, and a list only shows your own conversations.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your conversations|
|GET|\{release\}?user=null|v1?user=null|List the conversations of everyone in your tenant that you are allowed to read|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a conversation|
|POST|\{release\}|v1|Save a conversation, the conversation is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a conversation|

## Entities

### Conversation

A saved conversation must have a `prompt` (the first question) and `text`. The platform sets `tid` and `user` to your tenant and email. Conversations are normally saved by Fusion AI as you chat; the token usage of each conversation is in the [AI Usage service](./aiusage), whose `conversation` field is the conversation id.
