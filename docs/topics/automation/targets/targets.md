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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An automation target defines **what happens** when an automation fires. Every automation has exactly one target, which receives the triggering data and acts on it: sending an email, running a process, writing to storage, building a curve, and so on.

Every target has an id made of a publisher and a code, `publisher.code`. All built-in targets are published by OpenDataDSL, so their ids start with `odsl.`, for example `odsl.email` or `odsl.blob`. You use this full id in the `target` field of an automation.

Targets come in two kinds:

- **Built-in targets**: provided by OpenDataDSL and available to all tenants
- **Custom targets**: created by you, either wrapping a built-in target with fixed properties, or backed by your own ODSL script. See [Custom Targets](/docs/topics/automations/targets/custom)

---

## Built-in targets

The Transform and Property change columns show whether the target supports the `@transformer` property and property-change filtering (see [Special @ properties](#special--properties) below).

### Communication

| Id | Name | Transform | Property change | Page |
|---|---|---|---|---|
| `odsl.email` | Send an email | Yes | Yes | [Email Target](/docs/topics/automations/targets/email) |
| `odsl.email_attachment` | Send an email with an attachment | Yes | Yes | [Email Target](/docs/topics/automations/targets/email) |
| `odsl.teams` | Send a Teams message | No | Yes | [Teams Target](/docs/topics/automations/targets/teams) |
| `odsl.webhook` | Send a webhook message | No | Yes | [Webhook Target](/docs/topics/automations/targets/webhook) |
| `odsl.jira` | Create a JIRA task | No | Yes | [JIRA Target](/docs/topics/automations/targets/jira) |

### Storage

| Id | Name | Transform | Property change | Page |
|---|---|---|---|---|
| `odsl.blob` | Save to an Azure Blob | Yes | Yes | [Azure Storage Targets](/docs/topics/automations/targets/blob) |
| `odsl.adls` | Save to an Azure Data Lake | Yes | Yes | [Azure Storage Targets](/docs/topics/automations/targets/blob) |

### Queuing

| Id | Name | Transform | Property change | Page |
|---|---|---|---|---|
| `odsl.queue` | Send a message to a queue | Yes | Yes | [Queue Target](/docs/topics/automations/targets/queue) |
| `odsl.queue_subject` | Send a message to a queue with a subject | Yes | Yes | [Queue Target](/docs/topics/automations/targets/queue) |

### Compute

| Id | Name | Transform | Property change | Page |
|---|---|---|---|---|
| `odsl.process` | Run a process | No | Yes | [Process Target](/docs/topics/automations/targets/process) |
| `odsl.script` | Run a script | No | Yes | [Script Target](/docs/topics/automations/targets/script) |
| `odsl.report` | Run a report | No | Yes | [Report Target](/docs/topics/automations/targets/report) |
| `odsl.report_range` | Run a report with a range | No | Yes | [Report Target](/docs/topics/automations/targets/report) |
| `odsl.export_group` | Export a group of data | No | Yes | [Export Group Target](/docs/topics/automations/targets/curve-export) |

### Curve and TimeSeries

These build automations are created and removed automatically by the platform when you save or delete a Smart or Event Curve or TimeSeries.

| Id | Name | Transform | Property change | Page |
|---|---|---|---|---|
| `odsl.curve` | Build a Smart Curve | No | No | [Curve Build Targets](/docs/topics/automations/targets/curve) |
| `odsl.ecurve` | Build an Event Curve | No | No | [Curve Build Targets](/docs/topics/automations/targets/curve) |
| `odsl.timeseries` | Build a Smart TimeSeries | No | No | [TimeSeries Build Targets](/docs/topics/automations/targets/timeseries) |
| `odsl.etimeseries` | Build an Event TimeSeries | No | No | [TimeSeries Build Targets](/docs/topics/automations/targets/timeseries) |

### Dataset

| Id | Name | Transform | Property change | Page |
|---|---|---|---|---|
| `odsl.qualitycheck` | Run dataset quality checks | No | No | [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) |
| `odsl.criticalcheck` | Run dataset critical checks | No | No | [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) |

### Extensions

These targets belong to extensions. The extension creates and maintains the automations that use them, so you don't normally create them yourself.

| Id | Name | Maintained by |
|---|---|---|
| `odsl.validation` | Run validation checks | The [Validation](/docs/extensions/validation/overview) extension |
| `odsl.composition` | Build composition | [Composer](/docs/extensions/composer/overview) |
| `odsl.data_reconciliation` | Run a data reconciliation task | The [Data Reconciliation](/docs/extensions/data-reconciliation/overview) extension |

---

## What an automation looks like

An automation is made up of:

| Field | Description |
|---|---|
| `target` | The target id, for example `odsl.email` |
| `template` | The sentence describing the automation, made from the condition prefix and the target's template |
| `icon` | The icon shown in the portal |
| `enabled` | Whether the automation is active, defaults to `true` |
| `conditions` | A list of conditions, each with `source`, `service`, `id` and `action` |
| `properties` | The values for the target's inputs, plus any default properties the target needs |

The `name` of the automation is generated from the template by replacing each `[input]` with its value, and the `owner` is set to whoever saves it. The automation runs with the owner's policies.

### Templates

Each target has a template such as `send an email to [to] with subject [subject]`. The automation template is that text with a prefix describing the condition, for example:

`When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]`

The portal only lists an automation against an item when its template is exactly one of the offers the platform makes for that item, so always build the template from the rules on [Automation Basics](/docs/topics/automations/basics).

### Creating an automation

The explicit pattern below always works. Set the target, template, icon, conditions and properties yourself, including any default properties the target needs (here `attachment` set to `false`).

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "ICE.NDEX.NLB"
c.action = "late"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.email"
a.template = "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "ops@mycompany.com"
a.properties.subject = "ICE.NDEX.NLB is late"
a.properties.attachment = false
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email",
  "template": "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "ICE.NDEX.NLB",
      "action": "late"
    }
  ],
  "properties": {
    "to": "ops@mycompany.com",
    "subject": "ICE.NDEX.NLB is late",
    "attachment": false
  }
}
```

If the request is rejected, the reason is in the `x-odsl-error` response header.

</TabItem>
</Tabs>

### The builder shortcut

If you know the exact text of one of the item's offers, `withAutomationTemplate` copies the target, icon, conditions and the target's default properties from that offer. You then only `set` the inputs and `build` the automation.

```js
ab = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB")
ab.withAutomationTemplate("When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]")
ab.set("to", "ops@mycompany.com")
ab.set("subject", "ICE.NDEX.NLB is late")
a = ab.build()
save ${automation:a}
```

:::warning Exact match only
`withAutomationTemplate` only works when the text matches an offer exactly, character for character. If nothing matches, no error is raised but the automation is left empty, so it has no target or conditions. Use the explicit pattern when in doubt.
:::

The only builder methods are `withAutomationTemplate`, `set` and `build`. Everything else (target, template, icon, conditions, properties, enabled) is set on the automation returned by `build()`.

### Finding, testing and deleting automations

```js
// Find all your email automations
find ${automation} where target = "odsl.email"

