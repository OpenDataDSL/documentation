---
sidebar_position: 6
slug: /odsl/command/expressions
---
Expressions
===========================

Expressions usage within the OpenDataDSL language

## Syntax

Expressions can take various forms, so here is a list of the syntax for expressions:
```js
// A simple variable (either existence or true)
variable

// Not variable (either non-existence or false)
not variable

// Use of braces for explicit precedence
( expression )

// Array operators
[ expression (, expression)* ]

// Mathematical Operators
expression * expression
expression / expression
expression + expression
expression - expression
expression ^ expression

// Logical Operators
expression == expression
expression = expression
expression != expression
expression < expression
expression <= expression
expression > expression
expression >= expression

// Geospatial and Special
expression like expression
expression intersects expression
expression within expression
```

## Use within the language

Expressions are used in various places within the ODSL language as shown in the following table:

|**Command**|**Description**|
|-|-|
|Assignment|When assigning a value to a variable|
|Printing|When printing a message to the terminal|
|Logging|When logging a message|
|Return|When returning a value from a script|
|Fail and Abort|Creating a message when instructing a workflow to fail or abort|
|Type declaration|Adding an expression as a property on a type|
|Extractor|Used as a selector, check, click etc. in an extractor|
|For|Used in defining a for statement|
|Active variable|Used as a name and options for an active variable|
|Method and function calls|Used as a parameter in method and function calls|


## Examples

### Assignment example
```js
result = a + 1
```

### Printing example
```js
print “Hello “ + name
```

### Logging example
```js
log info “Value is “ + value
```

### Return example
```js
return a + 1
```

### Fail example
```js
fail “Value is “ + value
```

### Type declaration example
```js
name as first + “ “ + last
```

### For example
```js
for i=a+10 to a+20
next

for i in [1,2,3]
next
```

### Methods and function calls
```js
l.addAll([1,2,3])
```
