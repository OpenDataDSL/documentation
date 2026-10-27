---
slug: /odsl/variable/list
tags:
  - list
---
List
====================

A list represents a list of other variables

## Constructor

To create a list, you can use a constructor or use square brackets to enclose a list of variables.
```js
// Create an empty list
l1 = List()

// Also construct an empty list
l1 = []

// Create a list of variables
l2 = ["Hello", 1, l1]
```

:::info
Notice how you can also add a list as an element of a list, in fact you can add any other variable as an element of a list.
:::

## Properties

A list has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|size|Returns the number of elements in the list|Scalar(Integer)|
|description|The description of this list|String|
|name|The name of this list|String|

## Methods

A list has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|add(element)|Add a variable to the list of elements|The current list|
|add(position, element)|Adds a variable to the list in the supplied position (0 being first)|The current list|
|addAll(list)|Adds all the elements from the supplied list into this list|The current list|
|subList(start, end)|Gets a sublist from the elements in the list from the start to the end|New List|
|remove(index)|Removes an element from the list at the specified position (0 being first)|Void|
|remove(item)|Removes an element from the list|Void|
|set(index, element)|Replaces the element at the specified position in this list with the specified element|Void|

## Using Lists

You can directly access an element in a list using the square brackets and an index starting at 0, e.g. the following code would print out World
```js
// Create a list of variables
l3 = ["Hello", "World"]
print l3[1]
```
You can also replace elements in the list using the same technique, e.g.
```js
// Replace World with ODSL
l3[1] = "ODSL"
print l3[1]
```
You can also iterate through the elements of the list using a for loop, e.g.
```js
// Iterate through the list
for element in l3
    print element
next
```
