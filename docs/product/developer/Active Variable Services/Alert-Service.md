---
title: Alert Service
description: The alert service in the ODSL language
slug: /odsl/service/alert
tags:
  - service
  - alert
---

# Alert Service

The **alert** active variable service gives your scripts access to alerts: problems with your data, raised by the platform or by people. It uses the [Alert REST service](/docs/api/rest/service/alert), so the same rules and permissions apply. See [Alerts in ODSL](/docs/extensions/alerts/odsl) for a full guide.

Ids starting `ALC-` are read from common, `ALP-` from public, and any other id from private.

## Using the service

```js
// Find your open alerts
open = find ${alert:private} where status == "open"

// Find shared alerts (common in quotes)
common = find ${alert:"common"} where status == "open"
public = find ${alert:public} where status == "open"

// Read an alert with its timeline
a = ${alert:"ALR-2026-000401"}

// Comment on it, or change it, and save
a.comment = "Settlement run repeated with the republished contracts"
save ${alert:a}

// Raise an alert
n = SimpleObject()
n.title = "NGE.BROKER.NBP prices look stale since Monday"
n.severity = "high"
n.agent = "opendatadsl"
save ${alert:n}
```

Read an alert again before each change: an alert saved after someone else changed it is refused.

See [Alert](/docs/odsl/variable/alert) for the fields of an alert.
