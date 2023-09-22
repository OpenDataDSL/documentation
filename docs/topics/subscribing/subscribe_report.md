---
slug: /topics/subscribe/report
title: Target - Report
description: A subscription target to run a report
tags:
- subscription
- report
- target  
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```ReportTarget```

To configure the report run action, you need to provide the following:
* **report**
  > The name of the report to run
* **range**
  > The optional date range expression

### Adding a report target

To add a report target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select ReportTarget
* Fill out the report and range fields appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a report run target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addReportTarget("myreport", "from(T-1M)")
save sub
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/service/subscription/v1
Authorization: Bearer {{token}}

{
    "name": "MySubscription",
    "targets":[{
      "name": "ReportTarget",
      "report": "myreport",
      "range": "from(T-1M)"
    }]
}
```

</TabItem>
</Tabs>

