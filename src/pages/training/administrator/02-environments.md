---
slug: /training/administrator/environments
title: "Module 02: Managing Environments"
sidebar_position: 3
tags: [training, administrator, environments, promotion]
---

# Module 02: Managing Environments

In this module you will create a test environment, work in it from ODSL and the REST API, control who can do what in it, and move tested items into production with the Promotion extension.

## Learning Objectives

By the end of this module you will be able to:

- Create, list, update and delete data environments
- Direct ODSL scripts and REST requests to a named environment
- Set up access in a new environment with security policies
- Copy data from production into a test environment
- Promote tested items to production, and undo a promotion

---

## Step 1: Plan Your Environments

A typical tenant uses:

| Environment | Purpose |
|-------------|---------|
| `production` | Live, trusted data and the processes that feed it |
| `test` (or `develop`) | Building and testing new curves, scripts, reports and processes |
| `uat` (optional) | A second stage between test and production for business sign-off |

Remember the environment quota: by default 3 environments including production. Check your quota before you plan more:

```
GET https://api.opendatadsl.com/api/tenant/v1?_function=quota
Authorization: Bearer {{token}}
```

This returns a list of `service`, `quota` and `used` for each limited service.

:::note
The `preview` environment always exists alongside production. It runs the next platform release on its own servers and is not one of your build or test environments.
:::

---

## Step 2: Create an Environment

An environment is created by saving an Object to the `environment` service. The variable name becomes the environment name. Any extra properties you set are stored with it.

```js
//#region Create a test environment
test = Object()
test.description = "Test environment for new curves and reports"
test.department = "Market Data"
save ${environment:test}
print "Environment created"
//#endregion
```

To add or change properties later, read it, change it and save it again:

```js
//#region Update an environment
test = ${environment:"test"}
test.owner = "market-data@company.com"
save ${environment:test}
//#endregion
```

---

## Step 3: List and Inspect Environments

```js
//#region List environments
env = find ${environment}
for e in env
    print e._id + " created by " + e._createdBy + ", size " + e._size + " bytes"
next
//#endregion
```

| Property | Description |
|----------|-------------|
| `_id` | The environment name |
| `_createdBy` | Email of the user who created it |
| `_size` | Current storage size in bytes |
| `_timestamp` | When it was created |

---

## Step 4: Work in an Environment

### In ODSL

The `use` command directs everything after it, for the rest of the script, to the named environment:

```js
//#region Work in test
use test

hub = Object("#Object")
hub._id = "TEST.HUB"
hub.name = "Test hub"
save hub
//#endregion
```

### In the REST API

Requests go to production unless you add the `x-odsl-environment` header:

```
GET https://api.opendatadsl.com/api/object/v1/private
x-odsl-environment: test
Authorization: Bearer {{token}}
```

:::tip
When a REST request fails, the HTTP status tells you the kind of failure and the reason is in the `x-odsl-error` response header, not in the body.
:::

---

## Step 5: Control Access in the Environment

Security policies are stored in each environment, so access in `test` is decided by the policies in `test` and access in production by the policies in production. After creating an environment, review its policies:

```js
//#region Review policies in test
use test
policies = find ${policy} where _type = "Policy"
for p in policies
    print p._id + " on service " + p.service
    print p.members
next
//#endregion
```

For example, to let only the data team change anything in `test` while others can read, you would adjust the policies in `test` exactly as described in [Module 04](/training/administrator/policies), with `use test` at the top of the script.

---

## Step 6: Copy Data from Production

Testing is more realistic with real data. The pattern from [Data Migration](/docs/odsl/dm/migration) reads records in production and saves them in the test environment by switching with `use`:

```js
//#region Copy master data to test
objects = find ${object} where source = 'ICE' and exchange = 'NDEX'
for obj in objects
    use test
    save obj
    use production
next
//#endregion
```

:::note
Master data that refers to data items (curves, timeseries) holds references. The full migration example shows how to read the raw data behind each reference before saving it in the target environment.
:::

---

## Step 7: Promote Configurations with Promotion

The [Promotion](/docs/extensions/promotion/overview) extension moves the items you built and tested into production, and can undo it. Install it in the environment you promote from (and in production if you also want to copy items from production to test). It does not work in the preview environment.

1. In `test`, open **Manage** > **Promote**. The target is production unless you pick another environment.
2. On **Select**, tick the items to promote: types, calendars, scripts, master data, smart data, reports, processes, groups, security policies, automations and more. The basket is kept in your browser until you push.
3. On **Review and push**, check each item: **New**, **Different** or **Identical**. Use **Compare** to see the two side by side, and add anything the basket needs that production does not have.
4. Choose what to do with each item (**Create**, **Overwrite**, **Merge**, **Push as a copy** or **Skip**), give a **reason** and push. For production you type `production` to confirm.

Every write carries the deployment id and your reason, so the changes appear in production's own audit trail. The **Deployments** tab keeps a record of every push, and **Undo deployment** puts production back as it was.

:::warning Read the notes before pushing
A pushed process with a schedule starts running in production straight away, an enabled automation starts acting on events, and a pushed security policy changes who can do what. Promotion acts with your permissions in production: it cannot do anything your production policies do not allow.
:::

### Promoting without the extension

Versioned items (actions, scripts, workflows, processes and others) can be tagged, so a workflow can always use a known version:

```js
//#region Tag a version
tag ${action:"xml_url":3} as PROD
prod = ${action:"xml_url":PROD}
//#endregion
```

---

## Step 8: Delete an Environment

:::warning Destructive Action
Deleting an environment permanently deletes all the data in it, with its automations. It cannot be undone. Production and preview cannot be deleted.
:::

```js
//#region Delete an environment
delete ${environment:"uat"}
//#endregion
```

---

## Exercise

1. Create an environment called `training` with a `description` and an `owner` property.
2. List your environments and print the size of each.
3. In `training`, list the security policies and note which members they apply to.
4. Copy one master data record from production into `training` and read it back there.
5. If Promotion is installed, open it in `training`, add the record to the basket and review it against production without pushing.

---

## Summary

| Task | How |
|------|-----|
| Create or update | `save ${environment:name}` |
| List | `find ${environment}` |
| Work in it | `use name` in ODSL, `x-odsl-environment` header in REST |
| Control access | Security policies saved in that environment |
| Promote | Promotion extension, or version tags |
| Delete | `delete ${environment:"name"}` |

:::note Next Step
In [Module 03](/training/administrator/users) you will invite users and manage access through groups.
:::
