---
title: Data Explorer reference
description: Properties, where the Data Explorer keeps things, the platform calls it makes, permissions and troubleshooting
slug: /extensions/data-explorer/reference
sidebar_position: 8
tags: [extension, data explorer, reference]
---

# Data Explorer reference

---

## Opening it with properties

A Home page task or a link can open the Data Explorer ready for a job with view properties:

| Property | What it does |
|-|-|
| `ITEM` | Opens this data item (a curve, timeseries, options or event list id) |
| `RECORD` | Opens this master data record |
| `ITEM_TAB` | The tab to open it on, such as `history`, `smile` or `surface` |
| `SOURCE` | `private` or `public` |
| `MODE` | `data` or `records` |
| `KIND` | `curve`, `timeseries`, `options`, `matrix` or `eventlist`: data of this kind only |
| `SEARCH`, `TEXT` | The search text, and Id contains |
| `GROUP` | A group id or name: its members are listed |
| `TAB` | `board`: opens the chart board |
| `TOUR` | `true` starts the tour, `false` never shows it (it is otherwise shown on a first visit) |

---

## Where things are kept

| What | Where |
|-|-|
| Saved views, saved boards, the board, pinned groups, recent items, table or cards, whether you have seen the tour | Your settings: setting service, name `Data Explorer` (your own; nobody else sees them) |
| What the finder shows | This browser (local storage) |
| Starred items | Your own groups, type `favourite`, category `Data Explorer`, named `Favourite data of` or `Favourite master data of` your email, not shared |
| Groups you make | The group service, type `favourite`, the category you chose |
| Dynamic groups | `dynamicOptions`: `service` (`data` or `object`), `source`, `filter` (on the data items, as JSON text) and `objectFilter` (on their master data, as JSON text) |
| Automations | The automation service, owned by you |

---

## Platform calls

| Purpose | Call |
|-|-|
| Data | `GET data/v1/{private or public}` with `_filter` (kinds, data properties, id), `_objfilter` (master data filters), `_search`, `_sort`, `_skip`, `_limit`, `_count=true` |
| Master data | `GET object/v1/{private or public}` with `_filter`, `_search` |
| Filter values | `_distinct` on `object/v1` (dimensions, filtered by the filters before) and `data/v1` (data properties) |
| A curve | `GET data/v1/{source}/ID:-ONDATE?_ondate=DATE` (on or before), `ID:YYYY-MM-DD` |
| Its ondates | `GET data/v1/{source}/ID?_range=last(90)` |
| A tenor history | `GET data/v1/{source}/ID:TENOR?_range=...` |
| A timeseries | `GET data/v1/{source}/ID?_range=from(...)` |
| Options | `GET data/v1/{source}/OPTIONS_ID:-ONDATE?_ondate=DATE`; one option's history `OPTIONS_ID:TENOR:STRIKE:C:COLUMN` |
| A matrix | `GET data/v1/{source}/ID:-ONDATE?_ondate=DATE` (on or before), `ID:YYYY-MM-DD`; its ondates `ID?_range=last(90)`, as a curve's |
| Groups | `GET group/v1`, `GET group/v1/ID` (members), `POST group/v1?_replace=true` |
| Automations | `GET data/v1/{source}/ID?_function=listAutomations`, `POST automation/v1` |
| Other extensions | `GET extension/v1/private` (their views and `configuration.data_explorer`), `GET extension/v1/private/EXT/view/VIEW?_properties=...` |

---

## Permissions

The Data Explorer shows only what the platform lets you read. Groups you can see are your own and the shared ones. Adding to a group changes it for everyone who uses it. Tabs and actions from other extensions follow those extensions' own rules (for example editing needs the update right).

---

## Extension contents

| Part | Name |
|-|-|
| Extension | `odsl.data_explorer` |
| View | **Data Explorer** in the Information menu |
| Feature policy | `extension.odsl.data_explorer` (feature `odsl.data_explorer.manage`) |
| Home page tasks | **Find data**, **Chart and compare curves**, **Look at option chains and volatility smiles** |

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| A search with `field=value` lists fewer items than expected | It was checked on at most 1000 master data records: add a filter to narrow it |
| A tab from another extension says it could not be opened | That extension's view could not be shown here; open it from its own menu item |
| **There is no curve before ...** | The curve has no ondate before the one shown, so there is nothing to compare with |
| **There is no matrix ...** | The matrix has no ondate on or before the one asked for, or none before it to compare with |
| No smiles for a value | That column has no values for the tenors chosen; choose another value or side |
| A group is not offered in Add to group | It is dynamic, of the other service (data or master data), or not shared with you |
| Starred items are gone on another computer | They are not: starred items are a group; the finder state is what stays on the browser |
