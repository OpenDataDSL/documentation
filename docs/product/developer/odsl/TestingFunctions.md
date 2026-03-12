---
slug: /odsl/function/functions-testing
title: Testing Functions
sidebar_position: 20
---

This document provides a reference for all built-in testing functions available in OpenDataDSL.

### assertEquals(expected, value, message)

**Category:** Testing

**Description:** A test to check if 2 variables or values are equal

**Parameters:**
* `expected` (Any) - The value you want to test against
* `value` (Any) - The value to test
* `message` (String) - The message to display if this test fails

**Returns:** Void



---

### assertEquals(expected, value)

**Category:** Testing

**Description:** A test to check if 2 variables or values are equal

**Parameters:**
* `expected` (Any) - The value you want to test against
* `value` (Any) - The value to test

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

### assertFalse(value)

**Category:** Testing

**Description:** A test to check if an expression is false

**Parameters:**
* `value` (Boolean) - The value to test

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


