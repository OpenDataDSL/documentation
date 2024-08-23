---
title: Functions
sidebar_position: 4
slug: /tutorials/qs/developer/functions
tags:
  - quickstart
  - odsl
  - developer
  - functions
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module provides a tour of the built-in functions and shows you how to create your own." />

## Built-in Functions
We provide an ever-expanding list of functions that can be used with the OpenDataDSL language, this section gives a quick tour of the types of functions available.

### String functions
The string functions provide functionality for manipulating and examining strings.

Examples of string functions:
```js
s1 = "My String"

// Get the number of characters in the string
print length(s1)
// >> 9

// Print the string in lower case
print lower(s1)
// >> my string

// Print the string in upper case
print upper(s1)
// >> MY STRING

// Print a version of the string that can be used as an id
print clean(s1)
// >> MY_STRING

// Replace matches in the string
print replace(s1, "My", "Your")
// >> Your String

// Remove characters from the string
print remove(s1, " ")
// >> MyString

// Checks to see if it contains a certain character
print startsWith(s1, "M")
// >> true
```
<InDepth href="/docs/odsl/function/strings" />

### Date functions
Date functions help you utilise dates.

Date function examples:
```js
// Parse a date using specific formats
print parse("22/10/2021", "dd/MM/yyyy")
// >> 2021-10-22

print parse("2022", "yyyy")
// >> 2022-01-01

// Print a date in a specific format
d1=Date("22/10/2021 06:00", "dd/MM/yyyy HH:mm")
print format(d1, "yyyy-MM-dd'T'HH:mm:ss")
```

<InDepth href="/docs/odsl/function/date" />

### List functions
List functions are functions that take a list as an input

List function examples:
```js
l1 = [4,8,19]
print min(l1)
// >> 4
print max(l1)
// >> 19
print mean(l1)
// >> 10.333333
print geomean(l1)
// >> 9.471647
```

<InDepth href="/docs/odsl/function/list" />

### Curve functions
Curve functions are specifically used for building and analysing forward curves with functions such as:
* bootstrapCurve - used to create an arbitrage-free monthly curve from a curve with multiple granularities
* extendCurve - used to extrapolate a curve a number of years
* shape - used to shape the latter portion of a curve using the shape of the first 12 periods

<InDepth href="/docs/odsl/function/curve" />


### Statistical functions
The statistical functions are generally used to analyse a list or TimeSeries and produce basic descriptive statistics.

An example showing the simpleRegression function:
```js
input = TimeSeries("DAILY")
input.add("2020-11-01", 12.5)
input.add("2020-11-02", 12.8)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)

reg = simpleRegression(input)

print reg.slope
print reg.slopeStdErr
print reg.slopeConfidenceInterval
print reg.intercept
print reg.interceptStdErr
print reg.meanSquareErr
print reg.N
print reg.R
print reg.regressionSumSquares
print reg.RSquare
print reg.significance
print reg.sumOfCrossProducts
print reg.sumSquaredErrors
print reg.totalSumSquares
print reg.XSumSquares

// Predict the next value
print reg.predict(Date("2020-11-06"))
```

<InDepth href="/docs/odsl/function/statistics" />

#### Full list of functions
Follow the link below for documentation on the full list of functions:

<MoreInfo href="/docs/product/developer/odsl/Functions/all/" />

## Custom Functions
You can create your own user defined functions and use them in your code, you can also create a library of functions in a script and import that script into other scripts to use those functions.

An example of a custom function:
```js
function random100()
    random100 = toInt(random()*100 + 1)
end
```

<InDepth href="/docs/odsl/function/udf" />

