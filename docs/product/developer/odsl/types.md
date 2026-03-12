---
slug: /odsl/types
title: ODSL Types Reference
---

## ODSL Variable Types Reference

This document provides detailed documentation for all built-in variable types in OpenDataDSL.

### Scalar
**Description:** A scalar is a single value of either string, boolean (true/false) or numeric

**Construction:**
```odsl
```

**Properties:**
* `links` - Gets linked items

**Methods:**
* `isZero()` - Checks to see if the value is zero - **returns:** Boolean
* `setPrecisionScale(scale)` - Set the number of decimal places to round to - **returns:** Scalar
  * `scale` (Integer) - The number of decimal places to round to
* `setPrecisionRoundingMode(mode)` - Set the rounding mode for numbers - **returns:** Scalar
  * `mode` (String) - The rounding mode for numbers, can be one of: [UP, DOWN, CEILING, FLOOR, HALF_UP, HALF_DOWN, HALF_EVEN, UNNECESSARY]
* `isMissing()` - Checks to see if the value is null or missing - **returns:** Boolean
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to


---

### Date
**Description:** A date variable is a representation of a Date or a Date and Time in the UTC timezone

**Construction:**
```odsl
Date(date, format)
Date(date)
Date()
```

**Properties:**
* `timezone` - The timezone of this date
* `year` - Get the year
* `hour` - Get the hour of the day from 0 to 23
* `minute` - Get the minute of the hour from 0 to 59
* `second` - Get the second of the minute from 0 to 59
* `week` - Get the week of the year
* `month` - Get the month of the year from 1 to 12
* `millis` - in millis
* `day` - Get the day of the month
* `hourlyTenor` - Get the absolute hourly tenor from this date
* `halfHourlyTenor` - Get the absolute half hourly tenor from this date
* `dow` - Get the name of the day of the week, e.g. Monday
* `iSOYear` - Get the ISO week based year
* `quarter` - Get the quarter
* `weekOfMonth` - Get the week of the year
* `monthName` - Get the name of the month, e.g. JANUARY
* `quarterHourlyTenor` - Get the absolute quarter hourly tenor from this date
* `links` - Gets linked items

**Methods:**
* `next(Calendar)` - Returns a new Date as the next day after this one using the supplied calendar - **returns:** Void
  * `Calendar` (Calendar or Scalar) - The calendar to calculate the next day
* `next()` - Returns a new Date as the next calendar day after this one - **returns:** Void
* `previous()` - Returns a new Date as the previous calendar day before this one - **returns:** Void
* `previous(Calendar)` - Returns a new Date as the previous day before this one using the supplied calendar - **returns:** Void
  * `Calendar` (Calendar or Scalar) - The calendar to calculate the previous day
* `dayOfMonth(day, Calendar)` - Returns a new Date as the specific day of the month using the supplied calendar - **returns:** Void
  * `day` (Integer) - The day of the month to use
  * `Calendar` (Calendar or Scalar) - The calendar used, if the day of the month is a holiday, the following non-holiday is used
* `dayOfMonth(day)` - Returns a new Date as the specific day of the month - **returns:** Void
  * `day` (Integer) - The day of the month to use
* `isAfter(other)` - Returns true if this date is after the supplied date - **returns:** Void
  * `other` (Date) - The date to compare against
* `isBefore(other)` - Returns true if this date is before the supplied date - **returns:** Void
  * `other` (Date) - The date to compare against
* `endOfMonth(Calendar)` - Returns a new Date as the end of the month using the supplied calendar - **returns:** Void
  * `Calendar` (Calendar or Scalar) - The calendar to calculate the end of the month
* `endOfMonth()` - Returns a new Date as the end of the month - **returns:** Void
* `startOfMonth()` - Returns a new Date as the start of the month - **returns:** Void
* `startOfMonth(Calendar)` - Returns a new Date as the start of the month using the supplied calendar - **returns:** Void
  * `Calendar` (Calendar or Scalar) - The calendar to calculate the start of the month
* `endOfDay()` - Returns a new Date as the end of the day - **returns:** Void
* `isHoliday(Calendar)` - Returns true if this date is a holiday using the supplied calendar - **returns:** Void
  * `Calendar` (Calendar or Scalar) - The calendar to calculate the holiday
* `inTimezone(timezone)` - Returns this date/time in the supplied timezone - **returns:** Void
  * `timezone` (String id of timezone) - The timezone to convert this date to
* `startOfDay()` - Returns a new Date as the start of the day - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to


---

### Duration
**Description:** A duration variable represents a period of time such as 3 days or 4 and a half minutes in ISO 8601 duration format

**Construction:**
```odsl
Duration(dur)
Duration(dur, calendar)
```

**Properties:**
* `seconds` - Get the number of seconds in this duration
* `years` - Get the number of years in this duration
* `months` - Get the number of months in this duration
* `days` - Get the number of days in this duration
* `hours` - Get the number of hours in this duration
* `minutes` - Get the number of minutes in this duration
* `durationCalendar` - Get a calendar representing this duration
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to


---

### Secret
**Description:** A secret is a scalar whose value cannot be printed or logged, it only really is useful when used with the Secret Service where secrets can be stored and then retrieved by scripts or workflows. Usually secrets are used to store passwords and database connection information etc.

**Construction:**
```odsl
Secret(value)
```

**Properties:**
* `notBefore` - Optionally set a date for this secret to start from
* `expires` - Optionally set a date for this secret to expire
* `enabled` - Set this to true to enable this secret, false to diable it
* `id` - Get the name of the secret
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `secret`



---

