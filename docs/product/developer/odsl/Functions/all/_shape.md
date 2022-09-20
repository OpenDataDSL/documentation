A curve function that shapes a monthly curve

#### Syntax
```js
Curve = shape(Curve)
```
#### Result

A curve that is shaped using the a normalised shape based on the first 12 months of the input curve. It then shapes the rest of the curve in blocks of 12 months retaining the correct average values.

#### Example
```js
ondate = CurveDate(Date("2020-10-30"), "REOMHENG")

curve = Curve(ondate)
curve.currency = "EUR"
curve.units = "MWH"
curve.add(Contract(ondate, "2020M11", 26.87))
curve.add(Contract(ondate, "2020M12", 26.85))
curve.add(Contract(ondate, "2021M01", 26.75))
curve.add(Contract(ondate, "2021M02", 26.65))
curve.add(Contract(ondate, "2021M03", 26.62))
curve.add(Contract(ondate, "2021M04", 26.55))
curve.add(Contract(ondate, "2021M05", 26.68))
curve.add(Contract(ondate, "2021M06", 26.89))
curve.add(Contract(ondate, "2021M07", 27.05))
curve.add(Contract(ondate, "2021M08", 27.15))
curve.add(Contract(ondate, "2021M09", 27.02))
curve.add(Contract(ondate, "2021M10", 26.85))
curve.add(Contract(ondate, "2021Q04", 26.92))
curve.add(Contract(ondate, "2022Y", 27.12))
curve.add(Contract(ondate, "2023Y", 27.20))

bootstrapped = bootstrapCurve(curve)
shaped = shape(bootstrapped)

for tenor in shaped.contracts
    print tenor.absolute + " : " + tenor.value
next
```
```
2020M11 : 26.870000
2020M12 : 26.850000
2021M01 : 26.750000
2021M02 : 26.650000
2021M03 : 26.620000
2021M04 : 26.550000
2021M05 : 26.680000
2021M06 : 26.890000
2021M07 : 27.050000
2021M08 : 27.150000
2021M09 : 27.020000
2021M10 : 26.850000
2021M11 : 26.955000
2021M12 : 26.955000
2022M01 : 27.025839
2022M02 : 26.924628
2022M03 : 26.894362
2022M04 : 26.823741
2022M05 : 26.954893
2022M06 : 27.167080
2022M07 : 27.328824
2022M08 : 27.429710
2022M09 : 27.298558
2022M10 : 27.126726
2022M11 : 27.232819
2022M12 : 27.232819
2023M01 : 27.105562
2023M02 : 27.004051
2023M03 : 26.973696
2023M04 : 26.902867
2023M05 : 27.034406
2023M06 : 27.247219
2023M07 : 27.409440
2023M08 : 27.510624
2023M09 : 27.379085
2023M10 : 27.206746
2023M11 : 27.313152
2023M12 : 27.313152
```
This is the bootstrapped curve:

![](/attachments/322994408/322994423.png)

And here is the shaped curve:

![](/attachments/322994408/323027157.png)

