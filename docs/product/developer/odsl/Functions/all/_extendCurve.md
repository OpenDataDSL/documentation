Extends a curve by a required number of years by using the value of the last maturity

#### Syntax
```js
extended = extendCurve(curve, years)
```
The years parameter represents the number of years to extend the curve by. For example, if a curve ends in May 2022 and you specify 2 for years, the curve will be extends to December 2024.

#### Example
```js
function agricultural(input)
    // Agricultural curve forward filled and extended to end of 3 years
    filled = forwardFillCurve(input)
    extended = extendCurve(filled, 3)
    agricultural = shape(extended)
end
```
