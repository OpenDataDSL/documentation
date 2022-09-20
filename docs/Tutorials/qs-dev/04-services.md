---
title: Services
sidebar_position: 5
slug: /tutorials/qs/developer/services
tags:
  - quickstart
  - odsl
  - developer
  - services
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module gives an overview of how you can connect to the remote services, creating some data and storing it in the cloud." />

## Active Variables
The OpenDataDSL remote services are exposed in the language using a syntax known as **Active Variables**.
Active variables are also used for non-remote services such as the memory and date service.

The basic syntax for an active variable is:

```js
${service_name:"entity_name"}
```  

Active variables are used in the following scenarios:
* Searching
* Aggregating
* Reading a single entity
* Saving an entity
* Deleting an entity
* Tagging a version of an entity

<InDepth href="/docs/odsl/service/services" />

## Variable Services
Variable services consist of a date service for making it easier to work with dates and the memory service which allows you to store and re-load the current memory state.

Date service examples:
```js
// Use the date service to create various dates
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
```

<InDepth href="/docs/odsl/service/date" />

Memory service examples:
```js
// Same current memory to a file
save ${memory:file/"c:/temp/memory.json"}

// Reload memory
x=${memory:file/"c:/temp/memory.json"}
```

<InDepth href="/docs/odsl/service/memory" />

## Remote Services
Remote services interact with the OpenDataDSL remote services allowing you to find, create, read, update and delete entities.

Remote service examples:
```js
// Create a private type
TypeCRUD = type
    name as String() default "test"
end
save ${type:TypeCRUD}

// Get a list of private types
tl = find ${type}
for tp in tl
    print tp.name
next

// Read private type
tc = ${type:"TypeCRUD"}

// Delete private type
delete ${type:"TypeCRUD":*}
```

<InDepth href="/docs/odsl/service/services#opendatadsl-remote-services" />

## External Services
External services allow you to interact with the outside world, and are mainly used for collecting data from websites and dealing with different file formats. 

External service examples:
```js
// Grab one of the UCI data sets for Balloons
// https://archive.ics.uci.edu/ml/datasets/Balloons

csvdata = ${csv:"https://archive.ics.uci.edu/ml/machine-learning-databases/balloons/adult+stretch.data","headerpos=0"}
print csvdata.size
for row in csvdata
    print row
next

// XML examples showing use of an xpath selector

xmldata=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}
print xmldata

xmldata=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", "selector=[currency]"}
print xmldata

xmldata=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", "selector=[currency='GBP']"}
print xmldata
```

<InDepth href="/docs/odsl/service/services#external-data-collection-services" />
