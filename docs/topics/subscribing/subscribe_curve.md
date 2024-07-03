---
slug: /topics/subscribe/curve
title: Target - Curve
description: A subscription target to build a SMART curve
tags:
- subscription
- curve
- target
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```CurveTarget```

To configure the build curve action, you need to provide the following:
* **curve**
  > The id of the SMART curve to build

### Adding a curve target

To add a curve target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select CurveTarget
* Fill out the curve field appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a curve build target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addCurveTarget("mycurve")
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
      "name": "CurveTarget",
      "curve": "mycurve"
    }]
}
```

</TabItem>
</Tabs>

