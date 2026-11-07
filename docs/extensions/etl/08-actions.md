---
title: The ETL actions
description: The standard private actions every data loader's workflow runs (etl_extract, etl_transform, etl_load and etl_report), their inputs, outputs and exits, and using them in your own workflows
slug: /extensions/etl/actions
sidebar_position: 8
tags: [extension, data loaders, etl, actions, workflow, odsl]
---

# The ETL actions

Installing the extension adds four private actions, category `etl`. Every loader's workflow uses them, and you can use them in your own workflows in the [Workflow Manager](/docs/extensions/workflow-manager/overview), for example to check a dataset before loading or to email the team after. Each takes the loader settings as `loader`, the object the process passes to the workflow (see [Reference](/docs/extensions/etl/reference)).

---

## etl_extract

Reads the rows of a CSV, JSON, XML or Excel source, or a table of a web page (`source.selector`), from its URL, filling in the dates, the variables (once for each set) and the secrets.

| | Name | Notes |
|-|-|-|
| In | `loader` | The settings; uses `source`. |
| In | `ondate` | Optional, `yyyy-MM-dd`: the date for the placeholders. Default today. |
| In | `maxSets` | Optional: read only the first sets of variables. |
| Out | `rows`, `count` | The rows of every set and how many. |
| Out | `url`, `requests` | The first URL read, with secrets shown as `****`, and how many times the source was read. |
| Out | `started`, `message` | When the run started, why it failed. |
| Exits | `ok`, `failed` | |

---

## etl_transform

Turns rows into events with the loader's mapping, conditions, event id and `_dsid`.

| | Name | Notes |
|-|-|-|
| In | `loader`, `rows`, `ondate` | `ondate` is optional. |
| Out | `events`, `count` | The events made. |
| Out | `skipped`, `problemCount`, `problems` | Rows left out, rows with problems, and the first 20 problems. |
| Out | `message` | Why it failed. |
| Exits | `ok`, `empty`, `failed` | `empty`: no events and no problems. |

---

## etl_load

Saves events to the event list `target.list` of the record `target.object`, 500 at a time.

| | Name | Notes |
|-|-|-|
| In | `loader`, `events` | |
| Out | `saved`, `list`, `message` | Events saved, the list as `RECORD:LIST`, why it failed. |
| Exits | `ok`, `failed` | |

---

## etl_report

Adds the run to the day's run report `ETL_<CODE>:<date>` and raises or closes the loader's alert.

| | Name | Notes |
|-|-|-|
| In | `loader`, `status` | `status`: success, empty or failed. |
| In | `started`, `url`, `extracted`, `events`, `skipped`, `problemCount`, `problems`, `saved`, `stage`, `message`, `ondate` | All optional. |
| Out | `report` | The id of the stored report. |
| Exits | `ok`, `failed` | `failed` when the report could not be saved. |

:::caution
Uninstalling the extension deletes the four actions, so every deployed loader would fail. Delete or move the loaders first.
:::
