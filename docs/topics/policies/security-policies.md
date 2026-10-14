---
slug: /odsl/topics/policies
sidebar_position: 1
title: Security Policies
description: How security policies decide what users can do, with worked examples
tags:
- security
- policies
- topics
---

## Introduction
Security policies are used to ensure your users have the correct access rights to any data within the platform.
Each policy says which **members** may (or may not) perform which **actions** on which records of a **service**.

For the full list of policy properties and how to manage policies in code, see [Policies in ODSL](/docs/odsl/variable/policy).
For the other kinds of policy, see [Policies](/docs/topics/policies).

## How access is decided

### Defaults
* When your company is onboarded, a policy called `ManageAllPrivateData` gives everyone (`*`) full access to all private data. To restrict access you need to change, disable or replace this policy.
* Everyone can read public data (ids starting with `#`). Only platform administrators can change it.
* A few policies are built in and cannot be edited, for example `ReadMyProfile-Built-In` and `ReadTenantUsers-Built-In`. Anyone with create or update rights on the `object` service is also given full access to the `data` and `event` services, so they can save the curves, timeseries and events held on master data. See [Security in the platform](/docs/it/security) for the full list.

### Combining policies
For a request, the platform collects the user's enabled policies for the service (plus any for service `*`), the source and the action, then:

1. **Allow policies** are combined with **or**: the user can act on a record if any allow policy's condition matches it. An allow policy with no condition matches every record.
2. **Deny policies** are combined with **and not**: a record that matches any deny policy's condition is removed. A deny policy with no condition denies every record.
3. If a deny policy and an allow policy have **exactly the same condition** text, the deny policy is ignored for that user. This is how you deny something to everyone except a few people (see the examples below).
4. If the user has no policy at all for the action, the action is not allowed.

For create, the new record must match. For update and delete, the record as currently stored must match. For read, the conditions are added to the query, so users only ever see the records they are allowed to read.

### Conditions
The condition is the same as a `where` clause in ODSL, e.g. `source = 'ICE' and dataset = 'ICE_ENDEX'`. The variable `{me}` is replaced by the current user's email, e.g. `owner = '{me}'`.

## Examples

### Read-only users
Give a group of users read access to all private data, and full access to everyone else. Change the default policy so it no longer applies to everyone, then add a read-only policy:

```js
ManageAllPrivateData = ${policy:"ManageAllPrivateData"}
ManageAllPrivateData.removeMember("*")
ManageAllPrivateData.addMember("user:security:policy:Editors")
save ManageAllPrivateData

ReadOnlyUsers = Policy()
ReadOnlyUsers.description = "Read access to all private data"
ReadOnlyUsers.service = "*"
ReadOnlyUsers.addAction("read")
ReadOnlyUsers.addMember("user:security:policy:Viewers")
save ReadOnlyUsers
```

### A team manages its own master data
Let the power trading team create and change master data where the `commodity` property is `POWER`:

```js
PowerTeamMasterData = Policy()
PowerTeamMasterData.description = "Power team manages power master data"
PowerTeamMasterData.service = "object"
PowerTeamMasterData.condition = "commodity = 'POWER'"
PowerTeamMasterData.addActions(["create", "read", "update", "delete"])
PowerTeamMasterData.addMember("user:security:policy:PowerTeam")
save PowerTeamMasterData
```

Because they have create and update rights on the `object` service, they can also save the curves and timeseries on those records.

### Users can only change records they own
If your master data has an `owner` property holding the owner's email, users can be limited to updating their own records:

```js
UpdateMyRecords = Policy()
UpdateMyRecords.service = "object"
UpdateMyRecords.condition = "owner = '{me}'"
UpdateMyRecords.addAction("update")
UpdateMyRecords.addMember("*")
save UpdateMyRecords
```

### Run only some reports
Let analysts read and run the reports in the `Daily` category:

```js
RunDailyReports = Policy()
RunDailyReports.description = "Run the daily reports"
RunDailyReports.service = "report"
RunDailyReports.condition = "category = 'Daily'"
RunDailyReports.addActions(["read", "run"])
RunDailyReports.addMember("user:security:policy:Analysts")
save RunDailyReports
```

### Run processes but not change them
Operations staff can see and rerun processes, but not edit or delete them:

```js
RunProcesses = Policy()
RunProcesses.service = "process"
RunProcesses.addActions(["read", "run"])
RunProcesses.addMember("ops-team@company.com")
save RunProcesses
```

### Protect master data properties declared on types
Properties declared on a master data record's type, or on any of the types it extends, can only be changed by users who have been given one of two permissions:

