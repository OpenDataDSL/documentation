---
slug: /odsl/function/functions
title: All Functions
sidebar_position: 7
---

This document provides a comprehensive reference for all built-in functions available in OpenDataDSL.


### abs(data)

**Category:** Numeric

**Description:** Absolute value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### acos(data)

**Category:** Numeric

**Description:** Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### AIAgent()

**Category:** Construction

**Description:** Creates a new AI Agent

**Parameters:**

**Returns:** AIAgent



---

### AIAssistant()

**Category:** Construction

**Description:** Creates a new AI Assistant

**Parameters:**

**Returns:** AIAssistant



---

### AITool()

**Category:** Construction

**Description:** Creates a new AI Tool

**Parameters:**

**Returns:** AITool



---

### Alert(name)

**Category:** Construction

**Description:** Creates a new Alert

**Parameters:**
* `name` (String) - The alert name

**Returns:** Alert



---

### AlertRecord(name, type)

**Category:** Construction

**Description:** Creates a new Alert Record

**Parameters:**
* `name` (String) - The alert name
* `type` (String) - The alert type

**Returns:** AlertRecord



---

### AnnualCalendar()

**Category:** Construction

**Description:** Creates a new Annual Calendar

**Parameters:**

**Returns:** Calendar



---

### ApprovalGroup()

**Category:** Construction

**Description:** Creates a new curve approval group

**Parameters:**

**Returns:** ApprovalGroup



---

### asDays(contract)

**Category:** Curve

**Description:** Splits a Contract into day contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into days

**Returns:** Contracts



---

### asHalfHours(contract)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours

**Returns:** Contracts



---

### asHalfHours(contract, timezone)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours
* `timezone` (Contract) - The timezone to use

**Returns:** Contracts



---

### asHours(contract)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours

**Returns:** Contracts



---

### asHours(contract, timezone)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours
* `timezone` (Contract) - The timezone to use

**Returns:** Contracts



---

### asin(data)

**Category:** Numeric

**Description:** Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### asMonths(contract)

**Category:** Curve

**Description:** Splits a Contract into month contracts - usually used with Quarters, Seasons or Cals

**Parameters:**
* `contract` (Contract) - The input contract to split into months

**Returns:** Contracts



---

### asQuarterHours(contract)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours

**Returns:** Contracts



---

### asQuarterHours(contract, timezone)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours
* `timezone` (Contract) - The timezone to use

**Returns:** Contracts



---

### assertEquals(expected, value)

**Category:** Testing

**Description:** A test to check if 2 variables or values are equal

**Parameters:**
* `expected` (Any) - The value you want to test against
* `value` (Any) - The value to test

**Returns:** Void



---

### assertEquals(expected, value, message)

**Category:** Testing

**Description:** A test to check if 2 variables or values are equal

**Parameters:**
* `expected` (Any) - The value you want to test against
* `value` (Any) - The value to test
* `message` (String) - The message to display if this test fails

**Returns:** Void



---

### assertFalse(value)

**Category:** Testing

**Description:** A test to check if an expression is false

**Parameters:**
* `value` (Boolean) - The value to test

**Returns:** Void



---

### assertFalse(value, message)

**Category:** Testing

**Description:** A test to check if an expression is false

**Parameters:**
* `value` (Boolean) - The value to test
* `message` (String) - The message to display if this test fails

**Returns:** Void



---

### assertHasProperty(var, property)

**Category:** Testing

**Description:** A test to check if a variable has a specific named property

**Parameters:**
* `var` (Any) - The variable to test
* `property` (String) - The expected property name

**Returns:** Void



---

### assertNoProperty(var, property)

**Category:** Testing

**Description:** A test to check if a variable doesn't have a specific named property

**Parameters:**
* `var` (Any) - The variable to test
* `property` (String) - The expected property name

**Returns:** Void



---

### assertNull(object)

**Category:** Testing

**Description:** A test to check if object is null

**Parameters:**
* `object` (Any) - The value you want to test for null

**Returns:** Void



---

### assertTrue(value)

**Category:** Testing

**Description:** A test to check if an expression is true

**Parameters:**
* `value` (Boolean) - The value to test

**Returns:** Void



---

### assertTrue(value, message)

**Category:** Testing

**Description:** A test to check if an expression is true

**Parameters:**
* `value` (Boolean) - The value to test
* `message` (String) - The message to display if this test fails

**Returns:** Void



---

### assertType(var, type)

**Category:** Testing

**Description:** A test to check if a variable is of a certain type

**Parameters:**
* `var` (Any) - The variable to test
* `type` (String) - The expected type of the variable

**Returns:** Void



---

### asStrips(input)

**Category:** Curve

**Description:** Creates an arbitrage free curve comprised of calendar year strips

**Parameters:**
* `input` (Curve) - The input curve to create the strips from

**Returns:** Curve

**Works with:** `curve` 

---

### atan(data)

**Category:** Numeric

**Description:** Returns the arc tangent of a value; the returned angle is in the range -pi/2 through pi/2

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### atan2(y, x)

**Category:** Numeric

**Description:** Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta)

**Parameters:**
* `y` (Number, List, TimeSeries or Curve) - The y coordinate
* `x` (Number) - The x coordinate

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### AutomationBuilder(service, source)

**Category:** Construction

**Description:** Creates a new OpenDataDSL automation using a builder

**Parameters:**
* `service` (String) - The name of the service you want to use for this automation
* `source` (String) - The source of the item or null for no source

**Returns:** Automation



---

### AutomationBuilder(service, source, key)

**Category:** Construction

**Description:** Creates a new OpenDataDSL automation using a builder

**Parameters:**
* `service` (String) - The name of the service you want to use for this automation
* `source` (String) - The source of the item or null for no source
* `key` (String) - The key of the item to use for this automation

**Returns:** Automation



---

### AutomationTarget()

**Category:** Construction

**Description:** Creates a new OpenDataDSL automation target

**Parameters:**

**Returns:** AutomationTarget



---

### Batch()

**Category:** Construction

**Description:** Creates a batch to be sent to a message queue

**Parameters:**

**Returns:** Batch



---

### blackScholesCall(F, K, sigma, T)

**Category:** Options

**Description:** Calculate the (undiscounted) Black option price for a call option

**Parameters:**
* `F` (Double) - The underlying futures price
* `K` (Double) - The strike price
* `sigma` (Double) - The annualized standard deviation, or volatility
* `T` (Double) - The time-to-expiration in years

**Returns:** Double



---

### blackScholesPut(F, K, sigma, T)

**Category:** Options

**Description:** Calculate the (undiscounted) Black option price for a put option

**Parameters:**
* `F` (Double) - The underlying futures price
* `K` (Double) - The strike price
* `sigma` (Double) - The annualized standard deviation, or volatility
* `T` (Double) - The time-to-expiration in years

**Returns:** Double



---

### BlockCalendar(holiday, observed, start, end)

**Category:** Construction

**Description:** Creates a new Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `observed` (Calendar) - The intraday calendar which determines the frequency of the observations (null = Hourly)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)

**Returns:** Calendar



---

### BlockCalendar(holiday, observed, start, end, timezone)

**Category:** Construction

**Description:** Creates a new Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `observed` (Calendar) - The intraday calendar which determines the frequency of the observations (null = Hourly)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)
* `timezone` (String) - The timezone for this block calendar

**Returns:** Calendar



---

### bootstrapCurve(input)

**Category:** Curve

**Description:** Creates an arbitrage free monthly curve from the input curve

**Parameters:**
* `input` (Curve) - The input curve to bootstrap

**Returns:** Curve

**Works with:** `curve` 

---

### BuildGroup()

**Category:** Construction

**Description:** Creates a new curve build group

**Parameters:**

**Returns:** BuildGroup



---

### BusinessCalendar()

**Category:** Construction

**Description:** Creates a new Business (Monday to Friday) Calendar

**Parameters:**

**Returns:** Calendar



---

### Calendar(code)

**Category:** Construction

**Description:** Creates a new Calendar

**Parameters:**
* `code` (String) - The code for the calendar, e.g. DAILY

**Returns:** Calendar



---

### capitalise(str)

**Category:** Strings

**Description:** Returns a Capitalised string.

**Parameters:**
* `str` (String) - The string to capitalise

**Returns:** String



---

### capitaliseFully(str)

**Category:** Strings

**Description:** Returns a Capitalised string of all the words.

**Parameters:**
* `str` (String) - The string to capitalise

**Returns:** String



---

### cave(data)

**Category:** TimeSeries

**Description:** The cumulative average of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### cave(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative average of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### cbrt(data)

**Category:** Numeric

**Description:** Returns the cube root of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### clean(str)

**Category:** Strings

