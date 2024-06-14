---
title: Curve Service
description: REST API for the managed curve service
slug: /api/rest/service/curve
tags:
  - api
  - service
  - curve
---
The curve resource contains all your managed forward curve configurations

## Curve REST API

The Curve REST API is a full CRUD API allowing you to search and filter curve configurations and build information. 

It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/curve
```

The API is broken into these sections:
* info - curve management  configuration
* build - curve build information
* group - curve group information

## General
|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|

## Curve info API

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/info|v1/info|List all the curve management configurations|
|GET|{release}/info/{key}|v1/info/TEST:CURVE|Retrieve a single curve configuration using it’s unique id|
|PUT|{release}/info/tag/{tag}|v1/info/tag/PROD|Tag multiple curves with the same tag - body is a list of curve ids|
|POST|{release}/info|v1/info|Create or update a curve configuration, the curve configuration is the JSON body of the POST request|
|POST|{release}/info/{curve}|v1/info/TEST:CURVE|Manage a curve - no json body, info is generated from the real curve|
|DELETE|{release}/info/{key}|v1/info/TEST:CURVE|Delete (unmanage) a curve configuration|

### Curve management Configuration
|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the curve configuration|String|
|_type|The type of the curve|String|
|children|The list of child curves|List|
|parents|The list of parent curves|List|
|name|The name of the curve|String|
|description|The description of the curve|String|
|buildGroup|The name of the build group this curve belongs to|String|
|qualityGroup|The name of the quality group this curve belongs to|String|
|approvalGroup|The name of the approval group this curve belongs to|String|
|exportGroups|The names of the export groups this curve belongs to |List|

## Curve build API

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/build|v1/build|List all the curve build information for the current ondate|
|GET|{release}/build/{key}|v1/build/TEST:CURVE:2024-06-12|Retrieve a single curve build information for the specified ondate|
|GET|{release}/build/{ondate}|v1/build/2024-06-12|List all curve build information for the specified ondate|
|POST|{release}/build|v1/build|Update build information, the curve build information is the JSON body of the POST request - used for updates from external build applications|
|DELETE|{release}/build/{key}|v1/build/TEST:CURVE:2024-06-12|Delete the curve build information|

### Curve build information
|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the curve build information (obj:curve:date)|String|
|curve|The curve management id|String|
|ondate|The curve build ondate|String|
|message|The status message|String|
|score|A number representing the score for the day 4=No Issues, 3=Failed Checks, 2=Curve was substituted, 1=Curve Failed, 0=Holiday|Integer|
|scoreInfo|Info about the score|String|
|status|An object of status information approval/build/quality|String|
|timestamp|The last time this build was updated|String|
|timeline|A log of all actions taken on this build|List|
|builds|A list of all the build attempts for this curve|Object(build)|
|lastBuildId|The id of the last build attempt|String|
|checks|A list of the quality checks performed|Object(check)|

## Group API

The curve management group API contains an extra url path section called type - referring to the group type, one of:
* build
* quality
* approval
* export

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/group/{type}|v1/group/build|List all the groups of the supplied type|
|GET|{release}/group/{type}/{key}|v1/group/build/default|Retrieve a group|
|PUT|{release}/group/{type}/{key}|v1/group/build/default|Add curves to this group, body is an array of curve ids|
|POST|{release}/group/{type}|v1/group/build|Create/Update group information, the group information is the JSON body of the POST request|
|DELETE|{release}/group/{type}/{key}|v1/group/build/default|Delete the named group|

### Curve build group
|**Name**|**Description**|**Type**|
|-|-|-|
|type|Always 'build'|String|
|name|Unique name for the curve build group|String|
|description|Description of this group|String|
|cron|The cron expression defining the cut-off time for curves in this group|Cron String|
|offset|The day offset from the cron to the ondate (0=same day, -1=previous day)|Integer|
|useLatest|A boolean indicating to use the latest valid build, false indicates to use the script instead to generate a substitute curve|Boolean|
|script|The ODSL script name to use if ```useLatest=false```|String|
|calendar|The holiday calendar for the curves|String|
|timezone|The timezone of the curves|String|

### Curve quality group
|**Name**|**Description**|**Type**|
|-|-|-|
|type|Always 'quality'|String|
|name|Unique name for the curve quality group|String|
|description|Description of this group|String|
|script|The name of the script containing the checks to perform|String|
|checks|A list of check functions to run - objects as {expression,name}|List(Object)|

### Curve approval group
|**Name**|**Description**|**Type**|
|-|-|-|
|type|Always 'approval'|String|
|name|Unique name for the curve approval group|String|
|description|Description of this group|String|
|approvers|A list of user emails that can approve these curves|List(String)|
|version|A name to tag the curve version with after being approved|String|

### Curve export group
|**Name**|**Description**|**Type**|
|-|-|-|
|type|Always 'export'|String|
|name|Unique name for the curve export group|String|
|description|Description of this group|String|
|cron|The cron expression defining when to run the export group script|Cron String|
|offset|The day offset from the cron to the ondate (0=same day, -1=previous day)|Integer|
|script|The ODSL script name to use|String|
|expression|The expression to execute - usually a function call in the script e.g. export()|String|
|calendar|The holiday calendar for the curves|String|

## Curve Approval API
This API is used to approve/unapprove curves

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/approval/{ondate}|v1/approval/2024-06-12|List all the curves I need to approve for the supplied ondate|
|POST|{release}/approval|v1/approval|Approve curves, body is an array of either string ids or objects with {curve, message}|
|POST|{release}/rejection|v1/rejection|Unapprove curves, body is an array of either string ids or objects with {curve, message}|

## Functions
|**Function**|**Example**|**Description**|
|-|-|-|
|initialise|v1/2024-06-12|Initialise curves for the specified ondate, ignores any curves already initialised|
|initialise|v1/2024-06-12/TEST:CURVE|Initialise specified curve for the specified ondate|
|build|v1/TEST:CURVE:2024-06-12|Build a curve|
|build|v1/TEST:CURVE with query param _range=between(2023-10-15,2023-10-20)|Build a curve for a range of dates|
|check|v1/TEST:CURVE:2024-06-12|Quality check a curve|
|check|v1/default/2024-06-12|Run all quality checks for the named quality group|
|export|v1/ETRM/2024-06-12|Export all curves in the named export group|
|cutoff|v1/Oil/2024-06-12|Run the build cut-off - substitute missing curves|
|cutoff|v1/TEST:CURVE:2024-06-12|Run the build cut-off for the named curve|

## Examples
In the following examples {{url}} is the curve management REST URL:

```js
https://api.opendatadsl.com/api/curve
```

### Curve Info
```js
### Get curve infos
GET {{url}}/curve/v1/info
Authorization: Bearer {{token}}

