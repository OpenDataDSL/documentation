---
slug: /odsl/variable/contract
tags:
  - contract
  - curve
---
Contract
========

A contract is a single future period in time that represents a tradable future contract or a forecasted value on a [curve](curve)

## Introduction

A contract, when used with commodity forward curves, is a structure that defines a delivery period for that contract and and associated information such as price and last trading day.

## Construction

To create a new contract, you need to use the contract construction function as shown below:
```js
contract = Contract(CurveDate, PeriodCode, value)
```
The 3 parameters are as follows:

*   CurveDate - this is the [CurveDate](CurveDate) for this contract, it usually is the same as the [curve](Curve) that this contract is attached to, but can be different if you want to calculate expiry dates differently 
*   PeriodCode - this is a string representation of the delivery [period code](/docs/odsl/calendar/period-code), in either absolute or relative format.
*   Value - This is the price/value for the contract
    

Example creation of a contract:
```js
// Create a curve
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)
curve = Curve(ondate)

// Create a contract
contract = Contract(ondate, "2020M11", 25.67)

// Add it to the curve
curve.add(contract)
```
This is what that contract looks like in JSON:
```json
{
    "tenor": "M01",
    "value": 25.67,
    "ondate": {
        "curveDate": "2020-10-13",
        "expiryCalendar": "eombus"
    },
    "properties": {
        "absolute": "2020M11",
        "end": "2020-11-30T00:00:00",
        "expiry": "2020-10-31T00:00:00",
        "relative": "M01",
        "start": "2020-11-01T00:00:00"
    }
}
```

You can see in the above example that there are a few properties automatically created and are described in the next section

## Properties

A contract has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|ondate|The CurveDate for this contract|[CurveDate](CurveDate)|
|tenor|The relative tenor of this contract|Scalar(String)|
|value|The value of this contract|Scalar|
|absolute|The absolute tenor name|Scalar(String)|
|relative|The relative tenor name|Scalar(String)|
|periodCodeType|The period code type, e.g. Month|Scalar(String)|
|expiry|The expiry or last trading date|Date|
|start|The start date of delivery of this contract|Date|
|end|The end date of delivery of this contract|Date|
|*|Any other dynamic property you want to add|Any|