**Description:** Creates a valid variable name from the input string - spaces converted to underscores and invalid characters removed

**Parameters:**
* `str` (String) - The string to clean

**Returns:** String



---

### clone(var)

**Category:** General

**Description:** Creates a new copy of a variable

**Parameters:**
* `var` (Any Var) - The value to create a copy of

**Returns:** Same type as input



---

### cmax(data)

**Category:** TimeSeries

**Description:** The cumulative maximum of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### cmax(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative maximum of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### cmin(data)

**Category:** TimeSeries

**Description:** The cumulative minimum of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### cmin(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative minimum of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### combine(base, other, replace)

**Category:** Curve

**Description:** Combines 2 curves into 1 - uses the date and expiry calendar from the base

**Parameters:**
* `base` (Curve) - The base curve
* `other` (Curve) - The curve to combine the base with
* `replace` (Boolean) - If true, matching tenors from the base are overwritten; if false, only new tenors in other are added to the base

**Returns:** Curve

**Works with:** `curve` 

---

### CombinedHolidayCalendar()

**Category:** Construction

**Description:** Creates a new Combined Holiday Calendar

**Parameters:**

**Returns:** Calendar



---

### CombinedHolidayCalendar(cal1, cal2)

**Category:** Construction

**Description:** Creates a new Combined Holiday Calendar using the 2 passed in Holiday Calendars

**Parameters:**
* `cal1` (Calendar or calendar code) - The first holiday calendar to use
* `cal2` (Calendar or calendar code) - The second holiday calendar to use

**Returns:** Calendar



---

### compare(str1, str2)

**Category:** Strings

**Description:** Compares the contents of 2 non-null strings, returns true if they are the same

**Parameters:**
* `str1` (String) - The string to compare
* `str2` (String) - The string to compare to

**Returns:** Boolean



---

### ComposedCurve(composition, element)

**Category:** Construction

**Description:** Creates a new Composed Curve using a composition and element

**Parameters:**
* `composition` (String) - The composition that this curve belongs to
* `element` (String) - The element id within the composition

**Returns:** ComposedCurve



---

### ComposedTimeSeries(composition, element)

**Category:** Construction

**Description:** Creates a new Composed TimeSeries using a timeseries composition and element

**Parameters:**
* `composition` (String) - The timeseries composition that this timeseries belongs to
* `element` (String) - The element id within the composition

**Returns:** ComposedTimeSeries



---

### Composition()

**Category:** Construction

**Description:** Creates a new composition configuration

**Parameters:**

**Returns:** Report



---

### concatenate(str1, str2)

**Category:** Strings

**Description:** Joins 2 non-null strings together

**Parameters:**
* `str1` (String) - The left part of the string to concatenate
* `str2` (String) - The right part of the string to concatenate

**Returns:** String



---

### contains(str1, str2)

**Category:** Strings

**Description:** Returns true if a string contains another string

**Parameters:**
* `str1` (String) - The string to search in
* `str2` (String) - The string to search for

**Returns:** Boolean



---

### content(items)

**Category:** General

**Description:** The content of each extracted item in a list (the content property of each object), with dates converted to Date values

**Parameters:**
* `items` (List) - A list of extracted items

**Returns:** List



---

### Contract(ondate, tenor, value)

**Category:** Construction

**Description:** Creates a new Forward Contract

**Parameters:**
* `ondate` (CurveDate) - The curve ondate for this contract
* `tenor` (String) - The absolute or relative tenor for this contract
* `value` (Number) - The value for this contract

**Returns:** Contract



---

### Contract(ondate, tenor, value, start, end)

**Category:** Construction

**Description:** Creates a new *Hybrid* Forward Contract

**Parameters:**
* `ondate` (CurveDate) - The curve ondate for this contract
* `tenor` (String) - The absolute or relative tenor for this contract
* `value` (Number) - The value for this contract
* `start` (Date) - The start of delivery date for this contract
* `end` (Date) - The end of delivery date for this contract

**Returns:** Contract



---

### Contract(ondate, tenor, value, absolute, start, end, expiry)

**Category:** Construction

**Description:** Creates a new *Custom* Forward Contract

**Parameters:**
* `ondate` (CurveDate) - The curve ondate for this contract
* `tenor` (String) - The absolute or relative tenor for this contract
* `value` (Number) - The value for this contract
* `absolute` (String) - The absolute tenor for this contract - uses tenor if null
* `start` (Date) - The start of delivery date for this contract
* `end` (Date) - The end of delivery date for this contract
* `expiry` (Date) - The last trading date for this contract

**Returns:** Contract



---

### correlation(data)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from the columns of a matrix.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (Matrix) - The input data to transform

**Returns:** Matrix



---

### correlation(data)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from a list of timeseries.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform

**Returns:** Matrix



---

### correlation(data, shift)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from the columns of a matrix.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (Matrix) - The input data to transform
* `shift` (Integer) - The number of days to shift the y-axis

**Returns:** Matrix



---

### correlation(data, shift)

**Category:** Matrix

**Description:** Create a Pearsons correlation matrix from a list of timeseries.

PearsonsCorrelation computes correlations defined by the formula

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform
* `shift` (Integer) - The number of days to shift the y-axis

**Returns:** Matrix



---

### cos(data)

**Category:** Numeric

**Description:** Returns the trigonometric cosine of an angle

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### cosh(data)

**Category:** Numeric

**Description:** Returns the hyperbolic cosine of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### count(data)

**Category:** Statistics

**Description:** Gets the count of the values

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### covariance(data)

**Category:** Matrix

**Description:** Create a convariance matrix from a list of timeseries.

Unbiased covariances are given by the formula

```cov(X, Y) = sum [(xi - E(X))(yi - E(Y))] / (n - 1)``` where ```E(X)``` is the mean of ```X``` and ```E(Y)``` is the mean of the ```Y``` values.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform

**Returns:** Matrix



---

### covariance(data, biasCorrected)

**Category:** Matrix

**Description:** Create a convariance matrix from a list of timeseries.

Unbiased covariances are given by the formula

```cov(X, Y) = sum [(xi - E(X))(yi - E(Y))] / (n - 1)``` where ```E(X)``` is the mean of ```X``` and ```E(Y)``` is the mean of the ```Y``` values.
 Non-bias-corrected estimates use ```n``` in place of ```n - 1```.
 Whether or not covariances are bias-corrected is determined by the optional parameter, **biasCorrected**, which defaults to true.

**Parameters:**
* `data` (A List of timeseries) - The input data to transform
* `biasCorrected` (Boolean - **optional**) - True if the covariance is bias-corrected

**Returns:** Matrix



---

### csum(data)

**Category:** TimeSeries

**Description:** The cumulative sum of all the values in the input Timeseries or List

**Parameters:**
* `data` (TimeSeries or List) - The input data to perform the calculation on

**Returns:** Number



---

### csum(data, calendar)

**Category:** TimeSeries

**Description:** The cumulative sum of all the values in the input Timeseries

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `calendar` (Calendar) - The output calendar to return the results in

**Returns:** Number



---

### currentEnv()

**Category:** Loader

**Description:** The platform environment the script is running against, with its name and api URL

**Parameters:**

**Returns:** Object



---

### Curve(ondate)

**Category:** Construction

**Description:** Creates a new Curve

**Parameters:**
* `ondate` (CurveDate) - The date index for this curve

**Returns:** Curve



---

### CurveDate(date, calendar)

**Category:** Construction

**Description:** Creates a new Curve Date variable

**Parameters:**
* `date` (Date) - The date as a string in ISO Date Time, ISO Date format or ODSL Period Code format
* `calendar` (Calendar) - The expiry calendar

**Returns:** CurveDate



---

### CurveDate(date, calendar, timezone)

**Category:** Construction

**Description:** Creates a new Curve Date variable

**Parameters:**
* `date` (Date) - The date as a string in ISO Date Time, ISO Date format or ODSL Period Code format
* `calendar` (Calendar) - The expiry calendar
* `timezone` (String) - The timezone for this Curve Ondate

**Returns:** CurveDate



---

### CurveSeries(calendar, ondate)

**Category:** Construction

**Description:** Creates a new Curve Series

**Parameters:**
* `calendar` (Calendar) - The calendar for the timeseries of this curve timeseries
* `ondate` (CurveDate) - The date index for this curve timeseries

**Returns:** CurveSeries



---

### CurveSeries(calendar, ondate, data)

**Category:** Construction

**Description:** Creates a new Curve Series

**Parameters:**
* `calendar` (Calendar) - The calendar for the timeseries of this curve timeseries
* `ondate` (CurveDate) - The date index for this curve timeseries
* `data` (List) - All the values of this TimeSeries

**Returns:** CurveSeries



---

