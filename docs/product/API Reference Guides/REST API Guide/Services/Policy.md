---
title: Policy Service
description: REST API for the security policy service
slug: /api/rest/service/policy
tags:
  - api
  - service
  - policy
  - security
---
The policy resource contains all your companys security policies

## Policy REST API

The Policy REST API is a full CRUD API allowing you to search and filter policies as well as create, update and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/policy
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all security policies|
|GET|\{release\}/\{key\}|v1/TEST|Retrieve a single policy using its unique id|
|POST|\{release\}|v1|Create or update a policy, the policy is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/TEST|Delete a policy|

## Entities

### Policy Entity

The policy entity contains the following information:

|**Name**|**Type**|**Description**|
|-|-|-|
|_id|String|The unique identifier for this policy|
|_type|String|The type of the policy - always Policy|
|category|String|An optional category used for filtering policies|
|description|String|A description of what this policy does|
|source|String|The source of data that this policy covers|
|service|String|The name of the service providing the data for this policy (can be * for all services)|
|condition|String|An optional condition defining the subset of data that this policy covers|
|actions|Array|A list of actions this policy covers (create, read, update, delete, run)|
|members|Array|A list of user emails or security group id's that this policy is attributed to (can be * for all members)|
|deny|Boolean|True if this is a denial policy, false for an allow policy|
|enabled|Boolean|A flag indicating if this policy is to be used or not|

#### Notes on policy properties

* **Source**
  > Source is usually private or custom MongoDB collections
* **Condition**
  > This is a logical condition used to filter documents in the service.
  > It is the same as a where condition in ODSL and can include **and** and **or** operators.
* **Actions**
  > These are the actions that the policy applies to:
  > * Create - the members are allowed to create new resources
  > * Update - the members are allowed to update existing resources
  > * Read - the members are allowed to read resources
  > * Delete - the members are allowed to delete resources
  > * run - this is applicable only to report and process services where the members are allowed to run the resource
* **Members**
  > This is a list of user email addresses or AAD security group id's that users are assigned to
* **Deny**
  > Setting deny to true explicitly denies access to the resources secured by this policy
* **Enabled**
  > This is a true/false flag that makes this security policy active or inactive

### Policy Examples
Below are some examples of security policies:

#### Allow reading reports from the Examples category

```json
  {
    "_id": "ReadExampleReports",
    "_type": "Policy",
    "category": "TeamUsers",
    "description": "Read access to reports in the Examples category",
    "source": "private",
    "service": "report",
    "condition": "category = 'Examples'",
    "deny": false,
    "actions": [
      "read"
    ],
    "members": [
      "*"
    ],
    "enabled": true,
  }
```

#### Allow read access to objects with a property source set to NCDEX

```json
{
  "_id": "ReadAllNCDEXData",
  "_type": "Policy",
  "category": "TeamUsers",
  "description": "Read all data from source NCDEX",
  "source": "private",
  "service": "object",
  "condition": "source = 'NCDEX'",
  "deny": false,
  "actions": [
    "read"
  ],
  "members": [
    "user@example.com",
    "39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d"
  ],
  "enabled": true
}
```

## Further Information

For full details on policies and how to manage them, see [Policies in ODSL](/docs/odsl/variable/policy)
