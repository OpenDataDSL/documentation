---
title: Reference
description: Every field of a task tile, the task service REST API, permissions and how the Home page talks to the portal
slug: /extensions/home/reference
sidebar_position: 4
tags: [extension, home, tasks, reference, rest api]
---

# Reference

---

## Task tile fields

| Field | Type | Description |
|-|-|-|
| `_id` | Text | Required. At least one dot, letters, digits, `_`, `-`, `#` and `:`, for example `odsl.home.check-issues` |
| `_type` | Text | Always `VarTaskTile`, set by the service |
| `name` | Text | Required, at most 120 characters |
| `description` | Text | At most 400 characters |
| `group` | Text | `check`, `find`, `build`, `deliver` or another short lower case name. Default `other` (shown as **More tasks**) |
| `icon` | Text | A Bootstrap icon name. Default `check2-square` |
| `priority` | Number | 0 to 100, default 50 |
| `featured` | Boolean | Default true. False: only under **See all tasks** or in a search |
| `enabled` | Boolean | Default true. False: never shown |
| `keywords` | List of text | Extra words the search matches |
| `extension` | Text | The extension that added the task |
| `requires` | List of text | Extension ids that must be installed for the task to show |
| `target` | Object | Required: what the task opens (below) |
| `alerts` | Object | The alerts that belong to the task (below) |
| `properties` | Object | Anything else an extension wants to keep with its task. Keys may not start with `$` |
| `created`, `createdBy`, `updated`, `updatedBy` | | Set by the service |

### target

| Field | For | Description |
|-|-|-|
| `type` | All | `view`, `portal` or `url` |
| `extension`, `view` | view | The extension id and the view's name as the menu shows it (`v.name`), for example `Smart Data` |
| `properties` | view | Properties passed to the view, with `TASK` added (the task id). See [Opening a view with context](/docs/extensions/home/adding-tasks#opening-a-view-with-context) for what each view reads |
| `section`, `name`, `tabname` | portal | The portal screen; `name` is required |
| `url`, `newTab` | url | The address (`https://` or `http://`) and whether it opens in a new tab (default true) |

### alerts

| Field | Description |
|-|-|
| `filter` | The open alerts that belong to the task, as a filter on alert fields, sent as an object or JSON text and kept as JSON text. Default: every open alert. `$where`, `$function`, `$accumulator` and `$expr` are not allowed |
| `sources` | `private`, `common` and `public` (default all three) |
| `followedOnly` | Default true: shared alerts count only for the datasets your team follows |
| `label` | The word for one alert, at most 40 characters (default **open alert**) |
| `okLabel` | Shown when the task has no open alerts, at most 40 characters (default **All clear**) |

Alerts with the tag `task:` followed by the task id also belong to that task.

---

## REST API

The task service holds the tasks of your tenant (it is not split into private and public sources).

| Request | Description |
|-|-|
| `GET task/v1` | Every task. Filter, sort and page with the usual `_filter`, `_sort`, `_limit` and `_skip` |
| `GET task/v1/{id}` | One task |
| `POST task/v1` | Add or replace a task (the whole tile in the body). Tenant admins and OpenDataDSL only |
| `DELETE task/v1/{id}` | Remove a task. Tenant admins and OpenDataDSL only |

A task that breaks a rule is refused with error `6024` and the reason, for example `task Invalid parameter: priority must be a number from 0 to 100`, in the `x-odsl-error` response header.

Saving a task replaces it entirely: send every field you want to keep. Each save keeps the previous copy as a version.

:::note
The task service used to keep personal to-do tasks. They are no longer shown or created: process time-outs now raise an alert (category `process`, issue `timeout`), which counts on **Check for overnight production issues**.
:::

---

## Permissions

| Who | Can |
|-|-|
| Everyone with the `odsl.home.tasks` feature | See the Home page and every task |
| Tenant admins and OpenDataDSL | Add, change and remove tasks |
| Installing an extension | Adds the tasks listed in its `e.resources.task` |

The extension installs the feature policy `extension.odsl.home` for everyone. A task opens a screen the user still needs access to: the screen itself checks its own feature.

---

## The view and the portal

The Home page is the extension view `tasks` (**Information > Tasks**), flagged `home = true` so the portal can show it as its home screen.

To open a task, the page calls the portal's `window.top.odslNavigate` with `{tile, name, target}`. The portal answers `true` when it opened the target and `false` when it could not (the extension is not installed in this environment, or the user cannot use the screen), directly or as a Promise; on `false` the page shows a message, and opens a web page target itself in a new tab. On an older portal without the function the page sends a cancelable `odslNavigate` event on the portal page instead, and if nothing handles it, opens an extension view in place and a web page in a new tab. See [Views](/docs/extensions/building/manifest#views) for the `home` flag.
