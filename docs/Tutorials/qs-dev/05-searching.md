---
title: Searching
sidebar_position: 6
slug: /tutorials/qs/developer/searching
tags:
  - quickstart
  - odsl
  - developer
  - searching
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module gives an a comprehensive overview on finding and filtering data including geo-spatial queries." />

## Syntax

The syntax of the [find](/docs/odsl/command/data-management#find) command is as follows:
```js
// Minimal syntax
result = find ${service}

// Specifying source (public/private)
result = find ${service:source}

// Filtering results
result = find ${service:source} where conditions

// Returning a unique list of values for a field
result = find unique field from ${service:source} where conditions

// Returning a data profile
result = find profile field from ${service:source} where conditions
```
### Notes on syntax

#### Result

The assigned result is a [VirtualList](/docs/odsl/variable/VirtualList) which is the same as a List except it pages the results from the service rather than request the whole results in one go.

#### Service

The service is the name of an [active variable OpenDataDSL remote service](/docs/odsl/service/services) such as audit, action, object etc.

#### Source

The source defines where the data is stored and can be:

*   private - this is your own proprietary data and is the default if not specified    
*   public - this is our repository of publically available data
    

#### Type

This is the type of object to find

#### Conditions

This is a set of logical conditions used on properties of the element that are used to pre-filter the results before returning them.

#### Unique field

This command returns a list of unique values from a specific field

#### Profile field

Usually used with the object service to return data entities rather than object entities, this specifies the name of a data profile to return.

## Filter Conditions

The filter conditions allow you to query the database using a logical set of property comparisons. For services other than object and data, the properties are defined in the descriptions of those services, but for object and data, the properties you can filter on are defined by you.

### Operators

The following table describes the operators that can be used in filter conditions

|**Operator**|**Description**|**Example**|
|-|-|-|
|= or ==|Checks a property for an exact match|name = “test”|
|= [] or == []|Checks a property value matches one of a list of values|name = [“test”, “sample”]|
|&lt;|Checks a numeric or date property to see if it is less than some value|timestamp &lt; $\{date:”today”\}|
|&lt;=|Checks a numeric or date property to see if it is less than or equal to some value|price &lt;= 9.99|
|>|Checks a numeric or date property to see if it is greater than some value|length > 1|
|>=|Checks a numeric or date property to see if it is greater than or equal to some value|timestamp >= “2020-01-01”|
|!=|Checks a property is not equal to a value|name != “test”|

### Logical operators

You can use the logical operators **and** and **or** to chain logic conditions together and you can also use brackets **()** to force conditions to be executed in a certain order, e.g.
```js
(name = "test" or name = "sample") and (size >= 50 and size <= 100 )
```
### Using variables

You can use variables in the filter conditions too, e.g.
```js
curr = "USD"
fx = find ${object:"#ForeignExchange"} where currency = curr
```

### Getting a unique (distinct) list of values for a specific field
Sometimes, you need to know what all the possible values are for a specific field within an object. You can use the **unique** command to do this, e.g.

```js
// Get all currencies for a provider
currencies = find unique currency from ${currency:public} where source == "ECB_FX"
print currencies
```

### Getting data using an object query
If you want to return all the e.g. time series instead of the objects using a query, you can use the **profile** command to do this, e.g.

```js
// Fetch all data for all ECB_FX currencies
data = find profile SPOT from ${currency:public} where source == "ECB_FX"
```

### Geospatial queries
If your data includes geometry, you can utilise special geometric additions to the find command, here are some examples:

```js
// Find a list of items that are within a 20 mile radius of a point
items = find ${object:"TestGeometry"} where location within Sphere([ 51.72961, 0.47612 ], 20 / 3963.2)

// Find items that are within a defined polygon
items = find ${object:"TestGeometry"} where location within Polygon([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]])

// Pre-define a polygon, then find items that are within that polygon
london = Polygon([[51.5386, -0.4956],[51.6445, -0.0753],[51.5205, 0.1753],[51.3479, -0.1163],[51.5386, -0.4956]])
items = find ${object:"TestGeometry"} where location within london

// Find items that intersect with a polygon
items = find ${object:"TestGeometry"} where location intersects london
```

<MoreInfo href="/docs/odsl/dm/geospatial" />

## Find Examples

### Action Service

Find all public actions
```js
pactions = find ${action:public}
```
Find all public actions in the category extractors
```js
pactions = find ${action:public} where category = "extractors"
```
### Audit Service

Finding all changes to a specific entity in a service that have happened today
```js
records = find ${audit} where service="action" and id="test\_send\_batch" and timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
```
Finding all changes after a point in time
```js
records = find ${audit} where timestamp > "2020-11-03T12:23:40"
```
For more examples of searching for audit records, go to [Data Auditing](/docs/odsl/dm/auditing).

### Calendar Service

Find all public calendars
```js
pcalendars = find ${calendar:public}
```

