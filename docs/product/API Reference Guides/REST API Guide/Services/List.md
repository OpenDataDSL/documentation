---
title: List Service
description: REST API for the list service
slug: /api/rest/service/list
tags:
  - api
  - service
  - list
---
The list resource holds lists of master data that people make in the portal, for example a watch list of the objects a desk follows.

## List REST API

The List REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/list
```

A list belongs to the person who made it, and can be shared with everyone in your tenant. You see your own lists and the shared ones.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your lists and the shared ones|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a list|
|POST|\{release\}|v1|Create or update a list|
|PUT|\{release\}/\{key\}/\{objectid\}|v1/6721f0c2a4b9e85d3c0f1a77/NGE.GAS.TTF|Add an object to a list|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a list|

## Functions

|**Function**|**Example**|**Description**|
|-|-|-|
|objectsForList|v1/6721f0c2a4b9e85d3c0f1a77?_function=objectsForList|The master data objects in a list|
|listsForObject|v1/NGE.GAS.TTF?_function=listsForObject|The names of your lists, and the shared ones, that contain an object|

## Entities

### List

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the list, created for you if not given|ObjectId|
|name|The name of the list (required)|String|
|objects|The ids of the master data objects in the list (required)|String[]|
|visibility|private (the default) or shared|String|
|owner|The email of the person who made the list, set by the platform|String|
