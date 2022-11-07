---
slug: /odsl/dm/versioning
sidebar_position: 3
tags:
  - data_management
  - versioning
---
Data Versioning
===============

This guide takes you through how we track changes to all elements in OpenDataDSL and how you can take advantage of multiple versions and follow an audit trail of every change made.

## Introduction

One of the most important aspects of data management is tracking changes that have been made to every aspect of the system. Some of the ways you can utilise this are as follows:

### Tracing issues

When things stop working or start producing incorrect results, you need to be able to trace through everything that has changed in order to resolve the issue.

### Utilise tagging to ensure stability

If you [tag](#tagging-a-version) versions with names, e.g. PROD, you can implement a phased approach of releasing new versions of elements into the system.

## How it works

### Types of versioning

There are 2 types of versioning: automatic and user-defined.

#### Automatic versioning

Automatic versioning is always-on which means that any change to the element results in a new version. The following elements have automatic versioning:

*   Actions    
*   Calendars
*   Extractors
*   Scripts
*   Transformers
*   Types
*   Workflows
    

#### User defined

For objects, you have the choice, per type, of whether to use versioning or not. When you create a type, you can specify that all objects of that type are versioned by using the versioned modifier:

```js
Widget = versioned type
    name as String()
    price as Number()
end
```

If you save an object using the above Widget type, the system checks for an existing object of the same id and if it is different, it saves it as a new version.

### What is recorded

Along with the actual data, a version property is added with the following attributes:

|**Name**|**Description**|**Type**|
|-|-|-|
|version|The version number which is an incremental number, starting at 1|Integer|
|oid|The id of the object|String|
|timestamp|The date/time that the update was made|Date|
|user|The email address of the user who made the change or the tenantid if it was updated via a process|String|
|[tag](#tagging-a-version)|A list of tags that you can add to a version|List|

## Version Usage

The versioning of elements is automatic, so any update that you make that changes an element will automatically perform the versioning.

### Viewing version information

You can access the version information of an element using the version property of that element, e.g.

```js
act = ${action:"test_send_batch"}
print act.version
```

Displays:

```json
{
  "oid": "test_send_batch",
  "tag": [],
  "timestamp": {
    "_id": "timestamp",
    "value": "2020-11-06T09:23:50.568",
    "_type": "VarDate"
  },
  "user": "user@mymail.com",
  "version": "3"
}
```

### Listing versions

You can get a list of the versions of an element by adding a '*' version when retrieving an element, e.g.

```js
versions = ${action:"test_send_batch":*}
print versions
```

Displays:

```json
[
{
  "id": "test_send_batch",
  "tags": [],
  "timestamp": "2020-11-06T09:23:50.568Z",
  "type": "action",
  "user": "user@mymail.com",
  "version": "3"
},
{
  "id": "5fa51626d94c4a000711dbf3",
  "tags": [],
  "timestamp": "2020-11-03T12:23:37.799Z",
  "type": "action",
  "user": "user@mymail.com",
  "version": "2"
},
{
  "id": "5fa14bc9468199000752bbf9",
  "tags": [
    "PROD"
   ],
  "timestamp": "2020-11-03T12:14:42.995Z",
  "type": "action",
  "user": "user@mymail.com",
  "version": "1"
}
]
```

### Retrieving a specific version by number

You can retrieve a specific numbered version using the version modifier as follows:

```js
act = ${action:"test_send_batch":1}
print act.version
```

Dsiplays:

```json
{
  "oid": "test_send_batch",
  "tag": [
    "PROD"
  ],
  "timestamp": {
    "_id": "timestamp",
    "value": "2020-11-03T12:14:42.995",
    "_type": "VarDate"
  },
  "user": "user@mymail.com",
  "version": "1"
}
```

### Tagging a version

You can tag a version of an element with a name which you can use instead of a version number.

:::note
The tag name is unique across all versions of an element, so if you tag another element with the same name, the tag is moved to that element
:::

```js
// Tag version 1 as PROD
tag ${action:"test_send_batch":1} as PROD

// Retrieve the PROD version of the action
prodaction = ${action:"test_send_batch":PROD}
```

### UnTagging a version

To untag or remove a tag from an element, use the delete command as follows:

```js
// UnTag the PROD version
delete ${action:"test_send_batch":PROD}
```

:::note
This does not delete the version, only the tag
:::

### Deleting a version

There are several behaviours of the delete command depending on how you specify the version information and how many versions of the element there are.

If I have 3 versions of an action and I have tagged version 1 with the name PROD as shown in the tagging a version section, I will have the following:

```js
// Request latest version (version 3)
act = ${action:"test_send_batch"}

// Request tagged version (version 1)
act = ${action:"test_send_batch":PROD}
```

![](/attachments/36831400/36667642.png)

#### Default delete

If I issue a delete command without a version specifier, version 3 is deleted and version 2 now becomes the current version, effectively performing a rollback.

```js
// Default delete performs a rollback
delete ${action:"test_send_batch"}
```

![](/attachments/36831400/36831462.png)

#### Deleting a numbered version

If I issue a delete command with a version, that version is removed from the version stack. The current version remains the same, unless I deleted version 3, in which case it would be the same as the default delete.

```js
// Delete version 2
delete ${action:"test_send_batch":2}
```

![](/attachments/36831400/39256130.png)

#### Deleting a named version

If I issue a delete command with a named version or tag, only the tag is removed and the version of the element remains.

```js
// Delete a tag from a version
delete ${action:"test_send_batch":PROD}
```

![](/attachments/36831400/36667679.png)

#### Deleting all versions

If I want to completely remove the element and all its versions, I can specify '*' as the version number as follows:

```js
// Completely remove the element
delete ${action:"test_send_batch":*}
```
