---
title: Calendar Service
description: REST API for the calendar service
slug: /api/rest/service/calendar
tags:
  - api
  - service
  - calendar
---
The calendar resource contains all the public and private calendars

## Calendar REST API

The Calendar REST API is a full CRUD API allowing you to search and filter [calendars](/docs/odsl/calendar/calendars) as well as update, version and delete them. It is accessed through the following URL:
```json
https://api.opendatadsl.com/service/calendar
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|'v1/public' 'v1/private'|List public or private calendars|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single calendar using it’s unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single calendar|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific calendar|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update an calendar, the calendar is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Rollback to the previous version of a calendar, if it is the only version then the calendar will be deleted|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a specific version of a calendar|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete a calendar, including all versions|

## Entities

### Calendar Entity

The calendar entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the calendar (or object id if this is not the latest version of the calendar)|String|
|_type|The type of the entity - always VarCalendar|String|
|calendar|The definition of the calendar|[Calendar](/docs/odsl/calendar/calendars)|
|_oid|The id of the calendar - will match _id if this is the latest version of the calendar|String|
|_timestamp|Timestamp of when this calendar version was created|String(DateTime)|
|_user|The user id (email) of the user that created this calendar verision|String|
|_tag|A list of version tag names for this calendar version|String[]|
|_version|The version number of this calendar version|int|

### HolidayCalendar

The entity definition of a holiday calendar:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the holiday calendar|String|
|_type|The entity type - always HolidayCalendar|String|
|rule|The rule type - always Holiday Calendar|String|
|rules|The list of rules|HolidayRule[]|

### HolidayRule

The main entity definition of a holiday rule:

|**Name**|**Description**|**Type**|
|-|-|-|
|rule|The type of rule|String|
|code|The code name of the rule|String|
|name|The name of the rule|String|

A holiday rule can contain more fields based on the type - the following entity definitions extend the above HolidayRule entity:

### HolidayRule - Every

Defining a specific day of the week to always be a holiday

|**Name**|**Description**|**Type**|
|-|-|-|
|day|The day name|String|

### HolidayRule - Actual

Defining a specific day or days of the year to always be a holiday

|**Name**|**Description**|**Type**|
|-|-|-|
|dom|The start day of the month|int|
|todom|The end day of the month|int|
|month|The start month|int|
|tomonth|The end month|int|
|options|A list of options that modify this rule|options|

### HolidayRule - Last

Defining the last specific named day of a specific month

|**Name**|**Description**|**Type**|
|-|-|-|
|day|The named day|String|
|month|The month number|int|
|options|A list of options that modify this rule|options|

### HolidayRule - Ordinal

Defining the nth specific named day or a specific month

|**Name**|**Description**|**Type**|
|-|-|-|
|ordinal|The ordinal or nth specific day of the month|int|
|day|The named day|String|
|month|The month number|int|
|options|A list of options that modify this rule|options|

### HolidayRule - Named

There are also certain fixed named holidays - see [Holiday Calendar](/docs/odsl/calendar/holiday)

### Options

The options definition for modifying a rule

|**Name**|**Description**|**Type**|
|-|-|-|
|shiftOnSaturday|The number of days to move backwards or forwards if the holiday lands on a Saturday|int|
|shiftOnSunday|The number of days to move backwards or forwards if the holiday lands on a Sunday|int|
|shiftOnMonday|The number of days to move backwards or forwards if the holiday lands on a Monday|int|
|validFromYear|The first year that this rule is valid from|int|
|validToYear|The last year that this rule is valid to|int|
|repeats|The repeats every n years value|int|
|repeatStartYear|The year in which the repeats value starts|int|

