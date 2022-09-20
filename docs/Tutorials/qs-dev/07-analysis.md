---
title: Analysis
sidebar_position: 8
slug: /tutorials/qs/developer/analysis
tags:
  - quickstart
  - odsl
  - developer
  - analysis
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module shows you how to utilise aggregation pipelines and statistical functions to analyse your data." />

## Aggregation
Aggregation is the process of summarising portions of data to allow you to get an overview of the stored data.
In OpenDataDSL we have 2 forms of aggregation:
* Distinct of unique list of values for a property
* Aggregation pipelines which can summarise multiple properties

### Distinct Aggregation
Distinct aggregation gets a unique list of values from the property of any entity in OpenDataDSL.

The syntax for this is:

list = **find** **unique** property **from** ${service:source}

:::note
Source can be omitted if you are querying your private repository
:::

Example of getting a unique list of ID's of public calendars:
```js
calendars = find unique _id from ${calendar:public}
print calendars
```

You can use any this command on any property on any entity, but the most common use is with Objects.
To get a unique list values for the property DataSet of Objects from the public database use:

```js
datasets = find unique dataset from ${object:public}
print datasets
```

To do the same with your own private repository, just omit the public modifier, e.g.

```js
datasets = find unique dataset from ${object}
print datasets
```

<InDepth href="/docs/odsl/command/find" />

### Aggregation Pipeline
An aggregation pipeline allows you to filter, group and sort whilst aggregating 1 or more fields.

An example of summing up the number of process executions grouped by status and sorted by quantity and description:

```js
summary = aggregate ${exec}
    match service="ETL"
    group _id="$status", qty=count()
    sort qty desc
end

print summary
```

<InDepth href="/docs/odsl/command/aggregate" />

## Statistical Functions
To analyse TimeSeries data, we have an ever-growing list of [statistical functions](/docs/odsl/function/statistics)

An interesting function for this QuickStart module is the SimpleRegression predict function which uses regression to determine the value at a specific point in time.

The following code:
* Creates a TimeSeries with 5 values
* Runs the simpleRegression function on the TimeSeries
* Predicts the 6th value using regression

```js
input = TimeSeries("2021-10-01", "DAILY", [12.5, 12.8, 12.9, 11.5, 11.9])
reg = simpleRegression(input)

// Predict the next value
print reg.predict(Date("2021-10-06"))
```

:::note
The simpleRegression function is a special type of function that returns an object with calculations and extra functionality
:::
