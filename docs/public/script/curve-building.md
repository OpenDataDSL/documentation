---
title: Curve Building Script
description: All the public functions for building curves 
slug: /public/scripts/curve-building
tags:
  - curve
  - odsl
---
import AsMonths from '/docs/product/developer/odsl/Functions/all/_asMonths.md';
import BootstrapCurve from '/docs/product/developer/odsl/Functions/all/_bootstrapCurve.md';
import ExtendCurve from '/docs/product/developer/odsl/Functions/all/_extendCurve.md';
import ForwardFillCurve from '/docs/product/developer/odsl/Functions/all/_forwardFillCurve.md';
import Shape from '/docs/product/developer/odsl/Functions/all/_shape.md';

## Built-In Functions

### asMonths
<AsMonths  />

### bootstrapCurve
<BootstrapCurve  />

### extendCurve
<ExtendCurve  />

### forwardFillCurve
<ForwardFillCurve  />

### shape
<Shape  />

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
