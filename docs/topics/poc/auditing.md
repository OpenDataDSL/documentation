---
slug: /poc/auditing
title: Auditing
description: How OpenDataDSL records every change made to your data
sidebar_position: 8
tags:
- poc
- auditing
- compliance
- versioning
---

# Auditing

OpenDataDSL maintains a complete, automatic audit trail of every change made to data on the platform. This covers who made a change, what was changed, when it happened, and what the old and new values were.

## What is recorded?

An audit record is created for every create, update, and delete action performed on platform data. Nothing needs to be configured — auditing is always on.

### Audit record fields

| Field | Type | Description |
|-|-|-|
| `_id` | ObjectID | Unique identifier for this audit record |
| `action` | String | The action performed: `create`, `update`, or `delete` |
| `service` | String | The service that was called, e.g. `object`, `data` |
| `source` | String | Whether the data is `private` or `public` |
| `user` | String | The email address of the user who performed the action |
| `invocationId` | String | The request ID — useful for correlating related actions |
| `description` | String | Optional description or reason for the change |
| `key` | String | The ID of the entity that was affected |
| `version` | Number | The version number of the entity after this change |
| `ref` | Reference | A link back to the affected entity |
| `status` | Number | The HTTP status code of the action |
| `timestamp` | Datetime | When the action occurred |
| `changes` | Object | The actual field-level changes (see below) |

### Changes detail

The `changes` field records the exact difference between the old and new state:

| Field | Type | Description |
|-|-|-|
| `kind` | String | `N` = New (added), `E` = Edited, `D` = Deleted |
| `path` | String array | The path to the changed field within the entity |
| `lhs` | Any | The old value (left-hand side) |
| `rhs` | Any | The new value (right-hand side) |

### Example audit record

The following shows an audit record created when the `name` property of an object called `AUDIT01` was changed from `'Audit Test'` to `'Audit Testing'`:

```json
{
  "_id": "650abb58baa8e12c386fccb2",
  "action": "update",
  "service": "object",
  "source": "private",
  "user": "user@example.com",
  "invocationId": "aeca52ba-3c7b-47e8-94b3-813cdec26dd1",
  "key": "AUDIT01",
  "version": 0,
  "status": 200,
  "timestamp": "2023-09-20T09:28:56.559",
  "ref": {
    "_type": "VarReference",
    "_service": "object",
    "_oid": "AUDIT01"
  },
  "changes": [
    {
      "kind": "E",
      "path": ["name"],
      "lhs": "Audit Test",
      "rhs": "Audit Testing"
    }
  ]
}
```

## Versioning

Alongside the audit trail, OpenDataDSL maintains a full version history for all platform entities. Every time a script, action, workflow, transformer, type, or calendar is updated, the previous version is preserved and remains retrievable.

For master data objects, versioning is opt-in at the type level using the `versioned` modifier:

```js
Widget = versioned type
    name as String()
    price as Number()
end
```

### Retrieving version history

```js
// Get all versions of an action
versions = ${action:"my_action":*}

// Get a specific version by number
v1 = ${action:"my_action":1}

// Tag a version for easy reference
tag ${action:"my_action":1} as PROD

// Retrieve by tag
prod = ${action:"my_action":PROD}
```

### Rolling back

Deleting the current version without specifying a number performs a rollback to the previous version:

```js
// Roll back to the previous version
delete ${action:"my_action"}
```

:::tip
Use version tagging to manage releases safely. Tag a version as `PROD` before making changes, so you can always roll back to the known-good state.
:::

## Use cases

**Regulatory compliance** — demonstrate to auditors exactly what data was held at any point in time, who changed it, and what it changed from and to.

**Debugging** — when a workflow produces unexpected results, trace back through the audit trail to find when and how the relevant data changed.

**Controlled releases** — use version tags (`PROD`, `TEST`, `STAGING`) to manage which version of a script or workflow is live, and roll back instantly if something goes wrong.

**Change governance** — review all changes made by a specific user or during a specific time window to support change management processes.

## Further Reading

* [Data Auditing reference](/docs/odsl/dm/auditing)
* [Data Versioning reference](/docs/odsl/dm/versioning)
* [Audit REST service](/docs/api/rest/service/audit)
