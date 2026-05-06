---
slug: /topics/automations/targets/script
title: Script Target
description: Run an ODSL script automatically in response to a platform event
sidebar_position: 9
tags:
- topics
- automation
- target
- script
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The script target is a **built-in automation target** that runs a named ODSL script whenever an automation condition fires, passing in the triggered entity as context. It is the most flexible built-in target — any logic that can be written in ODSL can be executed in response to any platform event.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@ScriptTarget`). They are available to all tenants without any additional configuration.
:::

:::tip Script target vs custom ODSL script target
The script target runs any ODSL script you specify at automation configuration time. If you want to hard-code the script and expose only specific inputs to the user, consider creating a [Custom Target](/docs/topics/automations/targets/custom#odsl-script-targets) backed by your ODSL script instead.
:::

---

## `script` — Run a script

### Inputs

| Input | Required | Type | Description |
|---|---|---|---|
| `script` | ✅ | `script` (ODSL) | The name of the ODSL script to run |

The `script` input is filtered to ODSL scripts only — mustache, Python, and other script types are not selectable.

Transformation is not supported for this target — any data shaping should be handled within the script itself.

---

## Using this target in an automation

### Run a script when a dataset completes

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run a validation script when a dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("script")
ab.setProperty("script", "my-scripts\\processing\\DatasetCompleteHandler")
ab.icon = "file-play text-office"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "script",
  "icon": "file-play text-office",
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
    "script": "my-scripts\\processing\\DatasetCompleteHandler"
  }
}
```

</TabItem>
</Tabs>

### Run a script when an object is updated

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run a recalculation script whenever a reference object changes
ab = AutomationBuilder("object", "private", "MY_REFERENCE_OBJECT")
ab.addCondition("update")
ab.setTarget("script")
ab.setProperty("script", "my-scripts\\calculations\\RecalculateDerivedData")
ab.icon = "file-play text-office"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "script",
  "icon": "file-play text-office",
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
    "script": "my-scripts\\calculations\\RecalculateDerivedData"
  }
}
```

</TabItem>
</Tabs>

---

## Accessing automation context in scripts

The triggered entity is made available to the script at runtime. You can also access automation properties via `#PROPERTIES` if additional configuration has been passed through the automation:

| Global | Description |
|---|---|
| `#PROPERTIES` | The properties object configured on the automation |

---

## Using a script target in a pipeline

Because a script execution fires `scriptlog` service `create` actions on completion, you can chain further automations after a script run. This is useful when a script produces data that should then trigger a report, notification, or queue message.

```
dataset:complete  →  [script target]  →  Script runs  →  [email / queue / report target]
```

The example below runs a processing script on dataset completion, relying on the script's own logic to determine whether further downstream steps are needed:

```js
//#region Run a post-processing script when a dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("script")
ab.setProperty("script", "my-scripts\\processing\\PostProcessDataset")
ab.icon = "file-play text-office"
ab.enabled = true
save ${automation:ab}
//#endregion
```

:::tip When to use this target vs a process
Use the script target for lightweight, single-script responses to events. If your logic involves multiple steps, sequencing, retry handling, or needs to be scheduled independently as well as event-driven, consider using the [Process Target](/docs/topics/automations/targets/process) instead.
:::

---

## Pre-configured script target

If the same script is always run in response to a particular event, you can create a custom target with the script name pre-filled:

```js
//#region Create a pre-configured target for a specific script
at = AutomationTarget()
at.publisher = "myorg"
at.code = "run-post-process"
at.name = "Run the post-processing script"
at.description = "Runs the standard post-processing script on dataset completion"
at.icon = "file-play text-office"
at.script = "@ScriptTarget"
at.template = "run the post-processing script"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["dataset"]
at.actions = ["complete"]

at.properties.script = "my-scripts\\processing\\PostProcessDataset"

at.tags = ["Script"]
save at
//#endregion
```

Once saved, automations using `run-post-process` require no additional properties:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Use the pre-configured script target
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("run-post-process")
ab.icon = "file-play text-office"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "run-post-process",
  "icon": "file-play text-office",
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

- [Custom Targets](/docs/topics/automations/targets/custom) — hard-code a script into a reusable target with named inputs
- [Process Target](/docs/topics/automations/targets/process) — run a multi-step process instead of a single script
- [Dataset Check Targets](/docs/topics/automations/targets/dataset-checks) — run quality and critical checks before triggering a script
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including advanced `@` properties
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
