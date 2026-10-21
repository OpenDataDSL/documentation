---
title: Export reference
description: Where the Export extension keeps schedules and reports, the schedule input, the report data, the output templates, the extension contents and troubleshooting
slug: /extensions/export/reference
sidebar_position: 6
tags: [extension, export, reference, process, report, automation, troubleshooting]
---

# Export reference

---

## Where everything is kept

An export you download saves nothing. A scheduled export keeps the following, all private to your organisation. For Northgate Energy's schedule `EXPORT_GAS_AND_POWER_TO_THE_ETRM`:

| What | Service | ID | Notes |
|-|-|-|-|
| The schedule | `process` | `EXPORT_GAS_AND_POWER_TO_THE_ETRM` | Service `Export`. Runs the script `odsl-extensions\extensions\export\odsl.export.runner` with the schedule as its input, on its `cron`. |
| The report configuration | `reportconfig`, private | `EXPORT_GAS_AND_POWER_TO_THE_ETRM` | Report type `Fixed`, category `Exports`, template `odsl-extensions\extensions\export\odsl.export.report` |
| Stored reports | `report`, private | `EXPORT_GAS_AND_POWER_TO_THE_ETRM` and the export date | One per export date, read as `EXPORT_GAS_AND_POWER_TO_THE_ETRM:2026-10-19`. A rerun of a date replaces it. |
| Deliveries | `automation` | Assigned by the platform | A condition on the report, the target and its fields, and `@transformer` set to an output template |
| Runs | `process-exec` | Assigned by the platform | One per run, with `name` the schedule id |

---

## The schedule input

The process `input` is the schedule. You can change it in the portal's process editor, or run the process with some of it changed, for example `ondate` to export an earlier date.

| Field | Example | What it does |
|-|-|-|
| `key`, `name`, `report` | `gas_and_power_to_the_etrm`, `Gas and power to the ETRM`, `EXPORT_GAS_AND_POWER_TO_THE_ETRM` | The schedule's key, name, and the report the runs are stored in |
| `group` | `6710c2...` | A group to export, read on each run. When it is set, `items` is ignored. |
| `items` | `[{"id": "ICE_TTF:SETTLE", "service": "data", "type": "VarTimeSeries"}]` | The items to export. `service` is `data` or `object`. `type` may be empty, and is then found when it runs. `name`, `currency` and `units` are optional. |
| `items[].conditions` | `[{"field": "volume", "op": "gte", "value": "15"}]` | An event list's conditions, as set in its filter. `op` is `eq`, `ne`, `in`, `nin`, `contains`, `gt`, `gte`, `lt`, `lte`, `set` or `unset`. |
| `items[].filterText` | `"product" in ["TTF", "DE Power Base"] and "volume" >= 15` | The conditions as an ODSL condition, written by the extension. This is what the run uses. |
| `items[].fields` | `["product", "contract", "volume", "price"]` | An event list's fields to export; empty for all |
| `items[].emptyOk` | `false` | `true` when no events is normal for the event list |
| `ondate` | `""` or `2026-10-16` | Empty for a scheduled run. A date exports that date, with no retries. |
| `offset` | `0` | Business days from the run date to the export date: `0`, `-1` or `-2` |
| `calendar` | `BUSINESS` | Calendar for business days and timeseries gaps |
| `range` | `{"type": "days", "days": 7}` | Timeseries values: `type` is `ondate`, `days` (with `days`), `mtd`, `previousMonth` or `fixed` (with `start` and `end`) |
| `curves` | `ondate` | `ondate`, `latest` or `range` |
| `maxOndates` | `31` | With `range` curves, the latest this many curves |
| `tenors` | `M01-M03, Q01` | The curve contracts to keep; empty for all |
| `layout` | `long` | `wide` also stores the column per item table |
| `missing.action` | `previous` | `skip`, `blank`, `previous` or `fail` |
| `missing.lookback` | `10` | Days to look back for earlier data |
| `missing.gaps` | `none` | `none`, `blank` or `previous` |
| `missing.retry` | `30` | `0`, `15`, `30` or `60` minutes |
| `missing.until` | `20:00` | Retry time, UTC |

---

## The report data

The data of a stored report, which the report template and the output templates read:

