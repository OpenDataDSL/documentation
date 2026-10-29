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

The queue targets send the triggering data as a message to one of your tenant's queues whenever an automation fires. This decouples the platform from the systems that consume the data: they read messages from the queue in their own time.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.queue` | Send a message to a queue | `send a message to [queue]` | `send text-red` |
| `odsl.queue_subject` | Send a message to a queue with a subject | `send a message to [queue] with [subject]` | `send text-red` |

Both targets work with any service and any action, and both support the `@transformer` property and property-change filtering.

## How it works

- The data, after any `@transformer` has been applied, is sent as a JSON message to your tenant queue named in `queue`
- The message subject is `subject`, which can include dates filled in from the ondate of the triggering data, for example `${date:yyyy-MM-dd}`
- `odsl.queue` sends the message with an empty subject

See [Queues](/docs/odsl/dm/queues) for how to work with queues.

---

## odsl.queue: Send a message to a queue

### Inputs

| Input | Description |
|---|---|
| `queue` | The name of the queue to send the message to |

### Default properties

| Property | Value |
|---|---|
| `subject` | `""` (empty) |

### Example: send a dataset to a queue when it is complete

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "complete"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.queue"
a.template = "When 'MY.PROVIDER.FEED' is complete, send a message to [queue]"
a.icon = "send text-red"
a.properties.queue = "market-data-out"
a.properties.subject = ""
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.queue",
  "template": "When 'MY.PROVIDER.FEED' is complete, send a message to [queue]",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "MY.PROVIDER.FEED",
      "action": "complete"
    }
  ],
  "properties": {
    "queue": "market-data-out",
    "subject": ""
  }
}
```

</TabItem>
</Tabs>

---

## odsl.queue_subject: Send a message to a queue with a subject

Use this target when the systems reading the queue use the message subject to route or filter messages, for example when several kinds of data go to one shared queue.

### Inputs

| Input | Description |
|---|---|
| `queue` | The name of the queue to send the message to |
| `subject` | The message subject, can include dates |

### Example: send an updated curve to a queue with a subject

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("data", "private", "MY_OBJECT:CURVE").build()

c = SimpleObject()
c.source = "private"
c.service = "data"
c.id = "MY_OBJECT:CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.queue_subject"
a.template = "When 'MY_OBJECT:CURVE' is updated, send a message to [queue] with [subject]"
a.icon = "send text-red"
a.properties.queue = "market-data-out"
a.properties.subject = "CURVE_${date:yyyyMMdd}"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.queue_subject",
  "template": "When 'MY_OBJECT:CURVE' is updated, send a message to [queue] with [subject]",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:CURVE",
      "action": "update"
    }
  ],
  "properties": {
    "queue": "market-data-out",
    "subject": "CURVE_${date:yyyyMMdd}"
  }
}
```

</TabItem>
</Tabs>

---

## Transforming the message

Set `@transformer` to the name of a mustache script, or to inline mustache text, to reshape the data into the structure the consuming system expects. The template then includes the transform step, for example:

`When 'MY.PROVIDER.FEED' is complete, transform the data using [@transformer], then send a message to [queue]`

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ab = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED")
ab.set("@transformer", "dataset-to-message")
a = ab.build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "complete"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.queue"
a.template = "When 'MY.PROVIDER.FEED' is complete, transform the data using [@transformer], then send a message to [queue]"
a.icon = "send text-red"
a.properties.queue = "market-data-out"
a.properties.subject = ""
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.queue",
  "template": "When 'MY.PROVIDER.FEED' is complete, transform the data using [@transformer], then send a message to [queue]",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "MY.PROVIDER.FEED",
      "action": "complete"
    }
  ],
  "properties": {
    "queue": "market-data-out",
    "subject": "",
    "@transformer": "dataset-to-message"
  }
}
```

</TabItem>
</Tabs>

:::tip Several consumers
If several systems need the same data, create one automation per queue. Each automation fires independently from the same condition.
:::

---

## Choosing between the two targets

| | `odsl.queue` | `odsl.queue_subject` |
|---|---|---|
| **Subject** | Empty | Set by you, can include dates |
| **Best for** | Queues that carry one kind of message | Shared queues where consumers filter by subject |
| **Transformer support** | Yes | Yes |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Custom Targets](/docs/topics/automations/targets/custom): fix the queue name in a target for your team
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
