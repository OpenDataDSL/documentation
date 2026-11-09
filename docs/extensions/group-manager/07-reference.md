---
title: Reference
description: Where groups are kept, the group fields, the calls Group Manager makes, permissions and the extension contents
slug: /extensions/group-manager/reference
sidebar_position: 7
tags: [extension, group manager, reference, rest, permissions]
---

# Reference

---

## Where groups are kept

Groups are kept by the group service (`group/v1`, one source per tenant, versioned). A group is identified by its `_id` or by `service:type:category:name`. See the [Group service](/docs/api/rest/service/group) and [Group in ODSL](/docs/odsl/variable/group).

| Field | Type | Notes |
|-|-|-|
| `name`, `description` | String | |
| `service`, `type`, `category` | String | Together with the name, unique for the owner |
| `shared` | Boolean | Seen by everyone when true, otherwise only by `owner` |
| `dynamic` | Boolean | True when the members are found by `dynamicOptions` |
| `items` | List | The members of a static group |
| `dynamicOptions` | Object | `service`, `source`, `field`, `filter`, `objectFilter` or `aggregation` |
| `calendar`, `cron`, `timezone`, `offset`, `useLatest`, `script`, `expression` | | Curve build groups |
| `script`, `checks` | | Quality groups; each check has `name` and `expression` |
| `approvers`, `version` | | Approval groups |
| `enabled`, `cron`, `calendar`, `offset`, `version`, `script`, `expression` | | Export groups |
| `integration` | Object | Lists sent by the Integration extension |

---

## Calls Group Manager makes

| What | Call |
|-|-|
| List groups | `GET group/v1` |
| Save a list or policy user group | `POST group/v1?_replace=true` with the whole group |
| Save a curve group | `POST curve/v1/group/{type}` |
| Members of a dynamic group | `GET group/v1/{id}` with `items` in `_project` |
| Versions | `GET group/v1/{id}/*` and `GET group/v1/{id}/{version}` |
| Delete | `DELETE group/v1/{id}/*` |
| Curves in a curve group | `GET curve/v1/info` filtered on the group field; changed with `POST curve/v1/info` |
| Run now | `POST curve/v1/{group}/{ondate}?_function=cutoff`, `check`, `export` or `approve` |
| Policies of a policy group | `GET policy/v1` filtered on `members`; changed with `POST policy/v1` |

Saves always send the whole group with `_replace`, so removed items and fields are really removed.

---

## Permissions

What you can see and change is decided by the platform: unshared groups of other people are not listed, and saves are checked by the group, curve and policy services. Showing a button does not give a right the platform refuses; its reason is shown when a save fails.

---

## Extension contents

| Item | Id |
|-|-|
| Extension | `odsl.group_manager` |
| Feature policy | `extension.odsl.group_manager` (features `odsl.group_manager.manage`, `.master_data`, `.data`) |
| Views | Group Manager (Manage menu), Groups tab on the Master Data and Data screens |
| Insight | `odsl.group_manager.groups` |
| Home page tasks | `odsl.group_manager.new`, `odsl.group_manager.people`, `odsl.group_manager.checks` |

A Home page task or link can open Group Manager with properties: `GROUP` (a group id or `service:type:category:name`), `TAB` `checks`, `ACTION` `new` and `KIND` (`list`, `policy`, `build`, `quality`, `approval`, `export`).
