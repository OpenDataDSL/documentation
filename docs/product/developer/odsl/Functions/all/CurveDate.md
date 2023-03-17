---
slug: /odsl/function/CurveDate
---
A constructor to create a curve date.

A curve date consists of a [date](/docs/odsl/variable/date) and an [expiry calendar](/docs/odsl/variable/expirycalendar)

#### Syntax
```js
cd = CurveDate(date, expirycalendar)
```
#### Example
```js
// Using the code for an Expiry Calendar 
cd = CurveDate("2023-03-15", "#REOMHENG")

// Using an actual expiry calendar
expcal = ${expiry:"#REOMHENG"}
cd = CurveDate("2023-03-15", expcal)
```
