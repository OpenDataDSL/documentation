---
slug: /odsl/variable/redactionpolicy
title: Redaction Policy
description: Creating and using redaction policies in ODSL code
tags:
- redaction
- policy
- security
---

A redaction policy variable contains a list of master data fields that are hidden from some users

## Introduction

Redaction Policy variables are used to remove sensitive fields, such as prices or internal notes, from master data records before they are returned to the policy's members. The rest of the record is still returned.

Redaction applies to master data (the `object` service) when records are read, listed or searched. Members cannot filter, search, sort, group or aggregate on redacted fields. For how redaction works and more examples, see [Redaction Policies](/docs/topics/policies/redaction).

## Defining a Redaction Policy

Below is a table with all the properties of a redaction policy:

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|_id|String|HideContractPricing|The unique id for this policy|
|category|String|TeamUsers|An optional category used for filtering policies|
|description|String|Hide contract pricing|A descriptive name for the policy|
|enabled|Boolean|true|True if it is enabled, false to disable it, by default the policy is enabled|
|members|List|user@company.com|The user emails or policy user groups this policy applies to, or * for everyone|
|redactions|List|\["contract.price"\]|The fields to remove, using dot notation for a field inside a property|

A redaction policy has no allow or deny: its fields are always removed for its members.

## Methods

A redaction policy has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addMember(name)|Adds a member to this policy|void|
|removeMember(name)|Removes a member from this policy|void|
|addFieldRedaction(name)|Adds a field to redact|void|

Example redaction policy definition:
```json
{
  "_id": "HideContractPricing",
  "_type": "RedactionPolicy",
  "category": "TradingTeam",
  "description": "Analysts do not see contract pricing",
  "redactions": [
    "contract.price",
    "contract.currency"
  ],
  "members": [
    "user:security:policy:Analysts"
  ],
  "enabled": true
}
```

## Updating, Finding and Deleting Redaction Policies

### Saving a redaction policy

To save a redaction policy in OpenDataDSL code, use the save command as follows:
```js
HideContractPricing = RedactionPolicy()
HideContractPricing.description = "Analysts do not see contract pricing"
HideContractPricing.addFieldRedaction("contract.price")
HideContractPricing.addFieldRedaction("contract.currency")
HideContractPricing.addMember("user:security:policy:Analysts")
save HideContractPricing
```

### Listing redaction policies

To find redaction policies, you use the ODSL find command, e.g.
```js
policies = find ${policy} where _type="RedactionPolicy"
```

### Retrieving a specific redaction policy

To get a specific named redaction policy, you use the policy active variable, e.g.
```js
p = ${policy:"HideContractPricing"}
print p.redactions
```

### Disabling a redaction policy
You can disable a redaction policy by setting the enabled flag to false, e.g.
```js
p = ${policy:"HideContractPricing"}
p.enabled = false
save p
```

### Deleting a redaction policy

To delete a redaction policy, you issue the delete command, e.g.
```js
delete ${policy:"HideContractPricing"}
```
