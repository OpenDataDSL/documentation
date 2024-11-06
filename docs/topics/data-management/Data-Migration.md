---
slug: /odsl/dm/migration
sidebar_position: 6
title: Data Migration
description: An explanation of how to migrate data from one environment to another
tags:
- data_management
- migration
- data
---

## Introduction
It is sometimes beneficial to copy some data over from production into a test environment in order to test out some changes before putting them into production.

## Examples

### Master Data and Common Data References

If you are using EventCurves, EventTimeseries for data in the common database, this section will help you migrate data between environments.

The following code searches for master data records with an object query and then iterates through each object reading the raw data reference before updating the object to the test environment.

```js
set auto_follow_references false

objects = find ${object} where source='ICE' and exchange='NDEX'

for obj in objects
	print obj.id

	// Iterate through the object getting all the data items
	keys = obj.getProperties().keyNames
	for key in keys
		value = obj[key]
		if typeOf(value) == "Reference" 
			if value.service == "data"
				print value
				// Get the raw value and add it to the object
				value.addOption("_raw", true)
				raw = value.getReferencedObject()
				raw.id = key
				obj[key] = raw
			end
		end
	next

	// Switch environment
	use test

	// Save the object
	save obj

	// Go back to production
	use production
next
```

