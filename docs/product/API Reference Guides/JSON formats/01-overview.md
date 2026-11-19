---
title: JSON formats
description: The conventions shared by the JSON of every data entity in the REST API
slug: /api/json/overview
sidebar_position: 1
tags:
  - api
  - json
  - reference
---

# JSON formats

Every entity you read from or send to the [REST API](/docs/api/rest/standards) is a JSON document. These pages describe the format of each one: the fields, their types, which fields are required when you save, which are set by the platform, and an example.

This page covers the conventions that all the entities share. The other pages cover the entities, grouped by area:

| **Page** | **Entities** |
|-|-|
| [Master data and types](./master-data) | Object, Type, references, links, currency pairs |
| [Timeseries](./timeseries) | TimeSeries, smart, event, metric and composed timeseries |
| [Curves](./curves) | Curve, contracts, smart, event and composed curves, curve dates, curve series, curve management |
| [Events](./events) | Event, event list |
| [Matrices and options](./matrix-and-options) | Matrix, option chains, event options |
| [Calendars](./calendars) | Calendar, holiday calendar, expiry calendar |
| [Processes and scripts](./processes-and-scripts) | Process, process execution, script, action, workflow, transformer, extractor, batch, task, queue, and their logs |
| [Automations](./automations) | Automation, automation target, automation log |
| [Reports and dashboards](./reports) | Report configuration, report, report creator, dashboard |
| [Datasets and data quality](./datasets-and-quality) | Dataset, dataset feed, dataset delivery, correction, validation configuration, validation record, alert |
| [Fusion AI](./fusion-ai) | Agent, assistant, playbook, task, run, tool, conversation, usage, feedback |
| [Platform and security](./platform) | Policy, group, list, secret, setting, documentation, extension, index, environment, tenant, user, and the read-only logs |

---

## The id and the type

Most entities have an `_id` and a `_type`.

| **Field** | **What it is** |
|-|-|
| `_id` | The id of the entity. For most services you choose it. Some services make it for you: an object id (24 hexadecimal characters) for automations, lists, groups and tasks, a UUID for process executions and batches |
| `_type` | The kind of entity, for example `VarTimeSeries`, `VarCurve`, `VarProcess` or `VarScript`. For master data objects it is the [type](./master-data#type) of the object, for example `#Object` or `#ForeignExchange` |

The platform uses `_type` to read the JSON, so send it whenever the entity has one. A curve sent without `"_type": "VarCurve"` inside an object is saved as plain properties, not as a curve.

Ids that start with `#` are public (shared by OpenDataDSL). All other ids are private to your company. See [Sources](/docs/api/rest/standards#sources).

---

## Fields that start with an underscore

Fields whose names start with `_` are kept for the platform. You can read them, but most of them are set for you when you save.

| **Field** | **Type** | **Set by** | **What it is** |
|-|-|-|-|
| `_id` | String | You or the platform | The id |
| `_type` | String | You | The kind of entity |
| `_oid` | String | Platform | On versioned entities: the id of the item. On the live version it is the same as `_id`; an older version has its own `_id` and keeps the item id in `_oid` |
| `_version` | Integer | Platform | The version number, starting at 1 |
| `_user` | String | Platform | Who saved this version (an email, or `system`) |
| `_timestamp` | DateTime | Platform | When this version was saved |
| `_tag` | String[] | Platform | The tags on this version, see [Versions and tags](/docs/api/rest/standards#versions-and-tags) |
| `_invocationId` | String | Platform | The id of the request that saved this version |
| `_created`, `_updated` | DateTime | Platform | When some unversioned entities were created and last changed |
| `_links` | Object | You | Links to other entities, see [Links](./master-data#links) |
| `_access` | String | You | A data role used by security policies on master data |
| `_objid`, `_dataid`, `_objtype` | String | Platform | On data (timeseries, curves, events): the object id, the data id within the object and the object type |
| `_identity` | Object | You | On data: external codes for the item, see the [Data service](/docs/api/rest/service/data#identities) |

When you save an entity, leave the version fields out, or send them back as you read them: the platform replaces them.

---

## Dates and times

| **Kind** | **Format** | **Example** |
|-|-|-|
| A date | `yyyy-MM-dd` | `"2026-11-18"` |
| A date and time | ISO 8601, in UTC | `"2026-11-18T17:30:00"` or `"2026-11-18T17:30:00Z"` |
| A curve date | An object with the date and its expiry calendar | `{"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"}` |
| A duration | ISO 8601 duration, see [Durations](/docs/kb/duration) | `"PT1H"`, `"P14D"` |
| A schedule | The platform cron format, see [Cron](/docs/kb/cron) | `"30 18 * * 1-5 * Europe/London"` |

Responses write dates as strings. Some stored records are returned in MongoDB extended JSON, for example `{"$date": "2026-11-18T17:30:00Z"}` for a date or `{"$oid": "6721f0c2a4b9e85d3c0f1a77"}` for an object id. The platform accepts both forms when you send them back.

---

## Numbers and missing values

Numbers are JSON numbers. A missing value is sent and returned as the string `"NaN"` (a timeseries value, a curve contract value, a matrix cell). In some responses a missing number is `null`.

Data entities keep the number of decimal places given by their `precision`:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `scale` | Integer | The number of decimal places, defaults to 6 |
| `roundingMode` | String | `UP`, `DOWN`, `CEILING`, `FLOOR`, `HALF_UP` (the default), `HALF_DOWN`, `HALF_EVEN` or `UNNECESSARY` |
| `useDefault` | Boolean | Use the platform's default settings, defaults to true |
| `store` | Boolean | Store the rounded number instead of the raw number, defaults to false |

```json
"precision": {"roundingMode": "HALF_UP", "scale": 4, "useDefault": false, "store": false}
```

---

## Status

Timeseries values, curves and contracts and events carry a status: what is known about the quality of the value. Each part is a word, optionally followed by a colon and a note.

| **Part** | **Values** | **Default** |
|-|-|-|
| `quality` | `UNCHECKED`, `VALID`, `FAILED`, `NIC` | `UNCHECKED` |
| `source` | `NEW`, `CHANGED`, `IMPLIED`, `FILLED`, `CONVERTED`, `CALCULATED`, `SUBSTITUTED` | `NEW` |
| `reliability` | `UNKNOWN`, `QUOTED`, `OBSERVED`, `UNOBSERVED` | `UNKNOWN` |
| `processed` | `UNPROCESSED`, `STAGE1`, `STAGE2`, `WAITING`, `FAILED`, `BUILT`, `COMPLETE` | `UNPROCESSED` |

Parts that have their default value are left out, so an unchecked value has an empty status `{}`.

```json
"status": {"quality": "VALID:Tested for missing and spikes", "source": "CALCULATED"}
```

See [Status](/docs/kb/status) for what each value means.

---

## Encoded scripts

The source code of scripts, actions, workflows, transformers and extractors is sent and returned in the `script` field encoded as Base64 (UTF-8). Expression and method properties of a type are encoded the same way. Decode the field to read the code, and encode it before you save.

---

## Saving: merge or replace

Saving an object merges what you send into the saved object, so you can send just the fields you want to change. Add the `_replace=true` query parameter to replace it completely. For other services, check the service page: most replace the entity with what you send.

---

## Where next

- [Master data and types](./master-data)
- [Timeseries](./timeseries)
- [Curves](./curves)
- [Standards and conventions](/docs/api/rest/standards) for the REST API itself
