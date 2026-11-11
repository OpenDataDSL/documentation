---
title: Integration reference
description: Where integrations are kept, the formats of the group settings, secrets, processes, report configuration and report data, writing a plug-in extension, and troubleshooting
slug: /extensions/integration/reference
sidebar_position: 8
tags: [extension, integration, reference, plug-in, secrets, troubleshooting]
---

# Integration reference

---

## Where everything is kept

| What | Service | Id | Notes |
|-|-|-|-|
| A plug-in | `extension` | Its extension id, such as `odsl.molecule` | Installed from public, once for all the systems that send with it. |
| A system | `object` (private) | `INTEGRATION.<CODE>`, such as `INTEGRATION.MOLECULE` or `INTEGRATION.NORTHGATE_RISK` | Type `INTEGRATION_SYSTEM` (versioned), made by the Integration extension. See [The system object](#the-system-object). |
| A custom system's ODSL | `script` (private) | `integration\custom\<code>` | Versioned like any script. |
| A custom system made before 2026-11-07 | `extension` (private) | `custom.<code>` | Until it is upgraded to a system object, which removes it. |
| A group's settings for its system | `group` | The group | In the group's `integration` field. |
| Identities | `data` | Each curve or timeseries | In `_identity`, one key per code. |
| Data properties | `data` | Each curve or timeseries | In `properties`. |
| A system's secrets | `object` | The system | In `secrets`: names and the records that keep their values, never values. The plug-in's `configuration.integration.secrets` says which secrets there are. |
| A secret's value | `secret` | The record named in **Kept in**, such as `molecule_user` | Kept in the secret store; never shown on the screens. |
| A group's own secret records | `group` | The group | In `integration.secrets`. |
| A group's schedule | `process` | `INTEGRATION_<GROUP>`, such as `INTEGRATION_NGE_MOLECULE_CURVES` | Service `Integration`. |
| Sending a group's items as they change | `automation` | An id the platform gives it | Target `odsl.process`, on the group's `itemupdated` or `itemvalidated`. See [Sending items as they change](#sending-items-as-they-change). |
| A run | `process-exec` | | Name = the process id. |
| A report's cutoff | `reportconfig` and `process` | Settings in the report configuration's `properties.integration.cutoff`; the check is the process `INTEGRATION_CUTOFF_<KEY>` | Script `odsl.integration.cutoff`, input `{report, system}`, scheduled at the cutoff time. See [Alerts and the cutoff](/docs/extensions/integration/alerts-and-cutoff). |
| Alerts | `alert` (private) | Keys `integration/INTEGRATION_<KEY>/<group>/<ondate>` (a group), `integration/INTEGRATION_<KEY>/<ondate>/cutoff` and `integration/<group>/corrections` | Category `integration`; issue `export`, `cutoff` or `validation`. |
| Validation of the data sent | `validation` and `validationconfig` (private) | A curve's record `<id>:<ondate>`; a timeseries' records of its observations on the ondate | Read by the runs of groups with the validation gate. Kept by the [Validation extension](/docs/extensions/validation/overview). |
| A group's corrections | `process` | `INTEGRATION_CORRECT_<GROUP>`, such as `INTEGRATION_CORRECT_NGE_MOLECULE_CAPTURE` | Service `Integration`, the system's script, input `{group, corrections: "true"}`, scheduled (every 15 minutes by default). See [Corrections](/docs/extensions/integration/corrections). |
| A group's corrections log | `report` (private) | `INTEGRATION_CORRECTIONS_<GROUP>:<date>` | One a day: the corrections found and what happened to each (`entries`), the datasets watched, each item's dataset (`index`) and the corrections already seen. Fixed report, category `Integration`, template `odsl.integration.corrections`. |
| Corrections of datasets | `correction` | One record per changed value | Recorded by the platform when a dataset delivery changes a value: `dsid`, `ondate`, `property`, `tenor`, `previous`, `new`. Read by the corrections process. |
| A system's confirmations | `process` | `INTEGRATION_CONFIRM_<CODE>`, such as `INTEGRATION_CONFIRM_MOLECULE` | Service `Integration`, script `odsl.integration.confirm`, input `{system}`, no schedule. Confirmations are on while it exists and is enabled. See [Round-trip confirmations](/docs/extensions/integration/confirmations). |
| A system's report configuration | `reportconfig` (private) | `INTEGRATION_<KEY>`, such as `INTEGRATION_MOLECULE` | Fixed report, category `Integration`, `mergeUpdates` on with `mergeKeys` `["key"]`. Made by the first run when it does not exist. |
| A day's report | `report` (private) | `INTEGRATION_<KEY>:<ondate>` | One report a day: each group's run is merged into it, with no new version. |
| A report's scheduled email | `automation` | Its own id | Target `odsl.email`, on `INTEGRATION_<KEY>:L` (the latest stored date), action `schedule`. Shown in Automations. |
| Whether you have seen the tours | `setting` | `Integration` (your own) | `toured` (the home page tour) and `touredSystem` (the system tour), set when you finish or skip a tour. Also kept in this browser. |

---

## The system object

```json
{
  "_id": "INTEGRATION.FINANCE_BLOB",
  "_type": "INTEGRATION_SYSTEM",
  "name": "Finance blob",
  "code": "finance_blob",
  "description": "Curves for the finance data warehouse",
  "icon": "bucket",
  "plugin": "odsl.integration_blob",
  "codes": "own",
  "reportKey": "FINANCE_BLOB",
  "secrets": [{"name": "accountKey", "secret": "finance_blob_accountkey"}]
}
```

| Field | What it is |
|-|-|
| `name`, `code`, `description`, `icon` | How the system shows on the screens. The code is fixed: it names the id, the report and the secret records of a new system. |
| `plugin` | The plug-in extension it sends with, such as `odsl.integration_blob`, or `custom` for a custom system. |
| `codes` | The identities its items are sent with: `plugin` (the plug-in's, shared), `own` (`<code>_<identity>`, such as `finance_blob_blob_code`) or another system's id (that system's). The engine gives the plug-in's ODSL each item's identities under the plug-in's names whichever it is. |
| `reportKey` | The key of its daily report `INTEGRATION_<KEY>`, the default of its groups. |
| `secrets` | For each secret the plug-in reads (by `name`), the `secret` record that keeps its value. |
| `script`, `kinds`, `identities`, `groupSettings`, `dataProperties`, `transformations` | A custom system only: its ODSL and what it needs, with the same fields as a plug-in's `configuration.integration` (see [Writing a plug-in extension](#writing-a-plug-in-extension)). A custom system's `secrets` have every field of a plug-in's. |
| `copiedFrom`, `upgradedFrom` | On a copy, the system it was copied from; on an upgraded system, the plug-in or `custom.<code>` record it was made from. |

---

## Group settings

```json
"integration": {
  "systemId": "INTEGRATION.MOLECULE",
  "plugin": "odsl.molecule",
  "system": "Molecule",
  "report": "MOLECULE",
  "offset": -1,
  "calendar": "BUSINESS",
  "curves": "exact",
  "settings": {"send": true, "test": false, "markLevel": "vendor", "timezone": "Europe/Amsterdam", "monthOffset": 0, "asOfShift": 0},
  "secrets": {"user": "molecule_user_pl"},
  "alerts": {"raise": true, "severity": "high", "agent": "client"},
  "optional": ["NGE.POWER.DE:BASE"],
  "transformation": {"name": "exportBlendedCurves", "parameters": {"count": 12, "skip": 0}},
  "validation": "required",
  "noValidateItems": ["NGE.POWER.GB:BASE"],
  "validateItems": []
}
```

| Field | What it is |
|-|-|
| `systemId` | The system the group sends to. A group set up before 2026-11-07 has none until the upgrade: its `plugin` is then the system. |
| `plugin` | The plug-in the system sends with, or `custom`. A run of another plug-in's or system's ODSL stops with `Group ... is set up for INTEGRATION.MOLECULE (odsl.molecule), not ...`. |
| `system` | The system's name. |
| `report` | The report key. |
| `offset`, `calendar` | The ondate offset in business days, and its calendar. |
| `curves` | `exact` (the curve for the ondate) or `previous` (the curve for the ondate or the latest one before it). |
| `settings` | The system's group settings. |
| `secrets` | Optional: the secret records this group reads instead of the system's, by secret name. Left out when the group uses the system's secrets. |
| `alerts` | Optional: `raise` (true to raise an alert when items fail or have no data), `severity` and `agent`. |
| `optional` | Optional: the ids of the items that are not available every day. |
| `transformation` | Optional: which of the system's transformations the group uses, with its parameter values: `{name, parameters}`. Left out, the first the system lists. The hooks read `ctx.transformation` and `intParam(ctx, "name", default)`. |
| `validation` | Optional: `required` sends only validated data (the [validation gate](/docs/extensions/integration/validation-gate)). Left out, the group sends all data. |
| `corrections` | Optional: `mode` (`send` or `approve`; left out, corrections are off), `lookback` (days, default 62) and `resend` (`all`, or `first` for only the first ondate a value is in). See [Corrections](/docs/extensions/integration/corrections). |
| `validateItems`, `noValidateItems` | Optional: the ids of the items that differ from the group: always validated, or never. An item in neither list follows `validation`. |

---

## The schedule

```json
{
  "_id": "INTEGRATION_NGE_MOLECULE_CURVES",
  "_type": "VarProcess",
  "service": "Integration",
  "script": "odsl-extensions\\extensions\\integration\\molecule\\odsl.molecule.integration",
  "input": {"group": "NGE_MOLECULE_CURVES"},
  "cron": "0 8 * * MON-FRI * EU1",
  "enabled": true
}
```

The script is the system's runner. The settings are read from the group at the start of every run, so changes on the **Settings** tab apply from the next run without saving the schedule again. **Run now** adds `ondate` to the input. A [history export](/docs/extensions/integration/how-it-works#history-exports) adds `from` and `to` (yyyy-MM-dd, both sent) instead, and optionally `calendar` (default the group's calendar, else `BUSINESS`) and `alerts` (`true` to raise the group's alerts for the dates). It sends at most 400 dates; giving both `ondate` and `from` is refused. To start one with the REST API: `POST process-exec/v1` with `{"name": "INTEGRATION_<GROUP>", "body": {"group": "<GROUP>", "from": "2026-10-01", "to": "2026-10-31"}}`.

### Sending items as they change

```json
{
  "_type": "VarAutomation",
  "target": "odsl.process",
  "template": "When 'NGE_MOLECULE_CURVES' has an item updated, run [process]",
  "icon": "play-fill text-success",
  "enabled": true,
  "conditions": [
    {"source": "private", "service": "group", "id": "NGE_MOLECULE_CURVES", "action": "itemupdated"},
    {"source": "private", "service": "data", "id": "NGE.GAS.TTF:MID", "action": "update"}
  ],
  "properties": {
    "process": "INTEGRATION_NGE_MOLECULE_CURVES",
    "intTrigger": "itemupdated",
    "@transformer": "{\"intTriggered\": \"true\"{{! the item data is not needed: the run reads the item }}}"
  }
}
```

| Field | What it is |
|-|-|
| `conditions` | The group, with the action `itemupdated`, then one `update` condition for each item (`OBJECT:ITEM`). To send items when they pass validation, the group's action is `itemvalidated` and each item's `validated`, and the template `When '<group id>' has an item validated, run [process]`. The group service rewrites the item conditions whenever the group is saved, so the screen saves the group again after saving the automation; for `itemvalidated` it does so from the platform update of 10 November 2026, and before it the screen sets them and shows when they no longer match the group's items. Not for dynamic groups. On the platform the group's id is its object id. |
| `properties.process` | The group's process. The automation runs it with an input of the process's own input (`group`) and the automation's properties, with `id` (the item updated, `OBJECT:ITEM`) and, for a curve, `ondate`. |
| `properties.intTrigger` | `itemupdated` or `itemvalidated`. Tells the engine the run was started by an item: it sends only the item named by `id`, for `ondate` when there is one, and merges it into the day's report. An item no longer in the group is logged and nothing is sent. The hooks see `ctx.trigger` `update` or `validated`. |
| `properties.@transformer` | An inline template that replaces the item's data by `{"intTriggered": "true"}`. The run reads the item itself; and item data with a `_type`, such as a curve, would not be merged into the process input at all, so the run would not know which item was updated. |

It runs as its owner, whoever saved it last. It is found with `GET automation/v1` filtered on `target` `odsl.process`, and its template is the one `GET group/v1/private/<id>?_function=listAutomations` offers.

A group's corrections process `INTEGRATION_CORRECT_<GROUP>` runs the same script with the input `{"group": "<GROUP>", "corrections": "true"}`. Its other input decides on corrections on the group's **Corrections** tab: `approve` (keys of corrections waiting for approval), `ignore` (keys of open corrections) and `resend` (keys of failed ones), each a list or comma separated text of keys `<data id>|<ondate>`, such as `NGE.SOLAR.DE:CAPTURE|2026-10-01`, and `reindex` (`true` to work out the items' datasets again now). The run sends each corrected ondate as a run for that date would, with only the corrected items and the input `correction` `true`: the hooks see `ctx.correction` true and `item.correction` (what changed).

---

## The report

The report configuration holds the matrix in `properties.integration`:

```json
{"systemId": "INTEGRATION.MOLECULE", "plugin": "odsl.molecule", "rows": "location", "columns": "category",
 "expected": [{"row": "NL", "column": "GAS", "count": 1}, {"row": "DE", "column": "POWER", "count": 1}]}
```

`cutoff`, when set, holds the cutoff settings: `time` (hh:mm), `days` (`MON-FRI`, `*` or `TUE-SAT`), `timezone` (`EU1`, `EU2` or `UTC`), `offset`, `calendar`, `raise`, `severity` and `agent`.

`extraRows` and `extraColumns`, when present, are values added with **Add row** and **Add column** that no item has yet and no cell expects yet. They only keep those rows and columns on the **Report** tab; the runs ignore them.

Each run of a group is merged into the day's report (the configuration's `mergeUpdates`), so the report keeps one version a day. Every list in the report data has a `key` the merge matches on: `<group>|<id>` for an item, the group for a group, and the label for a matrix row, column and cell. A configuration made before reports merged is switched to merging by its next run, after that run has saved the day's report with the keys.

An item taken out of a group stays in that day's report until the next day, because a merge does not remove entries.

A day's report data has:

| Field | What it is |
|-|-|
| `name`, `system`, `plugin`, `systemId`, `ondate`, `updated` | What it is for and when it was last changed. |
| `summary` | `items`, `complete`, `sent`, `failed`, `missing`, `skipped`, `expected`, `cellsShort` (as text), `hasProblems`, `allExpected`, `awaiting` (items are waiting for confirmation), `confirmations` (the system confirms what it receives), `notAvailable` and `hasNotAvailable` (items not available every day without data for the ondate), `held` and `hasHeld` (items the validation gate held back, which `failed` does not count). |
| `cutoff` | The result of the cutoff check, when it has run: `ondate`, `time`, `checked`, `ok`, `count` and `problems` (a list of text), as found at the cutoff. After a missed cutoff, each later save of the report adds `rechecked` (when), `remaining` and `left` (what is still not sent) and `resolved` (when everything had been sent). |
| `matrix` | `rowProperty`, `columnProperty`, `columns` (each `label`), `rows` (each `label` and `cells` with `exported`, `expected`, `failed`, `text`, `cls`, `empty`), `hasMatrix`. |
| `groups` | Each group's `key`, `group`, `groupName`, `items`, `complete`, `time`, `allComplete`. |
| `items` | Each item's `key`, `id`, `name`, `group`, `groupName`, `kind`, `row`, `column`, `identity`, `state` (`complete`, `sent`, `failed`, `missing` or `skipped`), `status`, `message`, `ondate`, `time`, `received` (when the system confirmed or failed it), `optional` (`true` for an item not available every day without data for the ondate: its state is then `skipped` and its status `not available`), `validation` (the validation status the gate found: `valid`, `warning`, `overridden`, `failed`, `severe`, `error` or `not validated`; empty when the gate is off for the item), `held` (`true` when the gate held the item back: its state is then `failed` and its status `held back by validation`), `preview` (a dry run: what would have been sent, at most 6,000 characters; empty otherwise), `corrected` and `correction` (when the item was last sent again as a correction, and what changed; empty otherwise). |

### Scheduled emails

A scheduled email is a scheduled automation on the report:

```json
{
  "target": "odsl.email",
  "template": "On schedule [@schedule], with the latest 'INTEGRATION_MOLECULE:L', transform the data using [@transformer], then send an email to [to] with subject [subject]",
  "conditions": [{"source": "private", "service": "report", "id": "INTEGRATION_MOLECULE:L", "action": "schedule"}],
  "properties": {
    "to": "priya.shah@northgate-energy.com, trading.desk@northgate-energy.com",
    "subject": "Molecule integration report ${date:dd MMM yyyy}",
    "attachment": false,
    "@transformer": "odsl-extensions\\extensions\\integration\\core\\odsl.integration.email",
    "@schedule": "30 9 * * MON-FRI * EU1"
  },
  "enabled": true
}
```

`:L` asks the report service for the latest stored date. The template `odsl.integration.email` turns that day's report into the email body.

---

## Writing a plug-in extension

A plug-in is an extension with three extra parts. The platform installs the extensions in `dependencies` when the plug-in is installed and they are missing, and stops an extension from being uninstalled while an installed extension depends on it.

```js
e.plugin = true
e.dependencies = ["integration"]
e.configuration.integration.system = "Molecule"
e.configuration.integration.description = "Sends curves and timeseries to the Molecule ETRM marks API"
e.configuration.integration.runner = "odsl-extensions\extensions\integration\molecule\odsl.molecule.integration"
e.configuration.integration.kinds = ["curve", "timeseries"]
e.configuration.integration.identities = [...]
e.configuration.integration.groupSettings = [...]
e.configuration.integration.dataProperties = [...]
e.configuration.integration.secrets = [...]
e.resources.script.integration = "odsl-extensions\extensions\integration\molecule\odsl.molecule.integration"
```

| Part | What it is |
|-|-|
| `plugin` | `true` for a plug-in. |
| `dependencies` | The extensions it needs. A code without a publisher (`integration`) means the same publisher's extension (`odsl.integration`). |
| `configuration.integration.kinds` | The kinds of data it takes: `curve`, `timeseries` and `options` ([options and traded options](/docs/extensions/integration/plugins/generic-content#options-and-traded-options)). Left out, `curve` and `timeseries`. An item of another kind fails with `... does not take options` without reaching the runner. |
| `configuration.integration.reportKey` | Optional: the report key of a system upgraded from the plug-in, such as `QUEUE`. Without it the key is the extension code. A new system uses its own code. |
| `configuration.integration.transformations` | Optional: the ways a group can turn its data into what the system takes, `[{name, label, description, parameters}]`: `name` is the function the runner calls for it, `parameters` fields like the group settings. Each group chooses one on its **Settings** tab (the first is the default). |
| `configuration.integration` | What the system needs. Each field of `identities`, `groupSettings` and `dataProperties` has `name`, `label`, `type` (`text`, `number`, `boolean` or `select`), `default`, `options` (for `select`), `description` and, for identities, `required`. `default` is an ODSL keyword, so set it with `f.set("default", value)`. Each of `secrets` has `name` (what the runner reads with `intSecret`), `label`, `secret` (the secret record that keeps the value, such as `molecule_user`), `required` and `description`. |

The runner is written like a custom system's ODSL (see [How the ODSL works](/docs/extensions/integration/custom-systems#how-the-odsl-works)), with the plug-in's own id in `integrationRun(input, "odsl.molecule")`. It runs for every system on the plug-in: the engine reads the group's system object, checks that it sends with this plug-in, and gives the runner the system's name (`ctx.system`), its id (`ctx.systemId`), its secret records and its items' identities under the plug-in's names, so the runner does not change when a second system is added. The secret names come from the installed extension record, so a plug-in installed before it listed its secrets reads none: the Molecule runner then falls back to its fixed records.


In a dry run, a runner's `integrationExportItem` can return `intDryRun(status, preview)` instead of the status text: `preview` is the text it would have sent, kept on the item as `preview` and shown with **Preview** on the daily report.

A runner can apply a Mustache template to its data with the engine's `intTryTransform(template, data)`, as the generic plug-ins do for their **Transformer** setting: `template` is the name of a mustache script (`#` for a public one) or the template text, `data` an object or a list. It returns `value` (the text) and `error` (null when it worked). The template is applied on the platform with `POST script/v1?_function=mustache` and the body `{template, data}`, which answers `{text}`; in ODSL that is `run script mustache with req`.

---

## Platform calls the screens use

| Call | What it does |
|-|-|
| `PUT data/v1/private?_function=identity` | Reads (`action: GET`) or sets (`action: PUT`) the identities of many data items at once. |
| `PUT data/v1/private?_function=properties` | Reads (`action: GET`, `_id`, `properties`) or sets (`action: PUT`, `data` of `_id` plus name and value) the properties of many data items, without saving the items. A value of `null` removes the property. Each item is checked against your update rights. |
| `POST extension/v1/private?_publish=true` | Installs a published plug-in. |
| `POST object/v1/private` | Saves a system object. |
| `GET object/v1/private/<id>`, `DELETE object/v1/private/<id>` | Reads or deletes a system. Systems are listed with `find` on the private objects of type `INTEGRATION_SYSTEM`. |
| `DELETE extension/v1/private/<id>` | Removes a custom system's extension record (`custom.<code>`) after its upgrade. |
| `POST script/v1/private?_function=check` | Checks ODSL for syntax errors. |
| `GET group/v1/private/<id>?_function=listAutomations` | The automations the platform offers for a group, for the exact template of sending on updates. |
| `GET automation/v1`, `POST automation/v1`, `GET automation/v1/<id>`, `DELETE automation/v1/<id>` | Lists, reads, saves and deletes the automations that send a group's items as they change, and the scheduled emails of a report. |
| `GET secret/v1` with `_filter` on `_id` | Lists the secret records a system reads, for their status. The list holds where each value is kept, never the value. |
| `POST secret/v1` | Sets a secret's value (`_id`, `_type: VarSecret`, `value`, `enabled`). |
| `DELETE secret/v1/<id>` | Removes a secret. |
| `GET setting/v1/Integration`, `POST setting/v1` | Reads and saves your Integration settings: whether you have seen the tours. |

---

## Access

The **Integrations** menu item and the **Integration** app need the features `odsl.integration.manage` and `odsl.integration.group`, given by the feature policy `extension.odsl.integration`. Everything else follows your normal rights on groups, data, processes, reports, scripts, secrets and extensions: for example, creating a custom system needs the right to update extensions, and setting a secret's value the right to update secrets. Without the right to list secrets, the screens show their status as unknown.

---

## Tasks on the Home page

Installing the Integration extension adds these tasks to the [Home page](/docs/extensions/home/overview), and uninstalling it removes them. Each opens the Integrations screen.

| Group | Task | Counts these open alerts |
|-|-|-|
| Check | Check exports to downstream systems | Category `integration`, issue `export` |
| Check | Check exports held back by validation | Category `integration`, issue `validation` |
| Check | Check the export cutoff | Category `integration`, issue `cutoff` |
| Deliver | Send data to a downstream system | |
| Deliver | Follow today's integration report (under **See all tasks**) | |

Their ids are `odsl.integration.check-exports`, `check-held`, `check-cutoff`, `send-data` and `daily-report`.

The Integrations screen takes these view properties: `SYSTEM` (a system id, its code or its plug-in) and `TAB` (`overview`, `groups`, `report` or `plugin`) open a system on a tab, and `TOUR` `true` always starts the tour, `false` never does. The tour does not start by itself when `SYSTEM` or `TAB` is given.

---

## Troubleshooting

| Problem | Cause and fix |
|-|-|
| A correction is not sent | Check the group's **Corrections** tab. The item must come from a watched dataset (set the data property `correction_dsid` when it is not built from the dataset's events), the corrected ondate must be within the look back, and corrections recorded before corrections were switched on are not sent (use a history export). |
| A corrections run says `none of the ... items comes from a dataset` | No item has a `dsid` property or a `correction_dsid` data property. Set `correction_dsid` on the items to the dataset they come from. |
| A monthly correction is sent for weekdays only | The group's calendar is `BUSINESS`. Set its calendar to `DAILY` on the **Settings** tab when the system needs every day. |
| A CSV file has quotes around all its text, and `\n` where its lines should end | The platform's file services wrote the text as a JSON string. Fixed in `AzureBlobService` and `AzureFileService` (odsl-service): text is now written as it is. The platform needs the build with that fix. |
| A run fails with `The transformation <name> is not one of <system>'s (...)` | The group chose a transformation the system no longer lists. Choose one on the group's **Settings** tab and save. |
| A send fails with `transformer <name>: ...` | The group's Mustache template could not be applied: the script does not exist, is not a mustache script, or has an error. The reason follows the name. |
| An item fails with `No <code> identity set` or `No molecule identity set` | The item has no code for the system. Set it on the group's **Items** tab. |
| A history export fails with `There are no BUSINESS dates from ... to ...` or `... a history export sends at most 400, so split it` | The range has no dates in the calendar (for example a weekend), or too many. Check the dates and the **Calendar**, or run several shorter exports. |
| An item is missing with `No curve for 2026-11-03` | The curve was not built for the date. Choose **The curve for the ondate, or the latest one before it** under **Curves**, or run the group again for that date with **Run now** once it is built. |
| An item fails with `Cannot read ...: not found` | The group holds an id that no longer exists. Remove it from the group. |
| The run stops with `Set the url in the group settings` | The system needs a group setting that is empty. Fill it in on the group's **Settings** tab. |
| A cell is red but every item in the group was sent | Another group with the same report key had a failure, or an item's matrix property is wrong. Check the report's **Items** tab. |
| Installing a plug-in fails with `[6403] Extension ... needs extension ..., which has not been published` | An extension it depends on is not published in this environment. |
| Uninstalling the Integration extension fails with `[6404] ... cannot be uninstalled because these installed extensions need it` | A plug-in, or a custom system made before 2026-11-07 that is not upgraded, is still installed. Uninstall it, or upgrade the systems, first. |
| The run fails with an ODSL error such as `Unknown function` | An error in the system's ODSL that it does not catch stops the run. Open the script in the Script Manager, run it with the group's input and fix it. |
| The process runs but nothing reaches the system | The group may be in a dry run (**Send to Molecule** unticked): the items show as skipped. |
| The run stops with `The secret API key (northgate_risk_apikey) is not set` | A required secret has no value. Set it on the system's **System setup** tab, or, when the group names its own record, on the group's **Settings** tab. |
| The run stops with `Set the secret molecule_production (Molecule production API key) ...` | The plug-in needs a secret that is not set. Set it on the system's **System setup** tab. |
| Saving a secret fails with `... which OpenDataDSL can only read` | Your company keeps its secrets in its own Azure Key Vault with read access. Add the secret in the vault (see [Keeping your secrets in your own Azure Key Vault](/docs/it/key-vault)). |
| Uninstalling a plug-in fails with `[6404] ... cannot be uninstalled because these installed extensions need it` | A custom system copied before 2026-11-07 still uses the plug-in's ODSL. Upgrade the systems on the home page: the copy becomes a system on the plug-in. |
| Sending when items pass validation sends nothing | The items have no validation checks, or their data has not passed them yet: see the item's validation on the Validation screen. Each version of the data is sent once, so checking unchanged data again sends nothing. |
| A run started by an item says `<item> was updated (or validated) but is not in group <group>: nothing sent` | The item was removed from the group after the update was saved, or the automation's conditions are out of step with the group. Save the group again (its **Settings** tab) and the platform sets them from its items. |
| Sending on updates sends the whole group | The platform did not pass the automation's properties to the run: the automation has no `@transformer`. Switch it off and on again on the **Schedule and runs** tab, which saves it with one. |
| A run stops with `The system INTEGRATION.<CODE> was not found` | The group's system was deleted. Attach the group to another system. |
| A run stops with `Group ... is set up for INTEGRATION.<CODE> (...), not ...` | The group's process runs another system's ODSL. Save the group's schedule again on its **Schedule and runs** tab, which points the process at its system's ODSL. |
| Items of a second system on a plug-in fail with a missing code, such as `No molecule identity set` | The system has its own codes, and the items have none yet. Give them their codes on the group's **Items** tab, or choose **Shared** codes on the system's **System setup** tab. |
| A group is not offered under **Attach a group**, or a run stops with `Group ... is a group of object: only groups of data (curves and timeseries) can be sent` | Only groups of the data service can send to a system. Make a group of data with the curves and timeseries. |
| An item that is not published every day shows as **Missing data** and raises alerts | Tick **Not every day** for it on the group's **Items** tab. |
| An item fails with `... does not take options: it takes curves and timeseries` | The system's plug-in does not send options. The generic plug-ins send them from their version of 2026-11-05: install the plug-in again to update it. |
| An item is held back with `Not sent because it has no validation set up` | The group or the item has the validation gate on, but the curve or timeseries has no validation configuration. Set one up in the Validation extension, or choose **Not validated** for the item on the group's **Items** tab. |
| An item is held back with `Not sent because it has not been validated for 2026-11-03` | Its checks have not run for the date yet, for example because the curve was saved after the export. Run its validation, then run the group again with **Run now**. A failure can be passed with an override in the Validation extension. |
| A timeseries is held back although its latest value passed | The gate checks the observations on the ondate the run sends. Check the timeseries' validation records for that date. |
| No alert is raised for a group with failures | Tick **Raise an alert when items fail or have no data** on the group's **Settings** tab. An alert that cannot be raised (for example on the none plan) is noted at the end of the run's message. |
| The cutoff alert stays open after everything was confirmed | The alert is closed when the day's report is next saved with nothing left: a confirmation or a run. For an alert left open before this was added (6 November 2026), run the process `INTEGRATION_CUTOFF_<KEY>` with the input `ondate` of that day, which closes it when everything is now sent, or close it by hand. |
| The cutoff alert lists a group that did not run | The group is attached to the system with the same report key but has no items in the day's report: check its schedule, or remove it from the system. |
| Items stay **sent** | The system has not confirmed them. Check the runs of `INTEGRATION_CONFIRM_<CODE>` on the Processes screen: a confirmation that matched nothing is listed in the run's message as `not found in the sent data`. |
| A confirmation run fails with `Confirmations are not switched on for ...` | Switch them on on the system's **Plug-in** or **System setup** tab, or check `body.system` is the system's extension id. |
| A confirmation run says `not understood: ... (no ondate)` | Give `ondate` in the body or on the item. |
| A secret's status shows **unknown** | You do not have the right to list secrets. The runs still read them. |
| Saving a scheduled email fails with `This platform does not offer scheduled email automations for reports yet` | The platform does not have scheduled automations yet, or has no `odsl.email` automation target. |
| A scheduled email fails with `email recipients are restricted to the domain` | The platform only emails addresses in your company's domain. Remove the other addresses, or ask OpenDataDSL to lift the limit for your company. |
| A scheduled email shows yesterday's report | It was sent before the day's runs stored the report. Schedule it later than the runs of the groups that share the report. |
| Every item of a group fails with the same message, such as `[6502] JSON service error: ... Status=500` | The group sends one message for the whole group (**Messages** `group`) and the send at the end of the run failed, so none of its items were sent. Fix the cause and run the group again with **Run now**. |
| A generic plug-in run stops with `Set the queue in the group settings` or `Set the url in the group settings` | The group has no destination. Fill it in on the group's **Settings** tab. |
| A file plug-in fails with an authentication error from Azure | The **Storage account key** is wrong, or the URL names another storage account. |
