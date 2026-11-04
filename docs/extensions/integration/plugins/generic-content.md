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

Each curve or timeseries becomes one item message:

```json
{
  "id": "NGE.GAS.TTF:MID",
  "code": "Q.TTF",
  "name": "TTF gas forward curve",
  "kind": "curve",
  "ondate": "2026-11-03",
  "group": "NGE_CURVES",
  "system": "Message queue",
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
| `name`, `kind` | The item's name, and `curve` or `timeseries`. |
| `ondate` | The date the run sends. |
| `group`, `system` | The group and the system name. A copy of a plug-in sends its own name. |
| `values` | A curve: the contracts of the curve for the ondate, each with `tenor`, `start` and `value`. A timeseries: its values, each with `time` (such as `2026-11-01T00:00:00`) and `value`. |

Items with no values are skipped and not sent.

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
  "part": 1,
  "parts": 1,
  "count": 2,
  "items": [ ... ]
}
```

`created` is when the run started (UTC). A group with more items than **Most items in one message** is sent in several messages, numbered by `part` of `parts`. JSON files hold the same, always as one part.

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

---

## File names

**File name** is a pattern, `{group}_{yyyymmdd}.{ext}` unless you change it. A `/` in it makes folders.

| Token | Becomes |
|-|-|
| `{system}`, `{group}` | The system and group names, with characters other than letters, digits, `.`, `_` and `-` replaced by `_`. |
| `{ondate}` | The ondate, such as `2026-11-03`. |
| `{yyyymmdd}`, `{yyyy}`, `{mm}`, `{dd}` | The ondate, or its year, month or day. |
| `{run}` | When the run started, such as `20261104080500`: a file per run. |
| `{code}` | The item's code, with one file per item. When the pattern has no `{code}`, `_{code}` is added before the extension. |
| `{ext}` | `csv` or `json`. |

---

## Numbers

Values are sent with up to 6 decimal places, the platform default.

---

## A dry run

Untick **Send** in a group's settings for a dry run: everything is built and counted, nothing is sent and no secret is needed. Each item shows as skipped with the number of values it would have sent, for example `skipped: dry run, 3 values not sent`.
