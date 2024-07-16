---
slug: /odsl/function/asHours
tags:
- function
- curve
- contract
- contracts
---
A [curve](/docs/odsl/variable/curve) function that breaks a single [contract](/docs/odsl/variable/contract) into a list of hours [contracts](/docs/odsl/variable/contracts), e.g. a day into hours

#### Syntax
```js
Contracts = asHours(Contract)
Contracts = asHours(Contract, Timezone)
```
#### Result

A Contracts object, if a timezone is specified, all the hours will be in the specified timezone.

#### Example
```js
function hourly(input, timezone)
    hourly = Curve(input.ondate)
    hourly.timezone = timezone
    for pc in input.contracts
        hourly.add(asHours(pc, timezone))
    next
end
```

