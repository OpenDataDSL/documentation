---
slug: /topics/automations/targets/timeseries
title: Smart TimeSeries Target
description: Trigger a Smart TimeSeries build automatically in response to data changes
sidebar_position: 5
tags:
- topics
- automation
- target
- timeseries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Smart TimeSeries target is a **built-in automation target** that triggers a Smart TimeSeries build whenever its input data changes. Like the [Event Curve target](/docs/topics/automations/targets/curve#ecurve--build-an-event-curve), the build result fires `data` service actions that can trigger further automations downstream — making this target primarily useful as a link in a **chained automation pipeline**.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@TimeseriesTarget`). They are available to all tenants without any additional configuration.
:::

---

## `timeseries` — Build a Smart TimeSeries

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `timeseries` | ✅ | `SmartTimeSeries` | The ID of the Smart TimeSeries to build |

This target only applies to the `data` service and the `update` action. Transformation and property overrides are not supported — the build logic is defined in the Smart TimeSeries configuration itself.

---

## Using this target in an automation

A typical use case is rebuilding a Smart TimeSeries whenever its underlying base data is updated:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Rebuild a Smart TimeSeries when its base data is updated
ab = AutomationBuilder("data", "private", "MY_OBJECT:BASE_PRICE")
ab.addCondition("update")
ab.setTarget("timeseries")
ab.setProperty("timeseries", "MY_OBJECT:ADJUSTED_PRICE")
ab.icon = "graph-up"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "timeseries",
  "icon": "graph-up",
  "enabled": true,
  "conditions": [
    {
      "service": "data",
      "action": "update",
      "id": "MY_OBJECT:BASE_PRICE",
      "source": "private"
    }
  ],
  "properties": {
    "timeseries": "MY_OBJECT:ADJUSTED_PRICE"
  }
}
```

</TabItem>
</Tabs>

---

## Chaining automations with Smart TimeSeries builds

After the Smart TimeSeries is built, the platform fires a `data` service `update` action on the result. A second automation can react to this — for example to send a notification, publish to a queue, or trigger a report.

```
data:update (base)  →  [timeseries target]  →  Smart TimeSeries built  →  data:update (result)  →  [downstream target]
```

:::note
Because the Smart TimeSeries build fires a `data:update` action on the result timeseries, use the result timeseries ID as the condition `id` in any downstream automation — not the base data ID.
:::

### Example: rebuild and notify

The following example rebuilds a Smart TimeSeries when base data changes, then sends an email notification when the rebuilt timeseries is updated:

```js
//#region Stage 1 — rebuild Smart TimeSeries when base data changes
ab = AutomationBuilder("data", "private", "MY_OBJECT:BASE_PRICE")
ab.addCondition("update")
ab.setTarget("timeseries")
ab.setProperty("timeseries", "MY_OBJECT:ADJUSTED_PRICE")
ab.icon = "graph-up"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Stage 2 — notify when the Smart TimeSeries has been rebuilt
ab = AutomationBuilder("data", "private", "MY_OBJECT:ADJUSTED_PRICE")
ab.addCondition("update")
ab.setTarget("email")
ab.setProperty("to", "data-team@example.com")
ab.setProperty("subject", "Smart TimeSeries updated: MY_OBJECT:ADJUSTED_PRICE")
ab.icon = "envelope-at text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

### Example: rebuild and publish to a queue

```js
//#region Stage 1 — rebuild Smart TimeSeries when base data changes
ab = AutomationBuilder("data", "private", "MY_OBJECT:BASE_PRICE")
ab.addCondition("update")
ab.setTarget("timeseries")
ab.setProperty("timeseries", "MY_OBJECT:ADJUSTED_PRICE")
ab.icon = "graph-up"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Stage 2 — publish the rebuilt timeseries to a queue
ab = AutomationBuilder("data", "private", "MY_OBJECT:ADJUSTED_PRICE")
ab.addCondition("update")
ab.setTarget("queue_subject")
ab.setProperty("queue", "MY_DOWNSTREAM_QUEUE")
ab.setProperty("subject", "timeseries.update.MY_OBJECT.ADJUSTED_PRICE")
ab.icon = "send text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

---

## Comparison with related targets

| Target | Builds | After build fires | Typical use |
|---|---|---|---|
| `timeseries` | Smart TimeSeries | `data:update` on the result | Rebuild derived timeseries when inputs change, then chain downstream |
| `curve` | Smart Curve | Stores the result | Rebuild and store a derived curve when inputs change |
| `ecurve` | Event Curve | `curve` service actions | Rebuild an event-driven curve and chain downstream |

---

## Related pages

- [Curve Build Targets](/docs/topics/automations/targets/curve) — the equivalent targets for Smart Curves and Event Curves
- [Email Target](/docs/topics/automations/targets/email) — send a notification after a Smart TimeSeries rebuild
- [Queue Target](/docs/topics/automations/targets/queue) — publish the rebuilt timeseries to a message queue
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including chaining and advanced `@` properties
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
