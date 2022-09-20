---
title: SmartCurve
description: A Smart Curve is an expression that builds curves on demand
slug: /odsl/variable/smartcurve
tags:
- curve
- smartcurve
---

A Smart Curve is an expression that is used to build curves on demand

## Introduction
Smart Curves are an easy but powerful way of defining curve derivations.

A Smart Curve consists of the following:

### Base Curve
The base curve is mandatory and can be either a real curve or another Smart Curve.
The base curve is used to determine the curve dates that this curve has available and can also be used in the expression using the variable name ```BASE```.

### Expression
The expression is also mandatory and is a string formula used to build the curves for this Smart Curve.

* It can be a simple operation like ```BASE*1.2```
* It can use built-in functions like ```bootstrapCurve(BASE)```
* It can use functions in the #CurveScript (if you have not specified a custom script) like ```flatCurve(12, 1)```
* It can use your own functions in a specified custom script like ```myfunction(BASE)```

### Script
The script is an optional saved custom script with user defined functions. 
These functions can then be used in the expression.
The function script can also `import` the default #CurveScript, so your functions can use those too.

### References to other data
You can optionally add references to other curves, Smart Curves or TimeSeries that can also be used in your expression

## Construction

You construct a Smart Curve using one of the following constructors:

```js
// Default constructor
sc = SmartCurve()

// Specify base curve id and expression
sc = SmartCurve("CORN:CURVE", "interpolate(BASE,'BACKWARD')")

// Specify base curve and expression
sc = SmartCurve(${data:"CORN:CURVE"}, "interpolate(BASE,'BACKWARD')")

// Specify a base curve reference and expression
sc = SmartCurve(ref(${data:"CORN:CURVE"}), "interpolate(BASE,'BACKWARD')")
```

## Properties

A SmartCurve has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|baseCurve|The curve that this Smart Curve uses for CurveDates|ID String, Curve or Reference|
|expression|The expression used to generate the curves|String|
|script|Optional custom script name used with the expression|String|
|currency|Optional currency of the curves, defaults to base curve currency|String|
|units|Optional units of the curves, defaults to base curve units|String|

:::info
If a currency and/or units are set, the base curve and any other curves added to this Smart Curve will be converted to the specified currency and units
:::

A SmartCurve also supports adding dynamic properties, e.g.

```js
sc = SmartCurve("SMART_TEST:CURVE", "BASE*1.02")
sc.product = "CORN"
```

Any dynamic properties added to a SmartCurve can be used in the expression including references to other curves and TimeSeries.
Here are some examples of using properties within the Smart Curve expression:

```js
// Example using another curve
sc1 = SmartCurve()
sc1.baseCurve="#DCE.AG.CN.A.NO1_SOYBEAN.FUT:HIGH"
sc1.LOW=ref(${data:"#DCE.AG.CN.A.NO1_SOYBEAN.FUT:LOW"})
sc1.expression="(BASE+LOW)/2"

// Example using a numeric factor
sc2 = SmartCurve()
sc2.baseCurve="#DCE.AG.CN.A.NO1_SOYBEAN.FUT:HIGH"
sc2.factor=1.2
sc2.expression="BASE*factor"
```

## Methods

A SmartCurve has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|build(Date)|Builds a curve for the specified date|Curve|

Below is an example of creating a Smart Curve and building a curve for a specific date using it:

```js
sc1 = SmartCurve()
sc1.baseCurve="#DCE.AG.CN.A.NO1_SOYBEAN.FUT:HIGH"
sc1.factor=1.2
sc1.expression="BASE*factor"

c1 = sc1.build("2021-10-27")
print c1.contracts
```

## Adding to an object and saving
A SmartCurve needs to be added to an object in order to save it to the database, e.g.

```js
CORN_TEST = Object()
CORN_TEST.category = "TEST"

cf = SmartCurve("#MATBAROFEX.ROS.CORN.FUT:CLOSE", "interpolate(bootstrapCurve(BASE),'BACKWARD')")
CORN_TEST.CURVE = cf

save ${object: CORN_TEST}
```

## Using custom scripts
As stated in the introduction, you can use your own custom scripts containing functions that can be used in the Smart Curve expression.

Below is an example of a custom script named ```SmartCurveCustomScript```

```js
import ${script:"#CurveScript"}

function agricultural(input)
    // Agricultural curve bootstrapped and backward filled
    boots = bootstrapCurve(input)
    agricultural = interpolate(boots, "BACKWARD")
end
```

:::note
This script needs to be uploaded into the DataBase (In VSCode - right-click in the editor and select 'Upload this script')
:::

Define our curve using this custom script:

```js
SOYBEAN = Object()
SOYBEAN.CURVE = SmartCurve("#DCE.AG.CN.A.NO1_SOYBEAN.FUT:CLOSE", "agricultural(BASE)")
SOYBEAN.CURVE.script = "SmartCurveCustomScript"
```

And we can now run a test build:

```js
c1 = SOYBEAN.CURVE.build("2021-10-27")
print c1.contracts
```