* `editPublicTypeProperties` for properties declared on a public type (a type id starting with `#`, such as `#Commodity`)
* `editPrivateTypeProperties` for properties declared on one of your own types

Nobody has these permissions until a policy grants them, not even users with full access.
Properties that are not declared on the type, the standard `#Object` properties such as `name` and `description`, and the curves, timeseries and events held on a record can still be changed by anyone with `update` access.
Creating a new record is not affected.

Let your data stewards maintain all type properties:

```js
StewardsEditTypeProperties = Policy()
StewardsEditTypeProperties.description = "Data stewards maintain type properties"
StewardsEditTypeProperties.service = "object"
StewardsEditTypeProperties.addActions(["update", "editPublicTypeProperties", "editPrivateTypeProperties"])
StewardsEditTypeProperties.addMember("user:security:policy:DataStewards")
save StewardsEditTypeProperties
```

Let the gas team change the properties of their own `GasHub` type only:

```js
GasHubProperties = Policy()
GasHubProperties.service = "object"
GasHubProperties.condition = "_type = 'GasHub'"
GasHubProperties.addActions(["update", "editPrivateTypeProperties"])
GasHubProperties.addMember("user:security:policy:GasTeam")
save GasHubProperties
```

A user without the permission who tries to change a type property gets a `403 Forbidden` error naming the properties and the permission they need. The save is rejected as a whole.

:::note
If processes or scripts update type properties, the user or API key they run as also needs these permissions.
:::

### Deny access to everyone except specific users

To deny access to a specific set of data to everyone except a set of specific users, you need to create 2 policies with the exact same condition.
One with deny all and one to allow access for specific users, e.g.

#### Create a deny all policy
```js
DenyAAA = Policy()
DenyAAA.condition = "_id = 'AAA'"
DenyAAA.deny = true
DenyAAA.setFullAccess()
DenyAAA.service = "object"
DenyAAA.addMember("*")
save DenyAAA
```

#### Create an allow policy using exactly the same condition as the deny all
```js
AllowAAA = Policy()
AllowAAA.condition = "_id = 'AAA'"
AllowAAA.setFullAccess()
AllowAAA.service = "object"
AllowAAA.addMember("user@example.com")
save AllowAAA
```

### Stop master data from being deleted, except by data administrators
The same pattern, used for a single action:

```js
DenyDeleteICE = Policy()
DenyDeleteICE.service = "object"
DenyDeleteICE.condition = "source = 'ICE'"
DenyDeleteICE.deny = true
DenyDeleteICE.addAction("delete")
DenyDeleteICE.addMember("*")
save DenyDeleteICE

AllowDeleteICE = Policy()
AllowDeleteICE.service = "object"
AllowDeleteICE.condition = "source = 'ICE'"
AllowDeleteICE.addAction("delete")
AllowDeleteICE.addMember("user:security:policy:DataAdmins")
save AllowDeleteICE
```

### Show what data is available, but deny access to the curves and timeseries

This use case allows your users to see the master data records so they can see what data is available in the platform, but deny them access to the actual curves and timeseries.
This way, you can enforce a process whereby your users must formally request access to specific datasets.

#### Create an allow policy for all users for the object service
```js
PlattsEBMasterData = Policy()
PlattsEBMasterData.condition = "dataset = 'PLATTS_EB'"
PlattsEBMasterData.addAction("read")
PlattsEBMasterData.service = "object"
PlattsEBMasterData.addMember("*")
save PlattsEBMasterData
```

#### Create a deny policy for all users for the data service
```js
DenyPlattsEB = Policy()
DenyPlattsEB.condition = "dataset = 'PLATTS_EB'"
DenyPlattsEB.deny = true
DenyPlattsEB.addAction("read")
DenyPlattsEB.service = "data"
DenyPlattsEB.addMember("*")
save DenyPlattsEB
```

#### Create an allow policy using exactly the same condition as the deny all for the users that can access the data
```js
AllowPlattsEB = Policy()
AllowPlattsEB.condition = "dataset = 'PLATTS_EB'"
AllowPlattsEB.addAction("read")
AllowPlattsEB.service = "data"
AllowPlattsEB.addMember("user@example.com")
save AllowPlattsEB
```

## Checking a user's rights
The policy service can tell you which policies apply to a user and what they can do with a single record:

```
GET https://api.opendatadsl.com/api/policy/v1?_function=user&email=user@company.com
GET https://api.opendatadsl.com/api/policy/v1?_function=rights&service=object&key=ICE.IFEU.B&email=user@company.com
```

The `rights` call returns a list such as `["update", "read", "editPrivateTypeProperties"]`.
