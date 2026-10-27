---
title: Metric Service
description: The metric service in the ODSL language
slug: /odsl/service/metric
tags:
  - service
  - metric
---

# Metric Service

The **metric** active variable service gives your scripts access to the usage metrics gathered for billing. It uses the [Metric REST service](/docs/api/rest/service/metric), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${metric:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${metric}
```

This service is read-only.

See [Metric](/docs/odsl/variable/metrictimeseries) for the variable this service holds.
