---
title: Data Service
description: The data service in the ODSL language
slug: /odsl/service/data
tags:
  - service
  - data
---

# Data Service

The **data** active variable service gives your scripts access to timeseries, curves and other data held on your master data. It uses the [Data REST service](/docs/api/rest/service/data), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${data:"NGE.GAS.TTF:MID"}

// Find items
items = find ${data}
publicItems = find ${data:public}

// Delete an item, or roll back to its previous version
delete ${data:"NGE.GAS.TTF:MID"}
```

See [TimeSeries](/docs/odsl/variable/timeseries) for the variable this service holds.
