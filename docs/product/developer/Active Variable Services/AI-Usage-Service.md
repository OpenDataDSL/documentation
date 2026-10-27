---
title: AI Usage Service
description: The aiusage service in the ODSL language
slug: /odsl/service/aiusage
tags:
  - service
  - aiusage
---

# AI Usage Service

The **aiusage** active variable service gives your scripts access to Fusion AI token usage, one record per conversation per day (read-only). It uses the [AI Usage REST service](/docs/api/rest/service/aiusage), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${aiusage:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${aiusage}
```

This service is read-only.
