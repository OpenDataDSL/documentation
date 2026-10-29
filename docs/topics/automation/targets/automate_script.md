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

The script target runs an ODSL script whenever an automation fires. It is the most flexible built-in target: any logic you can write in ODSL can run in response to a platform event.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.script` | Run a script | `run [script]` | `file-play text-office` |

The target works with any service and any action. It supports property-change filtering but not `@transformer`: shape the data inside the script instead.

## Inputs

| Input | Description |
|---|---|
| `script` | The name of the ODSL script to run |

## What the script receives

| Variable | Description |
|---|---|
| `#DATA` | The data that triggered the automation |
| `#PROPERTIES` | The automation properties, including `id`, `ondate` and `range`, which are added automatically when they apply |

For example, a script can read the id and date of the triggering item:

```js
print "Automation fired for " + #PROPERTIES.id
print "Ondate: " + #PROPERTIES.ondate
d = #DATA
```

---

## Example: run a script when a dataset is complete

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

a.target = "odsl.script"
a.template = "When 'MY.PROVIDER.FEED' is complete, run [script]"
a.icon = "file-play text-office"
a.properties.script = "post-process-feed"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.script",
  "template": "When 'MY.PROVIDER.FEED' is complete, run [script]",
  "icon": "file-play text-office",
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
    "script": "post-process-feed"
  }
}
```

</TabItem>
</Tabs>

## Example: run a script when a property changes

This automation only fires when the `status` property of the curve is changed to `approved`. It uses property-change filtering, so both `@propertyName` and `@propertyValue` are set and the template uses the property-change form.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ab = AutomationBuilder("data", "private", "MY_OBJECT:CURVE")
ab.set("@propertyName", "status")
ab.set("@propertyValue", "approved")
a = ab.build()

c = SimpleObject()
c.source = "private"
c.service = "data"
c.id = "MY_OBJECT:CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.script"
a.template = "When property [@propertyName] on 'MY_OBJECT:CURVE' is set to [@propertyValue], run [script]"
a.icon = "file-play text-office"
a.properties.script = "publish-approved-curve"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.script",
  "template": "When property [@propertyName] on 'MY_OBJECT:CURVE' is set to [@propertyValue], run [script]",
  "icon": "file-play text-office",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:CURVE",
      "action": "update"
    }
  ],
  "properties": {
    "script": "publish-approved-curve",
    "@propertyName": "status",
    "@propertyValue": "approved"
  }
}
```

</TabItem>
</Tabs>

:::tip Script target or custom target?
The script target lets the person creating the automation choose any script. If you want to fix the script and ask only for specific inputs, create a [Custom Target](/docs/topics/automations/targets/custom) backed by your script instead. For multi-step work that should also be tracked as a process execution, use the [Process Target](/docs/topics/automations/targets/process).
:::

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Process Target](/docs/topics/automations/targets/process): run a process instead of a single script
- [Custom Targets](/docs/topics/automations/targets/custom): create a script-backed target with its own inputs
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
