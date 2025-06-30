---
title: Workflow Service
description: REST API for the workflow service
slug: /api/rest/service/workflow
tags:
  - api
  - service
  - workflow
---

## Workflow REST API

The Workflow REST API is a full CRUD API allowing you to search and filter workflows as well as update, version and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/workflow
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/public  v1/private|List public or private workflows|
|GET|\{release\}/\{source\}/\{key\}|v1/private/TEST|Retrieve a single workflow using its unique id|
|GET|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/TEST/1|Retrieve a version of a single workflow|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/TEST/*|Get a list of versions for a specific workflow|
|PUT|\{release\}/\{source\}/\{key\}/\{version\}/\{tag\}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|\{release\}|v1|Create or update a workflow, the workflow is the body of the POST request|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/TEST|Rollback to the previous version of a workflow, if it is the only version then the workflow will be deleted|
|DELETE|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/TEST/1|Delete a specific version of a workflow|
|DELETE|\{release\}/\{source\}/\{key\}/*|v1/private/TEST/*|Fully delete a workflow, including all versions|

## Entities

### Workflow Entity

The workflow entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the workflow|String|
|_type|always VarWorkflow|String|
|category|The category of the workflow|String|
|description|The description of the workflow|String|
|script|The Base64 encoded script used to create the workflow|String|
|phases|The list of phases in this workflow|List(String)|
|inputs|The list of inputs to the workflow|List(VarArg)|
|outputs|The list of outputs from the workflow|List(VarArg)|
|exits|The list of exit transition names|List(String)|

### VarArg Entity

The VarArg entity is used for the input and output parameters of a workflow and contains the following:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|The variable name of the argument|String|
|optional|True if this is optional, false if it is mandatory|Boolean|
|argType|The variable type of the argument|String|
|_type|The type of this entity - always VarArg|String|

## Examples

```js
### Get build info
GET {{url}}/workflow

### List all public workflows
GET {{url}}/workflow/v1/public

### List all public workflow names
GET {{url}}/workflow/v1/public?_distinct=_id

### List all private workflows
GET {{url}}/workflow/v1/private

### List all private workflow names
GET {{url}}/workflow/v1/private?_distinct=_id

### Get a private workflow
GET {{url}}/workflow/v1/private/workflow_test

### Get a list of versions of private workflow
GET {{url}}/workflow/v1/private/test/*

### Get a version of private workflow
GET {{url}}/workflow/v1/private/test/1

### Tag a version of a private workflow
PUT {{url}}/workflow/v1/private/test/1/PROD

### Get a tagged version of workflow
GET {{url}}/workflow/v1/private/test/PROD

### Delete a version of workflow
DELETE {{url}}/workflow/v1/private/test

### Fully delete a workflow
DELETE {{url}}/workflow/v1/private/test/*
```