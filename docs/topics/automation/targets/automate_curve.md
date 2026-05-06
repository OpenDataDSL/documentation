---
slug: /topics/automations/targets/curve
title: Curve Build Targets
description: Trigger Smart Curve and Event Curve builds automatically using automation targets
sidebar_position: 4
tags:
- topics
- automation
- target
- curve
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The curve build targets are **built-in automation targets** that trigger curve builds in response to data changes. Two variants are available — one for Smart Curves and one for Event Curves — each with different behaviour after the build completes.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@CurveTarget`). They are available to all tenants without any additional configuration.
:::

## Available curve targets

| Code | Name | Script | Description |
|---|---|---|---|
| `curve` | Build a Smart Curve | `@CurveTarget` | Builds and stores the Smart Curve result |
| `ecurve` | Build an Event Curve | `@EventCurveTarget` | Builds the Event Curve and fires automations on the result |

---

## `curve` — Build a Smart Curve

Use this target to trigger a Smart Curve build whenever input data changes. The built curve is calculated and stored, making the updated result immediately available for reporting and downstream consumers.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `curve` | ✅ | `SmartCurve` | The ID of the Smart Curve to build |

### Using this target in an automation

A typical use case is rebuilding a Smart Curve whenever the underlying base data is updated:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Rebuild a Smart Curve when its base data is updated
ab = AutomationBuilder("data", "private", "MY_CURVE_OBJECT:BASE_PRICE")
ab.addCondition("update")
ab.setTarget("curve")
ab.setProperty("curve", "MY_CURVE_OBJECT:SMART_PRICE")
ab.icon = "graph-up text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
"target": "curve",
"icon": "graph-up text-success",
"enabled": true,
"conditions": [
{
"service": "data",
"action": "update",
"id": "MY_CURVE_OBJECT:BASE_PRICE",
"source": "private"
}
],
"properties": {
"curve": "MY_CURVE_OBJECT:SMART_PRICE"
}
}
```

</TabItem>
</Tabs>

:::note
`allowTransformation` and `allowPropertyChange` are both disabled for this target. The curve build process is fully managed by the platform and does not support pre-processing or property overrides.
:::

---

## `ecurve` — Build an Event Curve

Use this target to trigger an Event Curve build whenever related event data or base data changes. Unlike the Smart Curve target, the Event Curve target does not simply store the result — after the build completes, the platform fires automations on the resulting curve. This means the `ecurve` target is typically the first step in a **chained automation pipeline**.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `curve` | ✅ | `EventCurve` | The ID of the Event Curve to build |

### Using this target in an automation

A typical use case is rebuilding an Event Curve when new trade events arrive, which then triggers a downstream notification or storage automation via the curve's own `success` or `failed` action:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Rebuild an Event Curve when trade events are updated
ab = AutomationBuilder("event", "private", "MY_OBJECT:TRADES")
ab.addCondition("update")
ab.setTarget("ecurve")
ab.setProperty("curve", "MY_OBJECT:CURVE")
ab.icon = "graph-up-arrow text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
"target": "ecurve",
"icon": "graph-up-arrow text-primary",
"enabled": true,
"conditions": [
{
"service": "event",
"action": "update",
"id": "MY_OBJECT:TRADES",
"source": "private"
}
],
"properties": {
"curve": "MY_OBJECT:CURVE"
}
}
```

</TabItem>
</Tabs>

---

## Chaining automations with curve builds

Automations can trigger actions that themselves trigger further automations. This makes it straightforward to build multi-step reactive pipelines where each stage hands off to the next.

### Smart Curve pipeline

When base data is updated, an automation can rebuild a Smart Curve. Because the curve build itself fires `curve` service actions (`success`, `warning`, `failed`), a second automation can react to the build result — for example by sending a notification or writing the curve to storage.

```
Data updated  →  [curve target]  →  Smart Curve stored  →  curve:success  →  [email / blob target]
```

```js
//#region Step 1 — rebuild Smart Curve when base data changes
ab = AutomationBuilder("data", "private", "MY_CURVE_OBJECT:BASE_PRICE")
ab.addCondition("update")
ab.setTarget("curve")
ab.setProperty("curve", "MY_CURVE_OBJECT:SMART_PRICE")
ab.icon = "graph-up text-success"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Step 2 — notify when the Smart Curve build succeeds
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:SMART_PRICE")
ab.addCondition("success")
ab.setTarget("email")
ab.setProperty("to", "curves-team@example.com")
ab.setProperty("subject", "Smart Curve ready: MY_CURVE_OBJECT:SMART_PRICE")
ab.icon = "envelope-at text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

### Event Curve pipeline

When events are updated, an automation triggers an Event Curve build. The build result fires a `curve` service action, which a second automation can use to write the result to storage or send a notification.

```
Event updated  →  [ecurve target]  →  Event Curve built  →  curve:success  →  [blob / email target]
```

```js
//#region Step 1 — rebuild Event Curve when trade events are updated
ab = AutomationBuilder("event", "private", "MY_OBJECT:TRADES")
ab.addCondition("update")
ab.setTarget("ecurve")
ab.setProperty("curve", "MY_OBJECT:CURVE")
ab.icon = "graph-up-arrow text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Step 2 — write the built curve to Azure Blob on success
ab = AutomationBuilder("curve", "private", "MY_OBJECT:CURVE")
ab.addCondition("success")
ab.setTarget("blob")
ab.setProperty("storage", "https://mystorageaccount.blob.core.windows.net")
ab.setProperty("container", "curves")
ab.setProperty("path", "MY_OBJECT/${yyyy}/${MM}/${dd}/CURVE.csv")
ab.icon = "database text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

:::tip Reacting to build failures
You can add a parallel automation on the `failed` action of the `curve` service to alert your team if a build goes wrong — without interfering with the success path.
:::

---

## Choosing between the two targets

| | `curve` | `ecurve` |
|---|---|---|
| **Curve type** | Smart Curve | Event Curve |
| **Trigger service** | `data` | `event`, `data` |
| **After build** | Stores the result | Fires `curve` service automations on the result |
| **Typical use** | Keep derived curves up to date when inputs change | Drive downstream pipelines from event-based curve builds |
| **Icon** | `graph-up text-success` | `graph-up-arrow text-primary` |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including chaining and advanced `@` properties
- [Email Target](/docs/topics/automations/targets/email) — send notifications when a curve build completes
- [Azure Storage Targets](/docs/topics/automations/targets/blob) — write curve output to blob or data lake storage
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
