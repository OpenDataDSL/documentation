---
title: Task Service
description: REST API for the task service
slug: /api/rest/service/task
tags:
- api
- service
- task
---
The task resource is a service to manage user tasks

## Task REST API

The Task REST API is a full CRUD API allowing you to search and filter actions as well as update, version and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/task
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List all the tasks|
|GET|{release}/{key}|v1/64255eae35f43713c1afa927|Retrieve a single task using its unique id|
|GET|{release}/{key}/{version}|v1/64255eae35f43713c1afa927/1|Retrieve a version of a single task|
|GET|{release}/{key}/*|v1/64255eae35f43713c1afa927/*|Get a list of versions for a specific task|
|PUT|{release}/{key}/{version}/{tag}|v1/64255eae35f43713c1afa927/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update a task, the task configuration is the body of the POST request|
|DELETE|{release}/{key}|v1/64255eae35f43713c1afa927|Rollback to the previous version of a task, if it is the only version then the process will be deleted|
|DELETE|{release}/{key}/{version}|v1/64255eae35f43713c1afa927/1|Delete a specific version of a task|
|DELETE|{release}/{key}/*|v1/64255eae35f43713c1afa927/*|Fully delete a task, including all versions|

## Entities

### Task Entity

The action entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the task|String|
|_type|The type - always VarTask|String|
|category|The category of the task|String|
|user|The user to assign this task to|String|
|description|The description of the task|String|
|assignedBy|The user or system that assigned the task|String|
|complete|A boolean indicating if the task is complete|Boolean|
|notify|A boolean specifying that you want to notify (by email) the user assign to this task|Boolean|
|created|A read-only timestamp of when the task was created|Datetime|
|completed|The timestamp of when the task was marked as complete|Datetime|

## Examples

```js
### Get build info
GET {{url}}/task
Authorization: Bearer {{token}}

### List my tasks
GET {{url}}/task/v1
    ?user=user@example.com
Authorization: Bearer {{token}}

### List tasks
GET {{url}}/task/v1
Authorization: Bearer {{token}}

### List my open tasks
GET {{url}}/task/v1
    ?user=user@example.com
    &complete=false
Authorization: Bearer {{token}}

### Add a task
POST {{url}}/task/v1
Authorization: Bearer {{token}}

{
    "user":"user@example.com",
    "category": "Validation Check",
    "message": "What do you want to do about these issues?"
}

### Update a task
POST {{url}}/task/v1
Authorization: Bearer {{token}}

{
    "_id": "{{id}}",
    "user":"user@example.com",
    "category": "Validation Check",
    "message": "What to do?"
}

### Complete a task
POST {{url}}/task/v1
Authorization: Bearer {{token}}

{
    "_id": "{{id}}",
    "complete": true
}

### Get a task
GET {{url}}/task/v1/64255eae35f43713c1afa927
Authorization: Bearer {{token}}

### Get a list of versions of task
GET {{url}}/task/v1/64255eae35f43713c1afa927/*
Authorization: Bearer {{token}}

### Get a version
GET {{url}}/task/v1/{{id}}/1
Authorization: Bearer {{token}}

### Tag a version
PUT {{url}}/task/v1/{{id}}/1/PROD
Authorization: Bearer {{token}}

### Get a tagged version
GET {{url}}/task/v1/{{id}}/PROD
Authorization: Bearer {{token}}

### UnTag a version
DELETE {{url}}/task/v1/{{id}}/PROD
Authorization: Bearer {{token}}

### Delete a version
DELETE {{url}}/task/v1/{{id}}
Authorization: Bearer {{token}}

### Fully delete 
DELETE {{url}}/task/v1/{{id}}/*
Authorization: Bearer {{token}}

```