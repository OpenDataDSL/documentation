---
title: Dataset Service
description: The dataset service in the ODSL language
slug: /odsl/service/dataset
tags:
  - service
  - dataset
---

# Dataset Service

The **dataset** active variable service gives your scripts access to dataset monitoring: the datasets and feeds you monitor and their daily deliveries. It uses the [Dataset REST service](/docs/api/rest/service/dataset), so the same rules and permissions apply.

## Using the service

The part after the colon in a find is the section of the dataset service to read: info for datasets, feed for dataset feeds and delivery for deliveries.

```js
// Find the datasets you monitor
datasets = find ${dataset:info}

// Find the dataset feeds you monitor
feeds = find ${dataset:feed}

// Find today's late deliveries
late = find ${dataset:delivery} where status == "late"

// Create a dataset configuration and save it
ds = ${dataset}
ds.dsid = "ICE.NDEX.NLB"
save ds
```

A new dataset from `${dataset}` is a Dataset object; a dataset needs a `dsid` in the form provider.feed.product before it can be saved. Saving a DatasetFeed object saves a feed instead.
