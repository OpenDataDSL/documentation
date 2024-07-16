---
slug: /odsl/function/asStrips
tags:
- function
- curve
- contract
- contracts
---
Creates an arbitrage free curve comprised of calendar year strips

#### Syntax
```js
c = asStrings(curve)
```
#### Result

A curve containing only calendar year contracts.

#### Example
```js
c = asStrips(curve)
print c
```