### Get curve info for a specific curve
GET {{url}}/curve/v1/info/AAA:EC
Authorization: Bearer {{token}}

### Generate curve info from a curve
POST {{url}}/curve/v1/info/AAA:ECS
Authorization: Bearer {{token}}

### Update curve info
POST {{url}}/curve/v1/info
Authorization: Bearer {{token}}

{
	"_id":"#CLALIT.AMF.AVGAUC.WP:PRICE",
	"name": "Anhydrous Milk Fat Average Auction Winning Price Curve Biweekly Italy",
	"description":"Anhydrous Milk Fat Average Auction Winning Price Curve Biweekly Italy"
}

### Update multi curve info
POST {{url}}/curve/v1/info
Authorization: Bearer {{token}}

[
	{
		"_id":"IPEX.EL.IT.BL.MTE:ALL_TRADERS",
		"tags": ["trader","smart"],
		"description": "Combination of all MTE trader curves"
	},
	{
		"_id":"IPEX.EL.IT.BL.MTE:COMBINED",
		"tags": ["smart"]
	}
]

### Bulk update tags
PUT {{url}}/curve/v1/info/tag/PROD
Authorization: Bearer {{token}}

[ "AAA:EC","AAA:ECS" ]

### Delete a curve info
DELETE {{url}}/curve/v1/info/%23CLALIT.AMF.AVGAUC.WP:PRICE
Authorization: Bearer {{token}}

```

### Curve Build

```js
### Get build infos for current ondate
GET {{url}}/curve/v1/build
Authorization: Bearer {{token}}

### Get build infos for specific ondate
GET {{url}}/curve/v1/build/2023-10-23
Authorization: Bearer {{token}}

