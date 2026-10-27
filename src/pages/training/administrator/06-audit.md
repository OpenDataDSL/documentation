---
slug: /training/administrator/audit
title: "Module 06: Audit & Compliance"
sidebar_position: 7
tags: [training, administrator, audit, compliance, portal]
---

# Module 06: Audit & Compliance

Every action users perform on your data is audited. In this module you will read the audit trail in the portal and in ODSL, summarise it, trace a change back through an item's versions, and export records for a compliance review.

## Learning Objectives

By the end of this module you will be able to:

- Describe what an audit record contains
- Filter the audit trail in the Web Portal
- Find and summarise audit records in ODSL
- Query audit records with the REST API and export them as CSV
- Use versions and tags to see exactly what changed
- Find the audit trail of a Promotion deployment

---

## Step 1: What Is Audited

An audit record is created for every action performed by users on the data stored in the platform. Audit records belong to an environment: production's audit trail shows production's changes.

| Field | Description |
|-------|-------------|
| `timestamp` | When the action happened (UTC) |
| `user` | The user, or application, that performed it |
| `service` | The service, for example `object`, `process` or `policy` |
| `action` | What was done, for example `update` |
| `key` | The id of the affected item |
| `version` | The version of the affected item |
| `status` | The HTTP status of the action, for example 200 |
| `description` | A description or reason for the change |
| `changes` | What changed: `kind` (N new, E edited, D deleted), `path`, `lhs` (old value) and `rhs` (new value) |

An example: the `name` of object `AUDIT01` changed from `Audit Test` to `Audit Testing`.

```json
{
  "action": "update",
  "changes": [
    { "kind": "E", "path": ["name"], "lhs": "Audit Test", "rhs": "Audit Testing" }
  ],
  "key": "AUDIT01",
  "service": "object",
  "source": "private",
  "status": 200,
  "timestamp": "2023-09-20T09:28:56.559",
  "user": "user@example.com",
  "version": 0
}
```

---

## Step 2: The Auditing Dashboard

The auditing dashboard in the Web Portal is a paged, filterable list of audit records, newest first.

1. Choose **public** or **private** records (private is the default).
2. Filter by **Service**, **Action** and **User**.
3. Read the **Time**, **User**, **Reason** and **Description** of each record.

Use it to answer questions such as "who changed this process yesterday?" or "what has this user done this week?".

---

## Step 3: Find Audit Records in ODSL

```js
//#region Find audit records
// All records for a service
records = find ${audit} where service = "process"
print records.size

// Today's records
today = find ${audit} where timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
print today.size

// Everything one user has done since a date
mine = find ${audit} where user = "anna@company.com" and timestamp > "2026-10-01T00:00:00"
print mine.size
//#endregion
```

---

## Step 4: Summarise Activity

Use `aggregate` to see where the activity is:

```js
//#region Summarise by service
summary = aggregate ${audit}
    group _id="$service", qty=count()
    sort qty desc
end
print summary
//#endregion
```

Change `$service` to `$user` to see who is most active, or to `$action` to see the mix of creates, updates and deletes.

:::tip
A sudden rise in deletes, or changes to the `policy` service, is worth a closer look. Changes to security policies change who can do what.
:::

---

## Step 5: Query with the REST API

The [Audit REST API](/docs/api/rest/service/audit) is read-only for searching. Filter on any field, use ranges for timestamps, and `_search` to search the id, service, description and reason:

```
GET https://api.opendatadsl.com/api/audit/v1/private
  ?service=process
  &timestamp=range(2026-10-01,2026-10-31)
Authorization: Bearer {{token}}
```

To export records, ask for CSV with the `Accept` header:

```
GET https://api.opendatadsl.com/api/audit/v1/private?timestamp=gte(2026-10-01)
Accept: text/csv
Authorization: Bearer {{token}}
```

Add the `x-odsl-environment` header to read another environment's audit trail. If a request fails, the reason is in the `x-odsl-error` response header.

:::warning
The Audit REST API also supports bulk deletes of audit entries that match a filter. Keep the `delete` action on audit records to as few people as possible with your security policies, and agree a retention rule with your compliance team before anyone deletes records.
:::

---

## Step 6: Trace a Change Through Versions

Many items keep every version: actions, calendars, extractors, report configurations, reports, scripts, transformers, types, workflows, processes and groups. Master data is versioned when its type is declared `versioned`.

```js
//#region Look at the versions of a process
versions = ${process:"ECB_FX":*}
print versions

// Read an older version
v1 = ${process:"ECB_FX":1}
print v1.cron
//#endregion
```

Each version records its number, timestamp, user and tags. Together with the audit record's `changes`, this shows exactly what changed and who did it.

To go back to the previous version, delete the current one:

```js
//#region Roll back a process
delete ${process:"ECB_FX"}
//#endregion
```

---

## Step 7: The Audit Trail of a Promotion

When you push items with the [Promotion](/docs/extensions/promotion/deployments) extension, every write carries the reason `Promoted by <deployment id> from <environment>: <your reason>`, and every undo carries `Undo of <deployment id>`. The deployment's **Audit trail in production** tab reads these records back, and **Items (CSV)** downloads one line per item for a change log or an audit.

---

## Exercise

1. In the auditing dashboard, filter private records to the `policy` service and find the last change.
2. In ODSL, count today's audit records and summarise them by user.
3. Export last month's private audit records for the `process` service as CSV.
4. List the versions of one of your processes and compare the latest with the one before it.

---

## Summary

| Task | How |
|------|-----|
| Browse | Auditing dashboard in the Web Portal |
| Find | `find ${audit} where ...` |
| Summarise | `aggregate ${audit}` with `group` |
| Export | REST with `Accept: text/csv` |
| See what changed | The `changes` of an audit record and the item's versions |
| Roll back | `delete` the current version of a versioned item |

:::note Next Step
In [Module 07](/training/administrator/connections) you will connect to external data sources.
:::