### CurveSeries(calendar, ondate, start, data)

**Category:** Construction

**Description:** Creates a new Curve Series

**Parameters:**
* `calendar` (Calendar) - The calendar for the timeseries of this curve timeseries
* `ondate` (CurveDate) - The date index for this curve timeseries
* `start` (VarDate) - Start index for curve timeseries
* `data` (List) - All the values of this TimeSeries

**Returns:** CurveSeries



---

### DailyCalendar()

**Category:** Construction

**Description:** Creates a new Daily Calendar

**Parameters:**

**Returns:** Calendar



---

### Date()

**Category:** Construction

**Description:** Creates a new Date variable as the current date

**Parameters:**

**Returns:** Date



---

### Date(date)

**Category:** Construction

**Description:** Creates a new Date variable

**Parameters:**
* `date` (Scalar) - The date as a string in ISO Date Time, ISO Date format or ODSL Period Code format

**Returns:** Date



---

### Date(date, format)

**Category:** Construction

**Description:** Creates a new Date variable

**Parameters:**
* `date` (Scalar) - The date as a string
* `format` (Scalar) - The format of the date, e.g. 'dd-MM-yyyy'

**Returns:** Date



---

### daylightSavings(date, timezone)

**Category:** Dates

**Description:** Checks a day to see if it is a daylight savings day

**Parameters:**
* `date` (Date) - The Date to check for DST
* `timezone` (String) - The timezone of the passed in date

**Returns:** 0 if false, -1 if it is the start day of DST, 1 if it is the end day of DST



---

### diff(series)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with the absolute change values from one observation to the next

**Parameters:**
* `series` (TimeSeries) - The TimeSeries to calculate the differences from

**Returns:** TimeSeries



---

### Documentation()

**Category:** Construction

**Description:** Creates a new default documentation configuration

**Parameters:**

**Returns:** Documentation



---

### DocumentationLink(url)

**Category:** Construction

**Description:** Creates a new documentation URL Link configuration

**Parameters:**
* `url` (String) - The HTML URL of the documentation

**Returns:** Documentation



---

### DocumentationLink(url, selector)

**Category:** Construction

**Description:** Creates a new documentation URL Link configuration

**Parameters:**
* `url` (String) - The HTML URL of the documentation
* `selector` (String) - The html selector to be used to select part of the HTML page

**Returns:** Documentation



---

### Duration(dur)

**Category:** Construction

**Description:** Creates a new Duration

**Parameters:**
* `dur` (String) - The code for the duration, e.g. 1D

**Returns:** Duration



---

### Duration(dur, calendar)

**Category:** Construction

**Description:** Creates a new Duration with a calendar

**Parameters:**
* `dur` (String) - The code for the duration, e.g. 1D
* `calendar` (Calendar or String) - The calendar to use for this duration

**Returns:** Duration



---

### DynamicReport()

**Category:** Construction

**Description:** Creates a new dynamic report configuration

**Parameters:**

**Returns:** Report



---

### element(items, index)

**Category:** General

**Description:** The item at a position in a list, counting from 0

**Parameters:**
* `items` (List) - The list
* `index` (Integer) - The position of the item

**Returns:** Any



---

### elementValues(items, property)

**Category:** General

**Description:** The value of one property of each object in a list

**Parameters:**
* `items` (List) - A list of objects
* `property` (String) - The name of the property

**Returns:** List



---

### elementValuesIndexOf(items, index)

**Category:** General

**Description:** The item at a position in each list of a list of lists, for example one column of a list of rows

**Parameters:**
* `items` (List) - A list of lists
* `index` (Integer) - The position, counting from 0

**Returns:** List



---

### encodeBase64(content)

**Category:** Strings

**Description:** Encode Base64.

**Parameters:**
* `content` (String) - The content to use

**Returns:** String



---

### encodeURI(uri)

**Category:** Strings

**Description:** Encode URI.

**Parameters:**
* `uri` (String) - The uri to use

**Returns:** String



---

### endsWith(str, suffix)

**Category:** Strings

**Description:** Tests to see if the first string ends with the specified suffix. If either the string or the suffix are null, it returns false

**Parameters:**
* `str` (String) - The string to check
* `suffix` (String) - The suffix to check for

**Returns:** Boolean



---

### equals(str1, str2)

**Category:** Strings

**Description:** Checks to see if 2 strings are the same

**Parameters:**
* `str1` (String) - The string to compare
* `str2` (String) - The string to compare to

**Returns:** Boolean



---

### equalsIgnoreCase(str1, str2)

**Category:** Strings

**Description:** Checks to see if 2 strings are the same ignoring case

**Parameters:**
* `str1` (String) - The string to compare
* `str2` (String) - The string to compare to

**Returns:** Boolean



---

### evaluate(var)

**Category:** General

**Description:** Evaluates a string expression and returns the result

**Parameters:**
* `var` (String) - The string expression to evaluate

**Returns:** Any



---

### Event(time)

**Category:** Construction

**Description:** Creates an event that can be added to an object

**Parameters:**
* `time` (Date) - The observed time of this event

**Returns:** Event



---

### Event(ondate, tenor)

**Category:** Construction

**Description:** Creates an event that can be added to an object

**Parameters:**
* `ondate` (CurveDate) - The ondate for this event
* `tenor` (String) - The tenor for this event

**Returns:** Event



---

### EventCurve(eventlist, calendar, property, tenor)

**Category:** Construction

**Description:** Creates a new EventCurve

**Parameters:**
* `eventlist` (String, EventSummary or Ref) - The eventlist to use to build this Curve
* `calendar` (String) - The expiry calendar for this Curve
* `property` (String) - The name of the property used as the value for this Curve
* `tenor` (String) - The name of the property used as the tenor for the forward contract

**Returns:** EventCurve



---

### EventTimeSeries(eventlist, property)

**Category:** Construction

**Description:** Creates a new Event TimeSeries using an EventList and the name of the property to use for the TimeSeries values

**Parameters:**
* `eventlist` (String, EventSummary or Ref) - The eventlist to use to build this TimeSeries
* `property` (String) - The name of the property used as the value for this TimeSeries, the property itself can either be a String or Numeric

**Returns:** EventTimeSeries



---

### exp(data)

**Category:** Numeric

**Description:** Returns Euler's number e raised to the power of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### ExpiryCalendar(code)

**Category:** Construction

**Description:** Reads an expiry Calendar

**Parameters:**
* `code` (String) - The code for the calendar, e.g. DAILY

**Returns:** ExpiryCalendar



---

### ExpiryCalendar(holiday)

**Category:** Construction

**Description:** Creates a new expiry Calendar

**Parameters:**
* `holiday` (Calendar or String) - The holiday or trading calendar to use with this expiry calendar. Can either be the name or a calendar or an actual calendar.

**Returns:** ExpiryCalendar



---

### ExpiryCalendar(holiday, delivery)

**Category:** Construction

**Description:** Creates a new expiry Calendar

**Parameters:**
* `holiday` (Calendar or String) - The holiday or trading calendar to use with this expiry calendar. Can either be the name or a calendar or an actual calendar.
* `delivery` (Calendar or String) - The delivery calendar to use with this expiry calendar. Can either be the name or a calendar or an actual calendar.

**Returns:** ExpiryCalendar



---

### ExportGroup()

**Category:** Construction

**Description:** Creates a new curve export group

**Parameters:**

**Returns:** ExportGroup



---

### extendCurve(input, years)

**Category:** Curve Interpolation

**Description:** Extends a curve by taking the last period and extending out the required number of years

**Parameters:**
* `input` (Curve) - The input curve to extend
* `years` (Number) - The number of years to extend

**Returns:** Curve



---

### Extension()

**Category:** Construction

**Description:** Creates a new OpenDataDSL extension

**Parameters:**

**Returns:** Extension



---

### extractDates(text)

**Category:** Loader

**Description:** Finds the dates written in a line of text, such as 19 July 2025 or 14, 15 and 16 July 2025. Returns an object with the list of dates and the kind of text: single, list or range

**Parameters:**
* `text` (String) - The text to read

**Returns:** Object



---

### FeaturePolicy()

**Category:** Construction

**Description:** Creates a new feature policy

**Parameters:**

**Returns:** Policy



---

### fill(input, method)

**Category:** Timeseries Interpolation

**Description:** Removes missing values by either filling them with values or removing them entirely

**Parameters:**
* `input` (List or Timeseries) - The input data to fill, can either be a single timeseries or a list of timeseries
* `method` (String) - The method to use, can be forward, backward, remove or linear

**Returns:** List or Timeseries



---

### FinancialExpiryCalendar(code, holiday, cross, base, offset)

**Category:** Construction

**Description:** Creates a financial expiry Calendar