// Get and delete an automation by its id
a = ${automation:"6720f1c2a5b3c4d5e6f70812"}
delete ${automation:"6720f1c2a5b3c4d5e6f70812"}
```

Automation ids are assigned by the platform. To test an automation once, call `GET https://api.opendatadsl.com/api/automation/v1/<id>?_run=true`, optionally adding `&_ondate=YYYY-MM-DD`. The run is logged in the automation log with the reason `Test Run`. Automations on `*` (any item) cannot be test run.

---

## Properties added automatically

As well as the properties you set, the target receives:

| Property | Description |
|---|---|
| `id` | The id of the item that triggered the automation |
| `ondate` | The curve date or dataset ondate, when there is one |
| `range` | The range, for timeseries |

---

## Special @ properties

Some targets accept special `@` properties that control when the automation fires and what data the target receives.

| Property | Description |
|---|---|
| `@transformer` | The name of a mustache script, or inline mustache text, applied to the data before the target receives it. Only for targets that support transformation |
| `@propertyName` | The name of the property on the triggering item to filter on |
| `@propertyValue` | The value the property must have. Use `*` to match any change of the property |

`@propertyName` and `@propertyValue` must **both** be set for the filter to apply:

- On an `update` condition (targets with property-change support), the automation only fires when that property changed to the given value, or on any change of it when the value is `*`
- On a `create` or `delete` condition (any target), the automation only fires when the record's property equals the given value

These properties change the template. For example:

| Use | Template |
|---|---|
| Transformer | `When 'ICE.NDEX.NLB' is late, transform the data using [@transformer], then send an email to [to] with subject [subject]` |
| Property change | `When property [@propertyName] on 'MY_OBJECT:CURVE' is set to [@propertyValue], send an email to [to] with subject [subject]` |
| Property set on create | `When 'anything' is created with property [@propertyName] set to [@propertyValue], send an email to [to] with subject [subject]` |

See [Automation Basics](/docs/topics/automations/basics) for the full template rules.

---

## Custom targets

You can create your own targets to pre-configure built-in targets for your team, or to back a target with your own ODSL script. Common patterns include:

- Fixing a Teams or webhook URL so users never handle it directly
- Fixing a storage account and container so users only need to give a path and file name
- Backing a target with an ODSL script for logic that no built-in target covers

See [Custom Targets](/docs/topics/automations/targets/custom) for the full guide.

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Custom Targets](/docs/topics/automations/targets/custom): create pre-configured or script-backed targets
