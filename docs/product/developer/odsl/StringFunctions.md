---
slug: /odsl/function/functions-strings
title: String Functions
sidebar_position: 9
---

This document provides a reference for all built-in string functions available in OpenDataDSL.

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

### clean(str)

**Category:** Strings

**Description:** Creates a valid variable name from the input string - spaces converted to underscores and invalid characters removed

**Parameters:**
* `str` (String) - The string to clean

**Returns:** String



---

### compare(str1, str2)

**Category:** Strings

**Description:** Compares the contents of 2 non-null strings, returns true if they are the same

**Parameters:**
* `str1` (String) - The string to compare
* `str2` (String) - The string to compare to

**Returns:** Boolean



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

### equals()

**Category:** Strings

**Description:** 

**Parameters:**

**Returns:** 



---

### equalsIgnoreCase(str1, str2)

**Category:** Strings

**Description:** Checks to see if 2 strings are the same ignoring case

**Parameters:**
* `str1` (String) - The string to compare
* `str2` (String) - The string to compare to

**Returns:** Boolean



---

### formatString(format, str)

**Category:** Strings

**Description:** Formats the string passed using the formatter.

**Parameters:**
* `format` (String) - The format to use
* `str` (String) - The string to format

**Returns:** String



---

### indexOf(str1, str2)

**Category:** Strings

**Description:** Returns a int value that is a indexOf of a string.

**Parameters:**
* `str1` (String) - The string which contains the char
* `str2` (String) - The string to find the indexOf value

**Returns:** int



---

### isNumber(str)

**Category:** Strings

**Description:** Returns true if a string is a  Number

**Parameters:**
* `str` (String) - The string to check for number

**Returns:** Boolean



---

### json(var)

**Category:** Strings

**Description:** Converts the input variable of any type to a JSON formatted string

**Parameters:**
* `var` (Any) - The variable to convert to a JSON format string

**Returns:** String



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

### lower(str)

**Category:** Strings

**Description:** Returns a copy of the passed in string with all the characters converted to lower case

**Parameters:**
* `str` (String) - The string to convert to lower case

**Returns:** String



---

### normalise(str)

**Category:** Strings

**Description:** Returns a normalised string removing all accents of the string passed.

**Parameters:**
* `str` (String) - The string to normalise

**Returns:** String



---

### remove(str, regex)

**Category:** Strings

**Description:** Removes all the characters according to the regex parameter from the passed in string

**Parameters:**
* `str` (String) - The string to remove characters from
* `regex` (Regex String) - The regex string used to determine which characters to remove, e.g. [ei]

**Returns:** String



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

### split(str, sep)

**Category:** Strings

**Description:** Splits the string passed by the separator.

**Parameters:**
* `str` (String) - The string to split
* `sep` (String) - The separator to split

**Returns:** List



---

### startsWith(str, prefix)

**Category:** Strings

**Description:** Tests to see if the first string starts with the specified prefix. If either the string or the prefix are null, it returns false

**Parameters:**
* `str` (String) - The string to check
* `prefix` (String) - The prefix to check for

**Returns:** Boolean



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

### trim()

**Category:** Strings

**Description:** Returns a string with any space characters from the start or end of the string removed

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


