---
slug: /odsl/function/functions-statistics
title: Statistics Functions
sidebar_position: 15
---

This document provides a reference for all built-in statistics functions available in OpenDataDSL.

### count(data)

**Category:** Statistics

**Description:** Gets the count of the values

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### geomean(data)

**Category:** Statistics

**Description:** Gets the geometric average value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### GLSMultipleRegression(y, x, covariance)

**Category:** Statistics

**Description:** GLSMultipleLinearRegression provide least squares regression to fit the linear model

**Parameters:**
* `y` (Matrix) - An [n,1] array representing the y sample
* `x` (Matrix) - An [n,k] array representing the x sample
* `covariance` (Matrix) - Array representing the covariance matrix

**Returns:** Object



---

### kurtosis(data)

**Category:** Statistics

**Description:** Gets the kurtosis

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### max(data)

**Category:** Statistics

**Description:** Gets the highest value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### mean(data)

**Category:** Statistics

**Description:** Gets the arithmetic average value

**Parameters:**
* `data` (Curve, Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### min(data)

**Category:** Statistics

**Description:** Gets the lowest value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### OLSMultipleRegression(y, x)

**Category:** Statistics

**Description:** OLSMultipleLinearRegression provide least squares regression to fit the linear model

**Parameters:**
* `y` (Matrix) - An [n,1] array representing the y sample
* `x` (Matrix) - An [n,k] array representing the x sample

**Returns:** Object



---

### percentile(data, percentile)

**Category:** Statistics

**Description:** Gets the percentile

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on
* `percentile` (Number) - The percentile to choose

**Returns:** Number



---

### popvar(data)

**Category:** Statistics

**Description:** Gets the population variance

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### quadmean(data)

**Category:** Statistics

**Description:** Gets the quadratic average value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### simpleRegression(data)

**Category:** Statistics

**Description:** Provides ordinary least squares regression with one independent variable estimating the linear model

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on

**Returns:** Object



---

### simpleRegression(data)

**Category:** Statistics

**Description:** Provides ordinary least squares regression with one independent variable estimating the linear model

**Parameters:**
* `data` (Matrix) - The input data to perform the calculation on

**Returns:** Object



---

### skew(data)

**Category:** Statistics

**Description:** Gets the skewness

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### sma(data, window)

**Category:** Statistics

**Description:** A simple moving average

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `window` (int) - The moving average window size

**Returns:** TimeSeries



---

### stdev(data)

**Category:** Statistics

**Description:** Gets the standard deviation

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### sum(data)

**Category:** Statistics

**Description:** Gets the sum of the values

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### sumsq(data)

**Category:** Statistics

**Description:** Gets the sum of the squares

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### var(data)

**Category:** Statistics

**Description:** Gets the variance

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---


