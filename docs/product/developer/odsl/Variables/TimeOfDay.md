---
slug: /odsl/variable/timeofday
title: TimeOfDay
tags:
- date
- time
---

# TimeOfDay

A **TimeOfDay** is a time of the day, optionally in a timezone, for example the time a dataset is expected each day.

## Construction

|**Function**|**Description**|
|-|-|
|TimeOfDay(time)|Creates a new TimeOfDay variable using the supplied String in the format [+]hh:mm [tz]|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|minutes|The number of minutes from midnight|Integer|


## Example

```js
cutoff = TimeOfDay("18:00 Europe/London")
```
