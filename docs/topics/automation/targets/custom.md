---
slug: /topics/automations/targets/custom
title: Custom Targets
description: Create your own automation targets, either pre-configured built-in targets or targets backed by an ODSL script
sidebar_position: 10
tags:
- topics
- automation
- target
- custom
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Custom targets are automation targets you create for your own tenant. There are two kinds:

- **Pre-configured built-in targets**: wrap a built-in target and fix some of its properties, so users only fill in the rest
- **Script-backed targets**: run your own ODSL script when the automation fires

They are useful for:

- Shared infrastructure such as a Teams channel or webhook, where the URL is fixed
- Azure storage where the account and container are the same across your organisation
- Logic that no built-in target covers, such as sending data to another system's API

---

## Creating a target

Create a target with `AutomationTarget()`, set its properties and save it:

| Property | Description |
|---|---|
| `publisher` | Your organisation or team identifier |
| `code` | The code of the target. The target id is `publisher.code` |
| `name` | The name shown in the portal |
| `description` | A short description of what the target does |
| `icon` | The icon, a Bootstrap icon name optionally with a colour class, for example `database text-success` |
| `script` | A built-in handler such as `@BlobTarget`, or the id of your own ODSL script |
| `template` | The target template, for example `send to [path] in the market data container`. Each `[input]` is filled in by the user |
| `inputs` | Descriptions of the inputs, set with `at.inputs.path.description = "..."` |
| `properties` | Fixed property values passed to the target on every run |
| `services` | The services the target can be used with, `["*"]` for all |
| `actions` | The actions the target can be used with, `["*"]` for all, or for example `["update"]` |
| `tags` | Tags used to group the target in the portal |
| `allowTransformation` | Whether automations using this target can use `@transformer` |
| `allowPropertyChange` | Whether automations using this target can use property-change filtering |

`save at` saves the target as a private target in your tenant. Its id is `publisher.code`, and that is what automations use as their `target`.

:::note Replacing a public target
A private target with the same id as a public target replaces the public one for your tenant. Only OpenDataDSL can publish public targets.
:::

---

## Pre-configured built-in targets

Set `script` to the built-in handler and fix the values you want in `at.properties`. When an automation uses the target, the fixed values are passed to the handler along with the values the user supplies.

### Example: a fixed Azure Blob container

This target fixes the storage URL and container for the built-in blob handler, so users only give the path and file name.

```js
at = AutomationTarget()
at.publisher = "mycompany"
at.code = "blob-market-data"
at.name = "Save to the market data container"
at.description = "Write data to the shared market-data Azure Blob container"
at.icon = "database text-success"
at.script = "@BlobTarget"
at.template = "save to [path] as [name] in the market data container"
at.inputs.path.description = "The folder path in the container"
at.inputs.name.description = "The file name, can include dates"
at.properties.storage = "https://mycompanystorage.blob.core.windows.net"
at.properties.container = "market-data"
at.properties.adls = false
at.allowTransformation = true
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]
at.tags = ["Azure", "Storage"]
save at
```

An automation using this target only needs `path` and `name`:



<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "complete"
conds = []
conds.add(c)
a.conditions = conds

a.target = "mycompany.blob-market-data"
a.template = "When 'MY.PROVIDER.FEED' is complete, save to [path] as [name] in the market data container"
a.icon = "database text-success"
a.properties.path = "feeds/MY.PROVIDER.FEED"
a.properties.name = "MY.PROVIDER.FEED_${date:yyyyMMdd}.json"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "mycompany.blob-market-data",
  "template": "When 'MY.PROVIDER.FEED' is complete, save to [path] as [name] in the market data container",
  "icon": "database text-success",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "MY.PROVIDER.FEED",
      "action": "complete"
    }
  ],
  "properties": {
    "path": "feeds/MY.PROVIDER.FEED",
    "name": "MY.PROVIDER.FEED_${date:yyyyMMdd}.json"
  }
}
```

</TabItem>
</Tabs>

### Example: a fixed Teams channel

The same pattern works for the built-in Teams handler, `@TeamsChannelTarget`, with the channel webhook URL fixed so users never handle it:

```js
at = AutomationTarget()
at.publisher = "mycompany"
at.code = "teams-ops"
at.name = "Send a message to the Operations Teams channel"
at.description = "Post to the Operations channel in Microsoft Teams"
at.icon = "microsoft-teams text-teams"
at.script = "@TeamsChannelTarget"
at.template = "send a message to the Operations Teams channel"
at.properties.url = "https://mycompany.webhook.office.com/webhookb2/your-channel-webhook"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]
at.tags = ["Teams"]
save at
```

As with the built-in Teams target, the data is posted as JSON. See the note on the [Teams Target](/docs/topics/automations/targets/teams) page.

---

## Script-backed targets

Set `script` to the id of one of your ODSL scripts. When the automation fires, the script runs with these variables:

| Variable | Description |
|---|---|
| `#PROPERTIES` | The automation properties: the user's inputs, the target's fixed properties, and `id`, `ondate` and `range` when they apply |
| `#OUTPUT` | The triggering data, after any `@transformer` has been applied |
| `#LOG` | The automation log entry for this run. Set its status and message, or let the result of the script decide the status |

A simple script could look like this:

```js
print "Automation fired for " + #PROPERTIES.id
data = #OUTPUT
// ... send data to another system, update an object, and so on
#LOG.message = "Processed " + #PROPERTIES.id
```

### Example: the Molecule ETRM extension

The Molecule integration extension uses a script-backed target to send market data to Molecule ETRM whenever data is updated:

```js
at = AutomationTarget()
at.publisher = "odsl"
at.code = "molecule-md"
at.name = "Send market data to Molecule ETRM"
at.description = "Sends market data to Molecule ETRM"
at.icon = "cloud-upload"
at.script = "odsl-extensions\extensions\integration\molecule\molecule-automation-md"
at.template = "send to Molecule ETRM Market Data API"
at.allowTransformation = false
at.allowPropertyChange = false
at.services = ["data"]
at.actions = ["update"]
at.tags = ["ETRM"]
save at
```

The target has no inputs, so an automation using it needs no properties:



<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("data", "private", "MY_OBJECT:CURVE").build()

c = SimpleObject()
c.source = "private"
c.service = "data"
c.id = "MY_OBJECT:CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.molecule-md"
a.template = "When 'MY_OBJECT:CURVE' is updated, send to Molecule ETRM Market Data API"
a.icon = "cloud-upload"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.molecule-md",
  "template": "When 'MY_OBJECT:CURVE' is updated, send to Molecule ETRM Market Data API",
  "icon": "cloud-upload",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:CURVE",
      "action": "update"
    }
  ],
  "properties": {}
}
```

</TabItem>
</Tabs>

:::tip
If you find yourself setting the same `storage` and `container` on every blob automation, create a custom target with those values fixed. It saves repetition and makes shared infrastructure harder to misconfigure.
:::

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Azure Storage Targets](/docs/topics/automations/targets/blob): the built-in blob and ADLS targets
- [Email Target](/docs/topics/automations/targets/email): the built-in email targets
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
