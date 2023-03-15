---
slug: /odsl/function/daylightSavings
---
Checks a day to see if it is a daylight savings changeover day.

Returns 
* 0 if false
* -1 if it is the start day of DST
* 1 if it is the end day of DST

#### Syntax
```js
result = daylightSavings(date, timezone)
```
#### Example
```js
print daylightSavings(Date("2021-10-31"), "Europe/London")
```
```
1
```