### Object
**Description:** An object is a very versatile variable type that allows you to add any other variables to it including Object variable types. This creates a dynamic JSON type structure

**Construction:**
```odsl
Object(type)
Object()
```

**Properties:**
* `access` - Get the name of the access data role for this object
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `object`



---

### SimpleObject
**Description:** A simplified object which represents a pure JSON object

**Construction:**
```odsl
SimpleObject()
```

**Properties:**
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to


---

### Calendar
**Description:** A calendar variable type represents an ODSL Calendar. It is used with timeseries, curves and other time-bound resources

**Construction:**
```odsl
Calendar(code)
```

**Properties:**
* `name` - Get the name of the underlying ODSL Calendar
* `rules` - Get the rules for this Calendar
* `code` - Get the code of the underlying ODSL Calendar
* `timezone` - Get the timezone of the Calendar - only supported on Intraday calendars
* `setUseHolidays` - Tells this intraday calendar to use holidays as full days, i.e. for off-peak calendars
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `next(date)` - Gets the next date after the supplied date - **returns:** Date
  * `date` (Date) - The date to use
* `previous(date)` - Gets the previous date before the supplied date - **returns:** Date
  * `date` (Date) - The date to use
* `addDays(date, days)` - Adds the supplied number of days to the supplied date and returns the new date - **returns:** Date
  * `date` (Date) - The date to use
  * `days` (Integer) - The number of days to add (can also be negative)
* `addRule(rule)` - Add a holiday rule if this is a holiday calendar - **returns:** Void
  * `rule` (String) - The holiday rule
* `getHolidaysForYear(year)` - Gets a list of holiday dates for the year specified from this calendar - **returns:** List
  * `year` (Scalar) - year to get holiday dates
* `includes(date)` - Tests to see if the supplied date aligns with this calendar - **returns:** Boolean
  * `date` (Date) - The date to check
* `getNextNonWorkingDay(start)` - Returns the next non-working day after the supplied date - **returns:** Void
  * `start` (Date) - The start date to use
* `getDatesFrom(start, number)` - Gets number+1 list of dates from the supplied start date - **returns:** List
  * `start` (Date) - The start date for the range of dates
  * `number` (Date) - The number of indexes from the start date to retrieve
* `getNextWorkingDay(start)` - Returns the next working day after the supplied date - **returns:** Void
  * `start` (Date) - The start date to use
* `getDates(start, end)` - Gets a list of dates from this calendar for the supplied date range - **returns:** List
  * `start` (Date) - The start date for the range of dates
  * `end` (Date) - The end date for the range of dates
* `getLastWorkingDay(start)` - Returns the last working day of the week after the supplied date - **returns:** Void
  * `start` (Date) - The start date to use
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `calendar`



---

### ExpiryCalendar
**Description:** An expiry calendar variable type represents an Expiry Calendar which is a special type of calendar that uses rules to calculate when trading stops for a future price for a particular commodity

**Construction:**
```odsl
ExpiryCalendar(code)
ExpiryCalendar(holiday)
ExpiryCalendar(holiday, delivery)
```

**Properties:**
* `name` - Get the name of the underlying ODSL Calendar
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `addRule(rule)` - Adds an expiry rule to this expiry calendar - **returns:** Void
  * `rule` (Scalar(String)) - The rule to add
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `expiry`



---

### TimeSeries
**Description:** Time-indexes data series with associated calendar

**Construction:**
```odsl
TimeSeries(calendar, dataType)
TimeSeries(calendar)
TimeSeries(start, Calendar, value)
TimeSeries(start, Calendar, value, dataType)
TimeSeries(start, end, Calendar, value, dataType)
TimeSeries(start, Calendar, intervalPositions, value, dataType, positionCalendar)
```

**Properties:**
* `name` - The name of the timeseries
* `start` - The starting date/time of the timeseries
* `calendar` - The calendar that this timeseries uses
* `valueType` - The value type of the timeseries (TRACKED or BASIC)
* `observed` - The observed setting of the timeseries used for aggregating
* `precision` - The precision configuration for this timeseries
* `source` - The source of this timeseries
* `units` - The ISO units of this timeseries
* `currency` - The ISO currency of this timeseries
* `values` - The list of time observations for this timeseries, returned as a list of TimeValues
* `timezone` - The timezone of this timeseries, defaults to UTC
* `localValues` - The list of time observations for this timeseries, returned as a list of TimeValues in the local timezone of this TimeSeries
* `observations` - The list of values for this timeseries, returned as a list of Vars
* `tenor` - The tenor of this timeseries
* `observed` - How the data was measured, can be beginning, end, summed, averaged, high or low
* `description` - The description of this timeseries
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `add(start, values)` - Adds an array of values to the timeseries - **returns:** Void
  * `start` (Date) - The start date/time of the values to add
  * `values` (Array) - The values to add
* `add(index, value, status)` - Adds a new value to the timeseries - **returns:** Void
  * `index` (Date) - The date/time of the value to add
  * `value` (Any) - The value to add
  * `status` (String or array) - The status of the value to add
* `add(index, value)` - Adds a new value to the timeseries - **returns:** Void
  * `index` (Date) - The date/time of the value to add
  * `value` (Any) - The value or values to add
* `add(other)` - Adds a timeseries to this timeseries, each value of the passed in timeseries is applied to this - **returns:** Void
  * `other` (TimeSeries) - The other timeseries to add to this
* `convert(currency, units)` - Convert this timeseries using currency and units - **returns:** Void
  * `currency` (String) - The currency to convert to
  * `units` (String) - The units to convert to
