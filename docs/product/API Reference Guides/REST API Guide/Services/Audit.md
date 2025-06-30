---
title: Audit Service
description: REST API for the audit service
slug: /api/rest/service/audit
tags:
  - api
  - service
  - audit
---
The audit resource allows you to keep track of changes that have been made to other resources

## Audit REST API

The Audit REST API is a read-only API allowing you to search and filter the audit entries and accessed through the following URL:

```js
https://api.opendatadsl.com/api/audit
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|'v1/public' 'v1/private'|List public or private audit entries|
|GET|\{release\}/\{source\}/\{key\}|v1/private/6090915ad6a48d0b3c4f663d|Retrieve a single audit entry using it’s unique id|

## Entities

### Audit Entry

The audit entry contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique objectId for the audit entry|ObjectId|
|timestamp|The UTC timestamp of when the event occurred|DateTime
|user|The user id/email of the user performing the event|String|
|service|The name of the service that performed the event|String|
|id|The id of the affected item|String|
|ref|A link to the affected item|String/Ref|
|version|The version number of the affected/new item|Integer|
|action|The action performed (CREATE/UPDATE/DELETE etc.)|String|
|description|A description of the event|String|
|reason|The user provided reason for the event|String|
|status|The HTTP status of the event, e.g. 200|Integer|
|change|Details of what changed|object|


## Finding Audit Entries

### Searching for audit entries

You can use the _search query parameter to pass in a search query string, it searches in the following fields:

*   _id    
*   service    
*   id    
*   description    
*   reason    

NOTE: All searches are case-insensitive - for more information see [Searching and Filtering](/docs/api/rest/searching)

### Filtering audit entries

You can use simple filtering using any of the field names of an audit entry or complex filters for e.g. timestamp ranges.

### Examples of listing audit entries

Finding all audit entries for a specific service, e.g. calendar
```js
https://api.opendatadsl.com/api/audit/v1/public?service=calendar
```

Finding all entries for a specific resource of a service
```js
https://api.opendatadsl.com/api/audit/v1/public?service=calendar&id=TEST
```

Searching for audit entities using a search string
```js
https://api.opendatadsl.com/api/audit/v1/public?_search=final version
```

Search using a search string within a date range
```js
https://api.opendatadsl.com/api/audit/v1/public
  ?_search=final version
  &timestamp=range(2021-05-11,2021-05-12)
```

Finding all audit entries from a certain date
```js
https://api.opendatadsl.com/api/audit/v1/private?timestamp=gte(2021-05-11)
```

Finding audit records for a specific service and resource within a date range
```js
https://api.opendatadsl.com/api/audit/v1/public
  ?service=calendar
  &id=TEST
  &timestamp=range(2020-01-01,2020-12-31)
```
