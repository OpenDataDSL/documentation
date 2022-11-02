---
title: Environment Service
description: REST API for the environment service
slug: /api/rest/service/environment
tags:
  - api
  - service
  - environment
---
Contains information about your data environments

## Environment REST API

The Environment REST API is a full CRUD API allowing you to search and filter your data environments as well as create, update and delete them. It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/environment
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List all the environments|
|GET|{release}/{key}|v1/TEST|Retrieve a single named environment using it’s unique id|
|POST|{release}|v1|Create or update an environment. The JSON body of the POST request is a simple JSON object with at least an _id property|
|DELETE|{release}/{key}|v1/TEST|Delete the environment - note this will completely remove the environment and all data in it - this cannot be performed on the ‘production’ environment|

## Entities

### Environment Entity

The environment entity contains the following properties

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the data environment|String|
|description|The name/description of the data environment|String|
|_createdby|The user id (email) of the user that created the environment|String|
|_timestamp|The timestamp of when the environment was created|String(DateTime)|
|_size|The size of the stored data in the environment|int|
|*|Any other properties added when the environment was created or updated|Any|

