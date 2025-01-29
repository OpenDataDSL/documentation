---
slug: /odsl/variable/policy
tags:
- security
- policy
---
Policy
=======================

A policy variable contains information about security access to data

## Introduction

Policy variables are used to restrict access to certain data within the platform.

## Defining a Policy

Below is a table with all the properties of a policy:

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|_id|String|RunAllReports|The unique id for this policy|
|category|String|TeamUsers|An optional category used for filtering policies|
|description|String|My test policy|A descriptive name for the policy|
|enabled|Boolean|true|True if it is enabled, false to disable it, by default the policy is enabled|
|source|String|private|The data source, defaults to private if omitted|
|service|String|data|The service that this policy relates to or * for all services|
|condition|String|source = 'ICE'|The condition used to filter the data that this policy restricts|
|deny|Boolean|false|True if this is a deny policy, false if this is an allow policy|
|actions|List|read|The actions that this policy applies to (create, read, update, delete, run)|
|members|List|user@company.com|The user emails or Azure Active Directory group id's this policy applies to|

## Methods

A policy has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addMember(name)|Adds a member to this policy|void|
|removeMember(name)|Removes a member from this policy|void|
|addAction(action)|Adds an action to this policy|void|
|addActions(action[])|Adds multiple actions to this policy|void|
|setFullAccess()|Sets this policy to cover all actions|void|

Example policy definition:
```json
{
  "_id": "DenyAccessToBWSSBData",
  "category": "TradingTeam",
  "description": "Deny all access to BWSSB data",
  "source": "private",
  "service": "object",
  "condition": "source = 'BWSSB'",
  "deny": true,
  "actions": [
    "create",
    "read",
    "update",
    "delete",
    "run"
  ],
  "members": [
    "user@company.com"
  ],
  "enabled": true
}
```

## Updating, Finding and Deleting Policies

### Saving a policy

To save a policy in OpenDataDSL code, use the save command as follows:
```js
RunAllReports = Policy()
RunAllReports.description = "Run all reports"
RunAllReports.service = "report"
RunAllReports.addMember("user@company.com")
RunAllReports.addAction("run")

save RunAllReports
```

### Listing policies

To find policies, you use the ODSL find command, e.g.
```js
policies = find ${policy} where _type="Policy"
```
You can use the unique keyword to just get all the ids of your policies, e.g.
```js
policynames = find unique _id from ${policy} where _type="Policy"
```

### Retrieving a specific policy

To get a specific named policy, you use the policy active variable. 
You can then examine the information on the policy, e.g.
```js
p = ${policy:"ReadExampleReports"}
print p.description
```

### Disabling a policy
You can disable a policy by setting the enabled flag to false, e.g.
```js
p = ${policy:"ReadExampleReports"}
p.enabled = false
save p
```


### Deleting a policy

To delete a policy, you issue the delete command, e.g.
```js
delete ${policy:"ReadExampleReports"}
```
