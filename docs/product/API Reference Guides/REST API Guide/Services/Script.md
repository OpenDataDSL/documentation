---
title: Script Service
description: REST API for the script service
slug: /api/rest/service/script
tags:
  - api
  - service
  - script
---
The script resource contains all the public and your own proprietary scripts.

The following types of scripts are supported:
* ODSL language scripts
* HTML snippets
* CSS
* Mustache template scripts

## Script REST API

The Script REST API is a full CRUD API allowing you to search and filter scripts as well as update, version and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/script
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/public  v1/private|List public or private scripts|
|GET|\{release\}/\{source\}/\{key\}|v1/private/example-odsl\Reports\test_issue|Retrieve a single script using its unique id - note private scripts saved from the VSCode extension contain the project and path names in the id|
|GET|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/example-odsl\Reports\test_issue/1|Retrieve a version of a single script|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/example-odsl\Reports\test_issue/*|Get a list of versions for a specific script|
|PUT|\{release\}/\{source\}/\{key\}/\{version\}/\{tag\}|v1/private/example-odsl\Reports\test_issue/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|\{release\}/\{source\}|v1|Create or update a script, the script configuration is the body of the POST request - note the actual script needs to be BASE64 encoded|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/example-odsl\Reports\test_issue|Rollback to the previous version of a script, if it is the only version then the action will be deleted|
|DELETE|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/example-odsl\Reports\test_issue/1|Delete a specific version of a script|
|DELETE|\{release\}/\{source\}/\{key\}/*|v1/private/example-odsl\Reports\test_issue/*|Fully delete a script, including all versions|

## Entities

### Script Entity

The script entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the script|String|
|_type|The type - always VarScript|String|
|category|The category of the script|String|
|description|A description of the script|String|
|script|A base64 encoded String of the entire script|String|

## Functions
|**Function**|**Example**|**Description**|
|-|-|-|
|\{function\}(\{params\}...)|netflow("IE","2023-08-01","2023-08-31")|Runs a function within a script|

## Examples

```js
### Get build info
GET {{url}}/script
Authorization: Bearer {{token}}

### List all public scripts
GET {{url}}/script/v1/public
Authorization: Bearer {{token}}

### List all public script names
GET {{url}}/script/v1/public?_distinct=_id
Authorization: Bearer {{token}}

### List all private scripts
GET {{url}}/script/v1/private
Authorization: Bearer {{token}}

### List all private script names
GET {{url}}/script/v1/private?_distinct=_id
Authorization: Bearer {{token}}

### Get a private script
GET {{url}}/script/v1/private/example-odsl\Reports\test_issue
Authorization: Bearer {{token}}

### Get a private script version
GET {{url}}/script/v1/private/example-odsl\Reports\test_issue/1
Authorization: Bearer {{token}}

### Get a public script
GET {{url}}/script/v1/public/%23StandardValidations
Authorization: Bearer {{token}}

### Update a script
POST {{url}}/script/v1/private
Authorization: Bearer {{token}}

\{   
    "_id":"AAA",
    "_type":"VarScript",
    "script":"base64 encoded script",
    "category":"Examples",
    "description":"Example Description"
\}

### Get script versions
GET {{url}}/script/v1/private/AAA/*
Authorization: Bearer {{token}}

### Get a script version
GET {{url}}/script/v1/private/AAA/3
Authorization: Bearer {{token}}

### Tag a script version
PUT {{url}}/script/v1/private/AAA/3/TEST
Authorization: Bearer {{token}}


### Run a function in a script
GET {{url}}/script/v1/public/%23drs_widgets
  ?_function=netflow("IE","2023-08-01","2023-08-31")
Authorization: Bearer {{token}}r

```