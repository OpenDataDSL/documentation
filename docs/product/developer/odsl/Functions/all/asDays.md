---
slug: /odsl/function/asDays
tags:
- function
- curve
- contract
- contracts
---
A [curve](/docs/odsl/variable/curve) function that breaks a single [contract](/docs/odsl/variable/contract) into a list of daily [contracts](/docs/odsl/variable/contracts), e.g. a month into days

#### Syntax
```js
Contracts = asDays(Contract)
```
#### Result

A Contracts object

#### Example
```js
c = Contract(ondate, "2021M01", 26.85)
contracts = asDays(c)
for tenor in contracts
    print tenor.absolute + " : " + tenor.value
next
```

