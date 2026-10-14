---
slug: /topics/policies
sidebar_position: 0
title: Policies
description: An overview of security, feature and redaction policies and how to manage them
tags:
- security
- policies
- topics
---

Policies control what your users can do and see in the platform. There are three kinds of policy, and they all live in the same policy service:

|**Policy**|**_type**|**What it controls**|**Enforced by**|
|-|-|-|-|
|[Security policy](/docs/odsl/topics/policies)|Policy|Which records a user can create, read, update, delete or run, and who can edit master data properties declared on types|The platform, on every API call|
|[Feature policy](/docs/topics/policies/feature)|FeaturePolicy|Which menu items and extension views a user sees in the Web Portal|The Web Portal (presentation only)|
|[Redaction policy](/docs/topics/policies/redaction)|RedactionPolicy|Which master data fields are removed from the records a user reads|The platform, when master data is read|

Use security policies to protect data. Feature policies only tidy up the portal for a user, they do not stop anyone reading data through the API, ODSL or the Excel Add-in. Redaction policies hide individual fields while still letting the user see the record.

## Who a policy applies to

Every policy has a list of **members**. A member can be:

|**Member**|**Example**|**Security**|**Feature**|**Redaction**|
|-|-|-|-|-|
|Everyone in your company|`*`|Yes|Yes|Yes|
|A user's email address|`user@company.com`|Yes|Yes|Yes|
|A policy user group|`user:security:policy:DataStewards`|Yes|Yes|Yes|
|An Azure Active Directory group id|`39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d`|Yes|No|No|

### Policy user groups

A policy user group is a [group](/docs/odsl/variable/group) of user email addresses that you manage in the platform, so you do not need an Azure Active Directory group for every team.
Create it in the `user` service with type `security` and category `policy`, then use `user:security:policy:` followed by the group name as the member:

```js
stewards = Group()
stewards.name = "DataStewards"
stewards.service = "user"
stewards.type = "security"
stewards.category = "policy"
stewards.items = ["anna@company.com", "raj@company.com"]
save stewards

StewardsEditTypeProperties = Policy()
StewardsEditTypeProperties.service = "object"
StewardsEditTypeProperties.addActions(["update", "editPrivateTypeProperties"])
StewardsEditTypeProperties.addMember("user:security:policy:DataStewards")
save StewardsEditTypeProperties
```

Adding or removing a person from the group changes their access in every policy that uses the group.

## Managing policies

Policies are records in the `policy` service, told apart by their `_type`. You can manage them:

* In the Web Portal, under Policies
* In ODSL, using the [Policy](/docs/odsl/variable/policy), [FeaturePolicy](/docs/odsl/variable/featurepolicy) and [RedactionPolicy](/docs/odsl/variable/redactionpolicy) variables
* With the [Policy REST API](/docs/api/rest/service/policy)

To list each kind of policy in ODSL:

```js
security = find ${policy} where _type = "Policy"
features = find ${policy} where _type = "FeaturePolicy"
redactions = find ${policy} where _type = "RedactionPolicy"
```

Users with the admin role can always create, update and delete your company's policies. Take care when changing the default `ManageAllPrivateData` policy: make sure someone can still manage policies before you remove or restrict it.

## Further information

* [Security policies, how access is decided, with examples](/docs/odsl/topics/policies)
* [Feature policies](/docs/topics/policies/feature)
* [Redaction policies](/docs/topics/policies/redaction)
* [Security in the platform](/docs/it/security)
