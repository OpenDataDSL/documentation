---
title: Type Service
description: REST API for the type service
slug: /api/rest/service/type
tags:
  - api
  - service
  - type
---
## Type REST API

The Type REST API is a full CRUD API allowing you to search and filter actions as well as update, version and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/type
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|v1/public  v1/private|List public or private types|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single type using its unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single type|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific type|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update a type, the type is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Rollback to the previous version of a type, if it is the only version then the type will be deleted|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a specific version of a type|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete a type, including all versions|

## Entities

### Type Entity

The action entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the type|String|
|_type|always 'Type'|String|
|_name|The name of the type|String|
|_versioned|A boolean indicating if objects created from this type should be versioned - defaults to false|Boolean|
|{property}|All other property names on the type|Object|

### Type properties

The ```property``` elements of the type contains all the defined properties, each property type has a different configuration.

#### Standard property

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the property|String|
|_ptype|'Property'|String|
|type|The type of the property|String|
|displayName|Text name of the property|String|
|errorText|An expression, which will be evaluated, to show if there is a validation issue|String|
|qualifier|Used if the property type requires a qualifier, e.g. dimension type|String|
|defaultValue|An expression to generate a value if the property value passed in empty or null|String|
|sortIndex|An integer to define the sort order of properties|Integer|
|fieldGroup|An optional group to place fields in to keep them together in a section|String|
|bucket|A bucketing aggregation expression to be used for filtering values for this property|String|
|notnull|A boolean indicating that this field does not allow null values|Boolean|
|children|A list of other properties defined as child properties of this one|List(Object)|

#### Expression property

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the property|String|
|_ptype|'Expression'|String|
|type|The type of the property|String|
|displayName|Text name of the property|String|
|errorText|Error string to show if there is a validation issue|String|
|expression|The Base64 encoded expression to generate a value|String|
|sortIndex|An integer to define the sort order of properties|Integer|

#### Method property

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the property|String|
|_ptype|'Method'|String|
|type|The type of the property|String|
|displayName|Text name of the property|String|
|errorText|Error string to show if there is a validation issue|String|
|method|The Base64 encoded method expression|String|

## Examples

```js
### Get build info
GET {{url}}/type
Authorization: Bearer {{token}}

### List all public types
GET {{url}}/type/v1/public
Authorization: Bearer {{token}}

### List all public type names
GET {{url}}/type/v1/public?_distinct=_name
Authorization: Bearer {{token}}

### List all private types
GET {{url}}/type/v1/private
Authorization: Bearer {{token}}

### List all private type names
GET {{url}}/type/v1/private?_distinct=_name
Authorization: Bearer {{token}}

### Get some private type names
GET {{url}}/type/v1/private
  ?_id=Address
  &_id=Cable
  &_id=Company
Authorization: Bearer {{token}}

### Get a public type
GET {{url}}/type/v1/public/%23Retailer
Authorization: Bearer {{token}}

### Get a private type
GET {{url}}/type/v1/private/Switch
Authorization: Bearer {{token}}

### Update a private type
POST {{url}}/type/v1
Authorization: Bearer {{token}}

{
  "_id": "Test",
  "_type": "Type",
  "_name": "Test",
  "_versioned": false,
  "name": {
    "name": "name",
    "type": "String",
    "_ptype": "Property"
  }
}

### Get a list of versions of private type
GET {{url}}/type/v1/private/Test/*
Authorization: Bearer {{token}}

### Get a version of type
GET {{url}}/type/v1/private/Test/1
Authorization: Bearer {{token}}

### Tag a version of a type
PUT {{url}}/type/v1/private/Test/1/PROD
Authorization: Bearer {{token}}

### Get a tagged version of a type
GET {{url}}/type/v1/private/Test/PROD
Authorization: Bearer {{token}}

### Delete a version of a type
DELETE {{url}}/type/v1/private/Test
Authorization: Bearer {{token}}

### Fully delete a type
DELETE {{url}}/type/v1/private/Test/*
Authorization: Bearer {{token}}

```