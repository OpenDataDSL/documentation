Create your own user definable function (UDF)

#### Syntax
```js
function name ( ((byref)? param (, (byref)? param)*)? )
  (comment)?
  (statement)*
end
```
#### Description

The function command allows you to create a custom function which can be used in your OpenDataDSL scripts - either in the same script or you can write functions in a script which can then be [imported](Import) into a script.

The function is called using the name of the function and the parameters passed in the same order as declared.

To return a value from a function, you need to create a variable in the function as the same name as the function.

##### Documentation
Any comments that are added above the function becomes the function description visible when hovering over the function when it is called.

Multi-line comments can also include '@ variables' which can describe parameters and information about the script itself:
* **@category** - when placed in a comment block at the top of the script, this is used as the category for the file which is used in the GUI to provide categorised lists of scripts.
* **@param** - this is used to provide a description of a function parameter

##### Parameter modifiers
By default, parameters are passed 'by value', which means that changing those values in the function does not change the variable that was passed in.
Adding the **byref** parameter modifier means that the value is passed 'by reference' so the actual variable itself is passed into the function.

Example of script comment:
```java
/**
 * @category report
 * Functions for creating reports
 */
```

Example of function comment:
```java
/**
 * Bootstrap an input curve
 * to create a monthly arbitrage-free curve
 * @param input The input curve
 */
```

#### Examples

An example that creates a bootstrapped and shaped curve

```js
/**
 * Create an arbitrage free monthly curve from the input curve and use simple shaping
 * @param input The input curve
 */
function bootstrapAndShape(input)
    boot = bootstrapCurve(input)
    bootstrapAndShape = shape(boot)
end
```
