The variable function is used to work with dynamic variable names

#### Syntax
```js
Var = variable(String)
```
#### Result

The variable that is named as the input string

#### Example
```js
name="This is it"
variable(clean(name)) = TimeSeries("DAILY")
variable(clean(name)).category = "TEST"
variable(clean(name)).add("2021-05-27", 12.2)
print variable(clean(name)).get("2021-05-27").value
```
```
12.2
```
