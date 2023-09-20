---
slug: /odsl/dm/auditing
sidebar_position: 4
tags:
  - data_management
  - auditing
---
Data Auditing
=============

This guide takes you through the extensive auditing within OpenDataDSL and how you can utilise it to monitor what has changed in the system and track changes over time

## Introduction
Audit records are created for every action performed by users on the data stored in OpenDataDSL.

## Information Recorded
### Audit Record
An audit record contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique identifier|ObjectID|
|action|The action performed|String|
|service|The name of the service|String|
|source|The source of the data|String|
|user|The user id who performed the action|String|
|invocationId|The request id for the action|String|
|description|A description or reason for the change|String|
|key|The ID of the entity affected by the action|String|
|version|The version number of the affected entity|Number|
|ref|A link to the entity affected by the action|Reference|
|status|The HTTP status of the action|Number|
|timestamp|The timestamp of when this action occurred|Datetime|
|changes|The actual changes that were made|Changes Object|

### Changes Record
The changes information in the audit record contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|kind|The type of change|String - N=New, E=Edited, D=Deleted|
|lhs|The old value|Any|
|rhs|The new value|Any|
|path|The path to the changed value in the entity|String array|

### Example Audit Record

The following example audit record is the recorded information after the **name** property in an object called **AUDIT01** 
is changed from *'Audit Test'* to *'Audit Testing'*  

```json
{
  "_id": "650abb58baa8e12c386fccb2",
  "action": "update",
  "changes": [
    {
      "kind": "E",
      "lhs": "Audit Test",
      "path": [
        "name"
      ],
      "rhs": "Audit Testing"
    }
  ],
  "invocationId": "aeca52ba-3c7b-47e8-94b3-813cdec26dd1",
  "key": "AUDIT01",
  "ref": {
    "_type": "VarReference",
    "_service": "object",
    "_oid": "AUDIT01"
  },
  "service": "object",
  "source": "private",
  "status": 200,
  "timestamp": "2023-09-20T09:28:56.559",
  "user": "user@example.com",
  "version": 0
}
```
