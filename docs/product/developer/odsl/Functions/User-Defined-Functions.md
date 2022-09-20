---
slug: /odsl/function/udf
tags:
  - function
  - udf
---
User Defined Functions
======================

Create your own functions in OpenDataDSL

## Introduction

You can create your own user defined functions and use them in your code, you can also create a library of functions in a script and import that script into other scripts to use those functions.

### Syntax

The syntax for creating a function is the following:

```
FUNCTION name ( (id (, id)*)? ) 
  ( statement )*
END
```

*   A function has to have a valid name    
*   A function can have 0 or more input parameters
*   A function can return a variable - simply set the variable to the name of the function
*   A function can call other functions, both user defined and built-in functions
*   If there is a comment as the first line of the function, then this becomes the description of the function which is shown when hovering over a call to the function
  

### Examples

A function to generate a random number between 1 and 100

```js
function random100()
    random100 = toInt(random()*100 + 1)
end
```

A function that bootstraps and shapes an input curve

```js
function bootstrapAndShape(input)
    // Create an arbitrage free monthly curve from the input curve and use simple shaping
    boot = bootstrapCurve(input)
    bootstrapAndShape = shape(boot)
end
```
