---
slug: /odsl/variable/ai
title: AI Agent, AI Assistant and AI Tool
tags:
- ai
- fusion-ai
---

# AI Agent, AI Assistant and AI Tool

These variables hold the Fusion AI configuration that you can create and save from ODSL: agents, custom assistants and custom tools. They are typed objects, so you set their properties like any other object. See [Fusion AI](/docs/extensions/fusion-ai/overview) for what each one does.

## Construction

|**Function**|**Description**|
|-|-|
|AIAgent()|Creates a new AI Agent|
|AIAssistant()|Creates a new AI Assistant|
|AITool()|Creates a new AI Tool|

## Properties

|**Variable**|**Property**|**Description**|**Type**|
|-|-|-|-|
|AIAgent|name|The name of the agent|String|
|AIAgent|icon|The icon shown for the agent|String|
|AIAgent|cron|An optional schedule to run the agent on|String|
|AIAssistant|name|The name of the assistant|String|
|AIAssistant|description|What the assistant is for, used to choose it|String|
|AIAssistant|icon|The icon shown for the assistant|String|
|AIAssistant|systemPrompt|The instructions given to Fusion when the assistant is used|String|
|AIAssistant|onlyUseCustomTools|True to let the assistant use only your custom tools, defaults to false|Boolean|
|AITool|name|The function name of the tool|String|
|AITool|description|What the tool does, used by Fusion to decide when to call it|String|
|AITool|icon|The icon shown for the tool|String|
|AITool|script|The private script, with category aitool, that implements the tool|String|

An agent also needs a `messages` list: the questions it asks, each an object with a `content` property.

## Example

```js
agent = AIAgent()
agent.id = "morning-gas-check"
agent.name = "Morning gas check"
agent.cron = "30 7 * * 1-5 * Europe/London"
q = Object()
q.content = "Did the ICE Endex TTF settlement prices arrive yesterday?"
agent.messages = [q]
save ${aiagent:agent}
```

## Further Reading

* [AI Agent service](/docs/api/rest/service/aiagent), [AI Assistant service](/docs/api/rest/service/aiassistant) and [AI Tool service](/docs/api/rest/service/aitool) in the REST API