**Parameters:**
* `code` (String) - The code for the calendar
* `holiday` (String or Calendar) - The holiday calendar
* `cross` (String or Calendar) - The cross currency calendar
* `base` (String or Calendar) - The base calendar
* `offset` (Int) - Offset to use (usually 0)

**Returns:** ExpiryCalendar



---

### firstElement(items)

**Category:** General

**Description:** The first item of a list. For an extracted item, its content

**Parameters:**
* `items` (List) - The list

**Returns:** Any



---

### firstElementOf(items, value)

**Category:** Loader

**Description:** The position of the first item of a list that equals a value, ignoring case, or -1

**Parameters:**
* `items` (List) - The list
* `value` (String) - The value to find

**Returns:** Integer



---

### FixedReport()

**Category:** Construction

**Description:** Creates a new Fixed report configuration

**Parameters:**

**Returns:** Report



---

### format(date, format)

**Category:** Dates

**Description:** Converts a date into a string using the specified format

**Parameters:**
* `date` (Date) - The date to convert to a string
* `format` (String) - The date format to use - see documentation

**Returns:** String



---

### formatDateLocale(date, format, locale)

**Category:** Loader

**Description:** Converts a string to a Date using a date format and a locale for the month and day names

**Parameters:**
* `date` (String) - The date text
* `format` (String) - The date format
* `locale` (String) - The locale, e.g. es

**Returns:** Date



---

### formatDates(items, suffix, format)

**Category:** Loader

**Description:** Converts each item of a list to a Date using a date format. The optional suffix is added to each value before it is parsed

**Parameters:**
* `items` (List) - The list of values
* `suffix` (String) - Text to add to each value, or an empty string
* `format` (String) - The date format, e.g. dd/MM/yyyy

**Returns:** List



---

### formatDatesWithLocale(items, suffix, format, locale)

**Category:** Loader

**Description:** Converts each item of a list to a Date using a date format and a locale for the month and day names

**Parameters:**
* `items` (List) - The list of values
* `suffix` (String) - Text to add to each value, or an empty string
* `format` (String) - The date format, e.g. dd MMMM yyyy
* `locale` (String) - The locale, e.g. fr

**Returns:** List



---

### formatHarvestDates(items, years, format)

**Category:** Loader

**Description:** Converts a list of day and month values in a harvest (crop) year to Dates, moving to the second year when the dates wrap round

**Parameters:**
* `items` (List) - The list of values
* `years` (String) - The harvest years, e.g. 2025/2026
* `format` (String) - The date format of the values with the year added

**Returns:** List



---

### formatInteger(value, format)

**Category:** Loader

**Description:** Formats a whole number with leading zeros or a format string

**Parameters:**
* `value` (Integer) - The number
* `format` (String) - The number of digits, e.g. 3 for 007, or a format such as %05d

**Returns:** String



---

### formatListValues(items, locale)

**Category:** Loader

**Description:** Converts each number written in a locale in a list to a plain number

**Parameters:**
* `items` (List) - The list of values
* `locale` (String) - The locale of the numbers

**Returns:** List



---

### formatNumericValues(items)

**Category:** Loader

**Description:** Converts each numeric string in a list to a plain number, including values in scientific notation

**Parameters:**
* `items` (List) - The list of values

**Returns:** List



---

### formatString(format, str)

**Category:** Strings

**Description:** Formats the string passed using the formatter.

**Parameters:**
* `format` (String) - The format to use
* `str` (String) - The string to format

**Returns:** String



---

### formatValue(value, locale)

**Category:** Loader

**Description:** Converts a number written in a locale, e.g. 1.234,5 in German, to a plain number

**Parameters:**
* `value` (String) - The number text
* `locale` (String) - The locale of the number

**Returns:** String



---

### formatValues(items, separator, index, locale)

**Category:** Loader

**Description:** Takes one part of each item of a list, split by a separator, and converts it to a plain number using a locale

**Parameters:**
* `items` (List) - The list of values
* `separator` (String) - The regular expression to split each value by
* `index` (Integer) - The part to use, counting from 0
* `locale` (String) - The locale of the numbers

**Returns:** List



---

### forwardFillCurve(input)

**Category:** Curve Interpolation

**Description:** Fills any gaps by forward filling and missing periods

**Parameters:**
* `input` (Curve) - The input curve to fill

**Returns:** Curve



---

### geomean(data)

**Category:** Statistics

**Description:** Gets the geometric average value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### GeometryCollection()

**Category:** Geometry construction

**Description:** Creates a GeometryCollection geometry object

**Parameters:**

**Returns:** GeometryCollection



---

### GeometryCollection()

**Category:** Geometry construction

**Description:** Creates an empty GeometryCollection geometry object

**Parameters:**

**Returns:** GeometryCollection



---

### getDataset(dsid)

**Category:** Dataset Monitoring

**Description:** Gets the dataset information for the supplied dsid

**Parameters:**
* `dsid` (String) - The full dataset id

**Returns:** Dataset



---

### getDatasetDelivery(dsid, date)

**Category:** Dataset Monitoring

**Description:** Gets the dataset delivery information for the supplied date

**Parameters:**
* `dsid` (String) - The full dataset id
* `date` (String) - The date in the format yyyy-MM-dd

**Returns:** DatasetDelivery



---

### GLSMultipleRegression(y, x, covariance)

**Category:** Statistics

**Description:** GLSMultipleLinearRegression provide least squares regression to fit the linear model:

Y=X*b+u

where Y is an n-vector regressand, X is a [n,k] matrix whose k columns are called regressors, b is k-vector of regression parameters and u is an n-vector of error terms or residuals.

GLSMultipleLinearRegression implements Generalized Least Squares.

Data for OLS models can be loaded in a single double[] array, consisting of concatenated rows of data, each containing the regressand (Y) value, followed by regressor values; or using a double[][] array with rows corresponding to observations. GLS models also require a double[][] array representing the covariance matrix of the error terms.

**Parameters:**
* `y` (Matrix) - An [n,1] array representing the y sample
* `x` (Matrix) - An [n,k] array representing the x sample
* `covariance` (Matrix) - Array representing the covariance matrix

**Returns:** Object



---

### Group()

**Category:** Construction

**Description:** Creates a new group

**Parameters:**

**Returns:** Group



---

### hashsha256(value)

**Category:** Loader

**Description:** The SHA-256 hash of a string, as a hexadecimal string

**Parameters:**
* `value` (String) - The string to hash

**Returns:** String



---

### HolidayCalendar()

**Category:** Construction

**Description:** Creates a new Holiday Calendar

**Parameters:**

**Returns:** Calendar



---

### HourlyBlockCalendar(holiday, start, end)

**Category:** Construction

**Description:** Creates a new Hourly Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)

**Returns:** Calendar



---

### HourlyBlockCalendar(holiday, start, end, timezone)

**Category:** Construction

**Description:** Creates a new Hourly Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)
* `timezone` (String) - The timezone for this block calendar

**Returns:** Calendar



---

### IdentityMatrix(size)

**Category:** Construction

**Description:** Creates a new identity matrix of the given size

**Parameters:**
* `size` (Integer) - The size of the matrix

**Returns:** Matrix



---

### Index()

**Category:** Construction

**Description:** Creates a new Database Index

**Parameters:**

**Returns:** Index



---

### indexOf(str1, str2)

**Category:** Strings

**Description:** Returns a int value that is a indexOf of a string.

**Parameters:**
* `str1` (String) - The string which contains the char
* `str2` (String) - The string to find the indexOf value

**Returns:** int



---

### initialiseList(size, value)

**Category:** Loader

**Description:** Creates a list of a given size with every item set to a value

**Parameters:**
* `size` (Integer) - The number of items
* `value` (String) - The value of each item

**Returns:** List



---

### InsightReport()

**Category:** Construction

**Description:** Creates a new insight report configuration

**Parameters:**

**Returns:** Report



---

### IntradayCalendar(period)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly

**Returns:** Calendar



---

### IntradayCalendar(period, holiday)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded

**Returns:** Calendar



---

### IntradayCalendar(period, holiday, withoutHours)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded
* `withoutHours` (List) - A list of integers representing hours of the day to exclude from this calendar

**Returns:** Calendar



---

### IntradayCalendar(period, holiday, withoutHours, timezone)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded
* `withoutHours` (List) - A list of integers representing hours of the day to exclude from this calendar
* `timezone` (String) - The timezone for this intraday calendar

**Returns:** Calendar



---

### IntradayCalendar(period, holiday, withoutHours, timezone, useHolidays)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded
* `withoutHours` (List) - A list of integers representing hours of the day to exclude from this calendar
* `timezone` (String) - The timezone for this intraday calendar
* `useHolidays` (Boolean) - True to include holiday days in the block, i.e. for off-peak calendars

