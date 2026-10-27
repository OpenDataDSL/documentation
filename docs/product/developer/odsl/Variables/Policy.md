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

There are three kinds of policy, all saved in the policy service and told apart by their `_type`:

|**Variable**|**_type**|**Purpose**|
|-|-|-|
|Policy|Policy|Security policies: which records users can create, read, update, delete or run (this page)|
|[FeaturePolicy](/docs/odsl/variable/featurepolicy)|FeaturePolicy|Which Web Portal menu items and extension views users see|
|[RedactionPolicy](/docs/odsl/variable/redactionpolicy)|RedactionPolicy|Which master data fields are removed from the records users read|

For an overview and worked examples, see [Policies](/docs/topics/policies) and [Security Policies](/docs/odsl/topics/policies).

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
|actions|List|read|The [actions](#actions) that this policy applies to|
|members|List|user@company.com|The user emails, policy user groups or Azure Active Directory group id's this policy applies to|

## Actions

|**Action**|**Description**|
|-|-|
|create|Create new records|
|read|Read records|
|update|Update existing records|
|delete|Delete records|
|run|Run the record, only for services that can be run such as reports and processes|
|editPublicTypeProperties|Change master data properties declared on a public type (see [Type property permissions](#type-property-permissions))|
|editPrivateTypeProperties|Change master data properties declared on a private type (see [Type property permissions](#type-property-permissions))|

`setFullAccess()` adds create, read, update, delete and run. The two type property permissions are never included and must be added explicitly.

## Members

|**Member**|**Example**|**Description**|
|-|-|-|
|*|*|Everyone in your company|
|Email|user@company.com|A single user|
|Policy user group|user:security:policy:DataStewards|Everyone in a [policy user group](/docs/topics/policies#policy-user-groups) you manage in the platform|
|Azure Active Directory group|39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d|Everyone in the AAD security group|

## How policies are combined

* Allow policies are combined with **or**, deny policies with **and not**. If a user has no policy for an action, the action is not allowed.
* A deny policy is ignored when the user also has an allow policy with exactly the same condition text, which lets you deny something to everyone except a few people.
* For create the new record must match the policy conditions; for update and delete the stored record must match; for read the conditions filter the results.

See [How access is decided](/docs/odsl/topics/policies#how-access-is-decided) for the full rules, defaults and built-in policies.

## Type property permissions

Properties declared on a master data record's type, or on any type it extends, are protected by two permissions on the `object` service:

|**Permission**|**Covers properties declared on**|
|-|-|
|editPublicTypeProperties|A public type, with an id starting with `#`, e.g. `#Commodity`|
|editPrivateTypeProperties|One of your own private types|

* Both are **denied by default**: nobody has them, not even users with full access, until a policy grants them.
* Whether a property is public or private depends on the type that declares it, not on the record's own type. A private type `GasHub` that extends `#Commodity` has private properties (declared on `GasHub`) and public properties (declared on `#Commodity`).
* They only apply when an existing record is changed. Adding, changing or removing a declared property needs the permission; creating a new record does not.
* Properties that are not declared on the type, the standard `#Object` properties such as `name` and `description`, smart data, and the curves, timeseries and events held on a record are not covered and only need `update`.
* The user also needs `update` access to the record.
* A change without the permission is rejected with a `403 Forbidden` error that names the properties and the permission needed.

Example: data stewards can change type properties on all master data:

```js
StewardsEditTypeProperties = Policy()
StewardsEditTypeProperties.description = "Data stewards maintain type properties"
StewardsEditTypeProperties.service = "object"
StewardsEditTypeProperties.addActions(["update", "editPublicTypeProperties", "editPrivateTypeProperties"])
StewardsEditTypeProperties.addMember("user:security:policy:DataStewards")
save StewardsEditTypeProperties
```

The `rights` function of the policy service returns `editPublicTypeProperties` and `editPrivateTypeProperties` for a record when the user has them:

```
GET https://api.opendatadsl.com/api/policy/v1?_function=rights&service=object&key=ICE.IFEU.B
```

## Methods

A policy has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addMember(name)|Adds a member to this policy|void|
|removeMember(name)|Removes a member from this policy|void|
|addAction(action)|Adds an action to this policy|void|
|addActions(action[])|Adds multiple actions to this policy|void|
|setFullAccess()|Sets this policy to cover create, read, update, delete and run|void|

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

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|tags|Tags to help filter and find policies|List|


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

## Special Condition Variables
You can use the following variables in conditions:

* ```{me}``` - this will be replaced by the current users email, e.g. ```"owner = '{me}'"```

## Feature Policies

A feature policy controls which menu items and extension views a user sees in the Web Portal. It has `features` (a list of feature names) instead of service, source, condition and actions.

* Allow feature policies switch features on, deny feature policies switch them off, and deny always wins.
* They only change what the portal shows: they do not stop access to data. Use a security policy for that.

```js
HideScripts = FeaturePolicy()
HideScripts.description = "Hide Scripts menu item from users"
HideScripts.features = ["scripts"]
HideScripts.deny = true
HideScripts.addMember("user:security:policy:BusinessUsers")
save HideScripts
```

See [FeaturePolicy](/docs/odsl/variable/featurepolicy) for the properties and feature names, and [Feature Policies](/docs/topics/policies/feature) for examples.

## Redaction Policies

A redaction policy removes fields from the master data records its members read. It has `redactions` (a list of field names, with dot notation for nested fields) instead of service, source, condition and actions.

* It applies to the `object` service when records are read, listed or searched.
* Members cannot use redacted fields in filters, searches, sorts or aggregations.
* There is no allow or deny: the fields are always removed for the policy's members.

```js
HideContractPricing = RedactionPolicy()
HideContractPricing.description = "Analysts do not see contract pricing"
HideContractPricing.addFieldRedaction("contract.price")
HideContractPricing.addMember("user:security:policy:Analysts")
save HideContractPricing
```

See [RedactionPolicy](/docs/odsl/variable/redactionpolicy) for the properties, and [Redaction Policies](/docs/topics/policies/redaction) for examples.
