---
slug: /topics/automations/targets/blob
title: Azure Storage Targets
description: Send automation data to Azure Blob Storage or Azure Data Lake Storage using the built-in blob targets
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

The Azure storage targets are **built-in automation targets** that write triggered data directly to cloud storage. Two variants are available — one for Azure Blob Storage and one for Azure Data Lake Storage Gen2 (ADLS).

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@BlobTarget`). They are available to all tenants without any additional configuration.
:::

## Available storage targets

| Code | Name | Description |
|---|---|---|
| `blob` | Save to an Azure Blob | Writes data to an Azure Blob Storage container |
| `adls` | Save to an Azure Data Lake | Writes data to an Azure Data Lake Storage Gen2 container |

Both targets use the same underlying `@BlobTarget` script and accept the same inputs. The only difference is whether the storage endpoint is treated as a standard blob container (`blob`) or an ADLS Gen2 hierarchical namespace container (`adls`).

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `container` | ✅ | The name of the blob or ADLS container to store the file in |
| `storage` | ✅ | The URL of the storage account (e.g. `https://mystorageaccount.blob.core.windows.net`) |
| `path` | ✅ | The path within the container where the file will be written, including the filename |

:::tip Dynamic paths
You can embed date expressions in `path` to organise files by date automatically — for example, `data/${yyyy}/${MM}/${dd}/MY_DATASET.csv` will resolve to a date-partitioned folder structure at the time the automation fires.
:::

---

## `blob` — Save to an Azure Blob

Use this target to write data to a standard Azure Blob Storage container.

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Write dataset output to Azure Blob Storage on completion
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("blob")
ab.setProperty("storage", "https://mystorageaccount.blob.core.windows.net")
ab.setProperty("container", "market-data")
ab.setProperty("path", "feeds/MY_PROVIDER/MY_PROVIDER.FEED.PRODUCT.csv")
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
"target": "blob",
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
"storage": "https://mystorageaccount.blob.core.windows.net",
"container": "market-data",
"path": "feeds/MY_PROVIDER/MY_PROVIDER.FEED.PRODUCT.csv"
}
}
```

</TabItem>
</Tabs>

### With a date-partitioned path

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Write curve output to Azure Blob Storage with a date-partitioned path
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.setTarget("blob")
ab.setProperty("storage", "https://mystorageaccount.blob.core.windows.net")
ab.setProperty("container", "curves")
ab.setProperty("path", "MY_CURVE_OBJECT/${yyyy}/${MM}/${dd}/CLOSE.csv")
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
  "target": "blob",
  "icon": "database text-success",
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
    "storage": "https://mystorageaccount.blob.core.windows.net",
    "container": "curves",
    "path": "MY_CURVE_OBJECT/${yyyy}/${MM}/${dd}/CLOSE.csv"
  }
}
```

</TabItem>
</Tabs>

---

## `adls` — Save to an Azure Data Lake

Use this target to write data to an Azure Data Lake Storage Gen2 container. The ADLS target uses the same inputs as the blob target but writes using the ADLS hierarchical namespace API, making it compatible with analytics services such as Azure Synapse and Azure Databricks.

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Write dataset output to Azure Data Lake on completion
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("adls")
ab.setProperty("storage", "https://mydatalakeaccount.dfs.core.windows.net")
ab.setProperty("container", "market-data")
ab.setProperty("path", "feeds/MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv")
ab.icon = "database-fill text-info"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "adls",
  "icon": "database-fill text-info",
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
    "storage": "https://mydatalakeaccount.dfs.core.windows.net",
    "container": "market-data",
    "path": "feeds/MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv"
  }
}
```

</TabItem>
</Tabs>

:::note ADLS storage URL
For ADLS Gen2, the storage URL uses the `dfs.core.windows.net` endpoint rather than `blob.core.windows.net`. Ensure your storage account has the hierarchical namespace enabled.
:::

---

## Transforming data before writing

Both storage targets support the `@transformer` property, which lets you reshape the triggered data using a mustache script before it is written to storage. This is useful when downstream consumers expect a specific format such as CSV or JSON.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Write transformed CSV to Azure Blob Storage on dataset completion
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("blob")
ab.setProperty("storage", "https://mystorageaccount.blob.core.windows.net")
ab.setProperty("container", "market-data")
ab.setProperty("path", "feeds/MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv")
ab.setProperty("@transformer", "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV")
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
  "target": "blob",
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
    "storage": "https://mystorageaccount.blob.core.windows.net",
    "container": "market-data",
    "path": "feeds/MY_PROVIDER/${yyyy}/${MM}/${dd}/MY_PROVIDER.FEED.PRODUCT.csv",
    "@transformer": "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV"
  }
}
```

</TabItem>
</Tabs>

See [Advanced automation features](/docs/topics/automations/creating#advanced-features) for the full set of `@` properties available across all automation targets.

---

## Choosing between the two targets

| | `blob` | `adls` |
|---|---|---|
| **Storage type** | Azure Blob Storage | Azure Data Lake Storage Gen2 |
| **Storage URL** | `*.blob.core.windows.net` | `*.dfs.core.windows.net` |
| **Namespace** | Flat | Hierarchical |
| **Best for** | General file storage, archiving | Analytics pipelines, Synapse, Databricks |
| **Icon** | `database text-success` | `database-fill text-info` |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including advanced `@` properties
- [Custom Targets](/docs/topics/automations/targets/custom) — pre-configure storage account and container so users only need to specify a path
- [Email Target](/docs/topics/automations/targets/email) — send data by email instead of writing to storage
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
