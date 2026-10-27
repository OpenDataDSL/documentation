---
title: AI Assistant Service
description: The aiassistant service in the ODSL language
slug: /odsl/service/aiassistant
tags:
  - service
  - aiassistant
---

# AI Assistant Service

The **aiassistant** active variable service gives your scripts access to the Fusion AI assistants, built-in and custom. It uses the [AI Assistant REST service](/docs/api/rest/service/aiassistant), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${aiassistant:"EPR"}

// Find items
items = find ${aiassistant}
publicItems = find ${aiassistant:public}

// Save an item
save ${aiassistant:item}

// Delete an item, or roll back to its previous version
delete ${aiassistant:"EPR"}
```

See [AI Assistant](/docs/odsl/variable/ai) for the variable this service holds.
