---
title: Validation Service
description: The validation service in the ODSL language
slug: /odsl/service/validation
tags:
  - service
  - validation
---

# Validation Service

The **validation** active variable service gives your scripts access to validation records: the result of each check on your curves and timeseries. It uses the [Validation REST service](/docs/api/rest/service/validation), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${validation:"NGE.GAS.TTF:MID:2026-10-23:M01"}

// Find items
items = find ${validation}
```

This service is read-only.
