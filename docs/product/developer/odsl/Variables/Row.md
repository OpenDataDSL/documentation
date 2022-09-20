---
slug: /odsl/variable/row
tags:
  - row
---
Row
===================

A row represents a single row of data usually associated with a row in a relational database table. A row is similar to an object in that it has dynamic properties except that you can only add Scalars or Dates as elements to a row

## Construction

You use a constructor to create an empty row:
```js
// Create an empty row
row = Row()
```

## Properties

As with an object, you can dynamically add properties, but only of type Scalar or Date, e.g.
```js
// Create an empty row
row = Row()
row.key = "1234-name"
row.name = "Name"
```
If you need to add a property to a row which is a reserved name like id, you can use the addColumn method e.g.
```js
// Create an empty row
row = Row()
row.addColumn("id", 1234)
```

## Methods

The following methods are available for a row:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addColumn(name, value)|Adds a column to a row with the supplied name and value|void|

