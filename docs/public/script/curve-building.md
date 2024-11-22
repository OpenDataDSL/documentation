---
title: Curve Building Script
description: All the public functions for building curves 
slug: /public/scripts/curve-building
tags:
  - curve
  - odsl
---

## SmartCurve Functions
```#CurveScript``` is the default script used for expressions in [Smart Curves](/docs/odsl/variable/smartcurve).

### bootstrap
bootstrap is a shortcut version of [bootstrapCurve](#bootstrapcurve) which creates an arbitrage-free monthly curve from an input curve containing any number of:
* Months
* Quarters
* Seasons
* Years

#### Syntax
```js
bootstrap(BASE)
```

### bootstrapAndShape
This function first [bootstraps](#bootstrapcurve) an input curve and then [shapes](#shape) it using the default shaping algorithm.

#### Syntax
```js
bootstrapAndShape(BASE)
```

### multiplyByFactor
This function multiplies an input curve by a fixed factor

#### Syntax
```js
multiplyByFactor(BASE, factor)
```

### divideByFactor
This function divides an input curve by a fixed factor

#### Syntax
```js
divideByFactor(BASE, factor)
```

### addPremium
This function adds a fixed premium to an input curve

#### Syntax
```js
addPremium(BASE, premium)
```

### discount
This function subtracts a fixed discount from an input curve

#### Syntax
```js
discount(BASE, discount)
```

### flatCurve
This function creates a monthly curve with the same value for every tenor.
It takes 2 parameters:
* Months - the number of months you want the curve to be
* Value - the value you want to assign every tenor

#### Syntax
```js
flatCurve(12, 25.2)
```

### iif
This is a conditional function that tests a condition.

It takes 3 parameters:
* condition - the condition to test
* valid - the value to use if true
* invalid - the value to use if false

For each contract on the curve
* if the condition is true, it takes the value from the valid parameter
* if the condition is false, it takes the value from the invalid parameter

#### Syntax
```js
iif(BASE<0, 0, BASE)
```


### interpolate
The function fills in any missing tenors in the input curve using the specified method, which can be one of:
* FORWARD
* BACKWARD
* LINEAR
* CUBIC

#### Syntax
```js
interpolate(BASE, 'LINEAR')
```

### offPeak
This function creates an off peak power curve from a base and peak curve.
It takes 4 parameters:
* BASE - the base price curve
* PEAK - the peak price curve
* PKCAL - The name of the peak calendar which defines the hours relating to the peak hours
* OPKCAL - The name of the off-peak calendar which defines the hours relating to the off-peak hours

#### Syntax
```js
offPeak(BASE,PEAK,"#ICE_NL_PEAK_CALENDAR","#ICE_NL_OFFPEAK_CALENDAR")
```
