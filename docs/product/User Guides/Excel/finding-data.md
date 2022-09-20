---
title: Finding Data
description: Finding data in the Excel Add-in
sidebar_position: 1
slug: /user/excel/finding-data
tags:
- excel
- data
- search
---
You have access to all public, and your own private data from the Excel Add-in, this document shows you how to find the data you need.

## Search terms
Search terms (the words you type) are used to find words within the **id**, **name** and **description** of an object.

## Combining search terms
The more words you type, the fewer items will be found as the search terms are combined so that all the words need to be present.

For example, searching for ```europe``` will find more items than searching for ```europe potato``` as it only finds objects with both the words europe and potato.

## Advanced searching using operators
You can utilise some operators in the search box to fine-tune the way that searching works.

### OR
Search for X or Y, this will return results related to X or Y or both using the pipe (|) operator.

**Example:** ```europe | potato```
Will search id, name and description for any of the words europe, potato

### NOT
Search for X -Y, this will return results related to X but not Y using the subtract (-) operator.

**Example:** ```europe -potato```
Will search id, name and description for objects with the word europe but not the word potato in it.

### Group
You can group multiple terms or search operators to control how the search is executed

**Example:** ```(europe | usa) potato```
Will search id, name and description for objects with the word europe or usa and the word potato in it.

### Tags
Search for words within tags using the # symbol

**Example:** ```#wheat```
Will search the tags collection for the word wheat

**Example:** ```#wheat europe```
Will search id, name and description for the word europe and the tags collection for the word wheat

### Specific fields
You can force the search engine to use a specific field to search for a term using the colon (:) operator.

**Example:** ```location:belgium```
Will search the location field for objects with the word belgium in it.
