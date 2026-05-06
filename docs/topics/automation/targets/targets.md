---
slug: /topics/automations/targets
title: Automation Targets
description: Overview of all available automation targets in OpenDataDSL
sidebar_position: 1
tags:
- topics
- automation
- target
---

An automation target defines **what happens** when an automation fires. Every automation has exactly one target, which receives the triggered entity and acts on it — sending a notification, running a process, writing to storage, building a curve, and so on.

Targets come in two kinds:

- **Built-in targets** — provided by OpenDataDSL, available to all tenants, referenced by a short code such as `email` or `blob`
- **Custom targets** — created by you, either wrapping a built-in target with pre-configured properties, or backed by a custom ODSL script

---

## Built-in targets

### Communication

| Code | Name | Description | Page |
|---|---|---|---|
| `email` | Send an email | Send a notification email to one or more recipients | [Email Target](/docs/topics/automations/targets/email) |
| `email_attachment` | Send an email with an attachment | Send the triggered data as a file attached to an email | [Email Target](/docs/topics/automations/targets/email) |
| `teams` | Send a Teams message | Post a message to a Microsoft Teams channel via webhook | [Teams Target](/docs/topics/automations/targets/teams) |
| `webhook` | Send a webhook message | POST a formatted payload to any external webhook endpoint | [Webhook Target](/docs/topics/automations/targets/webhook) |
| `jira` | Create a JIRA task | Create a task in a JIRA project via webhook | [JIRA Target](/docs/topics/automations/targets/jira) |

### Storage

| Code | Name | Description | Page |
|---|---|---|---|
| `blob` | Save to an Azure Blob | Write data to an Azure Blob Storage container | [Azure Storage Targets](/docs/topics/automations/targets/blob) |
| `adls` | Save to an Azure Data Lake | Write data to an Azure Data Lake Storage Gen2 container | [Azure Storage Targets](/docs/topics/automations/targets/blob) |

### Queuing

| Code | Name | Description | Page |
|---|---|---|---|
| `queue` | Send a message to a queue | Publish data to a message queue | [Queue Target](/docs/topics/automations/targets/queue) |
| `queue_subject` | Send a message to a queue with subject | Publish data to a message queue with a configurable subject | [Queue Target](/docs/topics/automations/targets/queue) |

### Compute

| Code | Name | Description | Page |
|---|---|---|---|
| `process` | Run a process | Trigger a named process to run | [Process Target](/docs/topics/automations/targets/process) |
| `script` | Run a script | Run a named ODSL script | [Script Target](/docs/topics/automations/targets/script) |
| `report` | Run a report | Run a report using its default configuration | [Report Target](/docs/topics/automations/targets/report) |
| `report_range` | Run a report with a range | Run a report over a specified date range | [Report Target](/docs/topics/automations/targets/report) |

### Curve and TimeSeries

| Code | Name | Description | Page |
|---|---|---|---|
| `curve` | Build a Smart Curve | Build and store a Smart Curve | [Curve Build Targets](/docs/topics/automations/targets/curve) |
| `ecurve` | Build an Event Curve | Build an Event Curve and fire downstream automations | [Curve Build Targets](/docs/topics/automations/targets/curve) |
| `timeseries` | Build a Smart TimeSeries | Build a Smart TimeSeries and fire downstream automations | [Smart TimeSeries Target](/docs/topics/automations/targets/timeseries) |

### Dataset

| Code | Name | Description | Page |
|---|---|---|---|
| `qualitycheck` | Run dataset quality checks | Run the quality checks defined on a dataset | [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) |
| `criticalcheck` | Run dataset critical checks | Run the critical checks defined on a dataset | [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) |

---

## Custom targets

You can create your own targets to pre-configure built-in targets for your team, or to back a target with a custom ODSL script. See [Custom Targets](/docs/topics/automations/targets/custom) for the full guide.

Common patterns include:

- Pre-filling a Teams or webhook URL so users never handle credentials directly
- Pre-filling a storage account and container so users only need to specify a path
- Backing a target with an ODSL script for logic that no built-in target covers

---

## Advanced target features

All targets support a set of special `@` properties that control when and how the automation fires:

| Property | Applies to | Description |
|---|---|---|
| `@transformer` | Any target that supports transformation | ID of a mustache script to reshape the data before delivery |
| `@propertyName` | `update` action | Only fire when this named property has changed |
| `@propertyName` + `@propertyValue` | `create` action | Only fire when the named property equals the given value |

See [Advanced automation features](/docs/topics/automations/creating#advanced-features) for full details and examples.

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide to setting up automations
- [Custom Targets](/docs/topics/automations/targets/custom) — create pre-configured or script-backed targets
