---
title: Automation Service
description: The automation service in the ODSL language
slug: /odsl/service/automation
tags:
  - service
  - automation
---

# Automation Service

The **automation** active variable service gives your scripts access to your automations. It uses the [Automation REST service](/docs/api/rest/service/automation), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${automation:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${automation}

// Save an item
save ${automation:item}

// Delete an item, or roll back to its previous version
delete ${automation:"6721f0c2a4b9e85d3c0f1a77"}
```

See [Automation](/docs/odsl/variable/automation) for the variable this service holds.
