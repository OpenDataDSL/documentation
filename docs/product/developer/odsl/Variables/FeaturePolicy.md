---
slug: /odsl/variable/featurepolicy
title: Feature Policy 🆕
description: Creating and using feature policies in ODSL code
tags:
- feature
- policy
- new
---

A feature policy variable contains information about which features in the Web Portal that users can see

## Introduction

Feature Policy variables are used to restrict access to certain features within the platform, thereby focussing users on the tasks they need to perform.

:::caution
Feature policies only change what the Web Portal shows, they are not a security control. To restrict access to data, use [security policies](/docs/odsl/variable/policy).
:::

For how feature policies are combined and more examples, see [Feature Policies](/docs/topics/policies/feature).

## Defining a Feature Policy

Below is a table with all the properties of a feature policy:

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|_id|String|RunAllReports|The unique id for this policy|
|category|String|TeamUsers|An optional category used for filtering policies|
|description|String|My test policy|A descriptive name for the policy|
|enabled|Boolean|true|True if it is enabled, false to disable it, by default the policy is enabled|
|deny|Boolean|true|By default, all features are available to everyone, so you need to set this to true to deny access to features|
|members|List|user@company.com|The user emails or [policy user groups](/docs/topics/policies#policy-user-groups) this policy applies to, or * for everyone (Azure Active Directory group id's are not used by feature policies)|
|features|List|\["scripts"\]|The list of features that this policy applies to|

## Methods

A policy has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addMember(name)|Adds a member to this policy|void|
|removeMember(name)|Removes a member from this policy|void|

Example policy definition:
```json
{
  "_id": "HideScripts",
  "category": "TradingTeam",
  "description": "Hide Scripts menu item from users",
  "deny": true,
  "members": [
    "user@company.com"
  ],
  "features": [
    "scripts"
  ],
  "enabled": true
}
```

## Portal Feature Names
The following table shows the names of the features for each portal item:

|**Name**|**Portal Item**|
|-|-|
|masterData|Master Data|
|data|Data|
|events|Events|
|smartData|Smart Data|
|geoData|GEO Data|
|reports|Reports|
|curves|Curves|
|datasets|Datasets|
|processes|processes|
|executions|Executions|
|processTimeline|Process Timeline|
|dataPackages|Data Packages|
|queues|Queues|
|types|Types|
|calendars|Calendars|
|scripts|Scripts|
|dashboards|Dashboards|
|alerts|Alerts|
|groups|Groups|

Extensions can also add tabs and views with their own feature names, e.g. `odsl.aggregator.report` for the Aggregator tab on the Reports screen. Use these names in a feature policy in the same way.

## How Feature Policies are Combined

1. Start from the features switched on for your company.
2. Every enabled allow feature policy the user is a member of switches its features on.
3. Every enabled deny feature policy the user is a member of switches its features off.

Deny always wins. When your company is onboarded, a feature policy called `EnergyUserFeatures` gives everyone the standard menu items.


## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|tags|Tags to help filter and find policies|List|


## Updating, Finding and Deleting Feature Policies

### Saving a feature policy

To save a feature policy in OpenDataDSL code, use the save command as follows:
```js
HideScripts = FeaturePolicy()
HideScripts.description = "Hide Scripts menu item from users"
HideScripts.features = ["scripts"]
HideScripts.addMember("user:security:policy:BusinessUsers")
HideScripts.deny = true
HideScripts.enabled = true
save HideScripts
```

### Listing feature policies

To find feature policies, you use the ODSL find command, e.g.
```js
policies = find ${policy} where _type="FeaturePolicy"
```
You can use the unique keyword to just get all the ids of your policies, e.g.
```js
find unique _id from ${policy} where _type="FeaturePolicy"
```

### Retrieving a specific feature policy

To get a specific named feature policy, you use the policy active variable. 
You can then examine the information on the policy, e.g.
```js
p = ${policy:"HideScripts"}
print p.description
```

### Disabling a feature policy
You can disable a feature policy by setting the enabled flag to false, e.g.
```js
p = ${policy:"HideScripts"}
p.enabled = false
save p
```


### Deleting a feature policy

To delete a feature policy, you issue the delete command, e.g.
```js
delete ${policy:"HideScripts"}
```