### Get build infos for specific ondate - filtered
GET {{url}}/curve/v1/build/2023-10-23
	?_filter={"$and":[{"status.build":{"$exists":true,"$in":["built"]}}]}
	&_sort={"_timestamp":-1}
	&_limit=-1
Authorization: Bearer {{token}}

### Get curve build info
GET {{url}}/curve/v1/build/2023-10-24/AAA:EC
Authorization: Bearer {{token}}

### Update curve build
POST {{url}}/curve/v1/build
Authorization: Bearer {{token}}

{
	"_id":"IPEX.EL.IT.BL.MTE:MONTHLY:2023-09-21",
	"notes": "Built by hand"
}

### Update curve build from external build application
POST {{url}}/curve/v1/build
Authorization: Bearer {{token}}

{
	"_id":"AAA:MATLAB:2023-10-24",
	"builds": {
		"af1b4366-8752-4446-90c5-ca176eccec6f":{
			"log":["complete"],
			"message": "Built by MATLAB",
			"status": "built"
		}
	},
	"status": {
		"build": "built",
		"buildMessage": "Built by MATLAB"
	}
}

### Update multi curve builds
POST {{url}}/curve/v1/build
Authorization: Bearer {{token}}

[
	{
		"_id":"IPEX.EL.IT.BL.MTE:ALL_TRADERS:2023-09-21",
		"tags": ["trader","smart"]
	},
	{
		"_id":"IPEX.EL.IT.BL.MTE:MONTHLY:2023-09-21",
		"tags": ["smart"]
	}
]

### Add a comment on a build
POST {{url}}/curve/v1/build
Authorization: Bearer {{token}}

{
	"_id":"AAA:MATLAB:2023-11-24",
	"warning":"Jeff was off work, so couldn't provide data"
}

```

### Build Groups

```js
### Add a Build group
POST {{url}}/curve/v1/group/build
Authorization: Bearer {{token}}

{
	"type": "build",
	"name": "default",
	"description": "Default Build Group",
	"calendar": "BUSINESS",
	"cron": "45 23 ? * MON-FRI * EU1",
	"offset": 0,
	"timezone": "Europe/London",
	"useLatest": true,
}

### Get all build groups
GET {{url}}/curve/v1/group/build
Authorization: Bearer {{token}}

### Get a build group
GET {{url}}/curve/v1/group/build/default
Authorization: Bearer {{token}}

### Delete a build group
DELETE {{url}}/curve/v1/group/build/default
Authorization: Bearer {{token}}

### Bulk set group
PUT {{url}}/curve/v1/group/build/default
Authorization: Bearer {{token}}

[ "AAA:EC","AAA:ECS" ]
```

### Quality Groups

```js
### Add a quality group
POST {{url}}/curve/v1/group/quality
Authorization: Bearer {{token}}

{
	"name":"default",
	"script":"QualityCheckCurves",
	"checks": [
		{"name":"missing","expression":"missingCheck()"}
	]
}

### Get all quality groups
GET {{url}}/curve/v1/group/quality
Authorization: Bearer {{token}}

### Get a quality group
GET {{url}}/curve/v1/group/quality/default
Authorization: Bearer {{token}}

### Delete a quality group
DELETE {{url}}/curve/v1/group/quality/default
Authorization: Bearer {{token}}

### Bulk set group
PUT {{url}}/curve/v1/group/quality/Agriculture
Authorization: Bearer {{token}}

[
"#MATBAROFEX.AR.CRN.CME.FUT:LAST",
"#MATBAROFEX.AR.CRN.CME.FUT:OI"
]
```

### Approval Groups

```js
### Add a approval group
POST {{url}}/curve/v1/group/approval
Authorization: Bearer {{token}}

{
	"name":"default",
	"versionName":"APPROVED",
	"approvers": [
		"colin.hartley@opendatadsl.com",
		"39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d"
	]
}

### Get all approval groups
GET {{url}}/curve/v1/group/approval
Authorization: Bearer {{token}}

### Get a approval group
GET {{url}}/curve/v1/group/approval/default
Authorization: Bearer {{token}}

### Delete a approval group
DELETE {{url}}/curve/v1/group/approval/default
Authorization: Bearer {{token}}