* `last(n)` - Creates a new TimeSeries using the last n values from this TimeSeries - **returns:** Void
  * `n` (Integer) - The number of observations to extract
* `from(start)` - Creates a new TimeSeries from a specified start date - **returns:** Void
  * `start` (Date) - The start date for the new Timeseries
* `range(start, end)` - Creates a new TimeSeries from a range of values from this TimeSeries - **returns:** Void
  * `start` (Date) - The date/time of the start of the range to extract
  * `end` (Date) - The date/time of the end of the range to extract
* `getLast(date)` - Get the value at the supplied date or the latest value before that date - **returns:** Var
  * `date` (Date) - The index date to use
* `addValue(value)` - Adds a new value to the end of the timeseries using the calendar - **returns:** Void
  * `value` (Scalar) - The value or values to add
* `getLastNValues(n)` - Returns a list of the last N values from this TimeSeries - **returns:** Void
  * `n` (Integer) - The number of observations to return, must be 1 or greater
* `addCheck(check)` - Add a quality check directly to this Timeseries - **returns:** Void
  * `check` (String) - The text for the check, e.g. 'missing'
* `withRange(start, end)` - Changes this timeseries to match the provided date range - **returns:** Void
  * `start` (Date) - The date/time of the start of the range to extract
  * `end` (Date) - The date/time of the end of the range to extract
* `applyPrecision()` - Apply the precision defined to all the observations of this timeseries - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### SmartTimeSeries
**Description:** A Smart TimeSeries is an expression that is used to build TimeSeries on demand

**Construction:**
```odsl
SmartTimeSeries(expression)
SmartTimeSeries(start, calendar, expression)
SmartTimeSeries(base, expression)
```

**Properties:**
* `source` - The source of this timeseries
* `units` - The ISO units of this timeseries
* `currency` - The ISO currency of this timeseries
* `values` - The list of time observations for this timeseries, returned as a list of TimeValues
* `timezone` - The timezone of this timeseries, defaults to UTC
* `localValues` - The list of time observations for this timeseries, returned as a list of TimeValues in the local timezone of this TimeSeries
* `observations` - The list of values for this timeseries, returned as a list of Vars
* `tenor` - The tenor of this timeseries
* `observed` - How the data was measured, can be beginning, end, summed, averaged, high or low
* `description` - The description of this timeseries
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `build()` - Builds this Smart TimeSeries - **returns:** TimeSeries
* `add(start, values)` - Adds an array of values to the timeseries - **returns:** Void
  * `start` (Date) - The start date/time of the values to add
  * `values` (Array) - The values to add
* `add(index, value, status)` - Adds a new value to the timeseries - **returns:** Void
  * `index` (Date) - The date/time of the value to add
  * `value` (Any) - The value to add
  * `status` (String or array) - The status of the value to add
* `add(index, value)` - Adds a new value to the timeseries - **returns:** Void
  * `index` (Date) - The date/time of the value to add
  * `value` (Any) - The value or values to add
* `add(other)` - Adds a timeseries to this timeseries, each value of the passed in timeseries is applied to this - **returns:** Void
  * `other` (TimeSeries) - The other timeseries to add to this
* `convert(currency, units)` - Convert this timeseries using currency and units - **returns:** Void
  * `currency` (String) - The currency to convert to
  * `units` (String) - The units to convert to
* `last(n)` - Creates a new TimeSeries using the last n values from this TimeSeries - **returns:** Void
  * `n` (Integer) - The number of observations to extract
* `from(start)` - Creates a new TimeSeries from a specified start date - **returns:** Void
  * `start` (Date) - The start date for the new Timeseries
* `range(start, end)` - Creates a new TimeSeries from a range of values from this TimeSeries - **returns:** Void
  * `start` (Date) - The date/time of the start of the range to extract
  * `end` (Date) - The date/time of the end of the range to extract
* `getLast(date)` - Get the value at the supplied date or the latest value before that date - **returns:** Var
  * `date` (Date) - The index date to use
* `addValue(value)` - Adds a new value to the end of the timeseries using the calendar - **returns:** Void
  * `value` (Scalar) - The value or values to add
* `getLastNValues(n)` - Returns a list of the last N values from this TimeSeries - **returns:** Void
  * `n` (Integer) - The number of observations to return, must be 1 or greater
* `addCheck(check)` - Add a quality check directly to this Timeseries - **returns:** Void
  * `check` (String) - The text for the check, e.g. 'missing'
* `withRange(start, end)` - Changes this timeseries to match the provided date range - **returns:** Void
  * `start` (Date) - The date/time of the start of the range to extract
  * `end` (Date) - The date/time of the end of the range to extract
* `applyPrecision()` - Apply the precision defined to all the observations of this timeseries - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### EventTimeSeries
**Description:** A TimeSeries that is dynamically built from events

**Construction:**
```odsl
EventTimeSeries(eventlist, property)
```

**Properties:**
* `event` - The name of the eventlist that this TimeSeries uses (in the form objectId:eventListId)
* `property` - The name of the property in the event that this TimeSeries uses as the value
* `filter` - Optional filter used to filter the events used to build this TimeSeries
* `index` - Optional date field to use for the index used to build this TimeSeries, defaults to start
* `source` - The source of this timeseries
* `units` - The ISO units of this timeseries
* `currency` - The ISO currency of this timeseries
* `values` - The list of time observations for this timeseries, returned as a list of TimeValues
* `timezone` - The timezone of this timeseries, defaults to UTC
* `localValues` - The list of time observations for this timeseries, returned as a list of TimeValues in the local timezone of this TimeSeries
* `observations` - The list of values for this timeseries, returned as a list of Vars
* `tenor` - The tenor of this timeseries
* `observed` - How the data was measured, can be beginning, end, summed, averaged, high or low
* `description` - The description of this timeseries
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `build()` - Builds this Event TimeSeries - **returns:** TimeSeries
* `add(start, values)` - Adds an array of values to the timeseries - **returns:** Void
  * `start` (Date) - The start date/time of the values to add
  * `values` (Array) - The values to add
