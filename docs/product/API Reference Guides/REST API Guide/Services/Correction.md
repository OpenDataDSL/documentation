---
title: Correction Service
description: REST API for the dataset correction service
slug: /api/rest/service/correction
tags:
  - api
  - service
  - correction
  - dataset
---
The correction resource records the corrections made to dataset data after it was delivered: a value that changed in a later delivery for the same date. It is read-only and uses the dataset policies.

## Correction REST API

The Correction REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/correction
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/private  v1/common|List corrections|
|GET|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Retrieve a correction|

Use `_search` to search on the dataset id and origin.

## Entities

### Correction

|**Name**|**Description**|**Type**|
|-|-|-|
|dsid|The dataset id|String|
|ondate|The delivery date|String|
|property|The property that changed|String|
|tenor|The tenor that changed, for curve data|String|
|previous|The previous value|Any|
|new|The corrected value|Any|
|last|When the previous value was delivered|DateTime|
|timestamp|When the correction was delivered|DateTime|
|origin|Where the correction came from|String|
|invocationId|The request that delivered the correction|String|

## Examples

```js
### Corrections for a dataset
GET https://api.opendatadsl.com/api/correction/v1/private
    ?_filter={"dsid":"ICE.NDEX.NLB"}
    &_sort={"timestamp":-1}
Authorization: Bearer {{token}}
```