| Field | What it holds |
|-|-|
| `export` | `key`, `name`, `ondate` (the export date), `start` and `end` (the timeseries range), `range`, `curves`, `tenors`, `layout`, `missingAction`, `generated` (UTC) |
| `summary` | Counts as text: `items`, `exported`, `partial`, `previous`, `missing`, `errors`, `rows`, `events`. `hasEvents` says whether any event list was exported. `complete` is true when every item was exported from its own data, and `hasMissing`, `hasErrors`, `hasPrevious` and `hasPartial` say whether each count is above zero. |
| `items` | One per item: `id`, `type`, `name`, `status` (`ok`, `partial`, `previous`, `missing`, `error`), `rows`, `from`, `message`, and the flags `isOk`, `isPartial`, `isPrevious`, `isMissing`, `isError` |
| `rows` | The values: `id`, `type`, `ondate` (curves), `index` (time or tenor), `value` (as stored), `text` (the value as text, without trailing zeros), `numeric`, `status`, `from`, `name`, `currency`, `units`, and the flags `isPrevious` and `isMissing` |
| `events`, `eventColumns` | Events: each event's `cells` (a `text` per column) and `props` (`name`, `text` and `numeric`, for the fields that have a value), and the column names: `event`, `eventid`, `eventtime`, then `eventstart` and `eventend` when they differ from the event time, `timezone` and `eventtype` when set, then the fields |
| `objects`, `objectColumns` | Master data: each object's `id`, `cells` (a `text` per column) and `props` (`name` and `text`), and the column names |
| `wide` | With the `wide` layout: `columns`, `series` (rows by `key`) and `curves` (rows by `ondate` and `tenor`), each with `cells` |
| `hasRows`, `hasEvents`, `hasObjects` | Whether there are rows, events and master data |

Every row has every field, blank when there is nothing, so your own Mustache templates can use them safely. Array elements, and the columns, cells and props of the events, have a `comma` field, `,` on all but the last, for writing JSON and CSV.

---

## Output templates

The output templates are Mustache scripts of the extension, used as the `@transformer` of a delivery:

| Template | Format |
|-|-|
| `odsl-extensions\extensions\export\odsl.export.output.csv` | CSV, one row per value, all columns |
| `odsl-extensions\extensions\export\odsl.export.output.csv_values` | CSV with id, ondate, index and value |
| `odsl-extensions\extensions\export\odsl.export.output.csv_wide` | CSV with a column per item |
| `odsl-extensions\extensions\export\odsl.export.output.csv_objects` | CSV of the master data |
| `odsl-extensions\extensions\export\odsl.export.output.csv_events` | CSV of the events |
| `odsl-extensions\extensions\export\odsl.export.output.tsv` | Tab separated |
| `odsl-extensions\extensions\export\odsl.export.output.json` | JSON |
| `odsl-extensions\extensions\export\odsl.export.output.jsonl` | JSON Lines |
| `odsl-extensions\extensions\export\odsl.export.output.xml` | XML |
| `odsl-extensions\extensions\export\odsl.export.output.html` | HTML page with inline styles |

To send another format, copy one into your own Mustache script and use it as the transformer of an automation on the report. You can try a template on a stored report with the REST API: `GET report/v1/private/EXPORT_GAS_AND_POWER_TO_THE_ETRM:2026-10-19?_template=<script id>` with the header `Accept: text/html`.

---

## Extension contents

| Type | Name | Purpose |
|-|-|-|
| Extension | `odsl.export` | Export data |
| View | Groups, Apps, **Export** | Export the selected group (feature `odsl.export.manage`) |
| View | Operations, **Export data** | Export anything (feature `odsl.export.data`) |
| Feature policy | `extension.odsl.export` | Both features, for everyone |
| Scripts | `odsl.export.common`, `odsl.export.workspace`, `odsl.export.schedules` | The screens |
| Script | `odsl.export.runner` | The ODSL script every schedule's process runs |
| Script | `odsl.export.report` | The template of the stored reports |
| Scripts | `odsl.export.output.*` | The output templates |
| Scripts | `export.timeseries.csv`, `export.timeseries.json`, `export.timeseries.xml` | Server export templates for the **Template** format |

---

## Troubleshooting

| Problem | What to check |
|-|-|
| The **Export** app is not on the **Apps** tab of a group | The extension and the portal must both be up to date: the Groups screen lists Apps views with the section `Manage`. |
| An item shows **Error** | The message is the platform's reason, for example the item does not exist or you have no access to it |
| A curve exports nothing | With **Curve for one ondate**, check there is a curve on that date. With every ondate in the range, check the range contains curve dates. With **Tenors** set, the **Items** tab says how many contracts are in the tenors: check the tenors are the curve's (`M01`) or its contract codes (`2026M11`). |
| An event list exports no events | Check the date range: events count by their event time, in whole days in UTC. Then check the conditions of its filter, for example a number written with text around it. The **API** tab shows the filter sent. |
| A delivery of an event list is empty | The CSV, tab separated and JSON Lines formats write timeseries and curve values only. Choose **CSV of the events**, JSON, XML or HTML. |
| A scheduled run is still waiting | **Recent runs** shows `reschedule` while it waits for late data. It decides at the retry time. |
| A run failed with the message that data is missing | **When an item has no data** is **Stop the export**. The process log lists the items. |
| The **Template** format is greyed out | It needs a group with every item ticked |
| The column per item CSV delivery is empty | Set the schedule's layout to **One row per value, plus a column per item table** |
| A delivery email does not arrive | Recipients outside your organisation's email domain need your organisation to allow them. Check the automation log for the report. |