* `add(index, value, status)` - Adds a new value to the timeseries - **returns:** Void
  * `index` (Date) - The date/time of the value to add
  * `value` (Any) - The value to add
  * `status` (String or array) - The status of the value to add
* `add(index, value)` - Adds a new value to the timeseries - **returns:** Void
  * `index` (Date) - The date/time of the value to add
  * `value` (Any) - The value or values to add
* `add(other)` - Adds a timeseries to this timeseries, each value of the passed in timeseries is applied to this - **returns:** Void
  * `other` (TimeSeries) - The other timeseries to add to this
* `convert(currency, units)` - Convert this timeseries using currency and units - **returns:** Void
  * `currency` (String) - The currency to convert to
  * `units` (String) - The units to convert to
* `last(n)` - Creates a new TimeSeries using the last n values from this TimeSeries - **returns:** Void
  * `n` (Integer) - The number of observations to extract
* `from(start)` - Creates a new TimeSeries from a specified start date - **returns:** Void
  * `start` (Date) - The start date for the new Timeseries
* `range(start, end)` - Creates a new TimeSeries from a range of values from this TimeSeries - **returns:** Void
  * `start` (Date) - The date/time of the start of the range to extract
  * `end` (Date) - The date/time of the end of the range to extract
* `getLast(date)` - Get the value at the supplied date or the latest value before that date - **returns:** Var
  * `date` (Date) - The index date to use
* `addValue(value)` - Adds a new value to the end of the timeseries using the calendar - **returns:** Void
  * `value` (Scalar) - The value or values to add
* `getLastNValues(n)` - Returns a list of the last N values from this TimeSeries - **returns:** Void
  * `n` (Integer) - The number of observations to return, must be 1 or greater
* `addCheck(check)` - Add a quality check directly to this Timeseries - **returns:** Void
  * `check` (String) - The text for the check, e.g. 'missing'
* `withRange(start, end)` - Changes this timeseries to match the provided date range - **returns:** Void
  * `start` (Date) - The date/time of the start of the range to extract
  * `end` (Date) - The date/time of the end of the range to extract
* `applyPrecision()` - Apply the precision defined to all the observations of this timeseries - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### Curve
**Description:** A structure that represents a forward curve with forward contracted delivery periods

**Construction:**
```odsl
Curve(ondate)
```

**Properties:**
* `name` - The name of the curve
* `description` - A description of the curve
* `precision` - The precision configuration for this curve
* `size` - The number of contracts on this curve
* `units` - The units of measure for this curve
* `currency` - The currency of this curve
* `contracts` - Get the forward contracts on this curve
* `timezone` - The timezone for this curve
* `ondate` - The date for which this curve corresponds to
* `ondate` - The date for which this curve corresponds to
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `add(tenor, value)` - Adds a new contract to this curve - **returns:** Void
  * `tenor` (String) - The tenor of the contract to add
  * `value` (Number) - The value of the contract to add
* `add(contract)` - Adds the supplied contract to this curve - **returns:** Void
  * `contract` (Contract) - The contract to add
* `add(tenor, value)` - Adds a new contract to this curve - **returns:** Void
  * `tenor` (String) - The tenor of the contract to add
  * `value` (Number) - The value of the contract to add
* `add(contracts)` - Adds the supplied contracts to this curve - **returns:** Void
  * `contracts` (Contracts) - The contracts to add
* `convert(currency, units)` - Convert this curve using currency and units - **returns:** Void
  * `currency` (String) - The currency to convert to
  * `units` (String) - The units to convert to
* `contains(tenor)` - Checks to see if this curve contains the supplied relative tenor - **returns:** Boolean
  * `tenor` (String) - The relative tenor to check
* `addNew(contracts)` - Adds the supplied contracts to this curve only if the tenor doesn't already exist on this curve - **returns:** Void
  * `contracts` (Contracts) - The contracts to add
* `addNew(contract)` - Adds the supplied contract to this curve only if the tenor doesn't already exist on this curve - **returns:** Void
  * `contract` (Contract) - The contract to add
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### SmartCurve
**Description:** A Smart Curve is an expression that is used to build curves on demand

**Construction:**
```odsl
SmartCurve()
SmartCurve(base, expression)
```

**Properties:**
* `name` - The name of the curve
* `description` - A description of the curve
* `category` - The category to place this curve in
* `commodity` - The commodity for this curve
* `market` - The market to place this curve in
* `product` - The product category for this curve
* `priority` - The build priority, 1=high, 2=medium, 3=low
* `precision` - The precision configuration for this curve
* `script` - The name of the script to use, if empty will use the default #CurveScript script
* `units` - The units of this curve
* `currency` - The currency of this curve
* `baseCurve` - The base curve, referred to as BASE in the formula - it is also used to determine the ondates for this curve formula
* `cacheOptions` - The options used to cache this smart curve
* `timezone` - The timezone for this curve
* `expression` - The formula expression to generate this curve
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `build(ondate)` - Builds this Smart Curve for the supplied date - **returns:** Curve
  * `ondate` (Date) - The date to build this Smart Curve for
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### EventCurve
**Description:** A curve that is dynamically built from events

