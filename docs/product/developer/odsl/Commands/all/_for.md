A control statement that loops through a range of numbers of a list of elements

#### Syntax

The for statement comes in 2 flavours:

##### Looping through a range of numbers
```js
for varname = expression TO expression (step number)?
  (statement)* 
next
```
The optional step operator is the number to iterate by which defaults to 1

##### Looping through a list of elements
```js
for varname in expression
  (statement)* 
next
```
#### Description

The for statement is used to iterate through numbers or elements and execute some code.

#### Examples

Iterating through a range of values
```js
// Print out the numbers 1 to 10
for i=1 to 10
  print i
next
```
Iterating through a range of values using a step value
```js
// Print the number 2, 4, 6, 8 and 10
for i=2 to 10 step 2
  print i
next
```
Iteration through values in an array
```js
for i in [1,7,2,10]
  print i ^ 2
next
```
Getting a list of available currencies and iterating through them printing our the currency pair
```js
currencies = find ${currency:public}
for fx in currencies
  print fx.currency + "/" + fx.base
next
```
