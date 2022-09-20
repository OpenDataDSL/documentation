Imports functions from a script into the current script

#### Syntax
```js
import ${script:"name"}
```
#### Description

The import command gets the named script from the script service and makes all the user defined functions in that script available in your current script.

#### Example

If we have a script with a function, e.g. this functions.odsl script saved in the server:
```js
// functions.odsl
function agricultural(input)
    // Agricultural curve forward filled and extended to end of 3 years
    filled = forwardFillCurve(input)
    extended = extendCurve(filled, 3)
    agricultural = shape(extended)
end
```
We can import that script and call the agricultural function, e.g.
```js
// Import the functions we defined in functions.odsl
import ${script:"functions"}

inputcurve = ${data:"inputcurve"}
curve = agricultural(inputcurve)
```
