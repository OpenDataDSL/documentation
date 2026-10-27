---
slug: /odsl/function/functions-loader
title: Loader Helper Functions
sidebar_position: 18
---

This document provides a reference for all built-in loader, validation and monitoring functions available in OpenDataDSL.


### currentEnv()

**Category:** Loader

**Description:** The platform environment the script is running against, with its name and api URL

**Parameters:**

**Returns:** Object



---

### extractDates(text)

**Category:** Loader

**Description:** Finds the dates written in a line of text, such as 19 July 2025 or 14, 15 and 16 July 2025. Returns an object with the list of dates and the kind of text: single, list or range

**Parameters:**
* `text` (String) - The text to read

**Returns:** Object



---

### firstElementOf(items, value)

**Category:** Loader

**Description:** The position of the first item of a list that equals a value, ignoring case, or -1

**Parameters:**
* `items` (List) - The list
* `value` (String) - The value to find

**Returns:** Integer



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

### hashsha256(value)

**Category:** Loader

**Description:** The SHA-256 hash of a string, as a hexadecimal string

**Parameters:**
* `value` (String) - The string to hash

**Returns:** String



---

### initialiseList(size, value)

**Category:** Loader

**Description:** Creates a list of a given size with every item set to a value

**Parameters:**
* `size` (Integer) - The number of items
* `value` (String) - The value of each item

**Returns:** List



---

### isDatasetComplete(dsid, date)

**Category:** Dataset Monitoring

**Description:** Checks to see if the supplied dataset is 100% complete for the supplied date

**Parameters:**
* `dsid` (String) - The full dataset id to check
* `date` (String) - The date in the format yyyy-MM-dd

**Returns:** Boolean



---

### lastElementOf(items, value)

**Category:** Loader

**Description:** The position of the last item of a list that equals a value, ignoring case, or -1

**Parameters:**
* `items` (List) - The list
* `value` (String) - The value to find

**Returns:** Integer



---

### matches(regex, value)

**Category:** Loader

**Description:** True if the value, or any item of a list, matches a regular expression

**Parameters:**
* `regex` (String) - The regular expression
* `value` (String or List) - The value or list to test

**Returns:** Boolean



---

### missing(series)

**Category:** Data Quality Validation

**Description:** Checks for unexpected missing values in a TimeSeries

**Parameters:**
* `series` (TimeSeries) - The input TimeSeries to validate

**Returns:** TimeSeries



---

### queryParams(url)

**Category:** Loader

**Description:** The query parameters of a URL as an object, decoded

**Parameters:**
* `url` (String) - The URL, or just its query string

**Returns:** Object



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

### reverseList(items)

**Category:** Loader

**Description:** Reverses the order of a list

**Parameters:**
* `items` (List) - The list

**Returns:** List



---

### toPropertySet(properties)

**Category:** Loader

**Description:** Converts a string of name=value pairs separated by commas into an object

**Parameters:**
* `properties` (String) - The pairs, e.g. region=NW,type=gas

**Returns:** Object



---

### toUTCDate(date)

**Category:** Loader

**Description:** Converts a date to the UTC timezone

**Parameters:**
* `date` (Date) - The date

**Returns:** Date



---