**Construction:**
```odsl
EventCurve(eventlist, calendar, property, tenor)
```

**Properties:**
* `event` - The name of the eventlist that this Curve uses (in the form objectId:eventListId)
* `property` - The name of the property in the event that this Curve uses as the value
* `tenor` - The name of the property in the event that this Curve uses as the tenor/maturity code
* `calendar` - The expiry calendar for this Curve
* `holidayCalendar` - The holiday calendar for this Curve - this is used to determine what dates this curve should be published on
* `filter` - Optional filter used to filter the events used to build this Curve
* `source` - Optional source of the events used to build this Curve
* `valueTransformation` - Optional value transformation expression to change all values in the curve
* `size` - The number of contracts on this curve
* `units` - The units of measure for this curve
* `currency` - The currency of this curve
* `contracts` - Get the forward contracts on this curve
* `timezone` - The timezone for this curve
* `ondate` - The date for which this curve corresponds to
* `ondate` - The date for which this curve corresponds to
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `build()` - Builds this Event Curve - **returns:** Curve
* `add(tenor, value)` - Adds a new contract to this curve - **returns:** Void
  * `tenor` (String) - The tenor of the contract to add
  * `value` (Number) - The value of the contract to add
* `add(contract)` - Adds the supplied contract to this curve - **returns:** Void
  * `contract` (Contract) - The contract to add
* `add(tenor, value)` - Adds a new contract to this curve - **returns:** Void
  * `tenor` (String) - The tenor of the contract to add
  * `value` (Number) - The value of the contract to add
* `add(contracts)` - Adds the supplied contracts to this curve - **returns:** Void
  * `contracts` (Contracts) - The contracts to add
* `convert(currency, units)` - Convert this curve using currency and units - **returns:** Void
  * `currency` (String) - The currency to convert to
  * `units` (String) - The units to convert to
* `contains(tenor)` - Checks to see if this curve contains the supplied relative tenor - **returns:** Boolean
  * `tenor` (String) - The relative tenor to check
* `addNew(contracts)` - Adds the supplied contracts to this curve only if the tenor doesn't already exist on this curve - **returns:** Void
  * `contracts` (Contracts) - The contracts to add
* `addNew(contract)` - Adds the supplied contract to this curve only if the tenor doesn't already exist on this curve - **returns:** Void
  * `contract` (Contract) - The contract to add
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### Contracts
**Description:** Contracts are used on a curve as a set of contract objects that represent the future periods and values

**Construction:**
```odsl
```

**Properties:**
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### Contract
**Description:** A contract is a single future period in time that represents a tradable future contract or a forecasted value on a curve

**Construction:**
```odsl
Contract(ondate, tenor, value, start, end)
Contract(ondate, tenor, value)
Contract(ondate, tenor, value, absolute, start, end, expiry)
```

**Properties:**
* `value` - Get the value of this contract
* `next` - Get the contract with the same type that is after this one or null if there isn't one
* `previous` - Get the contract with the same type that is before this one or null if there isn't one
* `status` - The status information for this contract
* `periodCodeType` - Get the Period Code type for this contract
* `within` - Gets a list of contracts that are within this contract
* `scalarValue` - Get the value of this contract including the configured precision
* `immediatelyAfter` - Get the contract with the same type that is immediately after this one or null if there isn't one
* `immediatelyBefore` - Get the contract with the same type that is immediately before this one or null if there isn't one
* `overlaps` - Gets a list of contracts that are overlapping with this contract
* `ondate` - Get the CurveDate for this contract
* `tenor` - Get the relative tenor code for this contract
* `expiry` - The last trading date for this contract
* `start` - The start of delivery for this contract
* `end` - The end of delivery for this contract
* `links` - Gets linked items

**Methods:**
* `isImmediatelyAfter(other)` - A test to see if the supplied contract is immediately after this one - **returns:** Void
  * `other` (Contract) - The contract to test against
* `isOverlapping(other)` - A test to see if the this contract is overlapping the supplied contract - **returns:** Void
  * `other` (Contract) - The contract to test if this contract is overlapping
* `isWithin(other)` - A test to see if the this contract is entirely within the supplied contract - **returns:** Void
  * `other` (Contract) - The contract to test if this contract is entirely within
* `isImmediatelyBefore(other)` - A test to see if the supplied contract is immediately before this one - **returns:** Void
  * `other` (Contract) - The contract to test against
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### Event
**Description:** Event data structure for time-based occurrences

**Construction:**
```odsl
Event(time)
Event(ondate, tenor)
```

**Properties:**
* `eventtime` - The time of the event message
* `eventstart` - The point in time when the event started/starts - defaults to the time of the event message
* `eventend` - The point in time when the event ended/ends - default to the eventstart
* `timezone` - The timezone of the event message
* `eventtype` - The type of event
* `event` - The identifier for this group of events
* `eventid` - The unique identifier for this specific event
* `eventlist` - The non-object specific name of this group of events
* `status` - The status of this event
* `source` - The source of this event, usually null
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `createId()` - Creates a unique id for this event based on the event start and end time - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `event`



---

### List
**Description:** A list represents a list of other variables

**Construction:**
```odsl
List()
```

**Properties:**
* `name` - The name of this list
* `description` - The description of this list
* `size` - The size of this list
* `links` - Gets linked items

**Methods:**
* `add(element)` - Adds a new element to the list - **returns:** Void
  * `element` (Any) - The variable to add to the list
* `add(index, element)` - Adds a new element to the list at the specified position (0 being first) - **returns:** Void
  * `index` (Integer) - The position where the element should be added to the list
  * `element` (Any) - The variable to add to the list
