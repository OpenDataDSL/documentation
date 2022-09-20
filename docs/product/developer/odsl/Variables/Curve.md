---
slug: /odsl/variable/curve
tags:
  - curve
---
Curve
=====

A curve is a structure that represents a set of values with a time index sometime in the future. It can be used for commodity and financial forward curves, yield curves and forecasts (weather, prices etc.)

## Introduction

A curve is a very flexible and dynamic way of expressing point-in-time based future values, both real and forecasted. A simple curve comprises:

*   [CurveDate](CurveDate) - This is the date for when this curve is valid and all the data contained in the curve is relative to this date. The [CurveDate](CurveDate) also contains an [expiry calendar](ExpiryCalendar) which is used to calculate the relative future date/time of the curve contracts    
*   [Contracts](Contracts) - This is a set of [Contract](Contract) objects that contain a [period code](/docs/odsl/calendar/period-code) which determines the relative future period that this contract covers, a value and any other properties you want to add
*   Currency - An optional currency code
*   Units - An optional units code
*   User properties - Any other properties you want to add onto the curve
    
## Construction

To construct a new curve, you use the curve function which takes a [CurveDate](CurveDate) as a parameter as shown in the syntax below:
```js
curve = Curve(curveDate)
```
An example of constructing a new curve:
```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)
curve = Curve(ondate)
```
In the above example:

1.  We create a new ExpiryCalendar using a business calendar    
2.  Add an expiry rule to go to the end of the previous month    
3.  Create a CurveDate for a specific date and using the expiry calendar we used above    
4.  Create a new curve with the CurveDate created above
    

## Properties

A curve has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|ondate|The date for which the curve corresponds to|[CurveDate](CurveDate)|
|currency|The currency of this curve|Scalar(String)|
|units|The units of measure for this curve|Scalar(String)|
|contracts|The set of contracts on this curve|[Contracts](Contracts)|
|size|The number of contracts on this curve|Scalar(int)|
|*|Any other dynamic properties added|Any|

Examples of curve properties:
```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)
curve = Curve(ondate)

// Set the currency and units
curve.currency = "EUR"
curve.units = "MWH"

// Add a dynamic property 'category'
curve.category = "EUROPEAN POWER"
```

## Methods

A curve has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|add([Contract](Contract))|Adds a contract to a curve|This curve|

Full example using properties and methods:

```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)
curve = Curve(ondate)

curve.currency = "EUR"
curve.units = "MWH"

curve.category = "EUROPEAN POWER"

curve.add(Contract(ondate, "2020M11", 25.67))
curve.add(Contract(ondate, "2020M12", 25.75))
curve.add(Contract(ondate, "2021Q01", 25.8))
curve.add(Contract(ondate, "2021Q02", 25.83))
curve.add(Contract(ondate, "2021Q03", 25.85))
curve.add(Contract(ondate, "2021Q04", 25.89))
curve.add(Contract(ondate, "2022Y", 25.99))

print json(curve)
```
