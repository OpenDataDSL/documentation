---
slug: /odsl/variable/duration
tags:
  - duration
  - date
---
Duration
========================

A duration variable represents a period of time such as 3 days or 4 and a half minutes in [ISO 8601 duration format](/docs/kb/duration)

## Construction

A duration can be constructed using a code or by subtracting 2 dates
```js
// Construct a duration of 1 day
oneday = Duration("1D")

// Subtract 2 dates to create a duration
d1 = Date("2020-06-08")
d2 = Date("2020-06-09")
dur1D = d2 - d1
```

### Duration code

A duration code is comprised of a list of periods of time defined in the table below:

|**Period**|**Description**|
|-|-|
|s|Seconds|
|m|Minutes|
|h|Hours|
|D|Days|
|W|Weeks|
|M|Months|
|Y|Years|

Each period has a number and a period code, e.g. 1D is 1 day

Here are some examples:

|**Code**|**Amount of time**|
|-|-|
|1D|1 day|
|4h30m|4 and 1/2 hours|
|60h|60 hours|
|2M|2 months|
|1Y2M12D6h30m|1 year, 2 months, 12 days, 6 hours and 30 minutes|
|12W|12 weeks|

## Properties

The following is a list of properties on a duration variable:

|**Name**|**Description**|**Type**|
|-|-|-|
|years|The number of defined years in this duration|Scalar(Integer)|
|months|The number of defined months in this duration|Scalar(Integer)|
|days|The number of defined days in this duration|Scalar(Integer)|
|hours|The number of defined hours in this duration|Scalar(Integer)|
|minutes|The number of defined minutes in this duration|Scalar(Integer)|
|seconds|The number of defined seconds in this duration|Scalar(Integer)|

