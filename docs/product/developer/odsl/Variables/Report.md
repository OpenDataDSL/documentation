---
slug: /odsl/variable/report
tags:
- report
---
Report
=====

A report is a configuration containing an expression that can be run to produce a user definable report.

## Introduction
A report is a flexible way of running some code to produce an output that can be shown in the Web Portal and the Excel Add-in or sent to a downstream system.

An example of a report is an aggregation of some data grouped by a specific field.

## Construction

To construct a new report configuration, you use the report function as shown in the syntax below:
```js
report = Report()
```

## Properties

A report has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|category|The category of this report, used for filtering|String|
|name|The name of the report|String|
|description|A description of the report|
|script|The name of the script used for this report|String|
|expression|The expression used to run this report|String|
|tags|A list of tags used to filter for this report|List of Strings|

Examples of report properties:
```js
rep = Report()
rep.name = "SKU Report"
rep.script = "testReportScript"
rep.expression = "SKUReport()"
rep.id = "REPORT.SKU"

save rep
```

## Methods

A report has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|build()|Run the expression to build the report|[report](#filled-out-report)|
|build(date)|Run the expression to build the report specifying a date to start from|[report](#filled-out-report)|
|build(date, date)|Run the expression to build the report specifying a date range|[report](#filled-out-report)|

The result of running any of the build commands is a *filled out* report.

## Filled out report

### Properties

A *filled out* report has the following properties additional to the report configuration properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|data|The variable created from running the report|Any|
|errorMessage|If the report fails to execute, this will be filled in with the error message|String|
|scriptVersion|The version of the script used to run this expression|Number|

## Examples

### Create a report

```js
rep = Report()
rep.name = "SKU Report"
rep.script = "testReportScript"
rep.expression = "SKUReport()"
rep.id = "REPORT.SKU"

save rep
```

### Get a report configuration and run it

```js
rep = ${reportconfig:"REPORT.SKU"}
test = rep.build("2023-02-01", "2023-02-28")
print test.data
```

### Run the report

```js
rep = ${report:"REPORT.SKU"}
print rep.data
```

### Run the report with a range

```js
rep = ${report:"REPORT.SKU", "_range=from(2023-02-01)"}
print rep.data
```

### Run and save a report

```js
save ${report:"REPORT.SKU"}
```

### Get a saved report

```js
rep = ${report:"REPORT.SKU/~LATEST"}
print rep.data
```

### Run and save a report with a range

```js
save ${report:"TEST", "_range=from(2023-02-01)"}
```

### Save a var as a report

```js
TEST = ["Hello","World"]
save ${report:REPORT.SKU}
print ${report:"REPORT.SKU/~LATEST"}
```