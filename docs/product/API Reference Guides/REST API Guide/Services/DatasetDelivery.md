---
title: Dataset Delivery Service
description: REST API for the dataset delivery service
slug: /api/rest/service/dataset_delivery
tags:
  - api
  - service
  - dataset
  - delivery
---
The dataset delivery resource holds the delivery record of each monitored dataset for each date: its status, timings, quality checks and timeline. Deliveries are written by the platform as data arrives. See [Dataset delivery configuration](./dataset#dataset-delivery-configuration) for the fields.

## Dataset Delivery REST API

The Dataset Delivery REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/dataset_delivery
```

You can also read deliveries through the [Dataset service](./dataset#dataset-delivery-methods).

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/private|List dataset deliveries|
|GET|\{release\}/all|v1/all|List the deliveries of all the datasets you monitor, private and common, as the Dataset service does|
|GET|\{release\}/\{source\}/\{key\}|v1/private/ICE.NDEX.NLB:2026-10-23|Retrieve a delivery, the key is the dataset id and the date|
|DELETE|\{release\}/\{source\}?_bulk=true&_filter=...|v1/private?_bulk=true&_filter=\{"ondate":"2026-01-02"\}|Delete the deliveries that match the filter|

## Examples

```js
### Today's late deliveries
GET https://api.opendatadsl.com/api/dataset_delivery/v1/private
    ?_filter={"ondate":"2026-10-23","status":"late"}
Authorization: Bearer {{token}}
```
