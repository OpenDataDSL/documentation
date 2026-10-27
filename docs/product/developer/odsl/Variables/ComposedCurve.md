---
slug: /odsl/variable/composedcurve
title: ComposedCurve and ComposedTimeSeries
tags:
- composition
- composer
---

# ComposedCurve and ComposedTimeSeries

A **ComposedCurve** or **ComposedTimeSeries** is a curve or timeseries that takes its values from one element (column) of a [Composer](/docs/extensions/composer/overview) composition. Add one to an object to make a composition column available as ordinary data.

## Construction

|**Function**|**Description**|
|-|-|
|ComposedCurve(composition, element)|Creates a new Composed Curve using a composition and element|
|ComposedTimeSeries(composition, element)|Creates a new Composed TimeSeries using a timeseries composition and element|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|composition|The composition that contains this curve|String|
|description|A description of the curve|String|
|element|The element in the composition|String|
|identity|The configured identity for this curve|Object|
|name|The name of the curve|String|


## Example

```js
obj = ${object:"NGE.SPREADS"}
obj.CSS_DE = ComposedCurve("NGE_CLEAN_SPARK_SPREAD", "spread")
save obj
```

To create the composition itself, use **Composition()**, which creates a [report configuration](/docs/odsl/variable/report) of type Composition.
