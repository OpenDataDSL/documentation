---
slug: /topics/automations/targets/jira
title: JIRA Target
description: Automatically create JIRA tasks from OpenDataDSL automation events
sidebar_position: 7
tags:
- topics
- automation
- target
- jira
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The JIRA target is a **built-in automation target** that creates a task in JIRA via a webhook whenever an automation condition is triggered. This makes it straightforward to raise issues automatically — for example when a dataset becomes late, a curve build fails, or a critical check does not pass.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@JIRAAutomationTarget`). They are available to all tenants without any additional configuration.
:::

---

## `jira` — Create a JIRA task

### Inputs

| Input | Required | Description |
|---|---|---|
| `url` | ✅ | The incoming webhook URL for your JIRA project |
| `template` | ❌ | The ID of a mustache script stored in the platform, used to format the task payload. Can be omitted to use the default format |

:::tip Creating a JIRA webhook
Incoming webhook URLs are configured in JIRA under **Project settings → Automation → Incoming webhook**. Each webhook URL is specific to a project and can be scoped to trigger a particular automation rule in JIRA.
:::

---

## Using this target in an automation

### Dataset late — raise a JIRA task

A common use case is automatically raising a JIRA issue when a dataset does not arrive on time:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Create a JIRA task when a dataset is late
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("late")
ab.setTarget("jira")
ab.setProperty("url", "https://myorg.atlassian.net/rest/api/3/...")
ab.setProperty("template", "my-scripts\\templates\\DatasetLateJira")
ab.icon = "clipboard-plus text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "jira",
  "icon": "clipboard-plus text-primary",
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
    "url": "https://myorg.atlassian.net/rest/api/3/...",
    "template": "my-scripts\\templates\\DatasetLateJira"
  }
}
```

</TabItem>
</Tabs>

### Curve build failure — raise a JIRA task

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Create a JIRA task when a curve build fails
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("failed")
ab.setTarget("jira")
ab.setProperty("url", "https://myorg.atlassian.net/rest/api/3/...")
ab.icon = "clipboard-plus text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "jira",
  "icon": "clipboard-plus text-primary",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "failed",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "url": "https://myorg.atlassian.net/rest/api/3/..."
  }
}
```

</TabItem>
</Tabs>

:::note Omitting the template
If `template` is not set, the target sends the raw triggered entity payload to the JIRA webhook. This may be sufficient if your JIRA automation rule is configured to extract the fields it needs from the incoming JSON directly.
:::

---

## Task formatting with mustache templates

The optional `template` input points to a mustache script stored in the platform. The script receives the triggered entity as its data context and should produce a JSON payload compatible with your JIRA webhook's expected format.

A simple example template for a dataset late notification:

```
{
  "summary": "Dataset late: {{_id}}",
  "description": "The dataset {{_id}} has not arrived as expected.",
  "priority": "High"
}
```

The exact payload structure depends on how your JIRA incoming webhook automation rule is configured to receive and map fields.

---

## Pre-configured JIRA target

For teams where the JIRA webhook URL is fixed — shared across all data operations issues going into one project — you can create a custom target that pre-fills the URL. Users then only need to select the target and optionally supply a template.

### Creating the pre-configured target

```js
//#region Create a pre-configured JIRA target for the Data Operations project
at = AutomationTarget()
at.publisher = "myorg"
at.code = "jira-data-ops"
at.name = "Raise a Data Operations JIRA task"
at.description = "Create a task in the Data Operations JIRA project"
at.icon = "clipboard-plus text-primary"
at.script = "@JIRAAutomationTarget"
at.template = "create a JIRA task in the Data Operations project using [template]"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]

at.properties.url = "https://myorg.atlassian.net/rest/api/3/..."

at.tags = ["Application", "JIRA"]
save at
//#endregion
```

### Using the pre-configured target in an automation

Once saved, any automation can use `jira-data-ops` as its target — no URL configuration required:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Raise a Data Operations JIRA task when a dataset is missing
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("missing")
ab.setTarget("jira-data-ops")
ab.setProperty("template", "my-scripts\\templates\\DatasetMissingJira")
ab.icon = "clipboard-plus text-primary"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "jira-data-ops",
  "icon": "clipboard-plus text-primary",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "missing",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ],
  "properties": {
    "template": "my-scripts\\templates\\DatasetMissingJira"
  }
}
```

</TabItem>
</Tabs>

---

## Related pages

- [Custom Targets](/docs/topics/automations/targets/custom) — how to create pre-configured targets for shared webhooks
- [Microsoft Teams Target](/docs/topics/automations/targets/teams) — post notifications to a Teams channel instead of JIRA
- [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) — trigger quality and critical checks as part of a pipeline
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including advanced `@` properties
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
