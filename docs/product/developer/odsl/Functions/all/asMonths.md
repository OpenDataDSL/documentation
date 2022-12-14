---
slug: /odsl/function/asMonths
tags:
- function
- curve
- contract
- contracts
---
A [curve](/docs/odsl/variable/curve) function that breaks a single [contract](/docs/odsl/variable/contract) into a list of monthly [contracts](/docs/odsl/variable/contracts), e.g. a quarter into 3 months

#### Syntax
```js
Contracts = asMonths(Contract)
```
#### Result

A Contracts object

#### Example
```js
c = Contract(ondate, "2021Q01", 26.85)
contracts = asMonths(c)
for tenor in contracts
    print tenor.absolute + " : " + tenor.value
next
```
```
2021M01 : 26.85
2021M02 : 26.85
2021M03 : 26.85
```

