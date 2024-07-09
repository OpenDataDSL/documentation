---
slug: /kb/missing
description: Information about how to handle missing values in data
tags:
  - missing
---
Handling Missing Values
=======================================

This article explains how you can control how statistical functions in OpenDataDSL deal with missing values

## Ignoring Missing Values

The default setting and in most cases, you want to remove any missing values from value lists that are an input into a statistical function. To implicitly tell OpenDataDSL to ignore missing values, use the following statement:
```js
set missing ignore
```

## Replacing Missing Values

If you want to replace missing values which a constant value, you can use the following statement:
```js
// <value> can be any number
set missing <value>

// Examples
set missing 0
set missing -1
set missing 14.56
```

## Using Missing Values

if you want to pass missing values into functions use the following statement:
```js
set missing

