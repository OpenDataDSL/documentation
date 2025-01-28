---
slug: /topics/subscribe/group
title: Target - Target Group 🆕
description: A subscription target to push data to a list of other targets
tags:
- subscription
- group
- target
- topics
- new
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```GroupTarget```

To configure the group target, you need to provide the following:
* **group**
  > The name of the group to use

### Adding a group target

To add a group target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select Target Group
* Select the group you want to use
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Create a target group
group = TargetGroup()
group.name = "TeamsGroup"
group.addTeamsChannelTarget("https://xxx.webhook.office.com/webhookb2/...", "#TeamsAlertMessage")
save group

// Adding a group target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addGroupTarget("TeamsGroup")
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
      "name": "GroupTarget",
      "group": "TeamsGroup"
    }]
}
```

</TabItem>
</Tabs>

