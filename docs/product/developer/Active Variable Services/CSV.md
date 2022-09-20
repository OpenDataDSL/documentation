---
slug: /odsl/service/csv
tags:
  - service
  - csv
---
CSV
====

A service to read CSV files as a [list](/docs/odsl/variable/list) of [row](/docs/odsl/variable/row) variables or as a [table](/docs/odsl/variable/table) variable

This service is used to convert CSV files into variables to be used within an OpenDataDSL script.

## Syntax

The standard active variable syntax is followed with the **id** part being the URL of the CSV file, e.g.
```js
csvdata = ${csv:"https://domain/example.csv", options}
```

## Options

The following options affect the way that the CSV data is processed into the variable:

|**Option**|**Description**|**Example**|
|-|-|-|
|separator|The character or regex which is used to separate the columns in the CSV file. The default separator is a comma|separator= +|
|headerpos|The line which contains the header information where the column names are extracted from. The default is 1, if there are no headers, use 0|headerpos=0|
|datapos|The number of lines to skip from the header position to where the data starts. The default is 0|datapos=1|
|output|The output variable type, if it is set as **table** then the variable is of type [table](/docs/odsl/variable/table), anything else it is a list of [row](/docs/odsl/variable/row) variables|output=table|

## Example

The following example extracts a csv file from UCI Machine Learning Repository for [balloons](https://archive.ics.uci.edu/ml/datasets/Balloons)
```js
// Grab one of the UCI data sets for Balloons
// https://archive.ics.uci.edu/ml/datasets/Balloons

csvdata = ${csv:"https://archive.ics.uci.edu/ml/machine-learning-databases/balloons/adult+stretch.data","headerpos=0"}
print csvdata.size
for row in csvdata
    print row
next


// Get the data as a table
csvdata = ${csv:"https://archive.ics.uci.edu/ml/machine-learning-databases/balloons/adult+stretch.data","headerpos=0", "output=table"}
print csvdata.rows.size
for row in csvdata.rows
    print row
next
```
