---
title: Reference
description: Where the Projects extension keeps projects, tasks and documents, the reminder process, view properties and the extension contents
slug: /extensions/project-tracker/reference
sidebar_position: 10
tags: [extension, projects, reference]
---

# Reference

---

## Where the data is kept

| What | Service | Id |
|-|-|-|
| Projects | Private object collection `project` (`object/v1/project`) | The project code, such as `NORTHGATE` |
| Defaults for new projects | The same collection | `SETTINGS` |
| Plan templates | The same collection | `TEMPLATE-` and the template name, such as `TEMPLATE-NORTHGATE-PLAN` |
| Tasks, with their activity logs | Private object collection `project_task` (`object/v1/project_task`) | The project code and a number, such as `NORTHGATE-18` |
| Documents | Private documentation service (`documentation/v1/private`) | `odsl.project:<project code>:<document name>` |
| Late task alerts | Private alerts (`alert/v1/private`), category `project` | Key `project/<project code>/<task id>/late` |
| Reminder process | Process `PROJECT_REMINDERS` | |
| Projects added from other tenants | The `project` collection, `kind: link` | `LINK-` the tenant id, the environment and the project code, such as `LINK-0b1c-production-NORTHGATE` |

---

## Project

| Field | What it is |
|-|-|
| `_id` | The project code |
| `name`, `client`, `description` | Its name, client and description |
| `status` | `planning`, `active` (In progress), `onhold`, `complete` (Live) or `cancelled` |
| `start`, `golive` | Start and target go-live, `yyyy-MM-dd` |
| `owner` | The project owner's email |
| `workstreams` | `[{id, name, colour, lead}]` in display order |
| `parties` | `[{id, name, kind}]`, kind `provider`, `client`, `implementor`, `vendor` or `other` |
| `people` | `[{name, email, party, role}]` |
| `docs` | The project's documents, `[{name, title, created, createdBy, updated, updatedBy}]` |
| `reminders` | `{enabled}` |
| `changes` | The last 50 changes to the project, `[{at, by, what}]` |
| `sharedWith` | The partner tenants the project is shared with, `[{tid, name}]` |
| `private` | `true`: OpenDataDSL cannot open the project; only its own tenant and the partners in `sharedWith` can. Only the own tenant can set it |

---

## Task

| Field | What it is |
|-|-|
| `_id`, `number`, `project` | Its id, number and project code |
| `workstream`, `party`, `assignee` | The work stream id, party id and the assigned person's email |
| `title`, `description` | Its name and markdown description |
| `status` | `notstarted`, `inprogress`, `blocked`, `review`, `done` or `cancelled` |
| `priority` | `low`, `normal`, `high` or `critical` |
| `start`, `due`, `completed` | Dates, `yyyy-MM-dd`; `completed` is set when the task is done |
| `progress` | 0 to 100 |
| `milestone` | true for a milestone |
| `dependsOn` | The ids of the tasks it waits for |
| `docs` | The names of its linked documents |
| `lastReminded` | The day of the last reminder, `yyyy-MM-dd` |
| `evidence` | The evidence and sign-off, when the task needs them (see below) |
| `log` | The activity log (the last 500 entries) |

An activity log entry has `id`, `at` (date and time), `by` (email, empty for the reminder process), `kind` (`comment`, `email`, `call`, `meeting`, `decision`, `reminder`, `change`, `doc`, `evidence` or `signoff`) and `text`, and can have `to`, `subject`, `field`, `before`, `after` and `doc`. A date change has `field: dates` and `before` and `after` as `start/due`.

### Evidence

`evidence` is `{required, signOffBy, items, signOff}`:

| Field | What it is |
|-|-|
| `required` | true when the task needs evidence and a sign-off |
| `signOffBy` | The email of the person responsible for the sign-off |
| `items` | `[{id, type, ref, label, days, points, added, addedBy, planned, plannedBy, note}]`. An item with an empty `ref` is prepared: its `type` and `label` (and `note`, `planned`, `plannedBy`) are set and the evidence is still to provide; providing it sets `ref`, `added` and `addedBy`. `type` is `feed` (`ref` a dataset feed `PROVIDER.FEED`, `days` 1 to 31), `data` (`ref` a curve, timeseries or options id, `points` 10 to 1000), `integration` (`ref` an integration system id such as `INTEGRATION.MOLECULE`, `days` 1 to 31) or `doc` (`ref` a project document name) |
| `signOff` | null, or `{status, by, at, comment, items}`: `status` is `signed` or `rejected`, and `items` lists what was signed off as `type\|ref\|days` (or `\|points`) |

The evidence is read with the normal services: `dataset/v1/info` and `dataset/v1/delivery` for a feed; `data/v1/{source}/ID?_raw=true`, then `?_range=last(n)` for a timeseries, or for a curve or options its ondates with `?_range=last(90)` and the curve with `ID:ONDATE` (the ondate chosen) or `ID:-ONDATE?_ondate=today` (the latest); the integration system's object, the `group/v1` groups with `integration.systemId`, and the stored `report/v1/private/INTEGRATION_...` reports of each day. For data with an id `RECORD:ITEM` the item's own documentation is read too: `documentation/v1/private/object:RECORD:ITEM`, as Smart Data's Documentation tab writes it. Charts use the platform's Highcharts partial `#odsl-highcharts`.

A task is at **Evidence provided** only when it has evidence and none of it is still to provide; until then it is at **No evidence** (the screen shows how much is provided). The task screen only offers **Sign off** and **Reject** to the person in `signOffBy`, and **Sign off** only when nothing is still to provide. For a project of another tenant, the `projectshare` service also enforces it: a sign-off can only be added or changed by the person in `signOffBy` (not changed in the same save) under their own name, a sign-off is refused while any item is still to provide, and a sign-off is cleared when the evidence items, the person or `required` change. `evidence` refuses an item that is still to provide.

---

## Reminder process

The process `PROJECT_REMINDERS` runs the script `odsl-extensions\extensions\project_tracker\odsl.project_tracker.reminders`. Its input:

| Input | Default | What it does |
|-|-|-|
| `remindDays` | 3 | Days before the due date to send one reminder |
| `overdueEvery` | 2 | Days between reminders while a task is late |
| `agent` | `client` | Who the late task alerts are with |
| `email` | true | false sends no emails, only the alerts and the activity log entries |
| `today` | Today | Runs the check as if it were another day, `yyyy-MM-dd` |
| `task` | | Reminds about this one task now, whatever its dates (the **Send reminder** button) |
| `note`, `by` | | The message and the sender's email for a `task` reminder |

The emails use the template `odsl-extensions\extensions\project_tracker\odsl.project_tracker.email`.

---

## Projects of other tenants

An added project is a record in your own `project` collection with `kind: link`, `tenant`, `tenantName`, `environment`, `code`, `name`, `client`, `added` and `addedBy`. The project, its tasks and its documents stay in their own tenant, and the screen reads and writes them through the `projectshare` service:

| Function | Method | Parameters | What it does |
|-|-|-|-|
| `tenants` | GET | | `{mode, tenants: [{tid, name}]}`: `mode` is `opendatadsl` (any tenant), `partner` (the client tenants set up for it) or `none` |
| `partners` | GET | | The partner tenants allowed to work on your projects, `[{tid, name}]` |
| `environments` | GET | `tenant` | The tenant's environments |
| `projects` | GET | `tenant`, `environment` | The tenant's projects you can open |
| `get` | GET | `tenant`, `environment`, `coll` (`project`, `task` or `doc`), `id`, `project` for a doc | One record |
| `list` | GET | `tenant`, `environment`, `coll=task`, `project`, `light` | A project's tasks; `light=true` leaves out the logs and descriptions |
| `save` | POST | `tenant`, `environment`, `coll`; the record as the body | Saves a project, task or document. A partner cannot change `sharedWith` or `reminders` |
| `delete` | POST | `tenant`, `environment`, `coll` (`task` or `doc`); `{_id, project}` as the body | Deletes a task or document. Projects cannot be deleted |
| `subscribe`, `unsubscribe` | POST | `tenant`, `environment` (left out for your own project); `{_id: SignalR connection id, project}` as the body | Joins or leaves the project's realtime group. Answers `{group, live}` |
| `notify` | POST | `tenant`, `environment` (left out for your own project); `{_id: project code, kind, id, action, connection}` as the body | Tells the people with the project open what was just saved: `kind` is `project`, `task` or `doc`, `action` is `save` or `delete` |
| `evidence` | GET | `tenant`, `environment`, `project`, `task`, `item`, `ondate` (optional, `yyyy-MM-dd`, for a curve or options) | Reads one evidence item of the task in the client's tenant: `{type, ref, ...}` with the datasets and deliveries, the data (for a curve or options also `ondates`, the latest 90 newest first, and the `ondate` asked for; for an id `RECORD:ITEM` also `doc`, the item's documentation), the integration reports or the document. Only items attached to the task can be read |
| `evidenceOptions` | GET | `tenant`, `environment`, `project`, `kind` (`feeds`, `systems` or `data`), `q` | What can be attached as evidence in the client's tenant: its dataset feeds, its integration systems, or up to 25 curves, timeseries and options whose id contains `q` |

For example `GET projectshare/v1?_function=list&tenant=<tid>&environment=production&coll=task&project=NORTHGATE`.

Realtime updates use the platform's SignalR hub. Everyone with a project open is in the group `project:<tenant database>:<environment>:<project code>`, whichever tenant they work from, and receives `OnProjectChange` messages `{changes: [{group, project, kind, id, action, by, at, connection}]}`. A message only says what changed and who changed it; the screen then reads the record again through the normal calls, which check access. `subscribe`, `unsubscribe` and `notify` work on your own projects too, when `tenant` is left out. A partner can open a project only when its tenant has the client in its `PROJECT_CLIENTS` tenant setting (set by OpenDataDSL in the Tenant Manager) and the project's `sharedWith` names its tenant. A project with `private: true` is open only to the partners in its `sharedWith`: for OpenDataDSL it is not listed and every call about it (`get`, `list`, `save`, `delete`, `subscribe`, `notify`) is refused with 403. A save from another tenant cannot set or clear `private`. Saved records are versioned in the client's tenant, under the caller's name.

---

## Opening the screen with context

A Home page task or a link can open the Projects screen with these properties:

| Property | Values |
|-|-|
| `PROJECT` | A project code |
| `TAB` | `overview`, `tasks`, `gantt`, `docs`, `evidence`, `people`, `insights` or `settings` |
| `TASK` | A task id: opens its project and the task panel |
| `SHOW` | `mine`, `late`, `soon` or `blocked`: the Tasks tab with that filter |
| `ACTION` | `newproject`, or `newtask` (with `PROJECT`) |

---

## Extension contents

| Item | Id |
|-|-|
| Extension | `odsl.project_tracker` |
| Menu item | **Manage > Projects** (view script `odsl.project_tracker.manage`) |
| Feature policy | `extension.odsl.project_tracker` |
| Security policies | `Projects` (object/project), `ProjectTasks` (object/project_task), `ProjectDocuments` (documentation, private) |
| Insight | `odsl.project_tracker.status`, Project Status, category `odsl.project_tracker`. The screen's **Insights** tab lists every insight report of that category (`reportconfig/v1/all`) and runs the chosen one as a page (`report/v1/{source}/{id}`, Accept `text/html`) with the properties `ID` and `PROJECT` (the chosen project's code, or the link id of a project of another tenant). The view sets `insights = false`, so the portal does not add its own Insights tab |
| Home page tasks | `odsl.project_tracker.late`, `odsl.project_tracker.mine`, `odsl.project_tracker.new` |
| Scripts | `odsl.project_tracker.common`, `.gantt`, `.manage`, `.insight.status`, `.reminders`, `.email` |

To limit who can see or change projects, change the members of the security policies. The `ProjectDocuments` policy gives access to all private documentation records.
