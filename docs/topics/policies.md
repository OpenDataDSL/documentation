---
slug: /odsl/topics/policies
sidebar_position: 10
title: Security Policies
description: General help and information on how security policies work
tags:
- security
- policies
- topics
---

## Introduction
Security policies are used to ensure your users have the correct access rights to any data within the platform.

For detailed information on managing policies, see [Policies in ODSL](/docs/odsl/variable/policy)

## FAQ

<details>
<summary>Deny access to everyone except specific users</summary>

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

</details>

<details>
<summary>Allow users to see what data is available, but deny access to the timeseries, curves etc.</summary>

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
AllowPlattsEB.condition = "_id = 'AAA'"
AllowPlattsEB.addAction("read")
AllowPlattsEB.service = "data"
AllowPlattsEB.addMember("user@example.com")
save AllowPlattsEB
```

</details>
