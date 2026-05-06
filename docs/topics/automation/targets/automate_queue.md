---
slug: /topics/automations/targets/queue
title: Queue Target
description: Send triggered data to a message queue for downstream consumers to process
sidebar_position: 9
tags:
- topics
- automation
- target
- queue
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The queue target is a **built-in automation target** that publishes the triggered entity as a message to a named message queue whenever an automation condition fires. This decouples data producers from consumers and is the standard pattern for feeding downstream systems, workflow engines, or external integrations.

Two variants are available — one that sends the data with no subject, and one that includes a configurable message subject.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@QueueTarget`). They are available to all tenants without any additional configuration.
:::

---

## Available queue targets

| Code | Name | Description |
|---|---|---|
| `queue` | Send a message to a queue | Publishes data to a queue with no subject |
| `queue_subject` | Send a message to a queue with subject | Publishes data to a queue with a configurable subject |

Both targets use the same `@QueueTarget` script and support the `@transformer` property to reshape the payload before it is sent.

---

## `queue` — Send a message to a queue

Use this target when consumers identify and route messages by their content rather than a subject header.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `queue` | ✅ | `queue` | The name of the queue to send the data to |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Publish dataset data to a queue on completion
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("queue")
ab.setProperty("queue", "MY_DOWNSTREAM_QUEUE")
ab.icon = "send text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "queue",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "complete",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ],
  "properties": {
    "queue": "MY_DOWNSTREAM_QUEUE"
  }
}
```

</TabItem>
</Tabs>

---

## `queue_subject` — Send a message to a queue with subject

Use this target when consumers use the message subject to route or filter messages — for example, when multiple event types are published to a shared queue and consumers subscribe selectively by subject.

### Inputs

| Input | Required | Description |
|---|---|---|
| `queue` | ✅ | The name of the queue to send the data to |
| `subject` | ✅ | The message subject |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Publish object updates to a queue with a subject
ab = AutomationBuilder("object", "private", "MY_MASTER_DATA_OBJECT")
ab.addCondition("update")
ab.setTarget("queue_subject")
ab.setProperty("queue", "MY_DOWNSTREAM_QUEUE")
ab.setProperty("subject", "object.update.MY_MASTER_DATA_OBJECT")
ab.icon = "send text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "queue_subject",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    {
      "service": "object",
      "action": "update",
      "id": "MY_MASTER_DATA_OBJECT",
      "source": "private"
    }
  ],
  "properties": {
    "queue": "MY_DOWNSTREAM_QUEUE",
    "subject": "object.update.MY_MASTER_DATA_OBJECT"
  }
}
```

</TabItem>
</Tabs>

---

## Transforming the message payload

Both queue targets support the `@transformer` property, which lets you reshape the triggered data using a mustache script before it is published to the queue. This is useful when consuming systems expect a specific JSON structure or format.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Publish a transformed payload to a queue on curve build success
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.setTarget("queue_subject")
ab.setProperty("queue", "MY_DOWNSTREAM_QUEUE")
ab.setProperty("subject", "curve.success.MY_CURVE_OBJECT")
ab.setProperty("@transformer", "my-scripts\\templates\\CurveQueuePayload")
ab.icon = "send text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "queue_subject",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "success",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "queue": "MY_DOWNSTREAM_QUEUE",
    "subject": "curve.success.MY_CURVE_OBJECT",
    "@transformer": "my-scripts\\templates\\CurveQueuePayload"
  }
}
```

</TabItem>
</Tabs>

See [Advanced automation features](/docs/topics/automations/creating#advanced-features) for more detail on the `@transformer` property.

---

## Using a queue target in a pipeline

Queue targets fit naturally at the end of a data pipeline, publishing the final result for external consumers once all validation and enrichment steps have completed:

```
dataset:update  →  [qualitycheck]  →  dataset:complete
                                            ↓
                                   [criticalcheck]  →  dataset:complete
                                                              ↓
                                              [queue_subject target]  →  Consumer systems
```

```js
//#region Publish to queue after quality and critical checks complete
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("queue_subject")
ab.setProperty("queue", "MY_DOWNSTREAM_QUEUE")
ab.setProperty("subject", "dataset.ready.MY_PROVIDER.FEED.PRODUCT")
ab.icon = "send text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

:::tip Multiple consumers
If several downstream systems need to receive the same data, create a separate queue automation for each target queue. Each automation fires independently from the same triggering condition.
:::

---

## Pre-configured queue target

If a queue is shared across many datasets or curves, you can create a custom target with the queue name pre-filled so users only need to select the target:

```js
//#region Create a pre-configured target for a shared downstream queue
at = AutomationTarget()
at.publisher = "myorg"
at.code = "queue-market-data-out"
at.name = "Publish to Market Data output queue"
at.description = "Send data to the shared market data output queue"
at.icon = "send text-red"
at.script = "@QueueTarget"
at.template = "send a message to the market data output queue"
at.allowTransformation = true
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]

at.properties.queue = "MARKET_DATA_OUTPUT_QUEUE"

at.tags = ["Queue"]
save at
//#endregion
```

---

## Choosing between the two targets

| | `queue` | `queue_subject` |
|---|---|---|
| **Subject** | None | Configurable |
| **Best for** | Single-purpose queues where all messages are the same type | Shared queues where consumers filter by subject |
| **Transformer support** | ✅ | ✅ |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including advanced `@` properties
- [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) — run quality checks before publishing to a queue
- [Process Target](/docs/topics/automations/targets/process) — trigger a process instead of publishing to a queue
- [Custom Targets](/docs/topics/automations/targets/custom) — pre-configure a queue name for shared queues
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
