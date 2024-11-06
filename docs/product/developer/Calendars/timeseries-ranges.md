---
slug: /odsl/calendar//ranges
title: Timeseries Ranges
description: Date ranges for timeseries explained 
tags:
- range
- timeseries
- calendar
- from
- between
- within
- last
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

When specifying ranges for [timeseries](/docs/odsl/topics/timeseries) , curveseries, reports etc. you use the *_range* query parameter.

This can have one of the following values:

* from(date)
* from(date, tz)
* last(number)
* between(date, date)
* between(date, date, tz)
* date or within(date)
* within(date, tz)

### From function

The **from** function produces a date range that is from the specified date to the end of the timeseries you are requesting.

#### Example:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ts = ${data:"DR_EV_TEST:HOURLY"} for from("2024-12-20")
```

</TabItem>
<TabItem value="rest" label="REST API">

```html
GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:HOURLY?_range=from(2024-12-20)
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>


### Last function

The **last** function doesn't use a date range, instead it returns the last n observations from the timeseries

#### Example:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ts = ${data:"DR_TEST:DAILY"} for last(10)
```

</TabItem>
<TabItem value="rest" label="REST API">

```html
GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:DAILY?_range=last(10)
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>


### Between function

The **between** function creates a bounded date range where the first date is start of the range and the second date is the end of the range.

#### Example:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ts = ${data:"DR_TEST:DAILY"} for between("2024-12","2024-12")
```

</TabItem>
<TabItem value="rest" label="REST API">

```html
GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:DAILY?_range=between(2024-12,2024-12)
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

### Within function

The **within** function produces a date range covering the start and end of the date period provided.
Note, it can also be used as just the date period without the within() function.

#### Example:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ts1 = ${data:"DR_TEST:HOURLY"} for within("2024-12-01")
ts2 = ${data:"DR_TEST:DAILY"} for "2024-12"
```

</TabItem>
<TabItem value="rest" label="REST API">

```html
GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:HOURLY?_range=within(2024-12-01)
Authorization: Bearer {{token}}

GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:DAILY?_range=2024-12
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

## Date Bounds

Dates in these functions use the following standard rules according to the format provided to determine the actual date used.

* Start and from dates always use the start of the period according to the format provided
* End dates always use the end of the period according to the format provided.

The following table explains how the dates are determined and transformed:

|Format|Example|Used Start Date|Used End Date|
|-|-|-|-|
|yyyy|2024|2024-01-01T00:00:00|2024-12-31T23:59:59|
|yyyy-MM|2024-10|2024-10-01T00:00:00|2024-10-31T23:59:59|
|yyyy-MM-dd|2024-10-12|2024-10-12T00:00:00|2024-10-12T23:59:59|
|yyyy-MM-ddT00|2024-10-12T11|2024-10-12T11:00:00|2024-10-12T11:59:59|
|yyyy-MM-ddTHH:mm|2024-10-12T11:36|2024-10-12T11:36:00|2024-10-12T11:36:59|
|yyyy-MM-ddTHH:mm:ss|2024-10-12T11:36:24|2024-10-12T11:36:24|2024-10-12T11:36:24|
|yyyy-MM-ddTHH:mm:ss[timezone]|2024-10-12T11:36:24[Europe/Amsterdam]|2024-10-12T09:36:24[UTC]|2024-10-12T09:36:24[UTC]|
|Any absolute tenor|2024M10|2024-10-01T00:00:00|2024-10-31T23:59:59|

## Date Rules
[Date rules](/docs/kb/daterules) can be used in date ranges and will be calculated based on a reference date point of now.

### Example:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ts = ${data:"DR_TEST:DAILY"} for between("T-1Y","T")
```

</TabItem>
<TabItem value="rest" label="REST API">

```html
GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:DAILY?_range=between(T-1Y,T)
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

## Timezones
If you pass a timezone as an argument into the function, it uses that as the timezone of the passed in date(s).

### Example:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ts = ${data:"DR_TEST:HOURLY"} for between("2024-01-01","2024-01-31","Europe/Amsterdam")
```

</TabItem>
<TabItem value="rest" label="REST API">

```html
GET https://api.opendatadsl.com/api/data/v1/private/DR_EV_TEST:HOURLY
    ?_range=between(2024-01-01,2024-01-31,Europe/Amsterdam)
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>
