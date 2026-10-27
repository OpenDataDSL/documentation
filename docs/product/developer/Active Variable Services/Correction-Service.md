---
title: Correction Service
description: The correction service in the ODSL language
slug: /odsl/service/correction
tags:
  - service
  - correction
---

# Correction Service

The **correction** active variable service gives your scripts access to corrections made to dataset data after it was delivered (read-only). It uses the [Correction REST service](/docs/api/rest/service/correction), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${correction:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${correction}
```

This service is read-only.
