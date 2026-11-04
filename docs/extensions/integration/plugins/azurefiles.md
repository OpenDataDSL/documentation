---
title: The Azure Files plug-in
description: Writes curves and timeseries as CSV or JSON files to an Azure Files share, for systems that read files from a network folder
slug: /extensions/integration/plugins/azurefiles
sidebar_position: 5
catalog_title: Azure Files
catalog_image: /img/extensions/integration/azurefiles-card.png
plugin_id: odsl.integration_files
plugin_sends: [Curves, Timeseries, CSV, JSON]
tags: [extension, integration, plug-in, generic, azure, files, share, csv]
---

# The Azure Files plug-in

The Azure Files Integration extension (`odsl.integration_files`) writes curves and timeseries as CSV or JSON files to an Azure Files share. An Azure Files share can be mounted as a network drive, so this suits systems that read files from a folder, such as an ETRM import folder.

---

## What it needs

Once installed, the plug-in's codes, settings and secrets are listed on the **Plug-in** tab of the Integrations screen when **Azure Files** is chosen under **System**.

![The Plug-in tab for Azure Files with its identity, group settings and secrets](/img/extensions/integration/azurefiles-plugin.png)

| Kind | Name | What it is |
|-|-|-|
| Identity | `files_code` | The code the receiving system knows the curve or timeseries by. Left empty, the data id is sent, such as `NGE.GAS.TTF:MID`. |
| Group setting | **Share URL** (`url`) | `https://<account>.file.core.windows.net/<share>`, optionally followed by a folder. |
| Group setting | **File format** (`format`) | `csv` or `json`, `csv` unless you change it. `csv`: one row per value; `json`: the item message, or all of them with their group. See [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content). |
| Group setting | **File name** (`fileName`) | `{group}_{yyyymmdd}.{ext}` unless you change it. A pattern of the file name: see [File names](/docs/extensions/integration/plugins/generic-content#file-names). |
| Group setting | **Messages** (`layout`) | `item` or `group`, `group` unless you change it. `item`: one message or file per curve or timeseries; `group`: one for the whole run. |
| Group setting | **Send** (`send`) | Ticked unless you change it. Untick for a dry run: everything is built and counted, nothing is sent. |
| Secret, kept in `integration_files_accountkey` | **Storage account key** (`accountKey`) | The access key of the storage account (Access keys in the Azure portal). |

Set the secret values in the **Secrets** part of the **Plug-in** tab (see [Getting started](/docs/extensions/integration/getting-started#2-set-the-secrets)). A group can use its own secret records instead, named on its **Settings** tab, for example to send to a second account.

---

## How it sends

With **Messages** set to `group` (the default), a run writes one file holding every curve and timeseries of the group. With `item`, it writes one file for each; `_{code}` is added to the file name when the pattern has no `{code}`, so the files do not overwrite each other.

The file goes to the URL in the group settings followed by the file name, for example `https://ngefiles.file.core.windows.net/etrm/import/GT_20261103.csv`. A file of the same name is replaced, so a rerun for a date writes the same file again.

What each message or file holds, the CSV columns and the file names are the same for every generic plug-in: see [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content).

The plug-in signs in with the storage account key, kept in the **Storage account key** secret.

---

## Examples

Northgate Energy drops a file into the import folder its ETRM watches:

| Setting | Value |
|-|-|
| **Share URL** | `https://ngefiles.file.core.windows.net/etrm/import` |
| **File format** | `csv` |
| **File name** | `marks_{yyyymmdd}_{run}.{ext}` |

`{run}` (the time the run started) gives every run a file of its own, so the ETRM picks up reruns too.

---

## One plug-in, several destinations

Each group sending to Azure Files has its own settings, so groups can already send to different containers or folders. To keep destinations apart, with their own secrets, report and groups, select **Copy to a new system** on the **Plug-in** tab (see [Copying a system](/docs/extensions/integration/custom-systems#copying-a-system)). The copy uses this plug-in's ODSL, so it gets its updates.

---

## Next

- [All plug-ins](/docs/extensions/integration/plugins): every system with a ready-made plug-in.
- [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content): the messages, rows and file names.
- [Integration reference](/docs/extensions/integration/reference): where everything is kept, and troubleshooting.