**Returns:** Calendar



---

### isDatasetComplete(dsid, date)

**Category:** Dataset Monitoring

**Description:** Checks to see if the supplied dataset is 100% complete for the supplied date

**Parameters:**
* `dsid` (String) - The full dataset id to check
* `date` (String) - The date in the format yyyy-MM-dd

**Returns:** Boolean



---

### isNumber(str)

**Category:** Strings

**Description:** Returns true if a string is a  Number

**Parameters:**
* `str` (String) - The string to check for number

**Returns:** Boolean



---

### ISODate(date)

**Category:** Construction

**Description:** Creates a new Date variable from the supplied ISO Date formatted string

**Parameters:**
* `date` (Scalar) - The date as a string in ISO Date Time or ISO Date format

**Returns:** Date



---

### json(var)

**Category:** Strings

**Description:** Converts the input variable of any type to a JSON formatted string

**Parameters:**
* `var` (Any) - The variable to convert to a JSON format string

**Returns:** String



---

### keys(obj)

**Category:** Introspection

**Description:** Returns the property names of an object

**Parameters:**
* `obj` (Var) - The object variable to iterate through

**Returns:** List



---

### kurtosis(data)

**Category:** Statistics

**Description:** Gets the kurtosis

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### lastElement(items)

**Category:** General

**Description:** The last item of a list. For an extracted item, its content

**Parameters:**
* `items` (List) - The list

**Returns:** Any



---

### lastElementOf(items, value)

**Category:** Loader

**Description:** The position of the last item of a list that equals a value, ignoring case, or -1

**Parameters:**
* `items` (List) - The list
* `value` (String) - The value to find

**Returns:** Integer



---

### lastIndexOf(str1, str2)

**Category:** Strings

**Description:** Returns a int value that is a last IndexOf of a string.

**Parameters:**
* `str1` (String) - The string which contains the char
* `str2` (String) - The string to find the lastIndexOf value

**Returns:** int



---

### left(str, amount)

**Category:** Strings

**Description:** Creates a new string from the 'amount' leftmost characters of another string

**Parameters:**
* `str` (String) - The string to extract the leftmost characters from
* `amount` (Int) - The number of characters to extract

**Returns:** String



---

### length(str)

**Category:** Strings

**Description:** Returns the length of the string

**Parameters:**
* `str` (String) - The string to return the length of

**Returns:** Int



---

### LineString()

**Category:** Geometry construction

**Description:** Creates a LineString geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### LineString(coordinates)

**Category:** Geometry construction

**Description:** Creates a LineString geometry object with the supplied list of coordinates

**Parameters:**
* `coordinates` (List of [longitude, latitude]) - The points of the line

**Returns:** GeoSpatial



---

### Link(name, item)

**Category:** Construction

**Description:** Creates a link that can be added to an item

**Parameters:**
* `name` (String) - The name of the link
* `item` (Reference) - A reference to the linked item, for example an object active variable

**Returns:** Reference



---

### List()

**Category:** Construction

**Description:** Creates a new List

**Parameters:**

**Returns:** List



---

### loadCalendars()

**Category:** General

**Description:** Loads all known public and private calendars into memory

**Parameters:**

**Returns:** Void



---

### loadTypes()

**Category:** General

**Description:** Loads all known public and private types into memory

**Parameters:**

**Returns:** Void



---

### log(data)

**Category:** Numeric

**Description:** Returns the natural logarithm (base e) of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### log10(data)

**Category:** Numeric

**Description:** Returns the base 10 logarithm of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### log1p(data)

**Category:** Numeric

**Description:** Returns the natural logarithm of the sum of the argument and 1

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### lower(str)

**Category:** Strings

**Description:** Returns a copy of the passed in string with all the characters converted to lower case

**Parameters:**
* `str` (String) - The string to convert to lower case

**Returns:** String



---

### matches(regex, value)

**Category:** Loader

**Description:** True if the value, or any item of a list, matches a regular expression

**Parameters:**
* `regex` (String) - The regular expression
* `value` (String or List) - The value or list to test

**Returns:** Boolean



---

### Matrix(y, x)

**Category:** Construction

**Description:** Creates a new matrix

**Parameters:**
* `y` (Number) - The number of rows
* `x` (Number) - The number of columns

**Returns:** Matrix



---

### Matrix(labels)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `labels` (List) - The labels to use

**Returns:** Matrix



---

### Matrix(y, x, v)

**Category:** Construction

**Description:** Creates a new matrix, initialising all values to the provided value

**Parameters:**
* `y` (Number) - The number of rows
* `x` (Number) - The number of columns
* `v` (Number) - The value to initialise the matrix with

**Returns:** Matrix



---

### Matrix(labels, v)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `labels` (List) - The labels to use
* `v` (Number) - The value to initialise the matrix with

**Returns:** Matrix



---

### Matrix(ylabels, xlabels)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `ylabels` (List) - The row labels
* `xlabels` (List) - The column labels

**Returns:** Matrix



---

### Matrix(ylabels, xlabels, v)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `ylabels` (List) - The row labels
* `xlabels` (List) - The column labels
* `v` (Number) - The value to initialise all the cells to

**Returns:** Matrix



---

### max(data)

**Category:** Statistics

**Description:** Gets the highest value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### mean(data)

**Category:** Statistics

**Description:** Gets the arithmetic average value

