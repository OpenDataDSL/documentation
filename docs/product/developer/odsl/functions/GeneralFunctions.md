---
slug: /odsl/function/functions-general
title: General Functions
sidebar_position: 19
---

This document provides a reference for all built-in general functions available in OpenDataDSL.


### clone(var)

**Category:** General

**Description:** Creates a new copy of a variable

**Parameters:**
* `var` (Any Var) - The value to create a copy of

**Returns:** Same type as input



---

### content(items)

**Category:** General

**Description:** The content of each extracted item in a list (the content property of each object), with dates converted to Date values

**Parameters:**
* `items` (List) - A list of extracted items

**Returns:** List



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

### evaluate(var)

**Category:** General

**Description:** Evaluates a string expression and returns the result

**Parameters:**
* `var` (String) - The string expression to evaluate

**Returns:** Any



---

### firstElement(items)

**Category:** General

**Description:** The first item of a list. For an extracted item, its content

**Parameters:**
* `items` (List) - The list

**Returns:** Any



---

### keys(obj)

**Category:** Introspection

**Description:** Returns the property names of an object

**Parameters:**
* `obj` (Var) - The object variable to iterate through

**Returns:** List



---

### lastElement(items)

**Category:** General

**Description:** The last item of a list. For an extracted item, its content

**Parameters:**
* `items` (List) - The list

**Returns:** Any



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

### methods(object)

**Category:** Introspection

**Description:** Returns the methods available for a given variable

**Parameters:**
* `object` (Variable) - The object to inspect

**Returns:** List



---

### properties(object)

**Category:** Introspection

**Description:** Returns an array of Strings that gives information about the properties on a variable

**Parameters:**
* `object` (Any) - The variable to test what the type is

**Returns:** List(String)



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

### replaceElements(items, value)

**Category:** General

**Description:** A list of the same length with every item replaced by a value

**Parameters:**
* `items` (List) - The list
* `value` (String) - The value to use

**Returns:** List



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

