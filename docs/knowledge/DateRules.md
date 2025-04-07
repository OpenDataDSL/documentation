---
slug: /kb/daterules
title: Date Rule Grammar
description: Date rule specification
tags:
- date
---

## Introduction
Date rules are used in OpenDataDSL to calculate dates instead of using fixed dates.

## The Grammar
The grammar is provided in the form of a string representing a date calculation with relative and absolute changes from a reference date point.

### Syntax
The syntax is as follows:

```
T[+/-][relative][absolute]
```

#### Relative syntax
The relative component of the syntax is as follows:

```
[nY]{nQ][nM][nW][nB][nD][nh][nm][ns]
```

#### Absolute syntax
The absolute component of the syntax is as follows:

```
[Ynnnn][Qn][Mnn][Wnn][Dnn][hnn][mnn][snn]
```


### Reference date
The reference date is the point from which the rules start calculating.
This is usually *now* unless the dates are in relation to a curve, report or matrix, then it is the *ondate*.

### Period qualifiers
The periods in the grammar are defined as:

* Y - Year
* Q - Quarter
* M - Month
* W - Week
* B - Business Day
* D - Day
* h - Hour
* m - Minute
* s - Second

#### Business Day
Business days are Monday to Friday inclusive, so using T-1B on a Monday will return the previous Friday.

### Relative parts
The relative parts always start with a number which represents the number of periods and then a period qualifier.
E.g. T-1Y2M means subtract 1 year and 2 months from the reference date

### Absolute parts
The absolute parts always start with a period qualifier and then a number representing the absolute period.
E.g. T-M1D1h0m0s0 means the start of the day on the 1st of January of the current year

## Examples

Using a reference date/time of 8th July 2024 at 16:23:07 - 2024-07-08T16:23:07

|Code|Calculated Date/time|
|-|-|
|T-1Y|2023-07-08T16:23:07|
|T-1Yh0m0s0|2023-07-08T00:00:00|
|T-M1D1h0m0s0|2024-01-01T00:00:00|
|T-5D|2024-07-03T16:23:07|
|T+5D|2024-07-13T16:23:07|
|T-1YQ4D1h0m0s0|2023-10-01T00:00:00|