**Parameters:**
* `data` (Curve, Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### Message(code, message)

**Category:** Construction

**Description:** Creates a new coded message

**Parameters:**
* `code` (Integer) - The message code
* `message` (String) - The message text

**Returns:** Message



---

### methods(object)

**Category:** Introspection

**Description:** Returns the methods available for a given variable

**Parameters:**
* `object` (Variable) - The object to inspect

**Returns:** List



---

### metric(metric)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric

**Returns:** TimeSeries



---

### metric(metric, calendar, observed, range)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric
* `calendar` (String) - The id of the calendar to aggregate the metrics to
* `observed` (String) - The aggregation method to use; one of summed,averaged,high,low,beginning,end
* `range` (String) - The date range expression

**Returns:** TimeSeries



---

### metric(metric, calendar, observed, range, filter)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric
* `calendar` (String) - The id of the calendar to aggregate the metrics to
* `observed` (String) - The aggregation method to use; one of summed,averaged,high,low,beginning,end
* `range` (String) - The date range expression
* `filter` (String) - A filter expression to filter the metrics

**Returns:** TimeSeries



---

### metric(metric, properties, calendar, observed, range, filter)

**Category:** Metrics

**Description:** Get a virtual metric timeseries

**Parameters:**
* `metric` (String) - The metric id in the form provider/metric
* `properties` (Object) - An object of properties to pass to the metric
* `calendar` (String) - The id of the calendar to aggregate the metrics to
* `observed` (String) - The aggregation method to use; one of summed,averaged,high,low,beginning,end
* `range` (String) - The date range expression
* `filter` (String) - A filter expression to filter the metrics

**Returns:** TimeSeries



---

### MetricTimeSeries(provider, metric)

**Category:** Construction

**Description:** Creates a new Metric TimeSeries

**Parameters:**
* `provider` (String) - The metric provider
* `metric` (String) - The name of the metric

**Returns:** MetricTimeSeries



---

### min(data)

**Category:** Statistics

**Description:** Gets the lowest value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### missing(series)

**Category:** Data Quality Validation

**Description:** Checks for unexpected missing values in a TimeSeries

**Parameters:**
* `series` (TimeSeries) - The input TimeSeries to validate

**Returns:** TimeSeries



---

### mod(x, y)

**Category:** Numeric

**Description:** Returns the floor modulus for the given x, y numbers

**Parameters:**
* `x` (Number, List, TimeSeries or Curve) - The value to divide
* `y` (Number) - The divisor

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### MonthlyCalendar()

**Category:** Construction

**Description:** Creates a new Monthly Calendar

**Parameters:**

**Returns:** Calendar



---

### MonthlyCalendar(code, name, period)

**Category:** Construction

**Description:** Creates a new Monthly Calendar with a period specifier

**Parameters:**
* `code` (String) - The code for this calendar
* `name` (String) - The name of this calendar
* `period` (Int) - The number of months each observation covers, has to be one of 1,2,3,4,6,12

**Returns:** Calendar



---

### MonthlyCalendar(period, dom, holcal, rollbackwards)

**Category:** Construction

**Description:** Creates a new Monthly Calendar

**Parameters:**
* `period` (Integer) - The number of periods per year (1,2,3,4,6,12)
* `dom` (Integer) - The day of month, (1 to 31) 31 for last day of the month
* `holcal` (String) - The id of the holiday calendar to use
* `rollbackwards` (Boolean) - True if holiday days roll backwards

**Returns:** Calendar



---

### MultiLineString()

**Category:** Geometry construction

**Description:** Creates an empty MultiLineString geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiLineString(lines)

**Category:** Geometry construction

**Description:** Creates an empty MultiLineString geometry object

**Parameters:**
* `lines` (List of LineStrings) - The lines

**Returns:** GeoSpatial



---

### MultiPoint()

**Category:** Geometry construction

**Description:** Creates a MultiPoint geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiPoint(coordinates)

**Category:** Geometry construction

**Description:** Creates a MultiPoint geometry object with the supplied list of coordinates

**Parameters:**
* `coordinates` (List of [longitude, latitude]) - The points

**Returns:** GeoSpatial



---

### MultiPolygon()

**Category:** Geometry construction

**Description:** Creates an empty MultiPolygon geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiPolygon(polygons)

**Category:** Geometry construction

**Description:** Creates a MultiPolygon geometry object with the supplied polygons

**Parameters:**
* `polygons` (List of Polygons) - The polygons

**Returns:** GeoSpatial



---

### normalise(str)

**Category:** Strings

**Description:** Returns a normalised string removing all accents of the string passed.

**Parameters:**
* `str` (String) - The string to normalise

**Returns:** String



---

### normaliseCurve(input)

**Category:** Curve

**Description:** Normalises a curve such that all the inputs average to 1

**Parameters:**
* `input` (Curve) - The input curve to normalise

**Returns:** Curve

**Works with:** `curve` 

---

### Null()

**Category:** Construction

**Description:** Creates a Null variable

**Parameters:**

**Returns:** Null



---

### Object()

**Category:** Construction

**Description:** Creates a new Object of type #Object

**Parameters:**

**Returns:** Object



---

### Object(type)

**Category:** Construction

**Description:** Creates a new Object of the specified type

**Parameters:**
* `type` (String) - The name of the type to use for this Object

**Returns:** Object



---

### ObjectId()

**Category:** Construction

**Description:** Creates a unique object id

**Parameters:**

**Returns:** String



---

### ObjectWrapper(class)

**Category:** Construction

**Description:** Creates a new OpenDataDSL object wrapper

**Parameters:**
* `class` (String) - The Java class to wrap

**Returns:** ObjectWrapper



---

### OffsetDailyCalendar(timezone, dayOffset, hour)

**Category:** Construction

**Description:** Creates a new Offset Daily Calendar

**Parameters:**
* `timezone` (String) - The timezone for this intraday calendar
* `dayOffset` (Int) - The number of days offset, usually 0 or -1
* `hour` (Int) - The hour of the offset day in the supplied timezone to use

**Returns:** Calendar



---

### OLSMultipleRegression(y, x)

**Category:** Statistics

**Description:** OLSMultipleLinearRegression provide least squares regression to fit the linear model:

Y=X*b+u

where Y is an n-vector regressand, X is a [n,k] matrix whose k columns are called regressors, b is k-vector of regression parameters and u is an n-vector of error terms or residuals.

OLSMultipleLinearRegression provides Ordinary Least Squares Regression.

Data for OLS models can be loaded in a single double[] array, consisting of concatenated rows of data, each containing the regressand (Y) value, followed by regressor values; or using a double[][] array with rows corresponding to observations.

**Parameters:**
* `y` (Matrix) - An [n,1] array representing the y sample
* `x` (Matrix) - An [n,k] array representing the x sample

**Returns:** Object



---

### overlay(base, other)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with all the non-missing values from other added to base

**Parameters:**
* `base` (TimeSeries) - The base TimeSeries to use as the source
* `other` (TimeSeries) - The TimeSeries to overlay on top of the base, all non-missing values from this TimeSeries will be added to missing values in base

**Returns:** TimeSeries



---

### parse(date, format)

**Category:** Dates

**Description:** Converts a string into a date using the specified format

**Parameters:**
* `date` (String) - The stringified date to convert to a Date
* `format` (String) - The date format to use - see documentation

**Returns:** String



---

### parse(date, format, tz)

**Category:** Dates

**Description:** Converts a string into a date using the specified format and timezone

**Parameters:**
* `date` (String) - The stringified date to convert to a Date
* `format` (String) - The date format to use - see documentation
* `tz` (String) - The timezone to use - see documentation

**Returns:** String



---

### parseISODate(date)

**Category:** Dates

**Description:** Converts a ISO Date format string into a date 

**Parameters:**
* `date` (String) - The stringified date to convert to a Date

**Returns:** String



---

### pct(series)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with the percentage change values from one observation to the next

**Parameters:**
* `series` (TimeSeries) - The TimeSeries to calculate the differences from

**Returns:** TimeSeries



---

### percentile(data, percentile)

**Category:** Statistics

**Description:** Gets the percentile

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on
* `percentile` (Number) - The percentile to choose

**Returns:** Number



---

### Point(coordinate)

**Category:** Geometry construction

**Description:** Creates a single coordinate point

**Parameters:**
* `coordinate` (List) - The point as [longitude, latitude]

**Returns:** GeoSpatial



---

### Policy()

**Category:** Construction

**Description:** Creates a new security policy

**Parameters:**

**Returns:** Policy



---

### Polygon()

**Category:** Geometry construction

**Description:** Creates a empty Polygon geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### Polygon(rings)

**Category:** Geometry construction

**Description:** Creates a Polygon geometry object with a multiple rings containing the supplied geometries

**Parameters:**
* `rings` (List of geometries) - The rings of the polygon

**Returns:** GeoSpatial



---

### Polygon(coordinates)

**Category:** Geometry construction

**Description:** Creates a Polygon geometry object with a single ring containing the supplied coordinates

**Parameters:**
* `coordinates` (List of [longitude, latitude]) - The points of the ring

**Returns:** GeoSpatial



---

### popvar(data)

**Category:** Statistics

**Description:** Gets the population variance

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### pow(data, power)

**Category:** Numeric

**Description:** Returns the value of the first argument raised to the power of the second argument

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The data to transform
* `power` (Number) - The power to raise the input data to

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### priority(curves)

**Category:** Curve

**Description:** Adds tenors from a list of curves in order of priority

**Parameters:**
* `curves` (List of Curves) - A list of curves in order of priority

**Returns:** Curve

**Works with:** `curve` 

---

### Process()

**Category:** Construction

**Description:** Creates a new Process

**Parameters:**

**Returns:** Process



---

### properties(object)

**Category:** Introspection

**Description:** Returns an array of Strings that gives information about the properties on a variable

**Parameters:**
* `object` (Any) - The variable to test what the type is

**Returns:** List(String)



---

### quadmean(data)

**Category:** Statistics

**Description:** Gets the quadratic average value

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### QualityGroup()

**Category:** Construction

**Description:** Creates a new curve quality group

**Parameters:**

**Returns:** QualityGroup



---

### QuarterlyCalendar()

**Category:** Construction

**Description:** Creates a new Quarterly Calendar

**Parameters:**

**Returns:** Calendar



---

### queryParams(url)

**Category:** Loader

**Description:** The query parameters of a URL as an object, decoded

**Parameters:**
* `url` (String) - The URL, or just its query string

**Returns:** Object



---

### Queue(name)

**Category:** Construction

**Description:** Creates a new queue

**Parameters:**
* `name` (String) - The name of the queue

**Returns:** Queue



---

### random()

**Category:** Data Generation

**Description:** Creates a random number between 0 and 1

**Parameters:**

**Returns:** Scalar



---

### randomInteger(var)

**Category:** Data Generation

**Description:** Creates a random integer between 0 and the supplied number - 1

**Parameters:**
* `var` (Any Number) - The max limit of the integer number - 1

**Returns:** Scalar



---

### RedactionPolicy()

**Category:** Construction

**Description:** Creates a new security redaction policy

**Parameters:**

**Returns:** RedactionPolicy



---

### ref(var)

**Category:** General

**Description:** Creates a reference to a variable

**Parameters:**
* `var` (Any Var) - The value to create a reference to

**Returns:** Reference



---

### ref(Service, Id)

**Category:** General

**Description:** Creates a reference to a variable

**Parameters:**
* `Service` (String) - The name of the service where the variable exists
* `Id` (String) - The id of the variable to create a reference to

**Returns:** Reference



---

### remove(str, regex)

**Category:** Strings

**Description:** Removes all the characters according to the regex parameter from the passed in string

**Parameters:**
* `str` (String) - The string to remove characters from
* `regex` (Regex String) - The regex string used to determine which characters to remove, e.g. [ei]

**Returns:** String



---

### removeDuplicates(from, remove)

**Category:** Loader

**Description:** The items of the first list that are not in the second list

**Parameters:**
* `from` (List) - The list to take items from
* `remove` (List) - The items to leave out

**Returns:** List



---

### removeEmpty(items)

**Category:** Loader

**Description:** Removes the empty items from a list

**Parameters:**
* `items` (List) - The list of values

**Returns:** List



---

### replace(str, match, replacement)

**Category:** Strings

**Description:** Replaces each substring of the input string that matches the literal match string with the specified literal replacement string

**Parameters:**
* `str` (String) - The string to replace characters in
* `match` (String) - The string to match in the input string
* `replacement` (String) - The string used to replace the matched string in the input string

**Returns:** String



---

### replaceAll(str, regex, replacement)

**Category:** Strings

**Description:** Replaces all the characters according to the regex parameter from the passed in string with the passed in literal replacement string

**Parameters:**
* `str` (String) - The string to replace characters in
* `regex` (Regex String) - The regex string used to determine which characters to replace, e.g. [ei]
* `replacement` (String) - The string used to replace the characters in the input string

**Returns:** String



---

### replaceElements(items, value)

**Category:** General

**Description:** A list of the same length with every item replaced by a value

**Parameters:**
* `items` (List) - The list
* `value` (String) - The value to use

**Returns:** List



---

### replaceEmptyValues(items, value)

**Category:** Loader

**Description:** Replaces the empty items of a list with a value

**Parameters:**
* `items` (List) - The list of values
* `value` (String) - The value to use

**Returns:** List



---

### replaceQueryParam(url, name, value)

**Category:** Loader

**Description:** A URL with the value of one query parameter replaced

**Parameters:**
* `url` (String) - The URL
* `name` (String) - The name of the parameter
* `value` (String) - The new value, which is URL encoded

**Returns:** String



---

### replaceValues(items, regex, replacement)

**Category:** Loader

**Description:** Replaces every match of a regular expression in each item of a list

**Parameters:**
* `items` (List) - The list of values
* `regex` (String) - The regular expression to find
* `replacement` (String) - The replacement text

**Returns:** List



---

### Report()

**Category:** Construction

**Description:** Creates a new report configuration

**Parameters:**

**Returns:** Report



---

### ReportCreator()

**Category:** Construction

**Description:** Creates a new report creator

**Parameters:**

**Returns:** ReportCreator



---

### reverseList(items)

**Category:** Loader

**Description:** Reverses the order of a list

**Parameters:**
* `items` (List) - The list

**Returns:** List



---

### Row()

**Category:** Construction

**Description:** Creates a new Row

**Parameters:**

**Returns:** Row



---

### scale(input, calendar)

**Category:** Conversion

**Description:** Scales a TimeSeries to the supplied calendar using the observed setting on the TimeSeries or the global observed setting

**Parameters:**
* `input` (TimeSeries) - The TimeSeries to scale
* `calendar` (Calendar or name of calendar) - The calendar to scale to

**Returns:** TimeSeries



---

### scale(input, calendar, observed)

**Category:** Conversion

**Description:** Scales a TimeSeries to the supplied calendar using the observed setting on the TimeSeries or the global observed setting

**Parameters:**
* `input` (TimeSeries) - The TimeSeries to scale
* `calendar` (Calendar or name of calendar) - The calendar to scale to
* `observed` (String) - The method to use, one of: beginning, end, summed, averaged, high, low

**Returns:** TimeSeries



---

### scale(input, calendar, observed, distribution)

**Category:** Conversion

**Description:** Scales a TimeSeries to the supplied calendar using the observed setting on the TimeSeries or the global observed setting

**Parameters:**
* `input` (TimeSeries) - The TimeSeries to scale
* `calendar` (Calendar or name of calendar) - The calendar to scale to
* `observed` (String) - The method to use, one of: beginning, end, summed, averaged, high, low
* `distribution` (String) - The distribution method to use, one of: constant, linear or cubic

**Returns:** TimeSeries



---

### Script()

**Category:** Construction

**Description:** Creates a new Script

**Parameters:**

**Returns:** Script



---

### Secret(value)

**Category:** Construction

**Description:** Creates a new Secret Value

**Parameters:**
* `value` (String) - The value of this secret

**Returns:** Secret



---

### sequence(timeseries)

**Category:** TimeSeries

**Description:** Returns a TimeSeries with all the non-missing values from other added to base

**Parameters:**
* `timeseries` (List of TimeSeries) - The timeseries to combine, in order

**Returns:** TimeSeries



---

### shape(input)

**Category:** Curve

**Description:** Simple shaping algorithm used to shape a monthly curve

**Parameters:**
* `input` (Curve) - The input curve to shape

**Returns:** Curve

**Works with:** `curve` 

---

### shift(series, observations)

**Category:** TimeSeries

**Description:** Returns a TimeSeries that is shifted in time by the number of specified observations

**Parameters:**
* `series` (TimeSeries) - The TimeSeries to shift
* `observations` (Number) - The number of observations to shift by

**Returns:** TimeSeries



---

### SimpleObject()

**Category:** Construction

**Description:** Creates a new SimpleObject or JSON Document

**Parameters:**

**Returns:** SimpleObject



---

### simpleRegression(data)

**Category:** Statistics

**Description:** Provides ordinary least squares regression with one independent variable estimating the linear model:

y = intercept + slope * x

or

y = slope * x

Standard errors for intercept and slope are available as well as ANOVA, r-square and Pearson's r statistics.

Observations (x,y pairs) can be added to the model one at a time or they can be provided in a 2-dimensional array. The observations are not stored in memory, so there is no limit to the number of observations that can be added to the model.

**Parameters:**
* `data` (Matrix) - The input data to perform the calculation on

**Returns:** Object



---

### simpleRegression(data)

**Category:** Statistics

**Description:** Provides ordinary least squares regression with one independent variable estimating the linear model:

y = intercept + slope * x

or

y = slope * x

Standard errors for intercept and slope are available as well as ANOVA, r-square and Pearson's r statistics.

Observations (x,y pairs) can be added to the model one at a time or they can be provided in a 2-dimensional array. The observations are not stored in memory, so there is no limit to the number of observations that can be added to the model.

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on

**Returns:** Object



---

### sin(data)

**Category:** Numeric

**Description:** Returns the trigonometric sine of an angle

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### sinh(data)

**Category:** Numeric

**Description:** Returns the hyperbolic sine of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### skew(data)

**Category:** Statistics

**Description:** Gets the skewness

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### sma(data, window)

**Category:** Statistics

**Description:** A simple moving average

**Parameters:**
* `data` (TimeSeries) - The input data to perform the calculation on
* `window` (int) - The moving average window size

**Returns:** TimeSeries



---

### SmartCurve()

**Category:** Construction

**Description:** Creates a new Smart Curve

**Parameters:**

**Returns:** SmartCurve



---

### SmartCurve(base, expression)

**Category:** Construction

**Description:** Creates a new Smart Curve using a base curve and expression

**Parameters:**
* `base` (String, Curve or Ref) - The BASE curve this curve uses for CurveDates
* `expression` (String) - The expression used to generate the curves

**Returns:** SmartCurve



---

### SmartTimeSeries(expression)

**Category:** Construction

**Description:** Creates a new Smart TimeSeries using an expression

**Parameters:**
* `expression` (String) - The expression used to generate the TimeSeries

**Returns:** SmartTimeSeries



---

### SmartTimeSeries(base, expression)

**Category:** Construction

**Description:** Creates a new Smart TimeSeries using a base TimeSeries and expression

**Parameters:**
* `base` (String, TimeSeries or Ref) - The BASE TimeSeries this curve uses for Start Date and Calendar
* `expression` (String) - The expression used to generate the TimeSeries

**Returns:** SmartTimeSeries



---

### SmartTimeSeries(start, calendar, expression)

**Category:** Construction

**Description:** Creates a new Smart TimeSeries using a base TimeSeries and expression

**Parameters:**
* `start` (Date) - The Start Date
* `calendar` (Calendar) - The TimeSeries calendar
* `expression` (String) - The expression used to generate the TimeSeries

**Returns:** SmartTimeSeries



---

### Sphere(centre, radius)

**Category:** Geometry construction

**Description:** Creates a centerSphere geometry object used in geospatial queries

**Parameters:**
* `centre` (List) - The centre as [longitude, latitude]
* `radius` (Number) - The radius in radians

**Returns:** GeoSpatial



---

### Sphere(centre, min, max)

**Category:** Geometry construction

**Description:** Creates a nearSphere geometry object used in geospatial queries

**Parameters:**
* `centre` (List) - The centre as [longitude, latitude]
* `min` (Number) - The minimum distance in metres
* `max` (Number) - The maximum distance in metres

**Returns:** GeoSpatial



---

### split(str, sep)

**Category:** Strings

**Description:** Splits the string passed by the separator.

**Parameters:**
* `str` (String) - The string to split
* `sep` (String) - The separator to split

**Returns:** List



---

### sqrt(data)

**Category:** Numeric

**Description:** Returns the correctly rounded positive square root of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### startsWith(str, prefix)

**Category:** Strings

**Description:** Tests to see if the first string starts with the specified prefix. If either the string or the prefix are null, it returns false

**Parameters:**
* `str` (String) - The string to check
* `prefix` (String) - The prefix to check for

**Returns:** Boolean



---

### stdev(data)

**Category:** Statistics

**Description:** Gets the standard deviation

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### String(text)

**Category:** Construction

**Description:** Creates a new string scalar using the supplied text

**Parameters:**
* `text` (String) - The text of the string

**Returns:** String



---

### Subscription()

**Category:** Construction

**Description:** Creates a new subscription

**Parameters:**

**Returns:** Subscription



---

### substring(str, beginIndex, endIndex)

**Category:** Strings

**Description:** Returns a string that is a substring of another string. The substring begins with the character at the specified index (counting from 0) and extends to the character at the end index -1. If the end index is entered as -1, the substring ends as the last character in the input string.

**Parameters:**
* `str` (String) - The string to create the substring from
* `beginIndex` (Int) - The start character to extract, the string starts at character 0
* `endIndex` (Int) - The last-1 character to extract, if it is -1, it extracts the rest of the string

**Returns:** String



---

### sum(data)

**Category:** Statistics

**Description:** Gets the sum of the values

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### sumsq(data)

**Category:** Statistics

**Description:** Gets the sum of the squares

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### SystemAlert(name)

**Category:** Construction

**Description:** Creates a new System Alert

**Parameters:**
* `name` (String) - The alert name

**Returns:** Alert



---

### SystemAlertMessage(message)

**Category:** Construction

**Description:** Creates a new System Alert Record sent to the #SYSTEM.MESSAGE alert with the provided message

**Parameters:**
* `message` (String) - The message to send

**Returns:** AlertRecord



---

### SystemAlertRecord(name)

**Category:** Construction

**Description:** Creates a new System Alert Record

**Parameters:**
* `name` (String) - The alert name

**Returns:** AlertRecord



---

### Table()

**Category:** Construction

**Description:** Creates a new Table

**Parameters:**

**Returns:** Table



---

### tan(data)

**Category:** Numeric

**Description:** Returns the trigonometric tangent of an angle

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### tanh(data)

**Category:** Numeric

**Description:** Returns the hyperbolic tangent of a double value

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### TargetGroup()

**Category:** Construction

**Description:** Creates a new subscription target group

**Parameters:**

**Returns:** TargetGroup



---

### Task()

**Category:** Construction

**Description:** Creates a new user task

**Parameters:**

**Returns:** Task



---

### TimeOfDay(time)

**Category:** Construction

**Description:** Creates a new TimeOfDay variable using the supplied String in the format [+]hh:mm [tz]

**Parameters:**
* `time` (String) - The time of day in the format [+]hh:mm [tz]

**Returns:** TimeOfDay



---

### TimeSeries(calendar)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `calendar` (Scalar) - The calendar to use for this TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(calendar, dataType)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `calendar` (Scalar) - The calendar to use for this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, Calendar, value)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (Scalar) - The start date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `value` (Scalar) - The first value of this TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, Calendar, value, dataType)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (Scalar) - The start date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `value` (Scalar) - The first value of this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, end, Calendar, value, dataType)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (List) - Set of start date/time for this TimeSeries
* `end` (List) - Set of end date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `value` (List) - All the values of this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, Calendar, intervalPositions, value, dataType, positionCalendar)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (Scalar) - The start date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `intervalPositions` (Scalar) - Interval positions to create index based on calendar
* `value` (Scalar) - The first value of this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries
* `positionCalendar` (Scalar) - Calendar to calculate positions

