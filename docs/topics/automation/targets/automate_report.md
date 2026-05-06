---
slug: /topics/automations/targets/report
title: Report Target
description: Automatically run reports in response to platform events using the built-in report automation target
sidebar_position: 9
tags:
- topics
- automation
- target
- report
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The report target is a **built-in automation target** that runs a named report whenever an automation condition fires. Two variants are available — one that runs the report with its default configuration, and one that runs it over a specific date range.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@ReportTarget`). They are available to all tenants without any additional configuration.
:::

---

## Available report targets

| Code | Name | Description |
|---|---|---|
| `report` | Run a report | Runs the report using its default configuration |
| `report_range` | Run a report with a range | Runs the report over a specified date range |

Both targets use the same `@ReportTarget` script. Transformation is not supported — report formatting is controlled by the report configuration itself.

---

## `report` — Run a report

Use this target to run a report automatically whenever a triggering event occurs, using the report's own default date range and parameters.

### Inputs

| Input | Required | Description |
|---|---|---|
| `report` | ✅ | The name of the report to run |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run a daily summary report when a dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("report")
ab.setProperty("report", "MY_DAILY_SUMMARY_REPORT")
ab.icon = "file-text text-onenote"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "report",
  "icon": "file-text text-onenote",
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
    "report": "MY_DAILY_SUMMARY_REPORT"
  }
}
```

</TabItem>
</Tabs>

---

## `report_range` — Run a report with a range

Use this target when the report should be scoped to a specific date range rather than its default. This is useful for reports that need to reflect a particular delivery window, or where the range differs from the report's configured default.

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `report` | ✅ | | The name of the report to run |
| `range` | ✅ | `range` | The date range to run the report over |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run a curve report for a specific range when a curve build succeeds
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.setTarget("report_range")
ab.setProperty("report", "MY_CURVE_REPORT")
ab.setProperty("range", "between -5d and today")
ab.icon = "file-text text-onenote"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "report_range",
  "icon": "file-text text-onenote",
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
    "report": "MY_CURVE_REPORT",
    "range": "between -5d and today"
  }
}
```

</TabItem>
</Tabs>

---

## Using a report target in a pipeline

Report targets fit naturally at the end of a data pipeline, generating output once data has been validated and is confirmed ready. Because a report run fires `report` service actions on completion (`success`, `warning`, `failed`), a further automation can then deliver the report — for example by email or to a queue.

```
dataset:complete  →  [report target]  →  Report runs  →  report:success  →  [email / queue target]
```

The following example runs a report when a dataset completes, then emails it to a distribution list when the report succeeds:

```js
//#region Stage 1 — run the report when the dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("report")
ab.setProperty("report", "MY_DAILY_SUMMARY_REPORT")
ab.icon = "file-text text-onenote"
ab.enabled = true
save ${automation:ab}
//#endregion

//#region Stage 2 — email the report when it succeeds
ab = AutomationBuilder("report", "private", "MY_DAILY_SUMMARY_REPORT")
ab.addCondition("success")
ab.setTarget("email_attachment")
ab.setProperty("to", "distribution@example.com")
ab.setProperty("subject", "Daily Summary Report")
ab.setProperty("attachmentName", "DailySummary_${yyyyMMdd}.pdf")
ab.icon = "envelope-paper text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

:::tip Handling report failures
Add a parallel automation on the `failed` action of the `report` service to notify your team or raise a JIRA task if a report does not complete successfully.
:::

---

## Pre-configured report target

If the same report is always triggered by a particular event, you can create a custom target with the report name pre-filled:

```js
//#region Create a pre-configured target for a specific report
at = AutomationTarget()
at.publisher = "myorg"
at.code = "run-daily-summary"
at.name = "Run the Daily Summary Report"
at.description = "Runs the daily summary report"
at.icon = "file-text text-onenote"
at.script = "@ReportTarget"
at.template = "run the daily summary report"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["dataset"]
at.actions = ["complete"]

at.properties.report = "MY_DAILY_SUMMARY_REPORT"

at.tags = ["Report"]
save at
//#endregion
```

Once saved, automations using `run-daily-summary` require no additional properties:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Use the pre-configured report target
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("run-daily-summary")
ab.icon = "file-text text-onenote"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "run-daily-summary",
  "icon": "file-text text-onenote",
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

## Choosing between the two targets

| | `report` | `report_range` |
|---|---|---|
| **Date range** | Report default | Configurable per automation |
| **Best for** | Reports with a fixed or self-calculating range | Reports that need a specific window per trigger event |
| **Transformer support** | ❌ | ❌ |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including chaining and advanced `@` properties
- [Email Target](/docs/topics/automations/targets/email) — deliver a completed report by email attachment
- [Queue Target](/docs/topics/automations/targets/queue) — publish a completed report to a message queue
- [Process Target](/docs/topics/automations/targets/process) — trigger a process instead of running a report
- [Custom Targets](/docs/topics/automations/targets/custom) — pre-configure a report name for a dedicated target
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