* `remove(index)` - Removes an element from the list at the specified position (0 being first) - **returns:** Void
  * `index` (Integer) - The position where the element should be removed from the list
* `remove(item)` - Removes an element from the list - **returns:** Void
  * `item` (Var) - The item to remove from the list
* `subList(start, end)` - Gets a list from a sublist of this list - **returns:** Void
  * `start` (Integer) - The first element to get, starting from 0
  * `end` (Integer) - The last element to get, must be at least 1 higher than the start
* `addAll(elements)` - Adds a list to this list returning a new combined list - **returns:** List
  * `elements` (List) - The list to add to the list
* `set(index, element)` - Replaces the element at the specified position in this list with the specified element - **returns:** Void
  * `index` (Integer) - The position where the element should be replaced in the list
  * `element` (Any) - The variable to replace in the list
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to


---

### Matrix
**Description:** A matrix represents a 2-dimensional array of numeric values

**Construction:**
```odsl
Matrix(labels, v)
Matrix(labels)
Matrix(labels, v)
Matrix(x, y)
Matrix(y, x, v)
Matrix(labels)
```

**Properties:**
* `name` - The name of the matrix
* `description` - The description of the matrix
* `ondate` - The valuation date for this matrix
* `xLabels` - The column labels
* `yLabels` - The row labels
* `xSize` - The number of columns
* `ySize` - The number of rows
* `currency` - The currency of the values in this matrix
* `units` - The unit of measure for the values in this matrix
* `timezone` - The timezone of this matrix, defaults to UTC
* `precision` - The precision configuration for this matrix
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `getValue(y, x)` - Gets the value at the specified column and row - **returns:** Number
  * `y` (Number) - The row number
  * `x` (Number) - The column number
* `setValue(x, y, value)` - Sets the value at the specified column and row - **returns:** Matrix
  * `x` (Number) - The column number
  * `y` (Number) - The row number
  * `value` (Number) - The value to set at the specified column and row
* `setValue(cell, value)` - Sets the value at the specified column and row - **returns:** Matrix
  * `cell` (String) - The cell identifier using row:column notation
  * `value` (Number) - The value to set at the specified column and row
* `subMatrix(rc1, rc2)` - Creates a new matrix as a subset of this matrix - **returns:** Matrix
  * `rc1` (String) - The top left row and column using row:column notation
  * `rc2` (String) - The bottom right row and column using row:column notation
* `subMatrix(y1, x1, y2, x2)` - Creates a new matrix as a subset of this matrix - **returns:** Matrix
  * `y1` (Integer) - The top row number
  * `x1` (Integer) - The left column number
  * `y2` (Integer) - The bottom row number
  * `x2` (Integer) - The right column number
* `setLabels(labels)` - Sets the labels for the rows and columns of a symmetrical matrix  - **returns:** Matrix
  * `labels` (List) - The row and column labels
* `getColumn(col)` - Gets the data for a column - **returns:** List
  * `col` (Integer) - The column number
* `getValueAt(y, x)` - Gets the value at the specified column and row - **returns:** Number
  * `y` (Number) - The row number
  * `x` (Number) - The column number
* `getRow(col)` - Gets the data for a row - **returns:** List
  * `col` (Integer) - The row number
* `setValueAt(xl, yl, value)` - Sets the value at the specified column and row - **returns:** Matrix
  * `xl` (String) - The column label
  * `yl` (String) - The row label
  * `value` (Number) - The value to set at the specified column and row
* `forwardFill()` - Fills null values with the previous value, operates row by row - **returns:** Void
* `transpose()` - Returns a 90 degree transposed version of this matrix - **returns:** Matrix
* `setXLabels(labels)` - Sets the labels for the columns of this matrix  - **returns:** Matrix
  * `labels` (List) - The column labels
* `getColumnForLabel(label)` - Gets the column number for the column label of this matrix  - **returns:** Integer
  * `label` (List) - The column label
* `setColumnData(label, values)` - Sets the values for the specified column - **returns:** Matrix
  * `label` (String) - The column label
  * `values` (List) - The values to set for the specified column
* `setColumnData(col, values)` - Sets the values for the specified column - **returns:** Matrix
  * `col` (Integer) - The column number
  * `values` (List) - The values to set for the specified column
* `setYLabels(labels)` - Sets the labels for the rows of this matrix  - **returns:** Matrix
  * `labels` (List) - The row labels
* `getLabelForColumn(col)` - Gets the column label for the column number of this matrix (0-based) - **returns:** String
  * `col` (Integer) - The column number
* `setRowData(col, values)` - Sets the values for the specified row - **returns:** Matrix
  * `col` (Integer) - The row number
  * `values` (List) - The values to set for the specified row
* `setRowData(label, values)` - Sets the values for the specified row - **returns:** Matrix
  * `label` (String) - The row label
  * `values` (List) - The values to set for the specified row
* `getRowForLabel(label)` - Gets the row number for the row label of this matrix  - **returns:** Integer
  * `label` (List) - The row label
* `getGroupForRow(row)` - Gets the group name for the row number of this matrix (0-based) - **returns:** String
  * `row` (Integer) - The group name
* `getGroupForColumn(col)` - Gets the group name for the column number of this matrix (0-based) - **returns:** String
  * `col` (Integer) - The group name
* `getLabelForRow(row)` - Gets the row label for the row number of this matrix (0-based) - **returns:** String
  * `row` (Integer) - The row number
