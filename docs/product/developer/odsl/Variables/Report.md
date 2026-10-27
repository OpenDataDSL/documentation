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

### Constructor functions

|**Function**|**Description**|
|-|-|
|Composition()|Creates a new composition configuration|
|DynamicReport()|Creates a new dynamic report configuration|
|FixedReport()|Creates a new Fixed report configuration|
|InsightReport()|Creates a new insight report configuration|
|Report()|Creates a new report configuration|
|WidgetReport()|Creates a new widget report configuration|

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
|cacheOptions|Set the SMART caching options for this report|SmartReportCachingOptions|
|cron|The cron expression to trigger this report, you must also set the enabled flag to true|String|
|currency|The optional currency of this report, can be used in the function using #REPORT.currency|String|
|defaultRange|The optional default range for this report|String|
|enabled|The enabled flag is used in conjunction with the cron expression to turn on/off the schedule triggered running of this report|Boolean|
|end|The end date used to generate this report|Date|
|hideExcel|Hides this report from the Excel Add-in|Boolean|
|hideList|Hides this report from the Reports list|Boolean|
|mergeKeys|Fixed reports only: the field names used to match array elements when merging updates, the first one present in an element is used|List|
|mergeUpdates|Fixed reports only: when true, updating the report for an ondate merges the supplied data into the existing report instead of creating a new version|Boolean|
|ondate|The report publish date|Date|
|report|The id of the report|String|
|reportType|The type of this report, one of Default, Fixed, Dynamic, Insight or Widget|String|
|start|The start date used to generate this report|Date|
|subCategory|The user defined sub category for this report|String|
|template|The mustache template used when outputting this report|String|
|timezone|The optional timezone of this report, can be used in the function using #REPORT.timezone|String|
|units|The optional units of this report, can be used in the function using #REPORT.units|String|

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
|withAggregationOnDateGenerator(service, source, aggregation)|Use an aggregation pipeline to generate the dates for this report|ODGAggregation|
|withCalendarOnDateGenerator(calendar, start)|Use a calendar to generate the dates for this report|ODGCalendar|
|withCurveOnDateGenerator(id)|Use the dates of a curve to generate the dates for this report|ODGCurve|
|withDistinctOnDateGenerator(service, source, field)|Use a distinct find query to generate the dates for this report|ODGDistinct|
|withDistinctOnDateGenerator(service, source, field, filter)|Use a distinct find query to generate the dates for this report|ODGDistinct|
|withFilterOnDateGenerator(service, source, filter, projection)|Use a filter to generate the dates for this report|ODGFilter|
|withMatrixOnDateGenerator(id)|Use the dates of a matrix to generate the dates for this report|ODGMatrix|

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

### Get a specific saved report

```js
rep = ${report:"REPORT.SKU:2026-09-30"}
print rep.data
```

### Get the latest saved report

```js
rep = ${report:"REPORT.SKU:L"}
print rep.data
```

### Run and save a report with a range

```js
save ${report:"TEST", "_range=from(2023-02-01)"}
```

### Save a var as a report

```js
TEST = ["Hello","World"]
save ${report:TEST}
print ${report:"TEST:L"}
```