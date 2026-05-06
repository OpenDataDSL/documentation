---
slug: /topics/automations/targets/process
title: Process Target
description: Trigger an OpenDataDSL process to run automatically in response to a platform event
sidebar_position: 8
tags:
- topics
- automation
- target
- process
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The process target is a **built-in automation target** that triggers a named process to run whenever an automation condition is fired. It is the standard way to chain event-driven data changes into scheduled or on-demand process execution — without any polling or manual intervention.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@ProcessTarget`). They are available to all tenants without any additional configuration.
:::

---

## `process` — Run a process

### Inputs

| Input | Required | Description |
|---|---|---|
| `process` | ✅ | The name of the process to run |

---

## Using this target in an automation

### Run a process when a dataset completes

A common use case is triggering a downstream enrichment or reporting process as soon as a dataset is marked complete:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run an enrichment process when a dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("process")
ab.setProperty("process", "MY_ENRICHMENT_PROCESS")
ab.icon = "play-fill text-success"
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
  "icon": "play-fill text-success",
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

### Run a process when a curve build succeeds

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run a reporting process when a Smart Curve build succeeds
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.setTarget("process")
ab.setProperty("process", "MY_REPORTING_PROCESS")
ab.icon = "play-fill text-success"
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
  "icon": "play-fill text-success",
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
    "process": "MY_REPORTING_PROCESS"
  }
}
```

</TabItem>
</Tabs>

### Run a process when an object is updated

You can also react to master data changes — for example, re-running a calculation process whenever a reference object is modified:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Re-run a calculation process when a reference object changes
ab = AutomationBuilder("object", "private", "MY_REFERENCE_OBJECT")
ab.addCondition("update")
ab.setTarget("process")
ab.setProperty("process", "MY_CALCULATION_PROCESS")
ab.icon = "play-fill text-success"
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
  "icon": "play-fill text-success",
  "enabled": true,
  "conditions": [
    {
      "service": "object",
      "action": "update",
      "id": "MY_REFERENCE_OBJECT",
      "source": "private"
    }
  ],
  "properties": {
    "process": "MY_CALCULATION_PROCESS"
  }
}
```

</TabItem>
</Tabs>

---

## Chaining processes into a pipeline

Because a process execution fires `process` service actions on completion (`success`, `warning`, `failed`), a process triggered by one automation can itself trigger further automations. This makes it straightforward to build multi-stage pipelines where each step hands off to the next.

```
dataset:complete  →  [process target]  →  Process runs  →  process:success  →  [email / blob / jira target]
```

The following example runs an enrichment process when a dataset completes, then sends a Teams notification when the process succeeds:

```js
//#region Stage 1 — run enrichment process when dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("process")
ab.setProperty("process", "MY_ENRICHMENT_PROCESS")
ab.icon = "play-fill text-success"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Stage 2 — notify Teams when the process succeeds
ab = AutomationBuilder("process", "private", "MY_ENRICHMENT_PROCESS")
ab.addCondition("success")
ab.setTarget("teams-ops")
ab.setProperty("template", "my-scripts\\templates\\ProcessSuccessMessage")
ab.icon = "microsoft-teams text-teams"
ab.enabled = true
save ${automation:ab}
//#endregion
```

:::tip Handling failures
Add a parallel automation on the `failed` action of the `process` service to raise a JIRA task or send a notification if the process does not complete successfully — without affecting the success path.
:::

---

## Pre-configured process target

If you have a process that should always be run in response to a particular type of event, you can create a custom target with the process name pre-filled. Users setting up automations then only need to select the target — no process name configuration required.

```js
//#region Create a pre-configured target for a specific process
at = AutomationTarget()
at.publisher = "myorg"
at.code = "run-daily-enrichment"
at.name = "Run the Daily Enrichment Process"
at.description = "Triggers the daily enrichment process"
at.icon = "play-fill text-success"
at.script = "@ProcessTarget"
at.template = "run the daily enrichment process"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["dataset"]
at.actions = ["complete"]

at.properties.process = "MY_DAILY_ENRICHMENT_PROCESS"

at.tags = ["Process"]
save at
//#endregion
```

Once saved, automations using `run-daily-enrichment` require no additional properties:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Use the pre-configured process target
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("run-daily-enrichment")
ab.icon = "play-fill text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "run-daily-enrichment",
  "icon": "play-fill text-success",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "complete",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ]
}
```

</TabItem>
</Tabs>

---

## Related pages

- [Custom Targets](/docs/topics/automations/targets/custom) — how to create pre-configured targets for named processes
- [Curve Build Targets](/docs/topics/automations/targets/curve) — trigger curve builds as an alternative to running a process
- [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) — run quality and critical checks before triggering a process
- [JIRA Target](/docs/topics/automations/targets/jira) — raise a JIRA task if a process fails
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including chaining and advanced `@` properties
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
