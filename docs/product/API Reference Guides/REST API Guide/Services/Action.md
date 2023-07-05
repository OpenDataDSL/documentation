---
title: Action Service
description: REST API for the action service
slug: /api/rest/service/action
tags:
  - api
  - service
  - action
---
The action resource contains all the standard public and your own proprietary workflow actions

## Action REST API

The Action REST API is a full CRUD API allowing you to search and filter actions as well as update, version and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/action
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|v1/public  v1/private|List public or private actions|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single action using its unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single action|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific action|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update an action, the action is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Rollback to the previous version of an action, if it is the only version then the action will be deleted|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a specific version of an action|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete an action, including all versions|

## Entities

### Action Entity

The action entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the action (or object id if this is not the latest version of the action)|String|
|_type|The type of the action - always VarAction|String|
|category|The category of the action|String|
|script|A base64 encoded String of the entire script that created the action|String|
|inputs|The input parameters for the action|VarArg[]|
|outputs|The output values for the action|VarArg[]|
|exits|The output transition names|String[]|
|_oid|The id of the action - will match _id if this is the latest version of the action|String|
|_timestamp|Timestamp of when this action version was created|String(DateTime)|
|_user|The user id (email) of the user that created this action version|String|
|_tag|A list of version tag names for this action version|String[]|
|_version|The version number of this action version|int|

### VarArg Entity

The VarArg entity is used for the input and output parameters of an action and contains the following:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|The variable name of the argument|String|
|optional|True if this is optional, false if it is mandatory|Boolean|
|argType|The variable type of the argument|String|
|_type|The type of this entity - always VarArg|String|