**Returns:** TimeSeries



---

### TimeStamp()

**Category:** Construction

**Description:** Creates a new Date variable as the current date and time

**Parameters:**

**Returns:** Date



---

### timeTravel(input, ondate)

**Category:** Curve

**Description:** Creates a new curve projected to the supplied ondate, any expired contracts and removed and relatives are recalculated

**Parameters:**
* `input` (Curve) - The input curve to time travel
* `ondate` (Date) - The ondate to travel to

**Returns:** Curve

**Works with:** `curve` 

---

### toDegrees(data)

**Category:** Numeric

**Description:** Converts an angle measured in radians to an approximately equivalent angle measured in degrees

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### toInt(var)

**Category:** Conversion

**Description:** Converts any input number to an integer

**Parameters:**
* `var` (Any Number) - The value to convert to an integer

**Returns:** Scalar



---

### toPropertySet(properties)

**Category:** Loader

**Description:** Converts a string of name=value pairs separated by commas into an object

**Parameters:**
* `properties` (String) - The pairs, e.g. region=NW,type=gas

**Returns:** Object



---

### toRadians(data)

**Category:** Numeric

**Description:** Converts an angle measured in degrees to an approximately equivalent angle measured in radians

**Parameters:**
* `data` (Number, List, TimeSeries or Curve) - The input data to transform

