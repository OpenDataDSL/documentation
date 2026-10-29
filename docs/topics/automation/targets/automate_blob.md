---
slug: /topics/automations/targets/blob
title: Azure Storage Targets
description: Send automation data to Azure Blob Storage or Azure Data Lake Storage using the built-in storage targets
sidebar_position: 3
tags:
- topics
- automation
- target
- azure
- blob
- storage
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Azure storage targets write the triggering data as a file to your own Azure storage whenever an automation fires. There are two built-in storage targets: one for Azure Blob Storage and one for Azure Data Lake Storage (ADLS).

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.blob` | Save to an Azure Blob | `send to [path] in an Azure Blob Container [container] at URL [storage]` | `database text-success` |
| `odsl.adls` | Save to an Azure Data Lake | `send to [path] in an Azure Datalake Storage Container [container] at URL [storage]` | `database-fill text-info` |

Both targets work with any service and any action, and both support the `@transformer` property and property-change filtering.

## Inputs

| Input | Description |
|---|---|
| `storage` | The URL of your Azure storage |
| `container` | The name of the container to write to |
| `path` | The folder path within the container |
| `name` | The file name. It can include dates, for example `${date:yyyyMMdd}` |

:::warning The file name is required
`name` does not appear in the template, but the target needs it to write the file, so always set it.
:::

You can also set `contentType`, which defaults to `application/json`.

## Default properties

| Target | Property | Value |
|---|---|---|
| `odsl.blob` | `adls` | `false` |
| `odsl.adls` | `adls` | `true` |

Include the `adls` property in every storage automation you create.

## How it works

- The file is written with the triggering data, after any `@transformer` has been applied
- Dates in `name` are filled in from the ondate of the triggering data, or today when there is no ondate
- The file is written using the OpenDataDSL application's credentials in **your** Azure (Entra) tenant, so your storage account must grant that application access to the container

---

## odsl.blob: Save to an Azure Blob

### Example: save a dataset when it is complete

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

a.target = "odsl.blob"
a.template = "When 'MY.PROVIDER.FEED' is complete, send to [path] in an Azure Blob Container [container] at URL [storage]"
a.icon = "database text-success"
a.properties.storage = "https://mycompanystorage.blob.core.windows.net"
a.properties.container = "market-data"
a.properties.path = "feeds/MY.PROVIDER.FEED"
a.properties.name = "MY.PROVIDER.FEED_${date:yyyyMMdd}.json"
a.properties.adls = false
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.blob",
  "template": "When 'MY.PROVIDER.FEED' is complete, send to [path] in an Azure Blob Container [container] at URL [storage]",
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
    "storage": "https://mycompanystorage.blob.core.windows.net",
    "container": "market-data",
    "path": "feeds/MY.PROVIDER.FEED",
    "name": "MY.PROVIDER.FEED_${date:yyyyMMdd}.json",
    "adls": false
  }
}
```

</TabItem>
</Tabs>

---

## odsl.adls: Save to an Azure Data Lake

Use this target for an Azure Data Lake Storage Gen2 container, for example one used by Azure Synapse or Databricks. It takes the same inputs as `odsl.blob`, with `adls` set to `true`.

### Example: save a curve as CSV when it is updated

This example also uses `@transformer` to turn the curve into CSV before it is written. `curve-to-csv` is the name of a mustache script in your tenant.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ab = AutomationBuilder("data", "private", "MY_OBJECT:CURVE")
ab.set("@transformer", "curve-to-csv")
a = ab.build()

c = SimpleObject()
c.source = "private"
c.service = "data"
c.id = "MY_OBJECT:CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.adls"
a.template = "When 'MY_OBJECT:CURVE' is updated, transform the data using [@transformer], then send to [path] in an Azure Datalake Storage Container [container] at URL [storage]"
a.icon = "database-fill text-info"
a.properties.storage = "https://mycompanylake.dfs.core.windows.net"
a.properties.container = "curves"
a.properties.path = "forward/MY_OBJECT"
a.properties.name = "CURVE_${date:yyyyMMdd}.csv"
a.properties.contentType = "text/csv"
a.properties.adls = true
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.adls",
  "template": "When 'MY_OBJECT:CURVE' is updated, transform the data using [@transformer], then send to [path] in an Azure Datalake Storage Container [container] at URL [storage]",
  "icon": "database-fill text-info",
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
    "storage": "https://mycompanylake.dfs.core.windows.net",
    "container": "curves",
    "path": "forward/MY_OBJECT",
    "name": "CURVE_${date:yyyyMMdd}.csv",
    "contentType": "text/csv",
    "adls": true,
    "@transformer": "curve-to-csv"
  }
}
```

</TabItem>
</Tabs>

:::tip
If many automations write to the same storage account and container, create a [custom target](/docs/topics/automations/targets/custom) with `storage` and `container` fixed, so users only give the path and file name.
:::

---

## Choosing between the two targets

| | `odsl.blob` | `odsl.adls` |
|---|---|---|
| **Storage type** | Azure Blob Storage | Azure Data Lake Storage Gen2 |
| **adls property** | `false` | `true` |
| **Icon** | `database text-success` | `database-fill text-info` |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Custom Targets](/docs/topics/automations/targets/custom): fix the storage account and container for your team
- [Email Target](/docs/topics/automations/targets/email): send data by email instead of writing to storage
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
