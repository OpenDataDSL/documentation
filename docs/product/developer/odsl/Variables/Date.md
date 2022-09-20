---
slug: /odsl/variable/date
tags:
  - date
---
Date
====================

A date variable is a representation of a Date or a Date and Time in the UTC timezone

## Construction

You can construct a date using a constructor function
```js
// Creates a new date variable with the current date with no time
today = Date()

// Creates a new date variable for the 8th October 2020
date = Date("2020-10-08")

// Creates a new date variable for the 8th October 2020 at 12:46
datetime = Date("2020-10-08T12:46:00")

/**
 Creates a new date variable using the start of the delivery period
 for October 2020 (2020M10) i.e. 1st October 2020
 **/
datepc = Date("2020M10")

// Creates a new date variable for the 8th October 2020 using a different format
df = Date("06/10/2020", "dd/MM/yyyy")

You can also use the [date active variable](https://opendatadsl.atlassian.net/wiki/spaces/DOCUMENTAT/pages/32971/Date+Service) to construct a date, e.g.

// Creates a new date variable for the next Monday (or today if today is Monday)
dav = ${date:"monday"}
```

## Properties

A date has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|dow|The name of the day of the week, e.g. Monday|Scalar(String)|
|day|The day of the month|Scalar(Integer)|
|month|The month of the year (1-12)|Scalar(Integer)|
|monthName|The name of the month, e.g. January|Scalar(String)|
|year|The year|Scalar(Integer)|
|hour|The hour of the day (0-23)|Scalar(Integer)|
|minute|The minute of the hour (0-59)|Scalar(Integer)|
|second|The second of the minute (0-59)|Scalar(Integer)|

Example usage of properties:
```js
// Creates a new date variable for the 8th October 2020 at 12:46
datetime = Date("2020-10-08T12:46:00")
print datetime.hour
print datetime.minute
print datetime.second
```

## Methods

The date variable has the following methods:

|**Name**|**Description**|**Returns**|
|-|-|-|
|next()|Returns the next calendar day after this one|Date|
|next(Calendar)|Returns the next day after this one using the supplied calendar|Date|
|previous()|Returns the previous calendar day before this one|Date|
|previous(Calendar)|Returns the previous day before this one using the calendar|Date|
|isHoliday(Calendar)|Returns true is this date is a holiday in the supplied calendar|Scalar(Boolean)|

Example using methods:
```js
// Create a date for the 5th October 2020
date5oct = Date("2020-10-05")

// Get the previous calendar day
date4oct = date5oct.previous()

/**
 Checks if the 4th October 2020 is a holiday according to the 
 business (Monday to Friday) calendar
**/
print date4oct.isHoliday("business")

// Prints out the previous date according to the business calendar
print date5oct.previous("business")
'''
'
## Operations

Dates can be used in mathematical operations, for example subtracting one date from another produces a Duration variable. Here are a list of valid date operations:

### Subtraction

Subtracting one date from another creates a duration, e.g.
```js
d1 = Date("2020-06-08")
d2 = ${date:"2020-06-09"}

// Test for date subtraction
dur1D = d2 - d1
assertEquals("1D", dur1D)
```

Subtracting a number from a date produces a new date with that number of days subtracted, e.g.

```js
// Test for date and numeric subtraction
datesub1 = Date("2020-10-08") - 1
assertEquals("2020-10-07T00:00:00", datesub1)
```

Subtracting a duration from a date produces a new date with the duration subtracted from it, e.g.

```js
// Test for date and duration subtraction
datesub2 = Date("2020-10-08") - 1M1D
assertEquals("2020-09-07T00:00:00", datesub2)
```

### Addition

Adding a duration to a date creates a new date, e.g.
```js
// Test for date and duration addition
datedur = Date("2020-10-08") + 1D
assertEquals("2020-10-09T00:00:00", datedur)
```

Adding a number to a date creates a new date with that number of days added, e.g.
```js
// Test for date and numeric addition
datenum = Date("2020-10-08") + 5
assertEquals("2020-10-13T00:00:00", datenum)
```
