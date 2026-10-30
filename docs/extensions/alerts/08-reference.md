---
title: Reference
description: Alert fields, timeline entries, ids, who can do what, and what the Alerts extension installs
slug: /extensions/alerts/reference
sidebar_position: 8
tags: [extension, alerts, reference]
---

# Reference

---

## Alert fields

| Field | Type | Meaning |
|-|-|-|
| `_id` | Text | `ALR-` and the year and a number for your alerts (`ALR-2026-000401`); `ALC-` for common and `ALP-` for public alerts |
| `title` | Text | Short description |
| `message` | Text | What is wrong |
| `description` | Text | More detail (optional) |
| `category` | Text | A grouping, such as `dataset`, `curve` or `system` |
| `issue` | Text | The type: `delivery`, `completeness`, `quality`, `metadata`, `corrections`, `build`, `export` or another |
| `severity` | Text | The priority: `critical`, `high`, `medium` or `low` |
| `status` | Text | `open` or `closed` |
| `agent` | Text | Who it is with: `client` (your team), `opendatadsl`, or a data vendor's name |
| `subject` | Object | What it is about: `service` (dataset, curve, data, process and so on), `id`, and `ondate` (the delivery or build date) |
| `key` | Text | The id of the problem, used to count repeats instead of raising new alerts |
| `occurrences` | Number | How many times it was raised while open |
| `lastOccurred` | Date | When it was last raised |
| `tags` | List | Your own labels |
| `assignee` | Text | Who is working on it (optional) |
| `resolution` | Text | What was wrong and what was done, set when closed |
| `created`, `updated`, `closed` | Object | `at` (date) and `by` (who) |
| `relatedTo` | Text | An earlier closed alert with the same key, if any |
| `origin` | Object | `type`: `system` (raised by the platform) or `user` |
| `commentCount` | Number | Comments on the alert |
| `tenantCommentCount` | Number | On shared alerts: your team's comments |
| `metrics` | Object | Times in seconds: `openSeconds`, `secondsClient`, `secondsOpenDataDSL`, `secondsVendor`; `reopens`, `handoffs`, `agentSince` (when the current party got it) and `firstResponseAt` |
| `timeline` | List | Everything that happened (see below). On shared alerts, your team's comments are only included when one alert is read |
| `environment` | Text | Your alerts: the data environment |
| `_version` | Number | Goes up with every change; send it back to make sure nobody changed the alert meanwhile |

---

## Timeline entries

Every entry has `id`, `type`, `at` and `by`.

| Type | Extra fields | Meaning |
|-|-|-|
| `created` | `status`, `agent`, `severity` | Raised |
| `comment` | `text`; `editedAt`, `deleted` | A comment. On shared alerts your team's comments have `scope: tenant` and an id starting `t-` |
| `comment-edited` | `ref`, `text` | A comment was edited (`ref` is the comment's id) |
| `comment-deleted` | `ref` | A comment was deleted |
| `status` | `from`, `to` | Closed or reopened |
| `agent` | `from`, `to` | Handed over |
| `severity` | `from`, `to` | Priority changed |

---

## Who can do what

| | Your alerts | Shared alerts |
|-|-|-|
| See | Your company's alerts in the environment you work in | Every shared alert |
| Raise | Yes | No (OpenDataDSL only) |
| Comment | Yes | Yes, seen only by your company and OpenDataDSL |
| Close, reopen, hand over, change priority or details | Yes | No (OpenDataDSL only) |
| Edit or delete a comment | Its author, an administrator of your company, or OpenDataDSL | The same, for your company's comments |
| Delete an alert | Administrators of your company | No |

These rules are applied by the platform, whichever way you work: the screen, ODSL, Python or the REST API. Companies on the none plan do not have alerts.

---

## What the extension installs

| Item | Id | What it does |
|-|-|-|
| Menu item | **Operations > Alerts** | The Alerts screen |
| Feature policy | `extension.odsl.alerts` | Who sees the menu item (everyone by default) |
| Security policy | `AlertsPrivate` | Read, raise, change and delete your alerts (category Alerts, source private, service alert) |
| Security policies | `AlertsCommon`, `AlertsPublic` | Read shared alerts and comment on them |
| Insight | `odsl.alerts.audit` | The [Alert Audit Report](/docs/public/insights/alert-audit-report), in the screen's **Insights** (category `odsl.alerts`) |

Without the security policies nobody in your company can see alerts, in the screen or through the API. To limit who works on alerts, change the members of these policies (for example to a group) in the portal's security settings.

The screen also reads your datasets (to know which you follow) and your dataset deliveries (for the delivery card), with your existing permissions on those services.

---

## Related

- [Alert REST service](/docs/api/rest/service/alert)
- [Alert service in ODSL](/docs/odsl/service/alert)
- [Automations basics](/docs/topics/automations/basics)
- [Dataset delivery REST service](/docs/api/rest/service/dataset_delivery)