### Bulk set group
PUT {{url}}/curve/v1/group/approval/default
Authorization: Bearer {{token}}

[ "AAA:EC","AAA:ECS" ]
```

### Approvals

```js
### Add an approval group to a curve info
POST {{url}}/curve/v1/info
Authorization: Bearer {{token}}

{
	"_id":"IPEX.EL.IT.BL.MTE:ALL_TRADERS",
	"approvalGroup": "default"
}

### Get my curves to approve
GET {{url}}/curve/v1/approval/2023-11-09
Authorization: Bearer {{token}}

### Approve curves
POST {{url}}/curve/v1/approval
Authorization: Bearer {{token}}

[
	{
		"curve":"IPEX.EL.IT.BL.MTE:ALL_TRADERS:2023-10-09",
		"message": "Approved message"
	}
]

### Approve curves
POST {{url}}/curve/v1/approval
Authorization: Bearer {{token}}

["IPEX.EL.IT.BL.MTE:ALL_TRADERS:2023-10-09"]

### Reject curves
POST {{url}}/curve/v1/rejection
Authorization: Bearer {{token}}

[
	{
		"curve":"AAA:MATLAB:2023-11-13",
		"message": "Incorrect Data"
	}
]
```

### Export Groups

```js
### Add a export group
POST {{url}}/curve/v1/group/export
Authorization: Bearer {{token}}

{
	"name":"default",
	"cron":"00 02 ? * MON-FRI *",
	"script":"daily_export_report",
	"expression":"exportCSV()"
}

### Get all export groups
GET {{url}}/curve/v1/group/export
Authorization: Bearer {{token}}

### Get an export group
GET {{url}}/curve/v1/group/export/SAP
Authorization: Bearer {{token}}

### Delete an export group
DELETE {{url}}/curve/v1/group/export/default
Authorization: Bearer {{token}}

### Bulk set group
PUT {{url}}/curve/v1/group/export/SAP
Authorization: Bearer {{token}}

[ "AAA:EC","AAA:ECS" ]

### Remove export groups from a curve
POST {{url}}/curve/v1/info
Authorization: Bearer {{token}}

{
	"_id": "SMART_TEST:CURVE",
	"exportGroups": null
}
```

### Functions

```js
### Initialise ondate
GET {{url}}/curve/v1/2023-10-26
	?_function=initialise
Authorization: Bearer {{token}}

### Initialise ondate for a specific curve
GET {{url}}/curve/v1/2023-11-28/EEX.EM.FEUA.FUT:SC_BST_SETTLE
	?_function=initialise
Authorization: Bearer {{token}}

### Substitute a curve
GET {{url}}/curve/v1/AAA:CURVE:2023-11-10
	?_function=substitute
Authorization: Bearer {{token}}

### Build a curve
GET {{url}}/curve/v1/CORN_TEST_TYPE:CLOSE:2023-11-30
	?_function=build
Authorization: Bearer {{token}}

### Build curve history
GET {{url}}/curve/v1/AAA:ECS
	?_function=build
	&_range=between(2023-10-15,2023-10-20)
Authorization: Bearer token

### Check a curve
GET {{url}}/curve/v1/ODSL.TRADER.AR.CRN.CME.FUT.TRADES:CURVE:2023-12-07
	?_function=check
Authorization: Bearer {{token}}

### Check a group of curves
GET {{url}}/curve/v1/default/2023-11-16
	?_function=check
Authorization: Bearer {{token}}

### Approve a group of curves
GET {{url}}/curve/v1/default/2023-11-16
	?_function=approve
Authorization: Bearer {{token}}

### Export curves
GET {{url}}/curve/v1/ETRM/2023-11-10
	?_function=export
Authorization: Bearer {{token}}

### Individual curve export
GET {{url}}/curve/v1/ETRM/EEX.EM.FEUA.FUT:HIGH:2024-01-03
	?_function=export
Authorization: Bearer {{token}}

### Build group cut-off
GET {{url}}/curve/v1/Oil/2023-12-07
	?_function=cutoff
Authorization: Bearer {{token}}

### Individual curve cut-off
GET {{url}}/curve/v1/EEX.EM.FEUA.FUT:HIGH:2024-01-03
	?_function=cutoff
Authorization: Bearer {{token}}

```