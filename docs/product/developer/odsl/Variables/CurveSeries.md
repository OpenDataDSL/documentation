---
slug: /odsl/variable/curveseries
title: CurveSeries
tags:
- curve
- timeseries
---

# CurveSeries

A **CurveSeries** is a curve held as a timeseries of delivery periods: one value for each period in the calendar, for example each hour of a power curve, with the curve date it belongs to. It has all the properties and methods of a [TimeSeries](/docs/odsl/variable/timeseries).

## Construction

|**Function**|**Description**|
|-|-|
|CurveSeries(calendar, ondate)|Creates a new Curve Series|
|CurveSeries(calendar, ondate, data)|Creates a new Curve Series|
|CurveSeries(calendar, ondate, start, data)|Creates a new Curve Series|
