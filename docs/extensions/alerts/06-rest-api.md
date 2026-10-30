---
title: Alerts REST API
description: List, read, raise, change, comment on and close alerts with the alert REST service
slug: /extensions/alerts/rest-api
sidebar_position: 6
tags: [extension, alerts, api, rest]
---

# Alerts REST API

Everything the Alerts screen does goes through the [alert service](/docs/api/rest/service/alert), so you can do the same from any language. Send your token in the `Authorization` header as for every [REST call](/docs/api/rest/standards).

```
https://api.opendatadsl.com/api/alert/v1/{source}
```

| Source | Alerts |
|-|-|
| `private` | Your alerts, in the data environment of the request |
| `common`, `public` | Shared alerts |

Your alerts belong to a data environment. Send `x-odsl-environment: test1` (for example) to work in an environment other than production.

---

## Requests

| Method | Path | What it does |
|-|-|-|
| GET | `v1/{source}` | List alerts. Takes `_filter`, `_sort`, `_skip`, `_limit`, `_count` and `_project` |
| GET | `v1/{source}/{id}` | One alert with its timeline |
| POST | `v1/{source}` | Raise an alert (your alerts only: use `private`) |
| POST | `v1/{source}` with the alert's `_id` in the body | Change that alert, like PATCH. This is what ODSL `save` and the Python SDK's `update` do |
| PATCH | `v1/{source}/{id}` | Change an alert |
| POST | `v1/{source}/{id}/comment` | Add a comment |
| PATCH | `v1/{source}/{id}/comment/{entry}` | Edit a comment |
| DELETE | `v1/{source}/{id}/comment/{entry}` | Delete a comment |
| DELETE | `v1/{source}/{id}` | Delete an alert (administrators only; alerts are normally closed, not deleted) |

Every request that changes an alert returns the alert as it now is.

---

## List alerts

```
GET alert/v1/private?_filter={"status":"open","agent":"client"}&_sort={"created.at":-1}&_limit=50&_count=true
```

With `_count=true`, the `x-total-count` response header holds the number of matching alerts. Lists include each alert's timeline (leave it out with `_project`, for example `{"timeline":0}`, when you do not need it). On a shared alert, your team's own comments are only merged into the timeline when you read that one alert.

Useful filters:

| Filter | Finds |
|-|-|
| `{"status":"open"}` | Open alerts |
| `{"agent":"client"}` | Alerts waiting on your team |
| `{"severity":{"$in":["critical","high"]}}` | Critical and high alerts |
| `{"subject.id":"ICE.NDEX.NLB"}` | Alerts about a dataset or other item |
| `{"issue":"completeness"}` | Alerts of one type |
| `{"key":"dataset/ICE.NDEX.NLB/2026-10-27/completeness"}` | The alerts with a key |
| `{"created.at":{"$gte":"2026-10-01T00:00:00"}}` | Alerts raised since a date |

---

## Raise an alert

```json
POST alert/v1/private

{
  "title": "NGE.BROKER.NBP prices look stale since Monday",
  "message": "The broker NBP Day-ahead and Month+1 have not changed for three days",
  "severity": "high",
  "issue": "quality",
  "agent": "opendatadsl",
  "subject": {"service": "dataset", "id": "NGE.BROKER.NBP"},
  "key": "northgate/stale/NGE.BROKER.NBP",
  "comment": "Tom Clarke is the contact on our side"
}
```

Only `title` is required. See [Raise an alert](/docs/extensions/alerts/odsl#raise-an-alert) for the fields and defaults, and for what a `key` does. The response is the new alert, or the open alert with the same key with one more occurrence.

---

## Change an alert

```json
PATCH alert/v1/private/ALR-2026-000402

{
  "status": "closed",
  "resolution": "Loader fixed by OpenDataDSL; file reloaded at 10:15",
  "comment": "Checked against the broker run",
  "_version": 5
}
```

| Field | Values |
|-|-|
| `status` | `open` or `closed`. Closing needs `resolution`. Reopening is possible for 7 days after closing |
| `resolution` | What was wrong and what was done |
| `agent` | `client` (your team), `opendatadsl`, or a data vendor's name |
| `severity` | `critical`, `high`, `medium` or `low` |
| `comment` | A comment added with the change |
| `title`, `description`, `assignee` | Text |
| `tags` | An array of text |
| `_version` | The version you read. If the alert has changed since, the request is refused with HTTP 409: read it again and repeat the change. Leave it out to change the alert as it is now |

On a shared alert (`common` or `public`) you can only add comments; any other change is refused.

---

## Comments

```json
POST alert/v1/common/ALC-2026-000407/comment

{"text": "Our month-end report waits for this file"}
```

```json
PATCH alert/v1/private/ALR-2026-000401/comment/2

{"text": "Our settlement run needs the Dec-26 and Jan-27 contracts"}
```

```
DELETE alert/v1/private/ALR-2026-000401/comment/2
```

The `{entry}` is the `id` of the comment's timeline entry: a number on your own alerts, and an id starting `t-` for your team's comments on a shared alert. Comments can be changed by their author, an administrator of your company, or OpenDataDSL.

---

## Errors

A refused request has an HTTP error status and the reason in the `x-odsl-error` response header, for example:

| Status | Reason |
|-|-|
| 400 | A missing or wrong field, for example `Missing parameter: title`, `Missing parameter: resolution` (closing without a resolution) or `severity must be one of [low, medium, high, critical]` |
| 403 | You do not have the security policy for the alert service, or the change is for OpenDataDSL only (changes to shared alerts other than comments) |
| 404 | The alert does not exist, or is not yours |
| 409 | The alert has been changed by someone else since you read it |

---

## Next

[Notifications and automations](/docs/extensions/alerts/automations)
