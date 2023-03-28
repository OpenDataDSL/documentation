---
slug: /odsl/variable/matrix
tags:
- matrix
---
Matrix
====================

A matrix represents a 2-dimensional array of numeric values - each row and column is labelled by default as R1, C1 etc. but these can be whatever you like.

## Constructor

To create a matrix, you can use the following constructor.
```js
// Create a matrix with 4 rows and 5 columns
m1 = Matrix(4, 5)

// Create a matrix with 3 rows and 3 columns with the labels A, B and C
m2 = Matrix(["A","B","C"])
```

## Properties

A matrix has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the matrix|String|
|description|A description of the matrix|String|
|ondate|The date this matrix represents|Date|
|xLabels|The list of x or column labels|String Array|
|yLabels|The list of y or row labels|String Array|
|xSize|The number of columns|Integer|
|ySize|The number of rows|Integer|
|currency|The currency of the values in this matrix|String|
|units|The units of the values in this matrix|String|
|timezone|The timezone for the values in this matrix|String|
|precision|The data value [precision](/docs/kb/precision#data-precision-settings) configuration|String|

## Methods

A matrix has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|setLabels(String Array)|Sets the labels for the rows and columns of a symmetrical matrix|The current matrix|
|setXLabels(String Array)|Sets the labels for the columns of this matrix|The current matrix|
|setYLabels(String Array)|Sets the labels for the rows of this matrix|The current matrix|
|setColumnData(column, list)|Sets the values for the specified column name or index|The current matrix|
|setRowData(row, list)|Sets the values for the specified row name or index|The current matrix|
|setValue(column, row, value)|Sets the value for the specified column and row index|The current matrix|
|setValueAt(column, row, value)|Sets the value for the specified column and row label|The current matrix|
|getValue(column, row)|Gets the value for the specified column and row index|Double value|
|getColumnForLabel(column)|Gets the column index for a specified column label|Integer|
|getRowForLabel(row)|Gets the row index for a specified row label|Integer|
|isSameDimensions(matrix)|Tests to see if the passed in matrix is the same dimensions as this matrix|Boolean|
|transpose()|Returns a 90 degree transposed version of this matrix|Matrix|

## Using Matrices

### Create a matrix and set some values
```js
m2 = Matrix(["A","B","C","D","E"])
m2.setValueAt("A","A",12.2)
m2.setValue(0,1,12.5)
print m2
```

### An example of some matrix operations
```js
set precision 1

m1 = Matrix(["A","B","C"])
m1.setRowData("A", [1,2,3])
m1.setRowData("B", [4,5,6])
m1.setRowData("C", [7,8,9])
print m1

m2 = Matrix(["A","B","C"])
m2.setColumnData("A", [1,2,3])
m2.setColumnData("B", [4,5,6])
m2.setColumnData("C", [7,8,9])
print m2

print m1 + m2
print m1 * 2
print 1/m1
print m1 ^ 2

m3 = Matrix(2, 3)
m3.setColumnData("C1", [1,2,3])
m3.setColumnData("C2", [4,5,6])

print m3
print m3.transpose()
```

## Further Reading
* [Matrix Functions](/docs/odsl/function/matrix)