* `isSameDimensions(other)` - Checks to see if the passed in matrix has the same dimensions as this matrix - **returns:** Boolean
  * `other` (Matrix) - The matrix to test against
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `data`



---

### Workflow
**Description:** A workflow represents a set of actions and transitions that form an executable flow diagram

**Construction:**
```odsl
```

**Properties:**
* `outputs` - Get the list of outputs for this action
* `exits` - Get the list of exit transitions away from this action
* `inputs` - Get the list of inputs for this action
* `script` - The script text
* `scriptType` - The type of this script, e.g. one of [odsl, mustache, py, css, html, js, mjs, cjs]
* `description` - A description of what this script does
* `category` - The category of this script, e.g. ETL
* `filename` - The filename of this script
* `outputFormat` - An optional output format, e.g. application/xml, text/html, text/csv
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `run(input, output)` - Runs the workflow - **returns:** Void
  * `input` (Object) - The input data that this workflow will use
  * `output` (Object) - The output variable that this workflow will update
* `run(input, output)` - Runs an action - **returns:** Any
  * `input` (Object) - The input variables to the action
  * `output` (Object) - The output variables from this action
* `run()` - Runs this script - **returns:** Void
* `run(globalContext)` - Runs this script - **returns:** Void
  * `globalContext` (Boolean) - True to run in the global context, default is false
* `loadFrom(file)` - Load the script from a local file - **returns:** Void
  * `file` (String) - The fully qualified path and name of the file to load the script from
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `workflow`



---

### Action
**Description:** An action variable is the definition of an action that can be used in a workflow

**Construction:**
```odsl
```

**Properties:**
* `outputs` - Get the list of outputs for this action
* `exits` - Get the list of exit transitions away from this action
* `inputs` - Get the list of inputs for this action
* `script` - The script text
* `scriptType` - The type of this script, e.g. one of [odsl, mustache, py, css, html, js, mjs, cjs]
* `description` - A description of what this script does
* `category` - The category of this script, e.g. ETL
* `filename` - The filename of this script
* `outputFormat` - An optional output format, e.g. application/xml, text/html, text/csv
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `run(input, output)` - Runs an action - **returns:** Any
  * `input` (Object) - The input variables to the action
  * `output` (Object) - The output variables from this action
* `run()` - Runs this script - **returns:** Void
* `run(globalContext)` - Runs this script - **returns:** Void
  * `globalContext` (Boolean) - True to run in the global context, default is false
* `loadFrom(file)` - Load the script from a local file - **returns:** Void
  * `file` (String) - The fully qualified path and name of the file to load the script from
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `action`



---

### Arg
**Description:** An arg variable is a configuration of an input or output argument of a workflow action

**Construction:**
```odsl
```

**Properties:**
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `workflow`



---

### Transition
**Description:** A transition variable is the definition of a transition that is used in a workflow

**Construction:**
```odsl
```

**Properties:**
* `links` - Gets linked items

**Methods:**
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `workflow`



---

### Process
**Description:** A process variable contains all the information to configure and run a process

**Construction:**
```odsl
Process()
```

**Properties:**
* `dataPackage` - Sets this to be a deployable data packages
* `properties` - Object user definable properties
* `input` - This is the Object input variable used in a workflow
* `workflow` - This is the id of the workflow to run
* `processType` - This is the type of process, it can be either Ristretto (reduced) or Lungo (long)
* `settings` - Settings are a list of variables that are available to the workflow or script when the process is run
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `run()` - Run this process - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `process`



---

### Batch
**Description:** A batch variable is a custom list variable that contains variables and supplemental information needed to update into the object repository

**Construction:**
```odsl
Batch()
```

**Properties:**
* `service` - The name of the service for this batch
* `name` - The name of this batch
* `loader` - The loader for this batch
* `history` - Indicates that this batch is loading history
* `size` - The size of this list
* `links` - Gets linked items

**Methods:**
* `add(element)` - Adds a new element to the list - **returns:** Void
  * `element` (Any) - The variable to add to the list
* `add(index, element)` - Adds a new element to the list at the specified position (0 being first) - **returns:** Void
  * `index` (Integer) - The position where the element should be added to the list
  * `element` (Any) - The variable to add to the list
* `remove(index)` - Removes an element from the list at the specified position (0 being first) - **returns:** Void
  * `index` (Integer) - The position where the element should be removed from the list
* `remove(item)` - Removes an element from the list - **returns:** Void
  * `item` (Var) - The item to remove from the list
* `subList(start, end)` - Gets a list from a sublist of this list - **returns:** Void
  * `start` (Integer) - The first element to get, starting from 0
  * `end` (Integer) - The last element to get, must be at least 1 higher than the start
* `addAll(elements)` - Adds a list to this list returning a new combined list - **returns:** List
  * `elements` (List) - The list to add to the list
* `set(index, element)` - Replaces the element at the specified position in this list with the specified element - **returns:** Void
  * `index` (Integer) - The position where the element should be replaced in the list
  * `element` (Any) - The variable to replace in the list
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `batch`



---

### Script
**Description:** A script variable is a wrapper for an ODSL script. It is used by the script service and can also run the script

**Construction:**
```odsl
Script()
```

**Properties:**
* `script` - The script text
* `scriptType` - The type of this script, e.g. one of [odsl, mustache, py, css, html, js, mjs, cjs]
* `description` - A description of what this script does
* `category` - The category of this script, e.g. ETL
* `filename` - The filename of this script
* `outputFormat` - An optional output format, e.g. application/xml, text/html, text/csv
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `run()` - Runs this script - **returns:** Void
* `run(globalContext)` - Runs this script - **returns:** Void
  * `globalContext` (Boolean) - True to run in the global context, default is false
