---
title: AI Run Service
description: The airun service in the ODSL language
slug: /odsl/service/airun
tags:
  - service
  - airun
---

# AI Run Service

The **airun** active variable service gives your scripts access to the records of Fusion AI playbook runs (read-only). It uses the [AI Run REST service](/docs/api/rest/service/airun), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${airun:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${airun}
```

This service is read-only.
