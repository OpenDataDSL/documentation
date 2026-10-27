---
title: AI Playbook Service
description: The aiplaybook service in the ODSL language
slug: /odsl/service/aiplaybook
tags:
  - service
  - aiplaybook
---

# AI Playbook Service

The **aiplaybook** active variable service gives your scripts access to Fusion AI playbooks, your own and the library. It uses the [AI Playbook REST service](/docs/api/rest/service/aiplaybook), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${aiplaybook:"dataset-delivery-summary"}

// Find items
items = find ${aiplaybook}
publicItems = find ${aiplaybook:public}

// Save an item
save ${aiplaybook:item}

// Tag the current version
tag ${aiplaybook:"dataset-delivery-summary"} as PROD

// Delete an item, or roll back to its previous version
delete ${aiplaybook:"dataset-delivery-summary"}
```
