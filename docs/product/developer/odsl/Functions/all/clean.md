---
slug: /odsl/function/clean
---
Creates a valid variable name from the input string - spaces converted to underscores and invalid characters removed.

#### Syntax

string = clean(varname)
The following characters are removed from the input string:
`(){}!/"£$%^&*\[]`

#### Example
```js
vn = clean("name full of [chars like this[] and that()!")
print vn
```
```
NAME_FULL_OF_CHARS_LIKE_THIS_AND_THAT
```
