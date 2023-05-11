---
slug: /topics/subscribe/publish
title: Target - Publish
description: A subscription target to publish data to another tenant
tags:
- subscription
- publish
- target
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```PublishTarget```

To configure the publish action, you need to provide the following:
* **to**
  > The name of the tenant to publish the data to

### Adding a publish target

To add a publish target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select PublishTarget
* Fill out the to field appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a publish target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addPublishTarget("tenant")
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
      "name": "PublishTarget",
      "process": "tenant"
    }]
}
```

</TabItem>
</Tabs>

