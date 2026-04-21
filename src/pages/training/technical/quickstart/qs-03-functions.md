---
slug: /training/technical/qs-functions
title: "QuickStart: Functions"
sidebar_position: 12
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Functions

A tour of the built-in function library and how to write your own functions.

---

## Built-in Functions

### String Functions

```js
//#region
s1 = "My String"

print length(s1)        // >> 9
print lower(s1)         // >> my string
print upper(s1)         // >> MY STRING
print clean(s1)         // >> MY_STRING
print replace(s1, "My", "Your")  // >> Your String
print remove(s1, " ")   // >> MyString
print startsWith(s1, "M")        // >> true
//#endregion
```

### Date Functions

```js
//#region
// Parse a date using a specific format
print parse("22/10/2021", "dd/MM/yyyy")
// >> 2021-10-22

// Format a date as a string
d1 = Date("22/10/2021 06:00", "dd/MM/yyyy HH:mm")
print format(d1, "yyyy-MM-dd'T'HH:mm:ss")
//#endregion
```

### List Functions

```js
//#region
l1 = [4, 8, 19]
print min(l1)       // >> 4
print max(l1)       // >> 19
print mean(l1)      // >> 10.333333
print geomean(l1)   // >> 9.471647
//#endregion
```

### Statistical Functions

Statistical functions analyse a list or TimeSeries. The `simpleRegression` function fits a linear model and can predict future values:

```js
//#region
input = TimeSeries("DAILY")
input.add("2020-11-01", 12.5)
input.add("2020-11-02", 12.8)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)

reg = simpleRegression(input)

print reg.slope
print reg.intercept
print reg.RSquare

// Predict the next value
print reg.predict(Date("2020-11-06"))
//#endregion
```

### Curve Functions

Curve functions are used for building and analysing forward curves. Key examples include:

| Function | Description |
|----------|-------------|
| `bootstrapCurve` | Creates an arbitrage-free monthly curve from a multi-granularity curve |
| `extendCurve` | Extrapolates a curve by a number of years |
| `shape` | Shapes the latter portion of a curve using the shape of the first 12 periods |

---

## Custom Functions

You can write your own functions and return a value by assigning it to a variable with the same name as the function:

```js
//#region
function random100()
    random100 = toInt(random() * 100 + 1)
end

print random100()
//#endregion
```

:::tip Function Libraries
You can store a library of functions in a script, upload it to the platform, and import it into other scripts using the `${script:...}` active variable.
:::

:::note Next Step
In [QuickStart: Services](/training/technical/qs-services) you will learn how to connect to the OpenDataDSL remote services.
:::
