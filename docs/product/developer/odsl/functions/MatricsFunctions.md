---
slug: /odsl/function/functions-metrics
title: Metrics Functions
sidebar_position: 17
---

This document provides a reference for all built-in metrics functions available in OpenDataDSL.

### metric(metric, calendar, observed, range, filter)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric
* `calendar` (String) - The id of the calendar to aggregate the metrics to
* `observed` (String) - The aggregation method to use; one of summed,averaged,high,low,beginning,end
* `range` (String) - The date range expression
* `filter` (String) - A filter expression to filter the metrics

**Returns:** TimeSeries



---

### metric(metric, calendar, observed, range)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric
* `calendar` (String) - The id of the calendar to aggregate the metrics to
* `observed` (String) - The aggregation method to use; one of summed,averaged,high,low,beginning,end
* `range` (String) - The date range expression

**Returns:** TimeSeries



---

### metric(metric, properties, calendar, observed, range, filter)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric
* `properties` (Object) - An object of properties to pass to the metric
* `calendar` (String) - The id of the calendar to aggregate the metrics to
* `observed` (String) - The aggregation method to use; one of summed,averaged,high,low,beginning,end
* `range` (String) - The date range expression
* `filter` (String) - A filter expression to filter the metrics

**Returns:** TimeSeries



---

### metric(metric)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric

**Returns:** TimeSeries



---


