---
slug: /odsl/function/functions-dates
title: Date Functions
sidebar_position: 11
---

This document provides a reference for all built-in date functions available in OpenDataDSL.

### daylightSavings(date, timezone)

**Category:** Dates

**Description:** Checks a day to see if it is a daylight savings day

**Parameters:**
* `date` (Date) - The Date to check for DST
* `timezone` (String) - The timezone of the passed in date

**Returns:** 0 if false, -1 if it is the start day of DST, 1 if it is the end day of DST



---

### format(date, format)

**Category:** Dates

**Description:** Converts a date into a string using the specified format

**Parameters:**
* `date` (Date) - The date to convert to a string
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

### parse(date, format)

**Category:** Dates

**Description:** Converts a string into a date using the specified format

**Parameters:**
* `date` (String) - The stringified date to convert to a Date
* `format` (String) - The date format to use - see documentation

**Returns:** String



---

### parseISODate(date)

**Category:** Dates

**Description:** Converts a ISO Date format string into a date 

**Parameters:**
* `date` (String) - The stringified date to convert to a Date

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


