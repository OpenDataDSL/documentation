---
slug: /odsl/variable/contracts
tags:
  - contract
  - curve
---
Contracts
=========

Contracts are used on a [curve](Curve) as a set of contract objects that represent the future periods and values

## Introduction

The contracts on a [curve](Curve) are simple a map indexed by the relative tenor of each individual [contract](Contract).

## Methods

Contracts has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|filter(PeriodCodeType)|Creates a new set of contracts that only has the contracts matching the supplied period code type|Contracts|

## Using Contracts
An example of filtering a list of contracts to return only months

```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)
curve = Curve(ondate)

curve.add(Contract(ondate, "2020M11", 25.67))
curve.add(Contract(ondate, "2020M12", 25.75))
curve.add(Contract(ondate, "2021Q01", 25.8))
curve.add(Contract(ondate, "2021Q02", 25.83))
curve.add(Contract(ondate, "2021Q03", 25.85))
curve.add(Contract(ondate, "2021Q04", 25.89))
curve.add(Contract(ondate, "2022Y", 25.99))

// Filter out just the months
months = curve.contracts.filter("Month")
print json(months)
```
