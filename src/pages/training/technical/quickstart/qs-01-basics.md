---
slug: /training/technical/qs-basics
title: "QuickStart: ODSL Code Basics"
sidebar_position: 10
tags: [training, technical, odsl, quickstart]
---

# QuickStart: ODSL Code Basics

This module introduces variables, looping, conditional statements, and testing in the ODSL language.

---

## Hello World

Every tutorial starts somewhere. In ODSL:

```js
//#region
print "Hello World"
//#endregion
```

This one-liner prints `Hello World` to the output console.

---

## Variables

ODSL is **untyped** — you do not need to declare a variable's type before using it. Assign a value and the type is inferred:

```js
//#region
name = "ODSL"
print "Hello " + name
//#endregion
```

### Scalar Variables

Scalars cover strings, numbers, and booleans:

```js
//#region
MyString = "OpenDataDSL"
MyNumber = 12.33
MyBoolean = true
print MyString
print MyNumber
print MyBoolean
//#endregion
```

### Objects

Objects are dynamic containers that can hold any number of named properties:

```js
//#region
MyObject = Object()
MyObject.value = 22
MyObject.description = "My Dynamic Object"
print MyObject
//#endregion
```

### Lists

Lists are arrays of variables:

```js
//#region
MyList = List()
MyList2 = ["this", "is", "my", "list", 1, 2, 3]
MyList2.add("test")
print MyList2
//#endregion
```

---

## Control Statements

### Looping

Loop through a numeric range:

```js
//#region
for i = 1 to 10
    print i
next
//#endregion
```

Iterate through a list:

```js
//#region
args = ["Hello", "World"]
for arg in args
    print arg
next
//#endregion
```

### Conditional Statements

Use `if`, `elseif`, and `else` to control execution flow:

```js
//#region
for i = 1 to 10
    if i > 5
        print i
    elseif i == 3
        print "Three"
    else
        print "Something else"
    end
next
//#endregion
```

:::note Equality Check
Use `==` to check for equality and `=` to assign a value. They are different operators.
:::

### While Loop

```js
//#region
x = 5
y = 10
while x < y
    x = x + 1
    print x
end
//#endregion
```

:::warning Infinite Loops
Always ensure the while condition will eventually become false. If `x` is never changed inside the loop, it will run forever.
:::

---

## Comments

```js
//#region
// This is a line comment

/*
    This is a multi-line comment.
    Useful for longer explanations.
*/

args = ["Hello", "World"] // Inline comment
for arg in args
    print arg
next
//#endregion
```

---

## Testing

ODSL has built-in assertion functions for repeatable testing:

```js
//#region
MyVariable = 23.22
assertEquals(23.22, MyVariable)
//#endregion
```

If the assertion fails, the script halts with an error message. The full set of assertion functions:

| Function | Description |
|----------|-------------|
| `assertEquals(expected, actual)` | Tests for equality |
| `assertTrue(condition)` | Tests a condition is true |
| `assertFalse(condition)` | Tests a condition is false |
| `assertType(var, "type")` | Tests a variable is a specific type |
| `assertNull(var)` | Tests a variable is null |
| `assertHasProperty(var, "name")` | Tests a variable has a non-null property |

:::note Next Step
In [QuickStart: Variable Types](/training/technical/qs-variables) you will explore all built-in variable types in depth.
:::
