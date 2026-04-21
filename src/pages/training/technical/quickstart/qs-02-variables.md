---
slug: /training/technical/qs-variables
title: "QuickStart: Variable Types"
sidebar_position: 11
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Variable Types

An overview of all built-in variable types in ODSL, including scalars, dates, calendars, timeseries, curves, and custom types.

---

## Scalars, Dates and Secrets

### String

```js
//#region
a1 = "My String"
a2 = "Your String"
a3 = a1 + " plus " + a2
print a3
// >> My String plus Your String
//#endregion
```

### Number

```js
//#region
a1 = 10
a2 = 3.4
a3 = a1 * a2
print a3
// >> 34.000000
//#endregion
```

### Boolean

```js
//#region
a1 = 10
b1 = true
b2 = a1 == 10
print b2
// >> true
//#endregion
```

### Date

```js
//#region
// Get the current date
d1 = Date()

// Create a date in a specific format
d2 = Date("01/10/2021", "dd/MM/yyyy")
print d2
// >> 2021-10-01
//#endregion
```

### Duration

A duration represents an amount of time using ISO 8601 duration format:

```js
//#region
dur1 = Duration("1D6h")
d2 = Date("01/10/2021", "dd/MM/yyyy")
d3 = d2 + dur1
print d3
// >> 2021-10-02T06:00:00
//#endregion
```

### Secret

A secret is a string that is never displayed in the console — useful for passwords:

```js
//#region
o1 = Object()
o1.password = Secret("MyPassword")
print o1.password
// >> ********
//#endregion
```

---

## Calendars

A calendar defines the intervals at which timeseries values are recorded. Built-in calendar types include `DailyCalendar()`, `BusinessCalendar()`, `MonthlyCalendar()`, and `HolidayCalendar()`.

```js
//#region
cal = HolidayCalendar()
cal.addRule("Every Monday")
cal.addRule("25th of December named 'Christmas Day' on Saturday shift -1 day on Sunday shift 1 day")
first = Date("2021-12-20")
last = Date("2021-12-31")
dates = cal.getDates(first, last)
print dates
//#endregion
```

### CurveDate

A `CurveDate` combines a valuation date with an expiry calendar, representing the ondate of a forward curve:

```js
//#region
expiry = ExpiryCalendar(BusinessCalendar())
expiry.addRule("go back 1 day using calendar")
ondate = CurveDate(Date("2020-12-01"), expiry)
print ondate
//#endregion
```

---

## TimeSeries

A TimeSeries is a list of values aligned to a calendar:

```js
//#region
ts = TimeSeries("DAILY")
ts.add("2021-10-04", 12.5)
ts.addValue(13.6)
print ts.values
//#endregion
```

---

## Curves

A curve holds an array of contracts representing future delivery periods:

```js
//#region
expiry = ExpiryCalendar(BusinessCalendar())
expiry.addRule("go back 1 day using calendar")
ondate = CurveDate(Date("2020-12-01"), expiry)

c1 = Curve(ondate)
c1.add(Contract(ondate, "2021M01", 12.5))
c1.add(Contract(ondate, "2021M02", 12.75))
c1.add(Contract(ondate, "2021M03", 13.0))
print c1.contracts
//#endregion
```

---

## Custom Variable Types

You can define your own types to model real-world entities:

```js
//#region
widget = type
    description as String()
    price as Number()
end

ABC123 = object as widget
    description = "A small widget for storing beans"
    price = 6.24
end

print ABC123
//#endregion
```

:::note Next Step
In [QuickStart: Functions](/training/technical/qs-functions) you will explore the built-in function library and write your own functions.
:::
