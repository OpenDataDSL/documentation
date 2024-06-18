---
title: Transformer Service
description: REST API for the transformer service
slug: /api/rest/service/transformer
tags:
  - api
  - service
  - transformer
  - etl
---
The resource for using transformers to transform collected data into ODSL Variables

## REST API

The Transformer REST API is a full CRUD API allowing you to search and filter transformers as well as update, version and delete them.
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/transformer
```



The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|v1/public  v1/private|List public or private transformers|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single transformer using it’s unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single transformer|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific transformer|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update a transformer, the transformer is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Rollback to the previous version of a transformer, if it is the only version then the extractor will be deleted|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a specific version of a transformer|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete a transformer, including all versions|

## Entities

### Transformer wrapper

The transformer entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the transformer|String|
|_type|The type - always VarTransformer|String|
|category|The category of the transformer|String|
|description|A description of the transformer|String|
|script|A base64 encoded String of the entire transformer script|String|