**Returns:** Number

**Works with:** `curve` `timeseries` `scalar` `list` 

---

### toUTCDate(date)

**Category:** Loader

**Description:** Converts a date to the UTC timezone

**Parameters:**
* `date` (Date) - The date

**Returns:** Date



---

### trim(str)

**Category:** Strings

**Description:** Returns a string with any space characters from the start or end of the string removed

**Parameters:**
* `str` (String) - The string to trim

**Returns:** String



---

### tryParse(date, format, tz)

**Category:** Dates

**Description:** Trys to convert a string into a date using the specified format and timezone, if it can't parse the date, null is returned

**Parameters:**
* `date` (String) - The stringified date to convert to a Date
* `format` (String) - The date format to use - see documentation
* `tz` (String) - The timezone to use - see documentation

**Returns:** String



---

### typeOf(object)

**Category:** Introspection

**Description:** Returns a String with the type name of a variable

**Parameters:**
* `object` (Any) - The variable to test what the type is

**Returns:** String



---

### uid()

**Category:** General

**Description:** Generates a unique ID

**Parameters:**

**Returns:** String



---

### upper(str)

**Category:** Strings

**Description:** Returns a copy of the passed in string with all the characters converted to UPPER case

**Parameters:**
* `str` (String) - The string to convert to UPPER case

**Returns:** String



---

### UserGroup()

**Category:** Construction

**Description:** Creates a new user group

**Parameters:**

**Returns:** UserGroup



---

### var(data)

**Category:** Statistics

**Description:** Gets the variance

**Parameters:**
* `data` (Timeseries, List of Scalars or List of Timeseries) - The input data to perform the calculation on

**Returns:** Number



---

### variable(name)

**Category:** Introspection

**Description:** Returns the variable with the given name

**Parameters:**
* `name` (String) - The name of the variable to return

**Returns:** Any



---

### variable(var, name)

**Category:** Introspection

**Description:** Returns the variable with the given name

**Parameters:**
* `var` (Anything) - The variable that contains the dynamic property
* `name` (String) - The name of the variable to return

**Returns:** Any



---

### variables()

**Category:** Introspection

**Description:** Returns a list of the current variables

**Parameters:**

**Returns:** List



---

### WeeklyCalendar(dow)

**Category:** Construction

**Description:** Creates a new Weekly Calendar

**Parameters:**
* `dow` (String) - The day of week for this weekly calendar, e.g. Monday

**Returns:** Calendar



---

### WeeklyCalendar(dow, holcal, rollbackwards)

**Category:** Construction

**Description:** Creates a new Weekly Calendar

**Parameters:**
* `dow` (String) - The day of week for this weekly calendar, e.g. Monday
* `holcal` (String) - The id of the holiday calendar to use
* `rollbackwards` (Boolean) - True if holiday days roll backwards

**Returns:** Calendar



---

### WeeklyCalendar(dow, holcal, rollbackwards, periods, referenceDate)

**Category:** Construction

**Description:** Creates a new Weekly Calendar

**Parameters:**
* `dow` (String) - The day of week for this weekly calendar, e.g. Monday
* `holcal` (String) - The id of the holiday calendar to use
* `rollbackwards` (Boolean) - True if holiday days roll backwards
* `periods` (String) - The number of weeks
* `referenceDate` (String) - The reference date to use for calculating the week starting point for multiple periods

**Returns:** Calendar



---

### WidgetReport()

**Category:** Construction

**Description:** Creates a new widget report configuration

**Parameters:**

**Returns:** Report



---

