---
title: What the generic plug-ins send
description: The item messages, group messages, Event Grid events, CSV rows and file names of the generic Integration plug-ins
slug: /extensions/integration/plugins/generic-content
sidebar_position: 9
catalog: false
tags: [extension, integration, plug-in, generic, json, csv]
---

# What the generic plug-ins send

The generic plug-ins (Message queue, Azure Blob Storage, Azure Data Lake, Azure Files, Webhook, Azure Event Grid and Power BI streaming dataset) all send the same content, so a receiving system can be moved from one to another without changes.

---

## An item message

Each curve, timeseries or options becomes one item message:

```json
{
  "id": "NGE.GAS.TTF:MID",
  "code": "Q.TTF",
  "name": "TTF gas forward curve",
  "kind": "curve",
  "ondate": "2026-11-03",
  "group": "NGE_CURVES",
  "system": "Message queue",
  "correction": false,
  "values": [
    {"tenor": "M01", "start": "2026-12-01", "value": 32.15},
    {"tenor": "M02", "start": "2027-01-01", "value": 33.4}
  ]
}
```

| Field | What it is |
|-|-|
| `id` | The data id. |
| `code` | The item's code for the plug-in (its identity, such as `queue_code`), else the data id. |
| `name`, `kind` | The item's name, and `curve`, `timeseries` or `options`. |
| `ondate` | The date the run sends. |
| `group`, `system` | The group and the system name. A copy of a plug-in sends its own name. |
| `correction`, `note` | `correction` is `true` when the item is sent again because its data was corrected (see [Corrections](/docs/extensions/integration/corrections)), with `note` saying what changed, such as `value 2026-10-01: 39.1 to 39.7`; otherwise `false` and no `note`. |
| `values` | A curve: the contracts of the curve for the ondate, each with `tenor`, `start` and `value`. A timeseries: its values, each with `time` (such as `2026-11-01T00:00:00`) and `value`. Options: one entry per option, see [Options and traded options](#options-and-traded-options). |

Items with no values are skipped and not sent.

---

## Options and traded options

[Options](/docs/topics/options/options-data) are read like curves: the option chains for the ondate (or, with the group's **Curves** setting on the latest on or before it, the latest options up to then). A [positions view](/docs/topics/options/traded-options) is sent the same way, with only the options your company holds and your position volume and traded price. The message has one value per option, that is per tenor, strike and call or put, with every column the options have:

```json
{
  "id": "NGE.EUA:OPTIONS",
  "code": "Q.EUA",
  "name": "EUA futures options",
  "kind": "options",
  "ondate": "2026-11-03",
  "group": "NGE_OPTIONS",
  "system": "Message queue",
  "correction": false,
  "currency": "EUR",
  "units": "t",
  "value": "SETTLEMENT_PRICE",
  "columns": ["SETTLEMENT_PRICE", "OPTION_VOLATILITY"],
  "traded": false,
  "values": [
    {"tenor": "2026M12", "start": "2026-12-01", "end": "2026-12-31", "expiry": "2026-12-14", "strike": 85, "callput": "C", "SETTLEMENT_PRICE": 0.91, "OPTION_VOLATILITY": 22.0791},
    {"tenor": "2026M12", "start": "2026-12-01", "end": "2026-12-31", "expiry": "2026-12-14", "strike": 85, "callput": "P", "SETTLEMENT_PRICE": 1.05}
  ]
}
```

| Field | What it is |
|-|-|
| `currency`, `units` | The currency and units of the prices. |
| `value`, `columns` | The main value column and the columns of the options, in order. |
| `traded`, `positionDate` | `traded` is `true` for a positions view, with `positionDate`, the date of the position set used. |
| `values` | One entry per option: `tenor`, the delivery period (`start` and `end`, the last day), `expiry`, `strike`, `callput` (`C` or `P`) and each column it has a value for, such as `SETTLEMENT_PRICE`, `OPTION_VOLATILITY`, `DELTA_FACTOR`, and for traded options `POSITION_VOLUME` and `TRADED_PRICE`. A side the exchange did not publish is left out. |

In a CSV file and in Power BI, each value of each option is one row: see [CSV files](#csv-files).

---

## A group message

With **Messages** set to `group`, the item messages are sent together:

```json
{
  "system": "Webhook",
  "group": "NGE_CURVES",
  "groupName": "Gas and power curves",
  "ondate": "2026-11-03",
  "created": "2026-11-04T08:05:00Z",
  "correction": false,
  "part": 1,
  "parts": 1,
  "count": 2,
  "items": [ ... ]
}
```

`created` is when the run started (UTC), and `correction` is `true` for a run that sends corrections. A group with more items than **Most items in one message** is sent in several messages, numbered by `part` of `parts`. JSON files hold the same, always as one part.

With one message per group, the items are reported complete once they are collected. When the send at the end of the run fails, every one of them is marked failed with the reason, so the daily report shows them as not sent.

---

## CSV files

CSV files have a header line and one row per value:

```
id,code,name,kind,ondate,tenor,start,time,value
NGE.GAS.TTF:MID,B.TTF,"TTF gas, forward curve",curve,2026-11-03,M01,2026-12-01,,32.15
NGE.SOLAR.DE:CAPTURE,NGE.SOLAR.DE:CAPTURE,German solar capture price,timeseries,2026-11-03,,,2026-11-01T00:00:00,39.7
```

A curve's rows have `tenor` and `start`, a timeseries' rows `time`. A field with a comma, a quote or a line break is quoted, with quotes doubled. Power BI rows have the same columns.

A file with options has four more columns, and one row for each value of each option, in the order of the options' columns:

```
id,code,name,kind,ondate,tenor,start,time,value,expiry,strike,callput,column
NGE.GAS.TTF:MID,B.TTF,"TTF gas, forward curve",curve,2026-11-03,M01,2026-12-01,,32.15,,,,
NGE.EUA:OPTIONS,B.EUA,EUA futures options,options,2026-11-03,2026M12,2026-12-01,,0.91,2026-12-14,85,C,SETTLEMENT_PRICE
NGE.EUA:OPTIONS,B.EUA,EUA futures options,options,2026-11-03,2026M12,2026-12-01,,22.0791,2026-12-14,85,C,OPTION_VOLATILITY
NGE.EUA:OPTIONS,B.EUA,EUA futures options,options,2026-11-03,2026M12,2026-12-01,,1.05,2026-12-14,85,P,SETTLEMENT_PRICE
```

Files without options keep the nine columns. Power BI rows of options have `expiry`, `strike`, `callput` and `column` too.

---

## File names

**File name** is a pattern, `{group}_{yyyymmdd}.{ext}` unless you change it. A `/` in it makes folders.

| Token | Becomes |
|-|-|
| `{system}`, `{group}` | The system and group names, with characters other than letters, digits, `.`, `_` and `-` replaced by `_`. |
| `{ondate}` | The ondate, such as `2026-11-03`. |
| `{yyyymmdd}`, `{yyyy}`, `{mm}`, `{dd}` | The ondate, or its year, month or day. |
| `{run}` | When the run started, such as `20261104080500`: a file per run. |
| `{correction}` | `_correction` when the run sends corrections, else nothing: `{group}_{yyyymmdd}{correction}.{ext}` keeps corrections in files of their own. |
| `{code}` | The item's code, with one file per item. When the pattern has no `{code}`, `_{code}` is added before the extension. |
| `{ext}` | `csv` or `json`. With a transformer, from its content type: `csv`, `json`, `xml`, `html`, `tsv`, else `txt`. |

---

## Transforming with a Mustache template

When the receiving system needs another layout, such as its own CSV columns, XML or a JSON shape of its own, set a **Transformer** in the group's settings: the name of a mustache script (`#` for a public one). The template is applied to what would have been sent, and its text is sent instead, by the Message queue, Webhook, Azure Blob Storage, Azure Data Lake and Azure Files plug-ins. Set **Content type** to the kind of text it makes, such as `text/csv`: a webhook sends it as the content-type header, and a file gets the matching extension.

The template gets the [item message](#an-item-message) (one message or file per data item) or the [group message](#a-group-message), with two additions:

| Field | What it is |
|-|-|
| `rows` | One row per value, as in a [CSV file](#csv-files): `id`, `code`, `name`, `kind`, `ondate`, `tenor`, `start`, `time` and `value`, plus `text` (the value as text, such as `241.19` or `100`) and `comma` (true on every row but the last). Rows of options also have `expiry`, `strike`, `callput` and `column`, empty on other rows. |
| `comma` on each of `items` | True on every item but the last, for templates that make JSON. |

A CSV file with the system's own columns:

```
curve,tenor,delivery,price
{{#rows}}
{{{code}}},{{tenor}},{{start}},{{text}}
{{/rows}}
```

which makes:

```
curve,tenor,delivery,price
B.TTF,M01,2026-12-01,32.15
B.TTF,M02,2027-01-01,33.4
```

JSON in a shape of your own:

```
{"ondate": "{{ondate}}", "prices": [{{#rows}}
  {"code": "{{{code}}}", "tenor": "{{tenor}}", "price": {{text}}}{{#comma}},{{/comma}}{{/rows}}
]}
```

Tips:

- Use `{{text}}` for values: numbers in the data are read as decimals by the template engine, so `{{value}}` shows `100` as `100.0`.
- `{{name}}` escapes characters such as `&` for HTML. Use three braces, `{{{name}}}`, for text that may hold them.
- The template is applied by the platform, as an automation's transformer is. A template that cannot be applied fails the send, with the reason in the item's message.
- Save the template as a script with the script type **mustache**.

---

## Numbers

Values are sent with up to 6 decimal places, the platform default.

---

## A dry run

Untick **Send** in a group's settings for a dry run: everything is built and counted, nothing is sent and no secret is needed. Each item shows as skipped with the number of values it would have sent, for example `skipped: dry run, 3 values not sent`.

To see what would have been sent, select **Preview** next to the item's message on the **Items** tab of the [daily report](/docs/extensions/integration/report#reading-the-report). It shows the item's message as JSON, its CSV rows for a CSV file, its Event Grid event, its Power BI rows, or the text of the group's [transformer](#transforming-with-a-mustache-template). With **Messages** set to `group` the run sends everything together, so the preview is the item's part of it: the group message with only that item. Long previews are cut short.
