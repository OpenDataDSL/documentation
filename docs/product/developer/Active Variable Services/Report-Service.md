---
title: Report Service
description: The report service in the ODSL language
slug: /odsl/service/report
tags:
  - service
  - report
---

# Report Service

The **report** active variable service gives your scripts access to stored reports, by report configuration and date. It uses the [Report REST service](/docs/api/rest/service/report), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${report:"METRICS:2026-10-23"}

// Find items
items = find ${report}
publicItems = find ${report:public}

// Save an item
save ${report:item}

// Tag the current version
tag ${report:"METRICS:2026-10-23"} as PROD

// Delete an item, or roll back to its previous version
delete ${report:"METRICS:2026-10-23"}
```

See [Report](/docs/odsl/variable/report) for the variable this service holds.