* `loadFrom(file)` - Load the script from a local file - **returns:** Void
  * `file` (String) - The fully qualified path and name of the file to load the script from
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `script`



---

### Report
**Description:** A report is a configuration containing an expression that can be run to produce a user definable report

**Construction:**
```odsl
Report()
```

**Properties:**
* `data` - The data produced in this report
* `scriptVersion` - The version of the script that was used to produce this report
* `errorMessage` - The error message if this report failed
* `start` - The start date used to generate this report
* `end` - The end date used to generate this report
* `ondate` - The report publish date
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `build()` - Builds this Report - **returns:** Report
* `build()` - Builds this Report - **returns:** Report
* `build()` - Builds this Report - **returns:** Report
* `build()` - Builds this Report - **returns:** Report
* `withFilterOnDateGenerator(service, source, filter, projection)` - Use a filter to generate the dates for this report - **returns:** Void
  * `service` (String) - The service to use with this ondate generator
  * `source` (String) - The source of data to use with this ondate generator
  * `filter` (String) - The filter to use
  * `projection` (String) - The projection to use
* `withAggregationOnDateGenerator(service, source, aggregation)` - Use an aggregation pipeline to generate the dates for this report - **returns:** Void
  * `service` (String) - The service to use with this ondate generator
  * `source` (String) - The source of data to use with this ondate generator
  * `aggregation` (String) - The aggregation pipeline
* `withDistinctOnDateGenerator(service, source, field)` - Use a distinct find query to generate the dates for this report - **returns:** Void
  * `service` (String) - The service to use with this ondate generator
  * `source` (String) - The source of data to use with this ondate generator
  * `field` (String) - The distinct field to use
* `withDistinctOnDateGenerator(service, source, field, filter)` - Use a distinct find query to generate the dates for this report - **returns:** Void
  * `service` (String) - The service to use with this ondate generator
  * `source` (String) - The source of data to use with this ondate generator
  * `field` (String) - The distinct field to use
  * `filter` (String) - The filter to use
* `withMatrixOnDateGenerator(id)` - Use the dates of a matrix to generate the dates for this report - **returns:** Void
  * `id` (String) - The id of the matrix to use for the ondates for this report
* `withCalendarOnDateGenerator(calendar, start)` - Use a calendar to generate the dates for this report - **returns:** Void
  * `calendar` (String) - The calendar to use to generate the dates, must be minimum daily
  * `start` (String) - The start date for the list of dates
* `withCurveOnDateGenerator(id)` - Use the dates of a curve to generate the dates for this report - **returns:** Void
  * `id` (String) - The id of the curve to use for the ondates for this report
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `report`



---

### SecurityPolicy
**Description:** A security policy variable allows you to restrict access to data within any service

**Construction:**
```odsl
```

**Properties:**
* `links` - Gets linked items

**Methods:**
* `removeMember(name)` - Remove a member from this policy - **returns:** Void
  * `name` (String) - The email address or security group id to remove
* `removeMember(name)` - Remove a member from this policy - **returns:** Void
  * `name` (String) - The email address or security group id to remove
* `setFullAccess()` - Set this policy to have full access - **returns:** Void
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `policy`



---

### FeaturePolicy
**Description:** A feature policy determines what a user can see in the web portal

**Construction:**
```odsl
FeaturePolicy()
```

**Properties:**
* `features` - The features this policy applies to
* `links` - Gets linked items

**Methods:**
* `addMember(name)` - Add a member to this policy - **returns:** Void
  * `name` (String) - The email address or security group id to add
* `removeMember(name)` - Remove a member from this policy - **returns:** Void
  * `name` (String) - The email address or security group id to remove
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `policy`



---

### Transformer
**Description:** A wrapper for a data transformer, used with the transformer service

**Construction:**
```odsl
```

**Properties:**
* `script` - The script text
* `scriptType` - The type of this script, e.g. one of [odsl, mustache, py, css, html, js, mjs, cjs]
* `description` - A description of what this script does
* `category` - The category of this script, e.g. ETL
* `filename` - The filename of this script
* `outputFormat` - An optional output format, e.g. application/xml, text/html, text/csv
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `run()` - Runs this script - **returns:** Void
* `run(globalContext)` - Runs this script - **returns:** Void
  * `globalContext` (Boolean) - True to run in the global context, default is false
* `loadFrom(file)` - Load the script from a local file - **returns:** Void
  * `file` (String) - The fully qualified path and name of the file to load the script from
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `transformer`



---

### Extractor
**Description:** A wrapper for an extractor, used by the extractor service

**Construction:**
```odsl
```

**Properties:**
* `script` - The script text
* `scriptType` - The type of this script, e.g. one of [odsl, mustache, py, css, html, js, mjs, cjs]
* `description` - A description of what this script does
* `category` - The category of this script, e.g. ETL
* `filename` - The filename of this script
* `outputFormat` - An optional output format, e.g. application/xml, text/html, text/csv
* `version` - The version information
* `links` - Gets linked items

**Methods:**
* `run()` - Runs this script - **returns:** Void
* `run(globalContext)` - Runs this script - **returns:** Void
  * `globalContext` (Boolean) - True to run in the global context, default is false
* `loadFrom(file)` - Load the script from a local file - **returns:** Void
  * `file` (String) - The fully qualified path and name of the file to load the script from
* `add(name, reference)` - Adds a linked item - **returns:** Void
  * `name` (String) - The name of the link (must be unique for this item)
  * `reference` (Reference) - The item to link to

**Service where this type is used:** `extractor`



---


