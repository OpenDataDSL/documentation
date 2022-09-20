Removes all the characters according to the regex parameter from the passed in string

#### Syntax
```js
string = remove(string, regex)
```
#### Example
```js
print remove("The end is nigh", "e")
```
```
Th nd is nigh
```js
print remove("The end is nigh", "\[ei\]")
```
```
Th nd s ngh
```
