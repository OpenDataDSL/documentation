---
title: Process Service
description: REST API for the process service
slug: /api/rest/service/process
tags:
  - api
  - service
  - process
---

The process resource contains all your process configurations

## REST API

The Process REST API is a full CRUD API allowing you to search and filter processes as well as update, version and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/process
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List all your processes|
|GET|{release}/{key}|v1/TEST|Retrieve a single process using its unique id|
|GET|{release}/{key}/{version}|v1/TEST/1|Retrieve a version of a single process|
|GET|{release}/{key}/*|v1/TEST/*|Get a list of versions for a specific process|
|PUT|{release}/{key}/{version}/{tag}|v1/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update a process, the process configuration is the body of the POST request|
|DELETE|{release}/{key}|v1/TEST|Rollback to the previous version of a process configuration, if it is the only version then the process will be deleted|
|DELETE|{release}/{key}/{version}|v1/TEST/1|Delete a specific version of a process configuration|
|DELETE|{release}/{key}/*|v1/TEST/*|Fully delete a process configuration, including all versions|

## Entities

### Process configuration

The process configuration contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the process (or object id if this is not the latest version of the action)|String|
|_type|The type - always VarProcess|String|
|service|The service of the process configuration|String|
|name|The name of the process configuration|String|
|description|A description of the process configuration|String|
|script|The name of the script that the process runs - a process either runs a script or a workflow|String|
|workflow|The name of the workflow that the process runs - a process either runs a script or a workflow|String|
|cron|A cron expression used to schedule this process|String|
|enabled|A boolean indicating if this process is currently enabled|Boolean|
|input|Inputs which are used in the workflow|Object|
|properties|Properties whaich are used as meta-data about the process|Object|
|settings|Settings used to configure the process|Object|
|tags|A list of tags used to search for the process|List(String)|

## Examples

```js
### Get build info
GET {{url}}/process
Authorization: Bearer {{token}}

### List all processes
GET {{url}}/process/v1
    ?_limit=-1
Authorization: Bearer {{token}}

### List all process names
GET {{url}}/process/v1?_distinct=_id
Authorization: Bearer {{token}}

### Get a process
GET {{url}}/process/v1/CURRENCY_METADATA_LOADER
Authorization: Bearer {{token}}

### Add a process
POST {{url}}/process/v1
Authorization: Bearer {{token}}

{
    "_type": "VarProcess",
    "service": "ETL",
    "name": "AZURE_TEST",
    "description": "Azure Test Process",
    "enabled": true,
    "workflow": "#wf_xml_data_loader",
    "cron": "12 46 ? * * *",
    "environment": "production",
    "input": {
        "url": "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
        "tx": "#ECB_FX"
    }
}

### Rename a process
PUT {{url}}/process/v1/AZURE_TEST
Authorization: Bearer {{token}}

{
    "_id": "AZURE_TEST1"
}

### Get a list of versions
GET {{url}}/process/v1/AZURE_TEST/*
Authorization: Bearer {{token}}

### Get a process version
GET {{url}}/process/v1/AZURE_TEST/1
Authorization: Bearer {{token}}

### Tag a process version
PUT {{url}}/process/v1/AZURE_TEST/1/PROD
Authorization: Bearer {{token}}

### Get a tagged version
GET {{url}}/process/v1/AZURE_TEST/PROD
Authorization: Bearer {{token}}

### Delete a version
DELETE {{url}}/process/v1/AZURE_TEST
Authorization: Bearer {{token}}

### Fully delete
DELETE {{url}}/process/v1/AZURE_TEST/*
Authorization: Bearer {{token}}

```
