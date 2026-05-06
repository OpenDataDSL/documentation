---
slug: /topics/automations/targets/dataset-checks
title: Dataset Check Targets
description: Automatically trigger dataset quality and critical checks using automation targets
sidebar_position: 6
tags:
- topics
- automation
- target
- dataset
- quality
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The dataset check targets are **built-in automation targets** that trigger quality and critical checks on a managed dataset whenever it is updated. They are the standard mechanism for ensuring data integrity as part of a reactive, event-driven pipeline.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@DatasetQualityTarget`). They are available to all tenants without any additional configuration.
:::

## Available dataset check targets

| Code | Name | Script | Description |
|---|---|---|---|
| `qualitycheck` | Run dataset quality checks | `@DatasetQualityTarget` | Runs the quality checks defined on the dataset |
| `criticalcheck` | Run dataset critical checks | `@DatasetCriticalTarget` | Runs the critical checks defined on the dataset |

Both targets only apply to the `dataset` service and the `update` action. Transformation and property overrides are not supported — the check logic is defined in the dataset's own check scripts.

---

## Understanding quality vs critical checks

Quality checks and critical checks serve different purposes in dataset monitoring:

**Quality checks** (`dataset-quality` category scripts) assess the data for correctness and completeness. Each check returns one of three outcomes: `"valid"`, `"warning"`, or `"failed"`. Warnings and failures are recorded but do not necessarily halt downstream processing.

**Critical checks** (`dataset-critical` category scripts) assess conditions that must be met before the dataset can be considered usable. They follow the same return convention but are treated with higher severity — a critical check failure indicates the data should not be used.

Both types of check script have access to the following globals at runtime:

| Global | Description |
|---|---|
| `#DSID` | The dataset ID being checked |
| `#DATASET` | The dataset configuration object |
| `#ONDATE` | The date for which the check is running |
| `#EVENTS` | The events associated with this dataset delivery |
| `#LOG` | The log object for recording check messages |

:::tip Defining checks
Quality and critical check scripts are defined on the dataset itself, not on the automation. The automation targets simply trigger their execution at the right time. See the [Dataset Monitoring](/docs/topics/datasets/monitoring) documentation for how to configure check scripts on a dataset.
:::

---

## `qualitycheck` — Run dataset quality checks

Use this target to trigger the dataset's quality checks automatically whenever new data arrives. This is typically the first check stage in a data pipeline, run immediately after a dataset update to validate the incoming data before any downstream processes consume it.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `dsid` | ✅ | `dsid` | The dataset ID of the dataset to run quality checks on |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run quality checks when a dataset is updated
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("update")
ab.setTarget("qualitycheck")
ab.setProperty("dsid", "MY_PROVIDER.FEED.PRODUCT")
ab.icon = "ui-checks text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "qualitycheck",
  "icon": "ui-checks text-red",
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
    "dsid": "MY_PROVIDER.FEED.PRODUCT"
  }
}
```

</TabItem>
</Tabs>

---

## `criticalcheck` — Run dataset critical checks

Use this target to trigger the dataset's critical checks. Critical checks are typically run after quality checks pass and before any dependent processes or outputs are triggered, acting as a gate on whether the data is safe to use.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `dsid` | ✅ | `dsid` | The dataset ID of the dataset to run critical checks on |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run critical checks when a dataset is updated
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("update")
ab.setTarget("criticalcheck")
ab.setProperty("dsid", "MY_PROVIDER.FEED.PRODUCT")
ab.icon = "ui-checks text-red"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "criticalcheck",
  "icon": "ui-checks text-red",
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
    "dsid": "MY_PROVIDER.FEED.PRODUCT"
  }
}
```

</TabItem>
</Tabs>

---

## Chaining checks into a data pipeline

Because automations can trigger actions that themselves trigger further automations, quality and critical checks fit naturally into a multi-stage pipeline. A typical pattern is to chain them in sequence with downstream delivery steps:

```
dataset:update  →  [qualitycheck]  →  dataset:complete / warning / failed
                                            ↓ complete
                                   [criticalcheck]  →  dataset:complete / warning / failed
                                                              ↓ complete
                                                      [blob / email / curve target]
```

The following example sets up a three-stage pipeline — quality checks, then critical checks, then delivery to Azure Blob Storage — all driven by automations:

```js
//#region Stage 1 — run quality checks on dataset update
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("update")
ab.setTarget("qualitycheck")
ab.setProperty("dsid", "MY_PROVIDER.FEED.PRODUCT")
ab.icon = "ui-checks text-red"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Stage 2 — run critical checks when quality checks complete successfully
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("criticalcheck")
ab.setProperty("dsid", "MY_PROVIDER.FEED.PRODUCT")
ab.icon = "ui-checks text-red"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Stage 3 — deliver the data when critical checks complete successfully
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("blob")
ab.setProperty("storage", "https://mystorageaccount.blob.core.windows.net")
ab.setProperty("container", "market-data")
ab.setProperty("path", "MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv")
ab.icon = "database text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

:::warning Disambiguating `complete` in a chain
In the example above, both Stage 2 and Stage 3 listen for the `complete` action on the same dataset. If both quality and critical checks are configured, Stage 3 will fire after whichever check completes last. Consider whether your pipeline requires stricter sequencing, and use `@propertyName` / `@propertyValue` filtering if needed to control exactly which completion event triggers each step.
:::

You can add a parallel notification automation on the `warning` or `failed` actions to alert your team when checks do not pass, without interrupting the pipeline structure.

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including chaining and advanced `@` properties
- [Curve Build Targets](/docs/topics/automations/targets/curve) — trigger curve builds as part of a dataset pipeline
- [Azure Storage Targets](/docs/topics/automations/targets/blob) — write dataset output to blob or data lake storage
- [Email Target](/docs/topics/automations/targets/email) — send notifications when checks complete or fail
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
