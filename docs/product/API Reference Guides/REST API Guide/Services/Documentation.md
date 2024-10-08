---
title: Documentation Service
description: REST API for the documentation service
slug: /api/rest/service/documentation
tags:
- api
- service
- documentation
---
The documentation resource contains all the public and private documentation.
Generally, public documentation is used for the product whereas private documentation is used for providing operational support documentation to be displayed in the portal dashboards.

## Documentation REST API

The Documentation REST API is a full CRUD API allowing you to search and filter documentation as well as update, version and delete them. It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/documentation
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|'v1/public' 'v1/private'|List public or private documentation|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single document using it’s scope code|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single document|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific document|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update a document, the documentation is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Rollback to the previous version of a document, if it is the only version then the document will be deleted|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a specific version of a document|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete a document, including all versions|

## Entities

### Documentation Entity

The documentation entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id as an object id|String|
|_type|The type of the entity - always VarDocumentation|String|
|name|The name of the documentation (optional)|String|
|scope|The scope, usually the service name|String|
|entity|The entity within the scope (optional)|String|
|language|The ISO 639-1 language code e.g. en for English|String|
|content|The markdown content of the documentation|String|
|tags|A list of tags|List(String)|
|_oid|The id of the documentation - will match _id if this is the latest version of the documentation|String|
|_timestamp|Timestamp of when this documentation version was created|String(DateTime)|
|_user|The user id (email) of the user that created this documentation verision|String|
|_tag|A list of version tag names for this documentation version|String[]|
|_version|The version number of this documentation version|int|

## Example REST Calls

:::info
The documentation service uniquely allows you to use either the _id (ObjectId) fields to retrieve documentation or the scope[:entity]
:::

### Adding documentation to a Master Data Record

:::note
To automatically add documentation to an existing Master Data Record:

* Set the name to be what you want the tab to be called
* Set the scope to "object"
* Set the entity to the id of the object

:::

The following example will add a Docs tab to a Master Data Record with the _id AAA

**NOTE: the AAA object must already exist.**

```
POST https://api.opendatadsl.com/api/documentation
Authorization: Bearer {{token}}

{
  "_type": "VarDocumentation",
  "name": "Docs",
  "scope": "object",
  "entity": "AAA",
  "content":"## Test\n### CME Data"
}
```

### Getting documentation using scope

```
GET https://api.opendatadsl.com/api/documentation/v1/public/report:reportType
Authorization: Bearer {{token}}
```

### Getting documentation using id

```
GET https://api.opendatadsl.com/api/documentation/v1/private/6605507f88334254f7bb86f3
Authorization: Bearer {{token}}
```

### Getting documentation content in HTML

```
GET https://api.opendatadsl.com/api/documentation/v1/public/report:reportType
Authorization: Bearer {{token}}
Accept: text/html
```

### Add some private documentation

```
POST https://api.opendatadsl.com/api/documentation
Authorization: Bearer {{token}}

{
"_id": "CME_CL_FUT",
"_type": "VarDocumentation",
"name": "CME CL Futures",
"scope": "CME_CL_FUT",
"content":"## Test\n### CME Data"
}
```

### List the public documentation

```
GET https://api.opendatadsl.com/api/documentation/v1/public
    ?_project={scope:1,entity:1}
Authorization: Bearer {{token}}
```

### List the distinct public documentation

```
GET https://api.opendatadsl.com/api/documentation/v1/public
    ?_aggregate=[{$group:{_id:{scope:"$scope",entity:"$entity"}}},{$project:{_id:0,scope:"$_id.scope",entity:"$_id.entity"}}]
Authorization: Bearer {{token}}
```


## Language

### Getting documentation content in German

```
GET https://api.opendatadsl.com/api/documentation/v1/public/report:reportType
Authorization: Bearer {{token}}
Accept: text/html
Accept-Language: de,en-US;q=0.7,en;q=0.3
```

### Getting documentation content in Italian, but fall back to Spanish

```
GET https://api.opendatadsl.com/api/documentation/v1/public/report:reportType
Authorization: Bearer {{token}}
Accept: text/html
Accept-Language: it,es;q=0.7,en;q=0.3
```

