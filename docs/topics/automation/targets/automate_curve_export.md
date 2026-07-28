---
slug: /topics/automations/targets/curve-export
title: Curve Export Targets
description: Trigger curve export groups automatically for a single curve or an entire group
sidebar_position: 5
tags:
- topics
- automation
- target
- curve
- export
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The curve export targets are **built-in automation targets** that trigger a configured curve export group whenever an automation condition fires. Two variants are available — one that exports a single curve, and one that runs the entire export group across all curves it contains.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@CurveExportHandler`). They are available to all tenants without any additional configuration.
:::

## Available curve export targets

| Code | Name | Description |
|---|---|---|
| `curve_export` | Export a curve | Runs the export group for the single curve that triggered the automation |
| `curve_export_group` | Run a curve group export | Runs the export group for all curves it contains |

Both targets use the same `@CurveExportHandler` script and accept the same `group` input. The difference is scope: `curve_export` exports only the triggering curve, while `curve_export_group` exports every curve in the group regardless of which one triggered it.

---

## `curve_export` — Export a curve

Use this target when you want a single curve to be exported as soon as it is updated — for example, immediately after a Smart Curve or Event Curve build completes.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `group` | ✅ | `curveexportgroup` | The name of the curve export group to run |

This target only applies to the `curve` service and the `update` action — it is designed to be triggered directly by a curve change. Transformation and property overrides are not supported.

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Export a curve to its export group when it is updated
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("update")
ab.setTarget("curve_export")
ab.setProperty("group", "DAILY_SETTLEMENT_EXPORT")
ab.icon = "graph-down-arrow text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "curve_export",
  "icon": "graph-down-arrow text-success",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "update",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "group": "DAILY_SETTLEMENT_EXPORT"
  }
}
```

</TabItem>
</Tabs>

### Chaining from a curve build

Since a Smart Curve or Event Curve build fires its own `success` action, you can chain an export to run only once the build has completed successfully, rather than on every intermediate update:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Export the curve once its build succeeds
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.setTarget("curve_export")
ab.setProperty("group", "DAILY_SETTLEMENT_EXPORT")
ab.icon = "graph-down-arrow text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "curve_export",
  "icon": "graph-down-arrow text-success",
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
    "group": "DAILY_SETTLEMENT_EXPORT"
  }
}
```

</TabItem>
</Tabs>

---

## `curve_export_group` — Run a curve group export

Use this target when an update to one curve should trigger a full export of every curve in the group — for example, when curves in a group are interdependent and consumers expect a complete, consistent export rather than a partial one.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `group` | ✅ | `curveexportgroup` | The name of the curve export group to run |

Unlike `curve_export`, this target accepts triggers from **any** service (`services = ["*"]`), as long as the action is `update`. This makes it suitable for triggering a full group export from something other than the curve itself — for example, a dataset update that affects multiple curves in the group.

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run the full export group when the dataset behind it updates
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("update")
ab.setTarget("curve_export_group")
ab.setProperty("group", "DAILY_SETTLEMENT_EXPORT")
ab.icon = "folder-symlink text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "curve_export_group",
  "icon": "folder-symlink text-success",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "update",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ],
  "properties": {
    "group": "DAILY_SETTLEMENT_EXPORT"
  }
}
```

</TabItem>
</Tabs>

### Triggering from any single curve in the group

Because the target accepts updates from any service, it can equally be triggered from a single curve in the group, exporting all curves whenever any one of them changes:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run the full export group whenever any curve in it changes
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("update")
ab.setTarget("curve_export_group")
ab.setProperty("group", "DAILY_SETTLEMENT_EXPORT")
ab.icon = "folder-symlink text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "curve_export_group",
  "icon": "folder-symlink text-success",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "update",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "group": "DAILY_SETTLEMENT_EXPORT"
  }
}
```

</TabItem>
</Tabs>

:::warning Multiple triggers, multiple exports
If several curves in the same group each have their own `curve_export_group` automation, an update affecting multiple curves at once will trigger the full group export multiple times in quick succession. Consider triggering the group export from a single upstream event — such as the dataset update that drives all the curves — rather than from every individual curve.
:::

---

## Choosing between the two targets

| | `curve_export` | `curve_export_group` |
|---|---|---|
| **Scope of export** | The triggering curve only | Every curve in the export group |
| **Trigger service** | `curve` only | Any service (`*`) |
| **Best for** | Independent curves exported on their own schedule | Interdependent curves that must be exported together for consistency |
| **Icon** | `graph-down-arrow text-success` | `folder-symlink text-success` |

---

## Related pages

- [Curve Build Targets](/docs/topics/automations/targets/curve) — build Smart Curves and Event Curves before exporting them
- [Smart TimeSeries Target](/docs/topics/automations/targets/timeseries) — the equivalent chaining pattern for Smart TimeSeries
- [Azure Storage Targets](/docs/topics/automations/targets/blob) — an alternative way to deliver curve data to storage
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including chaining and advanced `@` properties
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
