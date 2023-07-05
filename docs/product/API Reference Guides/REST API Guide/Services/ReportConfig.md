---
title: Report Configuration Service
description: REST API for the report service
slug: /api/rest/service/reportconfig
tags:
- api
- service
- report
- reportconfig
---
The report configuration service allows you to manage all your report configurations

## Reportconfig REST API
The reportconfig REST API is a full CRUD API allowing you to search and filter report configurations as well as update, version and delete them. It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/reportconfig
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|'v1/public' 'v1/private'|List public or private report configurations|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single report configuration using it’s unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single report configuration|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific report configuration|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update an report configuration, the report configuration is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Delete a report configuration, this has the effect of rolling back to the previous version|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a version of a report configuration|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete a report configuration, including all versions|

## Entities

### Report Configuration

A report is based on a user defined configuration with the following properties:

|Name|Description|Type|
|-|-|-|
|_id|Unique Id|String|
|category|The user-defined category of the report used to organise reports|String|
|name|The user-friendly name of the report|String|
|description|A description of the report|String|
|fixed|A flag indicating that this report is manually updated rather than calculated|Boolean|
|dynamic|A flag indicating that this report will be dynamically run for the latest report date|Boolean|
|script|The name of the script used to run this report|String|
|expression|The expression to use to run this report, e.g. a function name|String|
|template|The mustache template name used to format the results of the report as HTML|String|
|tags|A list of tags for the report|List|
|enabled|A flag indicating that this report should be automatically run if a cron schedule is defined|Boolean|
|cron|A [cron expression](/docs/kb/cron) to schedule this report|String|

### Version
Report configurations are versioned, so they also contain version information:

|Name|Description|Type|
|-|-|-|
|_version|The auto-incrementing version number|Integer|
|_user|The user who created this version|String|
|_timestamp|The timestamp of when this version was created|Date|
|_tag|Version tags used to identify this version by a user-friendly name, e.g. PROD|List|
