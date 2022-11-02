---
slug: /odsl/function/substring
---
Returns a string that is a substring of another string. The substring begins with the character at the specified index (counting from 0) and extends to the character at the end index -1. If the end index is entered as -1, the substring ends as the last character in the input string.

#### Syntax
```js
string = substring(str, beginIndex, endIndex)
```
#### Example
```js
print substring("The end is nigh", 4, 7)
```
```
end
```js
print substring("The end is nigh", 8, -1)
```
```
is nigh
```
