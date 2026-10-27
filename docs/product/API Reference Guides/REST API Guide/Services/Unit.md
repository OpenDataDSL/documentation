---
title: Unit Service
description: REST API for the unit of measure service
slug: /api/rest/service/unit
tags:
  - api
  - service
  - unit
  - conversion
---
The unit resource lists the units of measure the platform knows, by dimension, with the conversions allowed between them. It is read-only.

## Unit REST API

The Unit REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/unit
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List the dimensions, for example mass, volume and energy|
|GET|\{release\}/\{dimension\}|v1/energy|List the units of a dimension, or of every dimension with *|
|GET|\{release\}/\{dimension\}/\{unit\}|v1/energy/MWh|Retrieve a unit|

## Entities

### Unit

|**Name**|**Description**|**Type**|
|-|-|-|
|code|The unit code, as used in the units of a timeseries or curve|String|
|name|The unit name|String|
|dimension|The dimension of the unit|String|
|factor|The factor that converts the unit to the base unit of its dimension|Number|
|metric|True for a metric unit|Boolean|
|prefix|The metric prefix, if any|String|
|conversions|The other dimensions this unit can be converted to, each with the `dimension`, a `unit` and the `requiredParameter` the conversion needs (for example a density to convert mass to volume)|Object[]|

Use the `currency` and `units` query parameters of the [Data service](./data#query-parameters) to convert timeseries and curves.
