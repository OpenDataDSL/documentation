---
slug: /topics/automations/creating
title: Creating Automations
description: How to create automations in OpenDataDSL using ODSL or the REST API
sidebar_position: 2
tags:
- topics
- automation
- creating
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Automations can be created using ODSL scripts or directly via the REST API. This guide walks through common scenarios with worked examples for both approaches.

## Before you start

You will need to know:
- The **service** and **action** that should trigger the automation — see the [trigger reference](/docs/topics/automations/basics#triggering-events)
- The **ID** of the entity to watch (e.g. a dataset ID, object ID, or process name)
- The **target** to send the event to — see [Automation Targets](/docs/topics/automations/targets)

## Creating a basic automation

The example below creates an automation that sends an email notification whenever a specific dataset becomes late.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Create a dataset late notification automation
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("late")
ab.setTarget("email")
ab.setProperty("to", "ops-team@example.com")
ab.setProperty("subject", "Dataset late: MY_PROVIDER.FEED.PRODUCT")
ab.icon = "bell-fill text-warning"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email",
  "icon": "bell-fill text-warning",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "late",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ],
  "properties": {
    "to": "ops-team@example.com",
    "subject": "Dataset late: MY_PROVIDER.FEED.PRODUCT"
  }
}
```

</TabItem>
</Tabs>

## Multiple conditions on one automation

A single automation can watch multiple entities or actions. The automation fires when **any** condition is matched.

The example below notifies the team when a curve build either succeeds or fails.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Create a curve build result automation
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.addCondition("failed")
ab.setTarget("email")
ab.setProperty("to", "curves-team@example.com")
ab.setProperty("subject", "Curve build update: MY_CURVE_OBJECT:CLOSE")
ab.icon = "graph-up text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email",
  "icon": "graph-up text-primary",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "success",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    },
    {
      "service": "curve",
      "action": "failed",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "to": "curves-team@example.com",
    "subject": "Curve build update: MY_CURVE_OBJECT:CLOSE"
  }
}
```

</TabItem>
</Tabs>

## Triggering a process from an automation

You can chain automations with processes — for example, running a downstream enrichment process whenever a dataset completes.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Trigger a process when a dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("process")
ab.setProperty("process", "MY_ENRICHMENT_PROCESS")
ab.icon = "arrow-right-circle text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "process",
  "icon": "arrow-right-circle text-success",
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
    "process": "MY_ENRICHMENT_PROCESS"
  }
}
```

</TabItem>
</Tabs>

## Sending data to a queue

You can publish event payloads to a message queue for downstream consumers to process.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Publish object updates to a queue
ab = AutomationBuilder("object", "private", "MY_MASTER_DATA_OBJECT")
ab.addCondition("update")
ab.setTarget("queue")
ab.setProperty("queue", "MY_DOWNSTREAM_QUEUE")
ab.icon = "send text-info"
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
  "icon": "send text-info",
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
    "queue": "MY_DOWNSTREAM_QUEUE"
  }
}
```

</TabItem>
</Tabs>

## Using a dependent ID

Some automations need to watch an entity that depends on another. For example, an event that triggers a downstream event curve build can be tracked using the optional `did` (dependent ID) field on the condition.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Watch an event that drives a curve build
ab = AutomationBuilder("event", "private", "MY_OBJECT:TRADES")
ab.addConditionWithDid("create", "MY_OBJECT:CURVE")
ab.setTarget("email")
ab.setProperty("to", "data-team@example.com")
ab.setProperty("subject", "Trade event received for MY_OBJECT")
ab.icon = "calendar-event text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email",
  "icon": "calendar-event text-primary",
  "enabled": true,
  "conditions": [
    {
      "service": "event",
      "action": "create",
      "id": "MY_OBJECT:TRADES",
      "source": "private",
      "did": "MY_OBJECT:CURVE"
    }
  ],
  "properties": {
    "to": "data-team@example.com",
    "subject": "Trade event received for MY_OBJECT"
  }
}
```

</TabItem>
</Tabs>

## Disabling an automation

Set `enabled` to `false` to pause an automation without deleting it. You can re-enable it at any time.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Disable an existing automation
auto = ${automation:"MY_AUTOMATION_ID"}
auto.enabled = false
save ${automation:auto}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
PUT https://api.opendatadsl.com/api/automation/v1/MY_AUTOMATION_ID

{
  "enabled": false
}
```

</TabItem>
</Tabs>

## Deleting an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Delete an automation
delete ${automation:"MY_AUTOMATION_ID"}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```
DELETE https://api.opendatadsl.com/api/automation/v1/MY_AUTOMATION_ID
```

</TabItem>
</Tabs>

