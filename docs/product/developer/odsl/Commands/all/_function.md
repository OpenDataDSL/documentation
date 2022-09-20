Create your own custom functions

#### Syntax
```js
function name ( (param (, param)*)? )
  (comment)?
  (statement)*
end
```
#### Description

The function command allows you to create a custom function which can be used in your OpenDataDSL scripts - either in the same script or you can write functions in a script which can then be [imported](Import) into a script.

The function is called using the name of the function and the parameters passed in the same order as declared.

To return a value from a function, you need to create a variable in the function as the same name as the function.

Any variables created in the function are only available in the body scope of the function, i.e. they will not be accessible outside of the function.

If you add a comment as the first line of the function body, this becomes the function description visible when hovering over the function when it is called.

#### Examples

An example that creates a flat curve

```js
function flatCurve(ondate, months, value)
    // Create a flat curve with the supplied value for the supplied number of months
    flatCurve = Curve(ondate)
    m = Contract(ondate, "M01", value)
    flatCurve.add(m)
    for i = 2 to months
        m = m.next()
        flatCurve.add(m)
    next
end
```
