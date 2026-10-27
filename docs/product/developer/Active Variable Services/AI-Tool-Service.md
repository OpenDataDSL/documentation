---
title: AI Tool Service
description: The aitool service in the ODSL language
slug: /odsl/service/aitool
tags:
  - service
  - aitool
---

# AI Tool Service

The **aitool** active variable service gives your scripts access to your Fusion AI custom tools. It uses the [AI Tool REST service](/docs/api/rest/service/aitool), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${aitool:"2b8f7d1e-5c3a-4e9b-a0d2-7f6e1c9b3a45"}

// Find items
items = find ${aitool}

// Save an item
save ${aitool:item}

// Delete an item, or roll back to its previous version
delete ${aitool:"2b8f7d1e-5c3a-4e9b-a0d2-7f6e1c9b3a45"}
```

See [AI Tool](/docs/odsl/variable/ai) for the variable this service holds.
