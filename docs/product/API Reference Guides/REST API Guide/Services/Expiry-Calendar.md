---
title: Expiry Calendar Service
description: REST API for the expiry calendar service
slug: /api/rest/service/expiry
tags:
  - api
  - service
  - expiry
  - calendar
---
Contains all the public and private expiry calendars

## Expiry Calendar REST API

The Expiry Calendar REST API is a full CRUD API allowing you to search and filter [expiry calendars](/docs/odsl/variable/expirycalendar) as well as update, version and delete them. It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/expiry
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|'v1/public' 'v1/private'|List public or private expiry calendars|
|GET|\{release\}/\{source\}/\{key\}|v1/private/TEST|Retrieve a single expiry calendar using it’s unique id
|GET|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/TEST/1|Retrieve a version of a single expiry calendar|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/TEST/*|Get a list of versions for a specific expiry calendar|
|PUT|\{release\}/\{source\}/\{key\}/\{version\}/\{tag\}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|\{release\}|v1|Create or update an expiry calendar, the expiry calendar is the JSON body of the POST request|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/TEST|Rollback to the previous version of an expiry calendar, if it is the only version then the expiry calendar will be deleted|
|DELETE|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/TEST/1|Delete a specific version of an expiry calendar|
|DELETE|\{release\}/\{source\}/\{key\}/*|v1/private/TEST/*|Fully delete an expiry calendar, including all versions|

## Entities

### Expiry Calendar Entity

The expiry calendar entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the expiry calendar (or object id if this is not the latest version of the expiry calendar)|String|
|_type|The type of the entity - always VarExpiryCalendar|String|
|calendar|The definition of the expiry calendar|Calendar Entity|
|_oid|The id of the expiry calendar - will match _id if this is the latest version of the expiry calendar|String|
|_timestamp|Timestamp of when this expiry calendar version was created|String(DateTime)|
|_user|The user id (email) of the user that created this expiry calendar verision|String|
|_tag|A list of version tag names for this expiry calendar version|String[]|
|_version|The version number of this expiry calendar version|int|

### Calendar Entity

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the expiry calendar|String|
|_type|Entity Type - always ExpiryCalendar|String|
|tradingCalendarCode|The code for the [calendar](Calendar) that represents the tradable days|String|
|rules|An object representing expiry rules that map to either ALL contract types or a specific type|Limited Expiry Rule Map|

### Limited Expiry Rule Entity

|**Name**|**Description**|**Type**|
|-|-|-|
|before|Used in combination with the date property to represent whether we are time limiting this rule to before or after the date|String|
|date|If this is a time-limited expiry rule, this is the date when it comes into effect, otherwise it is null or undefined|String(DateTime)|
|rule|The expiry rule object|ExpiryRule|

### Expiry Rule Entity

|**Name**|**Description**|**Type**|
|-|-|-|
|rule|The expiry rule type - usually GrammarExpiryRule|String|
|code|The grammar code for the expiry rule|String|
