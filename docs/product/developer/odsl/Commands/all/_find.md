Used to search the database

#### Syntax
```js
varname = find 
  (top n)?
  (unique field from | profile profilename (for range)? from)?
  (activevar|avservice)
  (where (condition)+)?
  (end)?
```

##### Layout

The find command can be used in a single line or multi-line format for better readability, e.g.
```js
// Single line search of private audit records
records = find ${audit} where timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}

// Multi-line version of the same search
records = find ${audit} where 
    timestamp > ${date:"today"} 
    and timestamp < ${date:"tomorrow"}
end
```

##### Options

###### top

The top option allows you to find a smaller sample of data, e.g.

```js
// Retrieve the first 15 objects
objects = find top 15 ${object} where dataset="ARGUS_DEL"
```

###### unique

The unique option allows you to get a list of unique values for a specific field in a resource

###### profile

The profile option is only used when searching through objects. It allows you to search objects, but return a list of data objects linked to the object where the profile name matches the passed in profilename. This option also allows you to specify a **range**, which can be a single date or a range of dates in the following syntax:

*   Single date as a Date or a String, e.g. “2021-07-16”
    
*   Single date using the date active variable service, e.g. $\{date:”yesterday”\}
    
*   From a date, e.g. from(“2021-01-01”)
    
*   The last number of days, e.g. last(3)
    
*   A range of dates using between, e.g. between(“2021-01-01”,$\{date:”yesterday”\})
    

###### condition

The condition option is used to filter the results of the find command. The syntax of the conditions is as follows:
```js
expression (<|<=|>|>=|=|==|!=|like|intersects|within) expression
    | condition (and|or) condition
    | ( condition )
```

####### Examples of conditions

```js
category = "extractors"
timestamp > "2020-11-03T12:23:40"
timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
name like "ch"
location within Sphere(\[ 51.72961, 0.47612 \], 20 / 3963.2)
```

### Description

The find command is a powerful way of searching a resource for the data you require. It returns a [virtual list](/docs/odsl/variable/virtuallist) of items that match the specified conditions.

#### Examples

##### Find all

In its simplest form, the find command can be used to list all items from a service, e.g.
```js
// Get a list of all public calendars
calendars = find ${calendar:public}
```

##### Simple filtering
```js
// Get a list of public actions for a specific category
pactions = find ${action:public} where category = "extractors"
```

##### Filtering by date
```js
// Get a list of private audit records for today
records = find ${audit} where timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
```

##### A list of data using the object profile option
```js
data = find profile SPOT for yesterday from ${object:public} where dataset == "ECB_FX"
```

##### Various date range queries
```js
// Data in get query
data = ${data:"#ECB_FX.EURZAR:SPOT"} for ${date:"yesterday"}
data = ${data:"#ECB_FX.EURZAR:SPOT"} for yesterday
data = ${data:"#ECB_FX.EURZAR:SPOT"} for last(3)
data = ${data:"#ECB_FX.EURZAR:SPOT"} for from(yesterday)
data = ${data:"#ECB_FX.EURZAR:SPOT"} for between("2021-05-01",yesterday)
```

##### Geospatial
```js
// Define a polygon and search for objects within it
london = Polygon(\[\[51.5386, -0.4956\],\[51.6445, -0.0753\],\[51.5205, 0.1753\],\[51.3479, -0.1163\],\[51.5386, -0.4956\]\])
items = find ${object:"TestGeometry"} where location within london
```
