---
slug: /odsl/variable/CurveDate
tags:
  - curve
  - date
---

CurveDate
=========================

A CurveDate is used as the valuation [date](Date) of a curve. It is a date with an [expiry calendar](ExpiryCalendar)

## Construction

A CurveDate is constructed using a [date](Date) and an [expiry calendar](ExpiryCalendar) as follows:
```js
ondate = CurveDate(Date, ExpiryCalendar)
```
Here is an example of constructing a curve date:
```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)
```
In the above example:

1.  We create a new ExpiryCalendar using a business calendar    
2.  Add an expiry rule to go to the end of the previous month    
3.  Create a CurveDate for a specific date and using the expiry calendar we used above
    
## Properties

A CurveDate has the following properties:

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
|calendar|The [expiry calendar](ExpiryCalendar) associated with this curve date (readonly)|ExpiryCalendar|

Example usage of properties:
```js
// Creates a new curve date variable
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)

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
|getExpiry(Period)|Gets the expiry date for the supplied period code|Date|

Example using methods:
```js
// Create a curve date for the 13th October 2020
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2020-10-13"), eombus)

// Get the expiry date for the December 2020
print ondate.getExpiry("2020M12")
```
