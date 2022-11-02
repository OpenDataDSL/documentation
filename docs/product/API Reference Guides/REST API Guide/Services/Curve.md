---
title: Curve Service
description: REST API for the curve service
slug: /api/rest/service/curve
tags:
  - api
  - service
  - curve
---
The curve resource contains all your proprietary forward curve configurations

## Curve REST API

The Curve REST API is a full CRUD API allowing you to search and filter curve configurations as well as update, version and delete them. It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/curve
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List all the curve configurations|
|GET|{release}/{key}|v1/TEST|Retrieve a single curve configuration using it’s unique id|
|GET|{release}/{key}/{version}|v1/TEST/1|Retrieve a version of a single curve configuration|
|GET|{release}/{key}/*|v1/TEST/*|Get a list of versions for a specific curve configuration|
|PUT|{release}/{key}/{version}/{tag}|v1/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update a curve configuration, the curve configuration is the JSON body of the POST request|
|DELETE|{release}/{key}|v1/TEST|Rollback to the previous version of a curve configuration, if it is the only version then the configuration will be deleted|
|DELETE|{release}/{key}/{version}|v1/TEST/1|Delete a version of a curve configuration|
|DELETE|{release}/{key}/*|v1/TEST/*|Fully delete a curve configuration, including all versions|

## Entities

### Curve Configuration

This is the main curve configuration entity, it is an [Object](Object) of type '#CurveConfig'

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the curve configuration (or object id if this is not the latest version)|String|
|_type|The type of the entity - always #CurveConfig|String|
|_links|An object containing object links to other objects|Object|
|name|The name of the curve|String|
|buildScript|The name of the script containing the functions to build the curve|String|
|expiryCalendar|The code for the expiry calendar used to calculate the expiry dates for the contracts on the curve|String|
|_oid|The id of the calendar - will match _id if this is the latest version of the calendar|String|
|_timestamp|Timestamp of when this calendar version was created|String(DateTime)|
|_user|The user id (email) of the user that created this calendar verision|String|
|_tag|A list of version tag names for this calendar version|String[]|
|_version|The version number of this calendar version|int|
|inputs|A list input data used to build the output curves|#CurveConfigInput[]|
|outputs|A list of output curves to build|#CurveConfigOutput[]|

### Curve Input

This entity represents a piece of input data - either a curve or a time-series

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The data reference of the data entity (TimeSeries or Curve) to use in the format ```${data:”<id>”}``` or simple a string of the id|String|
|key|The variable name to use when referencing it to build a curve|String|
|required|True if this must be present before the curve configuration can build a curve|Boolean|

### Curve Output

This entity represents the configuration of an output curve - other dynamic properties can be added to this entity and they will be available as variables when building the curve

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the output curve|String|
|code|The programming code used to build the curve|String|
|currency|The currency code of the curve|String|
|units|The units code of the curve|String|

