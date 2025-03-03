---
slug: /odsl/insights/excel/create
title: Creating Excel Insights 🆕
description: General information about creating Excel Insight Reports
tags:
- excel
- insight
- report
- topics
- new
---

## Introduction

Excel Insights consist generally of:
* A selection screen
* A method to return data to Excel
* A method to return a query statement used to refresh the data in Excel without the selection screen

For simple selection and queries, this can be done using a pre-defined template function called **simpleReport()**

## Simple Report

The simple report function takes 1 parameter which is a JSON configuration object where you define what you want to show and how you want to show it.

### Configuration

The following table shows the top-level properties in the configuration object:

| Property | Type | Example | Description |
|-|-|-|-|
|service|String|calendar|The name of the service to get the data from|
|source|String|private|The source of the data|
|limit|Integer|100|A limit to the number of records returned to Excel|
|projection|Object|{type:1,name:1}|A list of the field names to return to Excel|
|inputs|Array(Input)|See Inputs below|A list of optional inputs to all the user to select from|
|dataCallback|Function|getData|An optional callback function that allows you to override the requesting and formatting of the data sent back to Excel|
|rangeSelector|Object|See rangeSelector below|An optional range selector configuration to allow the user to select a range of dates|
|ondateSelector|Object|See ondateSelector below|An optional ondate selector configations to allow the user to select an ondate|
|fieldSelector|Object|See fieldSelector below|An optional selector to select which fields to return into Excel|

### Inputs Configuration

| Property | Type | Example | Description |
|-|-|-|-|
|type|String|select|The type of input, can be one of (select,text,date,datetime,integer,check)|
|name|String|Tenor Type|The label to use for the input|
|help|String|'Select something'|Help text to display to the user|
|field|String|_id|The name of the field that will be used in the filter|

For **select** type fields, there are also the following properties:

| Property | Type | Example | Description |
|-|-|-|-|
|data|Array(String)|['test1','test2']|An optional list of items to display in the drop-down list. If not used, the system will get a distinct list of items using the field name|
|service|String|calendar|The service to use to get the items for the drop-down list, defaults to the top-level service|
|source|String|private|The source to use for the items in the drop-down list, defaults to the top-level source|
|filter|Object|{category='test'}|An optional filter to use to get the items for the drop-down list|
|multiple|Boolean|true|If true, allows multiple selections to be made|
|selectAll|Boolean|true|If this is a multiple selector, this adds an optional 'Select All' option|

### rangeSelector Configuration

| Property | Type | Example | Description |
|-|-|-|-|
|includeTime|Boolean|false|Allow the user to select times as well as dates|
|timestampField|String|timestamp|The name of the field containing the dates to filter on, defaults to timestamp|
|ranges|Array(String)|['thisyear','nextyear']|Optional list of preset ranges to provide to the user|
|defaultRange|String|thisyear|The default range to select from the list|

#### Selectable ranges

The following table lists the range names that can be used in the **ranges** array:

|name|description|
|-|-|
|yesterday|1 calendar day back from today|
|today|Today|
|lastmonth|The full previous calendar month|
|thismonth|The full current calendar month|
|nextmonth|The full next calendar month|
|lastyear|The full previous calendar year|
|thisyear|The full current calendar year|
|nextyear|The full next calendar year|
|last*n*|The last n calendar days, e.g. last7|
|next*n*|The next n calendar dayes, e.g. next7|


### ondateSelector Configuration

| Property | Type | Example | Description |
|-|-|-|-|
|default|String|T|The default ondate to select, otherwise it is T-1|
|field|String|ondate|The name of the field containing the ondate, defaults to ondate|
|appendToPath|Boolean|true|If true, the selected ondate is appended to the URL|
|appendToFilter|Boolean|true|If true, the selected ondate is added to the filter query parameter|
|assQueryParam|Boolean|true|If true, the selected ondate is added as a query parameter|

### fieldSelector Configuration

| Property | Type | Example | Description |
|-|-|-|-|
|fields|Object|{"type":1,"name":1}|A complete list of fields for the user to select|

