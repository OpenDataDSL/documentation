---
slug: /odsl/function/bootstrapCurve
---
Creates an arbitrage free monthly curve from an input curve

#### Description

The bootstrap function converts quarters, seasons and years into months and performs an arbitrage-free calculation on any overlapping periods.

#### Syntax
```js
bootstrapped = bootstrapCurve(Curve)
```
#### Result

A curve with monthly tenors

#### Example
```js
ondate = CurveDate(Date("2020-12-14"), "REOMHENG")

curve = Curve(ondate)
curve.add(Contract(ondate, "2021M01", 26.87))
curve.add(Contract(ondate, "2021Q01", 26.85))
curve.add(Contract(ondate, "2021Q02", 26.75))

bootstrapped = bootstrapCurve(curve)
for tenor in bootstrapped.contracts
    print tenor.absolute + " : " + tenor.value
next
```
```
2021M01 : 26.87
2021M02 : 26.84
2021M03 : 26.84
2021M04 : 26.75
2021M05 : 26.75
2021M06 : 26.75
```
You can see in the example that 2021M02 and 2021M03 are calculated using the formula:
```
((2021Q01 * 3) - 2021M01) / 2
```
