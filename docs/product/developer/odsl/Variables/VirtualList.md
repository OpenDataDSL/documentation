---
slug: /odsl/variable/virtuallist
tags:
  - list
---
VirtualList
===========================

A VirtualList is a list that is paged to improve performance and is used with the find command when listing resources from services

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|description|The description of this list|String|
|name|The name of this list|String|
|size|The size of this list|Any|

## Methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addAll(elements)|Adds a list to this list returning a new combined list|List|
|remove(index)|Removes an element from the list at the specified position (0 being first)|Void|
|remove(item)|Removes an element from the list|Void|
|set(index, element)|Replaces the element at the specified position in this list with the specified element|Void|
|subList(start, end)|Gets a list from a sublist of this list|List|

