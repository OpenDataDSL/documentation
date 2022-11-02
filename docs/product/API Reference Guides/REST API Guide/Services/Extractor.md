---
title: Extractor Service
description: REST API for the extractor service
slug: /api/rest/service/extractor
tags:
  - api
  - service
  - extractor
  - etl
---
The resource for using extractors to extract content from HTML pages

## Extractor REST API

The Extractor REST API is a full CRUD API allowing you to search and filter extractors as well as update, version and delete them. 
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/extractor
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|v1/public  v1/private|List public or private extractors|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single extractor using it’s unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single extractor|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific extractor|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update an extractor, the extractor is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Rollback to the previous version of an extractor, if it is the only version then the extractor will be deleted|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a specific version of an extractor|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete an extractor, including all versions|

## Entities

### Extractor Entity

The extractor entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the extractor (or object id if this is not the latest version of the extractor)|String|
|_type|The type of the extractor - always VarExtractor|String|
|category|The category of the extractor|String|
|script|A base64 encoded String of the entire script that created the extractor|String|
|_oid|The id of the extractor - will match _id if this is the latest version of the extractor|String|
|_timestamp|Timestamp of when this extractor version was created|String(DateTime)|
|_user|The user id (email) of the user that created this extractor version|String|
|_tag|A list of version tag names for this extractor version|String[]|
|_version|The version number of this extractor version|int|
