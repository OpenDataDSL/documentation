---
slug: /odsl/function/combine
---
Combines 2 curves into 1 - uses the date and expiry calendar from the base 

#### Syntax
```js
curve = combine(base, other, replace)
```

**Replace**:
* true - matching tenors from the base are overwritten
* false - only new tenors in other are added to the base

#### Example
```js
print combine(BASE, OTHER, true)
```
