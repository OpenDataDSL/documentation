---
slug: /training/technical/qs-services
title: "QuickStart: Services"
sidebar_position: 13
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Services

How to connect to OpenDataDSL remote services, create data, and store it in the cloud using active variables.

---

## Active Variables

Remote services are accessed using **active variable** syntax:

```js
${service_name:"entity_name"}
```

Active variables are used for searching, reading, saving, deleting, and tagging versioned entities.

---

## Variable Services

Variable services provide utilities that don't require a remote connection.

### Date Service

```js
//#region
print ${date:"today"}
print ${date:"yesterday"}
print ${date:"tomorrow"}
print ${date:"startofweek"}
print ${date:"endofweek"}
print ${date:"startofmonth"}
print ${date:"endofmonth"}
print ${date:"startofyear"}
print ${date:"endofyear"}
print ${date:"thursday"}
//#endregion
```

### Memory Service

```js
//#region
// Save current memory state to a file
save ${memory:file/"c:/temp/memory.json"}

// Reload memory from a file
x = ${memory:file/"c:/temp/memory.json"}
//#endregion
```

---

## Remote Services

Remote services interact with the OpenDataDSL cloud — find, create, read, update, and delete entities:

```js
//#region
use training

// Create and save a private type
TypeCRUD = type
    name as String() default "test"
end
save ${type:TypeCRUD}

// List all private types
tl = find ${type}
for tp in tl
    print tp.name
next

// Read a specific type
tc = ${type:"TypeCRUD"}
print tc

// Delete a type
delete ${type:"TypeCRUD":*}
//#endregion
```

---

## External Services

External services let you pull data from the internet in various formats:

```js
//#region
// Fetch CSV data from a URL
csvdata = ${csv:"https://archive.ics.uci.edu/ml/machine-learning-databases/balloons/adult+stretch.data","headerpos=0"}
print csvdata.size
for row in csvdata
    print row
next
//#endregion
```

```js
//#region
// Fetch XML data and apply an xpath selector
xmldata = ${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", "selector=[currency='GBP']"}
print xmldata
//#endregion
```

:::note Next Step
In [QuickStart: Searching](/training/technical/qs-searching) you will learn how to query and filter data across all platform services.
:::
