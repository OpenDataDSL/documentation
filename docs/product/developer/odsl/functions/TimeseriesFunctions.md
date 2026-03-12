---
slug: /odsl/function/functions-timeseries
title: Timeseries Functions
sidebar_position: 12
---

This document provides a reference for all built-in timeseries functions available in OpenDataDSL.

### cave(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative average of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### cave(data)

**Category:** TimeSeries

**Description:** The cumulative average of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### cmax(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative maximum of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### cmax(data)

**Category:** TimeSeries

**Description:** The cumulative maximum of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### cmin(data)

**Category:** TimeSeries

**Description:** The cumulative minimum of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### cmin(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative minimum of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### csum(data)

**Category:** TimeSeries

**Description:** The cumulative sum of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### csum(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative sum of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### diff(series)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with the absolute change values from one observation to the next

**Parameters:**
* `series` (TimeSeries) - The TimeSeries to calculate the differences from

**Returns:** TimeSeries



---

### fill(input, method)

**Category:** Timeseries Interpolation

**Description:** Removes missing values by either filling them with values or removing them entirely

**Parameters:**
* `input` (List or Timeseries) - The input data to fill, can either be a single timeseries or a list of timeseries
* `method` (String) - The method to use, can be forward, backward, remove or linear

**Returns:** List or Timeseries



---

### overlay(base, other)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with all the non-missing values from other added to base

**Parameters:**
* `base` (TimeSeries) - The base TimeSeries to use as the source
* `other` (TimeSeries) - The TimeSeries to overlay on top of the base, all non-missing values from this TimeSeries will be added to missing values in base

**Returns:** TimeSeries



---

### pct(series)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with the percentage change values from one observation to the next

**Parameters:**
* `series` (TimeSeries) - The TimeSeries to calculate the differences from

**Returns:** TimeSeries



---

### scale(input, calendar)

**Category:** Conversion

**Description:** Scales a TimeSeries to the supplied calendar using the observed setting on the TimeSeries or the global observed setting

**Parameters:**
* `input` (TimeSeries) - The TimeSeries to scale
* `calendar` (Calendar or name of calendar) - The calendar to scale to

**Returns:** TimeSeries



---

### scale(input, calendar, observed)

**Category:** Conversion

**Description:** Scales a TimeSeries to the supplied calendar using the observed setting on the TimeSeries or the global observed setting

**Parameters:**
* `input` (TimeSeries) - The TimeSeries to scale
* `calendar` (Calendar or name of calendar) - The calendar to scale to
* `observed` (String) - The method to use, one of: beginning, end, summed, averaged, high, low

**Returns:** TimeSeries



---

### scale(input, calendar, observed, distribution)

**Category:** Conversion

**Description:** Scales a TimeSeries to the supplied calendar using the observed setting on the TimeSeries or the global observed setting

**Parameters:**
* `input` (TimeSeries) - The TimeSeries to scale
* `calendar` (Calendar or name of calendar) - The calendar to scale to
* `observed` (String) - The method to use, one of: beginning, end, summed, averaged, high, low
* `distribution` (String) - The distribution method to use, one of: constant, linear or cubic

**Returns:** TimeSeries



---

### sequence(base, other)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with all the non-missing values from other added to base

**Parameters:**
* `base` (TimeSeries) - The base TimeSeries to use as the source
* `other` (TimeSeries) - The TimeSeries to overlay on top of the base, all non-missing values from this TimeSeries will be added to missing values in base

**Returns:** TimeSeries



---

### shift(series, observations)

**Category:** TimeSeries

**Description:** Returns a TimeSeries that is shifted in time by the number of specified observations

**Parameters:**
* `series` (TimeSeries) - The TimeSeries to shift
* `observations` (Number) - The number of observations to shift by

**Returns:** TimeSeries



---

### toInt(var)

**Category:** Conversion

**Description:** Converts any input number to an integer

**Parameters:**
* `var` (Any Number) - The value to convert to an integer

**Returns:** Scalar



---


