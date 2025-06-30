---
title: Batch Service
description: REST API for the batch service
slug: /api/rest/service/batch
tags:
- api
- service
- batch
- object
---
The batch resource is a service to batch update objects

## Batch REST API

The Batch REST API is a full CRUD API allowing you to batch update objects.

It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/batch
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all batch summaries|
|GET|\{release\}/\{id\}|v1/a757b7cc-ed3b-41f5-b5dd-30330b967416|Get a specific batch summary|
|POST|\{release\}|v1|Send an array of objects to be updated|
|DELETE|\{release\}/\{id\}|v1/a757b7cc-ed3b-41f5-b5dd-30330b967416|Delete a batch summary

### Batch Update
|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the batch|String|
|_type|Always 'VarBatch'|String|
|elements|An array of upjects to be updated|List|

#### Example

```json
{
	"_id": "00006d91-0fa0-481a-8118-7d6c1f4dba8f",
	"_type": "VarBatch",
	"elements": [
		{
			"_id": "AAA",
			"example": "property"
		}
	]
}
```

### Batch Summary
|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the batch summary|String|
|user|The user who updated the batch|String|
|environment|The data environment the data was loaded to|String|
|timestamp|The date time the batch was updated|String|
|service|The name of the service|String|
|name|The name of the loader|String|
|reason|A reason why the batch was updated|String|
|source|The source the data was loaded to|String|
|status|The status of the uploaded batch|String|
|message|An information message about the uploaded batch|String|
|summary|A summary of the loaded items|Object|

#### Example

```json
{
  "_id": "0000083d-ff3e-45f0-8ee5-b4442ef41355",
  "user": "user@example.com",
  "environment": "production",
  "timestamp": "2024-01-06T16:20:27.433",
  "service": "ETL",
  "name": "AEMO_NEM_POWER_5MIN_PRICE_AND_DEMAND_EVENTS",
  "reason": "Update Batch",
  "source": "private",
  "status": "success",
  "message": "Completed Successfully",
  "summary": {
    "curves": {},
    "failures": {},
    "series": {},
    "matrix": {},
    "events": {
      "2024-01-06": [
        "AEMO.5MIN.PRICE_AND_DEMAND:FORECAST",
        "AEMO.5MIN.PRICE_AND_DEMAND:ACTUAL"
      ]
    }
  }
}
```

## Examples
In the following examples \{\{url\}\} is the batch REST URL:

```js
https://api.opendatadsl.com/api/batch
```

```js
### Get build info
GET {{url}}/batch
Authorization: Bearer {{token}}

### List batch summaries
GET {{url}}/batch/v1
Authorization: Bearer {{token}}

### List batch summaries for a named loader
GET {{url}}/batch/v1?name=AEMO_NEM_POWER_5MIN_PRICE_AND_DEMAND_EVENTS
Authorization: Bearer {{token}}

### Get a batch summary
GET {{url}}/batch/v1/0000083d-ff3e-45f0-8ee5-b4442ef41355
Authorization: Bearer {{token}}

### Send a batch of objects
POST {{url}}/batch/v1
Authorization: Bearer {{token}}

{
	"_id": "00006d91-0fa0-481a-8118-7d6c1f4dba8f",
	"_type": "VarBatch",
	"elements": [
		{
			"_id": "AAA",
			"example": "property"
		}
	]
}
```