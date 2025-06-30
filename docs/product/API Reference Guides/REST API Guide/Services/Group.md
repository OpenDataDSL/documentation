---
title: Group Service 🆕
description: REST API for the group service
slug: /api/rest/service/group
tags:
- api
- service
- group
- new
---
The group resource contains all the groups you are your colleagues have created

## Group REST API

The Group REST API is a read/write API allowing you to manage and use groups of items from other services.
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/group
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|release|v1|List groups|
|GET|release/key|v1/673db77858834c6a164edfd7|Retrieve a single group using it’s unique id|
|GET|release/type:category:name|v1/favourite:Lists:Netherlands+Data|Retrieve a single group using it’s type, category and name|
|GET|release/key/version|v1/673db77858834c6a164edfd7/1|Retrieve a specific version of a single group|
|GET|release/key/*|v1/673db77858834c6a164edfd7/*|Get a list of versions for a specific group|
|PUT|release/key/version/tag|v1/673db77858834c6a164edfd7/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|release|v1|Create or update a group, the group is the body of the POST request|
|DELETE|release/key|v1/673db77858834c6a164edfd7|Rollback to the previous version of a group, if it is the only version then the group will be deleted|
|DELETE|release/key/version|v1/673db77858834c6a164edfd7/1|Delete a specific version of a group|
|DELETE|release/key/*|v1/673db77858834c6a164edfd7/*|Fully delete a group, including all versions|
|DELETE|release/key/items/name|v1/673db77858834c6a164edfd7/items/ICE.NDEX.NLB|Remove an item from a group|

## Entities

### Group Entity

The group entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the group|String|
|service|String|The name of the service where the items for this group exist|
|type|String|The type of this group|
|category|String|A category is used to categorise groups according to similar types|
|name|String|The name of the group|
|description|String|A description of the group|
|shared|Boolean|True if the group is accessible to everyone, false if only you can see it|
|items|Array|The list of items in this group (if it is static)|
|dynamic|Boolean|True if this is a dynamic group and the items are read using the dynamicOptions|
|dynamicOptions.service|String|The service used to get the list of id's, defaults to the group service|
|dynamicOptions.source|String|The source of the items, defaults to private|
|dynamicOptions.filter|String|The filter used to dynamically find the items for this group|
|dynamicOptions.field|String|The field for the id of the item, defaults to _id|
|dynamicOptions.objectfilter|String|Use this instead of filter to filter data based on master data properties|

## Examples

### Creating a static group

```js
POST https://api.opendatadsl.com/api/group/v1
Authorization: Bearer {{token}}

{
	"name": "rest-test",
	"type": "favourite",
	"category": "object",
	"service": "object",
	"shared": false,
	"items": [
		"ICE.IFEU.B","ICE.NDEX.NLB"
	]
}
```

### Creating a dynamic group

```js
POST https://api.opendatadsl.com/api/group/v1
Authorization: Bearer {{token}}

{
	"name": "rest-test4",
	"type": "favourite",
	"category": "object",
	"service": "object",
	"dynamic": true,
	"dynamicOptions": {
		"filter": "source='ICE' and exchange='IFAD'"
	}
}
```

### List all my favourite groups

```js
GET https://api.opendatadsl.com/api/group/v1
	?type=favourite
	&_project=category,name
Authorization: Bearer {{token}}
```

### Change the name of a group
If you pass in the _id of a group, you can change the name, type, category etc of the group

```js
POST https://api.opendatadsl.com/api/group/v1
Authorization: Bearer {{token}}

{
	"_id": "67d2d5992dd4cd06263587d9",
	"name": "rest-test5",
	"type": "favourite",
	"category": "FX Data",
	"service": "object",
	"dynamic": true
}
```

### Remove an item from a group

```js
DELETE https://api.opendatadsl.com/api/group/v1/67d2c52fd3431b26d1802ef4/items/ICE.IFEU.B
Authorization: Bearer {{token}}
```

### Delete a group

```js
DELETE https://api.opendatadsl.com/api/group/v1/67d2c52fd3431b26d1802ef4/*
Authorization: Bearer {{token}}
```

### Get data using a group and ondate

```js
GET https://api.opendatadsl.com/api/data/v1/private
	?_filter=\{_id:\{$in:\{$group:'data:favourite:Data Lists:Settlements'}}\}
	&_ondate=L-1
Authorization: Bearer {{token}}
```