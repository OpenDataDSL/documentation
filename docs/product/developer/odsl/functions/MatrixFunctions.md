---
slug: /odsl/function/functions-matrix
title: Matrix Functions
sidebar_position: 14
---

This document provides a reference for all built-in matrix functions available in OpenDataDSL.

### correlation(data)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from the columns of a matrix.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (Matrix) - The input data to transform

**Returns:** Matrix



---

### correlation(data, shift)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from the columns of a matrix.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (Matrix) - The input data to transform
* `shift` (Integer) - The number of days to shift the y-axis

**Returns:** Matrix



---

### correlation(data)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from a list of timeseries.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform

**Returns:** Matrix



---

### correlation(data, shift)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from a list of timeseries.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform
* `shift` (Integer) - The number of days to shift the y-axis

**Returns:** Matrix



---

### covariance(data)

**Category:** Matrix

**Description:** Create a convariance matrix from a list of timeseries.

Unbiased covariances are given by the formula

```cov(X, Y) = sum [(xi - E(X))(yi - E(Y))] / (n - 1)``` where ```E(X)``` is the mean of ```X``` and ```E(Y)``` is the mean of the ```Y``` values.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform

**Returns:** Matrix



---

### covariance(data, biasCorrected)

**Category:** Matrix

**Description:** Create a convariance matrix from a list of timeseries.

Unbiased covariances are given by the formula

```cov(X, Y) = sum [(xi - E(X))(yi - E(Y))] / (n - 1)``` where ```E(X)``` is the mean of ```X``` and ```E(Y)``` is the mean of the ```Y``` values.
 Non-bias-corrected estimates use ```n``` in place of ```n - 1```.
 Whether or not covariances are bias-corrected is determined by the optional parameter, **biasCorrected**, which defaults to true.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform
* `biasCorrected` (Boolean - **optional**) - True if the covariance is bias-corrected

**Returns:** Matrix



---


