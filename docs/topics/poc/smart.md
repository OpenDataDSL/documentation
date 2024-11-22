---
slug: /poc/smart
title: Smart Data
description: Detailed information about Smart Curves and Timeseries
sidebar_position: 2
tags:
- poc
- smartcurve
- smarttimeseries
---

## What is Smart Data?

Smart data are custom derived curves and timeseries that are created using a simple expression.

### Expressions

#### Simple
For example to add a fixed value of 10 to every point in a curve or timeseries, the expression would be:

```BASE + 10```

#### Multiple inputs
The expression can also combine multiple curves or timeseries, e.g. to create a spread between 2 curves or 2 timeseries, use this expression:

```BASE - OTHER```

Where ```OTHER``` is a reference to another curve or timeseries.

#### Functions

Expressions can also reference [built-in functions](/docs/product/developer/odsl/Functions/all) or any [public](/docs/public/scripts/curve-building) or private functions in scripts that have been updated in the platform.

:::warning The power of Smart Data
This is the power of Smart Data; OpenDataDSL or you can push scripts to the platform containing any curve or timeseries building logic possible without the need for us to upgrade the platform. 
:::

##### Some function examples

###### Built-in curve bootstrapping function
> Create an arbitrage-free monthly curve from a curve with monthly, quarterly, seasonal and yearly tenors.

```bootstrapCurve(BASE)```

###### Public Script: conditional function
> Test a condition, and use alternating values for each item on the curve or timeseries depending on the condition result.

```iif(BASE<2300,2300,BASE)```

###### Combine function
> Uses a primary input and fills missing values from an alternate source.

```combine(BASE, OTHER, true)```

### Endless possiblities
With the powerful combination of:
* Logical expressions
* [Built-in functions](/docs/product/developer/odsl/Functions/all)
* [Publicly provided script functions](/docs/public/scripts/curve-building)
* Your own custom functions

You can build **any** curve or timeseries using **any** logic, the possibilities are endless!

### Saving Smart Data

#### Smart Curve
When you save a new Smart Curve, it saves the expression and configuration.
A new curve is then automatically generated everytime the input data changes.

#### Smart Timeseries
When you save a new Smart Timeseries, it saves the expression and configuration.
Everytime a user or system requests the Smart Timeseries it dynamically runs the expression and returns the results.



## Further Reading
* [Smart Curve Variable](/docs/odsl/variable/smartcurve)
* [Built-in Curve Building Functions](/docs/product/developer/odsl/Functions/all)
* [Sample Public Curve Building Functions](/docs/public/scripts/curve-building)
* [VSCode extension](/docs/user/vscode)
* [Coding in ODSL](/docs/odsl)

