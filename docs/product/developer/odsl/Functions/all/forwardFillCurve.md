---
slug: /odsl/function/forwardFillCurve
---
Fills any gaps in a curve by using the value from a previous maturity

#### Syntax
```js
filled = forwardFillCurve(curve)
```
#### Result

The function checks for any gaps in the maturities of a curve and forward fills using the value of the maturity immediately before it.

#### Example
```js
ondate = CurveDate(Date("2020-10-30"), "REOMHENG")

curve = Curve(ondate)
curve.add(Contract(ondate, "2020M11", 26.87))
curve.add(Contract(ondate, "2020M12", 26.85))
curve.add(Contract(ondate, "2021M01", 26.75))
curve.add(Contract(ondate, "2021M03", 26.62))
curve.add(Contract(ondate, "2021M04", 26.55))

filled = forwardFillCurve(curve)

for tenor in filled.contracts
    other = curve\[tenor.tenor\]
    if other
        print tenor.tenor + " = " + tenor.value + " was " + other.value
    else
        print tenor.tenor + " = " + tenor.value
    end
next
```
This produces the following output:
```
M00 = 26.870000 was 26.870000
M01 = 26.870000 was 26.850000
M02 = 26.750000 was 26.750000
M03 = 26.750000
M04 = 26.620000 was 26.620000
M05 = 26.550000 was 26.550000
```
