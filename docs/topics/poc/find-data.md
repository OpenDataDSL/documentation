---
slug: /poc/find-data
title: Find some data
description: Various different ways to find data in the platform
sidebar_position: 3
tags:
- poc
- search
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Filtering data
Filtering is the process of narrowing down the list of results using conditions.

You can filter data using master data properties, e.g. **source = "ECB"**

### Example - finding data from ECB

<Tabs groupId="platform">
<TabItem value="odsl" label="ODSL Code" default>

```js
// Print the results to the console
find ${object} where source = "ECB"

// Assign the results to a variable
objects = find ${object} where source = "ECB"
```

</TabItem>
<TabItem value="portal" label="Portal" default>

* Go to Master Data
* Select **public** from the sources dropdown
* Click the add filter button and select source
* Click in the source box and select ECB

</TabItem>
<TabItem value="excel" label="Excel" default>

* In Master Data, click download
* Select **public** from the sources dropdown
* Click the add filter button and select source
* Click in the source box and select ECB

</TabItem>
</Tabs>

## Searching for data
Search terms (the words you type) are used to find words within the id, name and description of an object.

The more words you type, the fewer items will be found as the search terms are combined so that all the words need to be present.

For example, searching for ```europe``` will find more items than searching for ```europe power``` as it only finds objects with both the words europe and power.

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
You can force the search engine to use a specific field to search for a term using the equal (=) operator or double-equal (==) operator to search for an exact term.

**Example:** ```location=belgium```
Will search the location field for objects with the word belgium in it.

**Example:** ```location==Belgium```
Will find objects that have the exact word Belgium in the location field.

## Further reading
* [Searching](/docs/tutorials/searching)
* [Find command](/docs/odsl/command/find)