### Examples

Here is an example showing getting a list of alert records for a time range.

:::info
The following can be created as a mustache file and uploaded to the platform in VS Code using the ODSL Extension.
:::

```js
{{> #insight-excel }}

<script>
simpleReport({
	rangeSelector: {
		includeTime : true,
		timestampField: 'timestamp'
	},
	service: 'alertrecord',
	source: 'all',
	limit: -1,
	projection: {"type":1,"name":1,"impact":1,"status":1,"ondate":1,"origin":1,"timestamp":1,"message":1},
	inputs:[
		{
			type: 'select',
			name: 'Type',
			help: 'Select the type of alert to retrieve',
			field: 'type',
			data: ['MetricAlert','DatasetAlert','SystemAlert','ServiceAlert']
		}
	]

});
</script>
```

## Creating the report
Once you have uploaded your configuration to the server, you need to create the report that references your mustache file.
Here is an example of creating a report for the alert record list mustache file.

```js
ir = InsightReport()
ir.id = "EXCEL_ALERT_RECORDSDR"
ir.name = "Alert Records"
ir.description = "Gets all the alert records for the selected date range"

ir.category = "Excel Insights" // This tells Excel to add it to the list of Insights
ir.subCategory = "Alert" // Adds the report to the Alert insight category in Excel
ir.template = "insight-excel-alert-recordsdr" // The name of the mustache file
ir.icon = "exclamation-square" // The icon to use from https://icons.getbootstrap.com/
ir.hideList = true // Don't show this report in the portal report list
ir.hideExcel = true // Don't show this report in the reports menu in Excel
save ir
```

## Making the report refreshable
If you want to allow the user to refresh the report directly in Excel, you need to do the following:

* Add a **getExcelQuery()** function to return query parameters to pass to an ODSL function
* Create an ODSL function to return the data exactly as the insight does
* Add the name of the script and expression to the report configuration

### Excel query function

You need to provide a function with your insight configuration which returns query parameters which are passed to your ODSL function.

We can add the following to our mustache file to make the alert record example refreshable:

:::note
You need to wrap the entire query parameters in an encodeURIComponent() function.

You also need to pass the projection list to the function which will output the same list of fields in the corerct order.
:::

```js
function getExcelQuery() {
	return encodeURIComponent('range=' + rangeSelector.selectedRange() + "&projection=" + JSON.stringify(this.config.projection));
}
```

### Refresh function

Yuo need to create a function that takes the query parameters passed from Excel and returns the expected data.

Using the example above, we can create the following function - note it only supports yesterday and today date range.

```js
function alertRecordDR()
	r = #REPORT.range
	d1 = ${date:"today"}
	d2 = d1.plus(23h59m59s)
	if r == "yesterday"
		d1 = ${date:"yesterday"}
		d2 = d1.plus(23h59m59s)
	end
	print d1
	print d2
	alertRecordDR = find ${alertrecord:"all"} where type=#REPORT.type and timestamp >= d1 and timestamp <= d2
end
```

:::note
You don't need to worry about the fields returned and their order as this is handled by the projection query parameter sent with the query
:::



### Report configuration

You need to configure the report with the name of the script used and the expression to run.

For our example above, it would look like this:

```js
ir = InsightReport()
ir.id = "EXCEL_ALERT_RECORDSDR"
ir.name = "Alert Records"
ir.description = "Gets all the alert records for the selected date range"

ir.category = "Excel Insights" // This tells Excel to add it to the list of Insights
ir.subCategory = "Alert" // Adds the report to the Alert insight category in Excel
ir.template = "insight-excel-alert-recordsdr" // The name of the mustache file
ir.icon = "exclamation-square" // The icon to use from https://icons.getbootstrap.com/
ir.hideList = true // Don't show this report in the portal report list
ir.hideExcel = true // Don't show this report in the reports menu in Excel
ir.script = "insight-excel-functions" // The script containing the refresh function
ir.expression = "alertRecordDR()" // The refresh function
save ir
```