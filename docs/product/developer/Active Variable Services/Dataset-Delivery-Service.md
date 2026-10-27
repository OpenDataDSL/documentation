---
title: Dataset Delivery Service
description: The dataset_delivery service in the ODSL language
slug: /odsl/service/dataset_delivery
tags:
  - service
  - dataset_delivery
---

# Dataset Delivery Service

The **dataset_delivery** active variable service gives your scripts access to the delivery record of each monitored dataset for each date. It uses the [Dataset Delivery REST service](/docs/api/rest/service/dataset_delivery), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${dataset_delivery:"ICE.NDEX.NLB:2026-10-23"}

// Find items
items = find ${dataset_delivery}
```

This service is read-only.