:::tip Finding your automation ID
After saving an automation, the platform assigns it a unique `_id`. You can retrieve it by listing your automations in the portal or querying the `automation` service.
:::

---

## Advanced features

Automations support a set of special properties that begin with `@`. These give you fine-grained control over when an automation fires and how the data is shaped before it is delivered.

### Transforming data with a mustache template

By default, the automation sends the raw triggered entity to the target. You can reshape the data before delivery by setting the `@transformer` property to the ID of a mustache script stored in the platform.

This is useful when a target expects a specific format — for example, a CSV layout for an email attachment.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send a transformed CSV when an object is created
ab = AutomationBuilder("object", "private", "*")
ab.addCondition("create")
ab.setTarget("email_attachment")
ab.setProperty("to", "analyst@example.com")
ab.setProperty("subject", "New object created")
ab.setProperty("attachmentName", "created.csv")
ab.setProperty("@transformer", "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV")
ab.icon = "envelope-paper text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email_attachment",
  "icon": "envelope-paper text-outlook",
  "enabled": true,
  "conditions": [
    {
      "service": "object",
      "action": "create",
      "id": "*",
      "source": "private"
    }
  ],
  "properties": {
    "to": "analyst@example.com",
    "subject": "New object created",
    "attachmentName": "created.csv",
    "@transformer": "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV"
  }
}
```

</TabItem>
</Tabs>

:::note
The mustache script must already exist in the platform as a script of type `mustache` before the automation runs. See [Scripts](/docs/topics/scripts) for how to upload scripts.
:::

---

### Filtering update triggers by property name

When triggering on an `update` action, you may only want to react when a specific property on the entity has changed — not every update. Set `@propertyName` to the name of the property to watch.

The example below fires only when the `status` property of an object is updated:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Notify when the status property of an object changes
ab = AutomationBuilder("object", "private", "MY_MASTER_DATA_OBJECT")
ab.addCondition("update")
ab.setTarget("email")
ab.setProperty("to", "ops-team@example.com")
ab.setProperty("subject", "Status changed: MY_MASTER_DATA_OBJECT")
ab.setProperty("@propertyName", "status")
ab.icon = "envelope-at text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email",
  "icon": "envelope-at text-outlook",
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
    "to": "ops-team@example.com",
    "subject": "Status changed: MY_MASTER_DATA_OBJECT",
    "@propertyName": "status"
  }
}
```

</TabItem>
</Tabs>

---

### Filtering create triggers by property value

When triggering on a `create` action, you can narrow the automation to only fire when a newly created entity has a specific property set to a specific value. Use `@propertyName` and `@propertyValue` together.

This is particularly powerful with a wildcard `id` of `*` — the automation watches all new entities of a service type, but only fires when the property filter matches.

The example below fires whenever any object is created whose `_type` is `#Object`:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Notify when any object of type #Object is created
ab = AutomationBuilder("object", "private", "*")
ab.addCondition("create")
ab.setTarget("email_attachment")
ab.setProperty("to", "data-team@example.com")
ab.setProperty("subject", "New #Object created")
ab.setProperty("attachmentName", "created.csv")
ab.setProperty("@transformer", "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV")
ab.setProperty("@propertyName", "_type")
ab.setProperty("@propertyValue", "#Object")
ab.icon = "envelope-paper text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email_attachment",
  "icon": "envelope-paper text-outlook",
  "enabled": true,
  "conditions": [
    {
      "service": "object",
      "action": "create",
      "id": "*",
      "source": "private"
    }
  ],
  "properties": {
    "to": "data-team@example.com",
    "subject": "New #Object created",
    "attachmentName": "created.csv",
    "@transformer": "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV",
    "@propertyName": "_type",
    "@propertyValue": "#Object"
  }
}
```

</TabItem>
</Tabs>

---

### Summary of `@` properties

| Property | Applies to action | Description |
|---|---|---|
| `@transformer` | Any | ID of a mustache script used to transform the data before delivery |
| `@propertyName` | `update` | Only fire when this named property has changed |
| `@propertyName` | `create` | Combined with `@propertyValue` — only fire when this property equals the given value |
| `@propertyValue` | `create` | The value that `@propertyName` must equal for the automation to fire |

:::tip Using wildcards
Set the condition `id` to `*` to watch all entities in a service. Combined with `@propertyName` and `@propertyValue`, this lets you build broad automations that react selectively to meaningful changes across your entire dataset.
:::

---

## Next steps

- [Automation Targets](/docs/topics/automations/targets) — explore the full list of available targets and their configuration properties
- [Automation Logs](/docs/topics/automations/logs) — monitor and troubleshoot your automation executions
- [Automation Basics](/docs/topics/automations/basics) — revisit the core concepts and trigger reference
