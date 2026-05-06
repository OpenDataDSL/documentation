---
slug: /topics/automations/targets/custom
title: Custom Targets
description: Create pre-configured automation targets that simplify setup for your team
sidebar_position: 10
tags:
- topics
- automation
- target
- custom
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Custom targets are **pre-configured automation targets** that you create and save for use within your tenant. There are two kinds:

- **Pre-configured built-in targets** — wrap a built-in target script (e.g. `@BlobTarget`) and pre-fill one or more properties, so users only need to supply the parts that vary
- **ODSL script targets** — point to a custom ODSL script you have written, giving you full control over what happens when the automation fires

This is particularly useful for:
- Shared infrastructure such as a Teams channel or Slack webhook where the URL is fixed
- Azure storage accounts where the account URL and container are standardised across your organisation
- Custom business logic that does not fit any built-in target

---

## Pre-configured built-in targets

A pre-configured target wraps a built-in target script and pre-populates `properties` with fixed values. When a user creates an automation using that target, those values are already set — they only need to provide whatever inputs were left unconfigured.

### Pre-configured Teams channel

The example below creates a custom target that sends a message to a specific Microsoft Teams channel. The webhook URL is pre-filled, so users setting up an automation do not need to know or handle the URL themselves.

```js
//#region Create a pre-configured Teams channel target
at = AutomationTarget()
at.publisher = "test"
at.code = "teams-test"
at.name = "Send a message to the TEST Teams channel"
at.description = "Send a message to a Teams channel"
at.icon = "microsoft-teams text-teams"
at.script = "@TeamsChannelTarget"
at.template = "send a Teams message to the test channel"
at.allowTransformation = true
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]

at.properties.url = "https://walkfaresltd.webhook.office.com/webhookb2/..."

at.tags = ["Application", "Teams"]
save at
//#endregion
```

Once saved, any automation in your tenant can use `teams-test` as its target — no URL configuration required.

### Pre-configured Azure Blob container

The example below pre-fills the storage account URL and container for a blob target. Users setting up automations only need to specify the `path` for their particular dataset or curve.

```js
//#region Create a pre-configured Azure Blob target for a shared container
at = AutomationTarget()
at.publisher = "myorg"
at.code = "blob-market-data"
at.name = "Save to the Market Data container"
at.description = "Write data to the shared market-data Azure Blob Storage container"
at.icon = "database text-success"
at.script = "@BlobTarget"
at.template = "send to [path] in the shared market-data container"
at.allowTransformation = true
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]

at.properties.storage = "https://mystorageaccount.blob.core.windows.net"
at.properties.container = "market-data"

at.tags = ["Azure", "Storage"]
save at
//#endregion
```

When a user creates an automation with this target, they only need to set `path`:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Use the pre-configured blob target — only path is needed
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("blob-market-data")
ab.setProperty("path", "feeds/MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv")
ab.icon = "database text-success"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
"target": "blob-market-data",
"icon": "database text-success",
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
"path": "feeds/MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv"
}
}
```

</TabItem>
</Tabs>

---

## ODSL script targets

Instead of wrapping a built-in target, you can point a custom target at any ODSL script stored in the platform. This gives you complete control over the logic that runs when the automation fires — you can update data, call external APIs, trigger calculations, or anything else expressible in ODSL.

The script runs in the context of the automation and has access to the properties configured on the automation via the `#PROPERTIES` global variable.

### Example: increment a counter

The example below creates a custom target that increments a named counter field on a specified object whenever an update automation fires.

**Target definition:**

```js
//#region Create a custom ODSL script target
at = AutomationTarget()
at.publisher = "test"
at.code = "inc_counter"
at.name = "Increment a counter"
at.description = "Increment a counter in an object"
at.icon = "node-plus"
at.script = "odsl-data\src\Automations\custom-example\automation-custom-target"
at.template = "increment counter [counter] in object [objectid]"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["update"]

at.inputs.counter.description = "The name of the field to increment"
at.inputs.objectid.description = "The id of the object you want to update"

at.tags = ["Custom"]
save at
//#endregion
```

**Target script** (`automation-custom-target.odsl`):

```js
print "Running custom target"

oid = #PROPERTIES.objectid
counterfield = #PROPERTIES.counter

// Increment the counter on the specified object
bulk update ${object} where _id=oid
    inc(counterfield=1)
end
```

The script reads `objectid` and `counter` from `#PROPERTIES` — the values that the user configures on the automation when they set it up:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Use the counter target in an automation
ab = AutomationBuilder("object", "private", "MY_TRACKED_OBJECT")
ab.addCondition("update")
ab.setTarget("inc_counter")
ab.setProperty("objectid", "MY_COUNTER_OBJECT")
ab.setProperty("counter", "updateCount")
ab.icon = "node-plus"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
"target": "inc_counter",
"icon": "node-plus",
"enabled": true,
"conditions": [
{
"service": "object",
"action": "update",
"id": "MY_TRACKED_OBJECT",
"source": "private"
}
],
"properties": {
"objectid": "MY_COUNTER_OBJECT",
"counter": "updateCount"
}
}
```

</TabItem>
</Tabs>

### Accessing automation context in scripts

Within a custom target script, the following global is available:

| Global | Description |
|---|---|
| `#PROPERTIES` | The properties object configured on the automation — access inputs and pre-configured values by name |

:::note
Set `at.allowTransformation = false` on ODSL script targets where a data transformation step is not applicable, since the script itself controls all the logic.
:::

---

## Target fields reference

| Field | Description |
|---|---|
| `publisher` | Your organisation or team identifier — used to namespace the target code |
| `code` | The unique code for this target, used when referencing it in an automation |
| `name` | A human-readable name shown in the portal |
| `description` | A short description of what this target does |
| `icon` | Bootstrap Icons name, optionally with a colour class (e.g. `database text-success`) |
| `script` | A built-in target script (e.g. `@BlobTarget`) or the ID of a custom ODSL script stored in the platform |
| `template` | A human-readable description of the automation this target creates, used to generate the automation `name`. Use `[inputName]` placeholders to embed input values |
| `allowTransformation` | Whether the `@transformer` property can be set on automations using this target |
| `allowPropertyChange` | Whether users can override pre-configured property values when setting up an automation |
| `services` | Array of services this target can be used with — use `["*"]` for all services |
| `actions` | Array of actions this target can be used with — use `["*"]` for all actions, or restrict to specific ones (e.g. `["update"]`) |
| `properties` | Pre-configured property values applied to any automation using this target |
| `inputs` | Input descriptions that guide users when configuring an automation with this target |
| `tags` | Tags used to categorise the target in the portal |

:::tip
If you find yourself setting the same `storage` and `container` values on every blob automation, that is a sign you should create a custom target and pre-fill those values. Save the repetition, and make it harder for users to misconfigure shared infrastructure.
:::

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — setting up automations including advanced `@` properties
- [Azure Storage Targets](/docs/topics/automations/targets/blob) — the built-in blob and ADLS targets
- [Email Target](/docs/topics/automations/targets/email) — the built-in email targets
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
