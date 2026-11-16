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
| `log` | The activity log (the last 500 entries) |

An activity log entry has `id`, `at` (date and time), `by` (email, empty for the reminder process), `kind` (`comment`, `email`, `call`, `meeting`, `decision`, `reminder`, `change` or `doc`) and `text`, and can have `to`, `subject`, `field`, `before`, `after` and `doc`. A date change has `field: dates` and `before` and `after` as `start/due`.

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

## Opening the screen with context

A Home page task or a link can open the Projects screen with these properties:

| Property | Values |
|-|-|
| `PROJECT` | A project code |
| `TAB` | `overview`, `tasks`, `gantt`, `docs`, `people` or `settings` |
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
| Insight | `odsl.project_tracker.status`, Project Status |
| Home page tasks | `odsl.project_tracker.late`, `odsl.project_tracker.mine`, `odsl.project_tracker.new` |
| Scripts | `odsl.project_tracker.common`, `.gantt`, `.manage`, `.insight.status`, `.reminders`, `.email` |

To limit who can see or change projects, change the members of the security policies. The `ProjectDocuments` policy gives access to all private documentation records.
