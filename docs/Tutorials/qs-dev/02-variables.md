---
title: Variable Types
sidebar_position: 3
slug: /tutorials/qs/developer/variables
tags:
  - quickstart
  - odsl
  - developer
  - variables
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module is an overview of variable types including geometry, dates, durations and objects" />

## Built-in Variable Types
This section of the module takes you through all the built-in variable types with examples on how to create them and some basic usage.

### Scalars, Dates and Secrets

#### String
A string variable represents a character string.

Example use of strings:
```js
a1 = "My String"
a2 = "Your String"
a3 = a1 + " plus " + a2
print a3
```
Outputs:
```
My String plus Your String
```

#### Number
A number variable represents any type of number, integer or decimal.

Example use of numbers:
```js
a1=10
a2=3.4
a3=a1*a2
print a3
```

Outputs:
```
34.000000
```

#### Boolean
A boolean variable represents a true or false value.

Example use of booleans:
```js
a1=10
b1=true
b2=a1==10
print b2
```

Outputs:
```
true
```

#### Date
A date variable represents a point in time, either as a date or a date and time.

Example use of dates:
```js
// Get the current date
d1=Date()

// Create a date in a specific format
d2=Date("01/10/2021", "dd/MM/yyyy")
print d2
```

Outputs:
```
2021-10-04
```

<InDepth href="/docs/odsl/variable/date" />

#### Duration
A duration variable represents an amount of time, e.g. 2 days or 15 seconds

Example use of durations:
```js
// Create a duration of 1 day and 6 hours
dur1=Duration("1D6h")
d2=Date("01/10/2021", "dd/MM/yyyy")

// Add the duration to the date
d3=d2+dur1
print d3
```

Outputs:
```
2021-10-02T06:00:00
```

<InDepth href="/docs/odsl/variable/duration" />

#### Geometry
A geometry variable represents a point or shape in a 2D or geographical co-ordinate system

Example use of geometry:
```js
bm20 = Sphere([51.51958, -0.12695], 20/3963.2)
geolocation = Point([52.35672, 4.91120])
road1 = MultiPoint([[-73.96943, 40.78519],[-72.96943, 41.78519],[-73.96943, 42.78519],[-73.96943, 40.78519]])
print road1.geometry.area
```

<InDepth href="/docs/odsl/dm/geospatial" />

#### Secret
A secret variable is a string that can be added to an object that is never displayed in the console and is generally used for passwords.

Example use of secrets:
```js
// Create an object
o1=Object()

// Add a secret
o1.password=Secret("MyPassword")

print o1.password
```

Outputs:
```
********
```
<InDepth href="/docs/odsl/variable/secret" />

### Calendars
A calendar variable represents a time-line of intervals generally used to define points in time where you expect to have data point.

You can create your own calendars based on these basic types:
* [IntradayCalendar](/docs/odsl/calendar/intraday) - time-points within a day like hours
* [Daily](/docs/odsl/calendar/daily) - days or multiples of days, e.g. weeks
* [Business](/docs/odsl/calendar/business) - weekdays only
* [Holiday](/docs/odsl/calendar/holiday) - based on the Daily calendar, but includes holiday rules
* Monthly and Yearly calendars
* [Sparse](/docs/odsl/calendar/sparse) - non-regular dates, can be any point-in-time
* [Expiry](/docs/odsl/calendar/expiry) - forward contract trading expiry calendars

Calendar example:
```js
cal = HolidayCalendar()
cal.addRule("Every Monday")
cal.addRule("25th of December named 'Christmas Day' on Saturday shift -1 day on Sunday shift 1 day")
first = Date("2021-12-20")
last = Date("2021-12-31")
dates = cal.getDates(first, last)
print dates
```

Outputs:
```
[
2021-12-21
2021-12-22
2021-12-23
2021-12-25
2021-12-26
2021-12-28
2021-12-29
2021-12-30
2021-12-31
]
```

<InDepth href="/docs/odsl/calendar/calendars" />

#### Curve Date
A CurveDate is a combined date and expiry calendar which represents a curve valuation date or OnDate.

CurveDate example:
```js
expiry = ExpiryCalendar(BusinessCalendar())
expiry.addRule("go back 1 day using calendar")

ondate = CurveDate(Date("2020-12-01"), expiry)
print ondate
```

Output:
```
2020-12-01
```

<InDepth href="/docs/odsl/variable/CurveDate" />

### TimeSeries and Curves

#### TimeSeries
A TimeSeries is a list of values aligned to a calendar which generally represent a recording of observations over a period of time such as prices for a specific product.

TimeSeries example:
```js
ts = TimeSeries("DAILY")
ts.add("2021-10-04", 12.5)
ts.addValue(13.6)

print ts.values
```

Outputs:
```
[
2021-10-04	12.500000
2021-10-05	13.600000
]
```

<InDepth href="/docs/odsl/variable/timeseries" />

<Tutorial name="Working with TimeSeries" href="/docs/tutorials/workingtimeseries" />

#### Curves
A curve is a list of contracts which represent either a future delivery period or a forecasting period and is usually used for commodity forward curves, financial futures curves and weather forecasts.

Curve example:
```js
expiry = ExpiryCalendar(BusinessCalendar())
expiry.addRule("go back 1 day using calendar")

ondate = CurveDate(Date("2020-12-01"), expiry)
c1 = Curve(ondate)

c1.add(Contract(ondate, "2021M01", 12.5))
c1.add(Contract(ondate, "2021M02", 12.75))
c1.add(Contract(ondate, "2021M03", 13.0))
c1.add(Contract(ondate, "2021M04", 13.5))
c1.add(Contract(ondate, "2021Q01", 12.75))
c1.add(Contract(ondate, "2021Q02", 13.25))
c1.add(Contract(ondate, "2021Q03", 13.75))
c1.add(Contract(ondate, "2021Y", 13.5))

print c1.contracts
```

Outputs:
```
M01: 12.500000
Q01: 12.750000
Y01: 13.500000
M02: 12.750000
M03: 13
M04: 13.500000
Q02: 13.250000
Q03: 13.750000
```

<InDepth href="/docs/odsl/variable/curve" />

## Custom Variable Types
You can create your own variable types which represent real-world entites such as companies, products, people, dogs - pretty much anything you can think of.

You define your variable type using the special *type* constructor syntax, here is an example:
 
```js
widget = type
    description as String()
    price as Number()
end
```

Once your have defined your type, you can create objects 'of that' type using the special *object* constructor syntax as shown below:

```js
ABC123 = object as widget
    description = "A small widget for storing beans"
    price = 6.24
end

print ABC123
```

This prints the following:

```
{
  "_id": "ABC123",
  "_type": "widget",
  "_links": {},
  "description": "A small widget for storing beans",
  "price": 6.240000
}
```

