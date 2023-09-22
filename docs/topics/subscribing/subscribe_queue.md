---
slug: /topics/subscribe/queue
title: Target - Queue
description: A subscription target to send a message to a queue
tags:
- subscription
- queue
- target
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```QueueTarget```

To configure the message queue action, you need to provide the following:
* **subject**
  > The optional subject of the message
* **queue**
  > The name of the queue to send the message to

### Adding a queue target

To add a message queue target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select QueueTarget
* Fill out the subject and queue fields appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a message queue target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addQueueTarget("subject", "myqueue")
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
      "name": "QueueTarget",
      "subject": "subject",
      "queue": "myqueue"
    }]
}
```

</TabItem>
</Tabs>

