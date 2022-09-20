---
sidebar_position: 6
slug: /odsl/calendar/sparse
tags:
  - calendar
---
Sparse Calendar
===============

A sparse calendar is used when there is no pre-defined period between intervals, each index can represent any point in time

## Introduction

A sparse calendar is a useful calendar for the recording of non-regular time spaced observations and there is no requirement for checking for missing values in a TimeSeries.

A sparse calendar is only really useful when used in conjunction with a TimeSeries.

## Creating a sparse timeseries

### Simple constructor

To create a TimeSeries with a sparse calendar, you can use the TimeSeries constructor with a calendar as shown below:

```js
// Creates an empty TimeSeries with the sparse calendar
ts = TimeSeries("SPARSE")
```

### Single value constructor

You can also create a sparse TimeSeries with a single observation as follows:

```js
// Creates a TimeSeries with a single observation
ts = TimeSeries("2020-10-01", "SPARSE", 12.5)
```

### Data type constructor

You can also specify a data type for the TimeSeries which ensures only values of that data type are accepted into the observations (See [TimeSeries](https://opendatadsl.atlassian.net/wiki/spaces/DOCUMENTAT/pages/2785484/TimeSeries) for more details):

```js
// Creates a TimeSeries with a single observation and specifies a datatype
ts = TimeSeries("2020-10-01", "SPARSE", 12.5, "Numeric")
```

### Multiple value constructor

You can also create a TimeSeries with multiple observations as shown below:

```js
// Creates a TimeSeries with multiple observations
ts = TimeSeries(["2020-11-21T08:40:12","2020-09-11T19:27:22"], "SPARSE", [12.5,15.5])
```

:::note
You don’t need to add the observations in date/time order, the TimeSeries will sort them.
:::

## Adding observations

You can add observations to a TimeSeries with a sparse calendar in the same way as any other calendar, e.g.

```js
// Add some values at random timepoints
ts.add("2020-10-01", 12.5)
ts.add("2020-11-21", 15.5)
ts.add("2020-09-11", 18.5)
```

