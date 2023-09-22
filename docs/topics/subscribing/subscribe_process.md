---
slug: /topics/subscribe/process
title: Target - Process
description: A subscription target to trigger process executions
tags:
- subscription
- process
- target
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```ProcessTarget```

To configure the process run action, you need to provide the following:
* **process**
  > The name of the process to run

### Adding a process target

To add a process target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select ProcessTarget
* Fill out the process field appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a process run target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addProcessTarget("myprocess")
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
      "name": "ProcessTarget",
      "process": "myprocess"
    }]
}
```

</TabItem>
</Tabs>

