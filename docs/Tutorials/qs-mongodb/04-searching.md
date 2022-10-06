---
title: Searching for data
sidebar_position: 4
slug: /tutorials/qs/mongodb/searching
tags:
  - quickstart
  - odsl
  - mongodb
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

// Returning information about a field
result = find info field from ${service:source} where conditions
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
*   named - this is a full domain name of a custom collection in the form connection:database.collection
    

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
|in []|Checks a property value matches one of a list of values|name in [“test”, “sample”]|
|nin []|Checks a property value does not match any of a list of values|name nin [“test”, “sample”]|
|<|Checks a numeric or date property to see if it is less than some value|timestamp < ${date:”today”}|
|<=|Checks a numeric or date property to see if it is less than or equal to some value|price <= 9.99|
|>|Checks a numeric or date property to see if it is greater than some value|length > 1|
|>=|Checks a numeric or date property to see if it is greater than or equal to some value|timestamp >= “2020-01-01”|
|!=|Checks a property is not equal to a value|name != “test”|
|matches|Uses a regex pattern to test if values can match the pattern|name matches '.\*odsl.\*'|

### Logical operators

You can use the logical operators **and** and **or** to chain logic conditions together and you can also use brackets **()** to force conditions to be executed in a certain order, e.g.
```js
find ${object:"m101:sample_training.zips"} where state="NY" and city="ALBANY"
```
### Using variables

You can use variables in the filter conditions too, e.g.
```js
state = "NY"
city = "ALBANY"
find ${object:"m101:sample_training.zips"} where state = state and city = city
```

### Returning partial documents

You can return partial documents too by using the project directive after any filter conditions, e.g.

```js
find ${object:"m101:sample_training.zips"} where state="NY" and city="ALBANY" project zip, pop
```

## Using the results of the find command

You can save the results of the find command in a variable to be used in your ODSL code, e.g.

```js
zips = find ${object:"m101:sample_training.zips"} where state="NY" and city="ALBANY"
for zip in zips
    print "ZIP: " + zip.zip + " POP: " + zip.pop
next
```

## Getting a unique (distinct) list of values for a specific field
Sometimes, you need to know what all the possible values are for a specific field within an object. You can use the **unique** command to do this, e.g.

```js
find unique state ${object:"m101:sample_training.zips"} 
```

## Using MongoDB operators

You can use [MongoDB operators](https://www.mongodb.com/docs/manual/reference/operator/query/) within find commands, e.g.

This find query uses the [$all](https://www.mongodb.com/docs/manual/reference/operator/query/all/)
and the [$size](https://www.mongodb.com/docs/manual/reference/operator/query/size/) operator - note you don't include the $ prefix

```js
listings = find ${object:"m101:sample_airbnb.listingsAndReviews"} 
    where amenities=size(20) 
    and amenities=all("Internet","Wifi","Kitchen","Laptop friendly workspace") 
    project price, address
print listings
```

## More specialised searching

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

