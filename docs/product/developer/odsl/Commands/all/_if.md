Used to test a boolean condition and take appropriate actions

#### Syntax
You can use the if structure like the below:
```js
if condition
  (statement)* 
(elseif condition (statement)*)* 
(else (statement)* )?
end
```

Or you can use a single line assignment conditional expression using a ```?``` operator:

```
varname = condition ? true_expression : false_expression
```

#### Description

The if statement is a control statement - it controls the flow of the application based on the value of a boolean condition. An if statement can have an multiple elseif blocks which will be sequentially checked to see if there condition is true and an optional else block of statements that execute if the if or elseif condition does not match.

The single line assignment conditional expression can be used to test a condition and assign a value to a variable based on the trueness of the condition.
This can also be used in SMART data expressions, e.g.

```js
BASE.size() < 10 ? BASE : OTHER
```
#### Examples

A simple condition that checks the value of a variable
```js
if a==1
  print "a is 1"
end
```
A multiple condition if statement
```js
if a==1 and b>5
  a=b
end
```
An example of using an else block that will execute if a is something other than the value 1
```JS
if a==1
  a=a+1
else
  a=a-1
end
```
An example showing 2 if conditions (if and elseif) and a else block that will execute if either of the if conditions don’t match
```js
if a==1
  a=a+1
elseif a>5
  a=a+10
else
  a=a-1
end
```
An example showing how to use a single line variable assignment example:
```js
a = score>85 ? "Score is high" : "Score is low"
```
