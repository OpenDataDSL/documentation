---
title: Index Service
description: REST API for the index service
slug: /api/rest/service/index
tags:
  - api
  - service
  - index
---
The index resource allows you to manage the indexes on your services to speed up queries

## Index REST API

The Index REST API is a full CRUD API allowing you to search and filter indexes as well as update and delete them. 
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/index
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get build information for this service|
|GET|\{release\}|v1|List all indexes on master data service|
|GET|\{release\}/\{service\}|v1|List all indexes on the named service|
|GET|\{release\}/\{service\}/\{id\}|v1/object/\_id_|Get a specific index on the specified service|
|POST|\{release\}|v1|Add/update an index, the body is the index definition|
|DELETE|\{release\}/\{service\}/\{id\}|v1/object/_test|Delete the named index on the specified service|

### Index definition

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name for the index|String|
|key|An object defining the keys to use|Object|
|source|The service for the index, defaults to object|String|
|unique|A boolean indicating that all values in the index must be unique, defaults to false|Boolean|
|sparse|Sparse indexes only contain entries for documents that have the indexed field. These indexes skip documents that do not have the indexed field.|Boolean|
|hidden|Hidden indexes are not visible to the query planner and cannot be used to support a query. You can use hidden indexes to evaluate the potential impact of dropping an index without actually dropping it. If the impact is negative, you can unhide the index instead of having to recreate a dropped index. Hidden indexes are fully maintained and can be used immediately once unhidden.|Boolean|
|expireAfterSeconds|Use this to automatically remove documents from a collection after a certain amount of time. Use these indexes for data that only needs to persist for a finite amount of time, like machine generated event data, logs, and session information.|Integer|
|partialFilterExpression|Partial indexes only index the documents in a collection that meet a specified filter expression. Partial indexes have lower storage requirements and reduced performance costs for index creation and maintenance. Partial indexes offer a superset of the functionality of sparse indexes and should be preferred over sparse indexes.|Object|
|collation|Optional. Specifies the collation for the index. Collation allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.|Object|

## Examples

```js
### List all indexes on master data
GET {{url}}/index/v1
Authorization: Bearer {{token}}

### List all indexes on events
GET {{url}}/index/v1/event
Authorization: Bearer {{token}}

### Get an index
GET {{url}}/index/v1/object/_id_
Authorization: Bearer {{token}}

### Add an index
POST {{url}}/index/v1
Authorization: Bearer {{token}}

\{
    "name": "name",
    "key": \{
        "dataset":1
    \}
\}

### Delete an index on the master data service
DELETE {{url}}/index/v1/object/name
Authorization: Bearer {{token}}r
```