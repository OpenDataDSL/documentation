---
slug: /topics/subscribe/script
title: Target - Script
description: A subscription target to run an ODSL script
tags:
- subscription
- script
- target
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```ScriptTarget```

To configure the script run action, you need to provide the following:
* **script**
  > The name of the ODSL script to run

### Adding a script target

To add a script target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select ScriptTarget
* Fill out the script field appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a script run target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addScriptTarget("myscript")
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
      "name": "ScriptTarget",
      "process": "myscript"
    }]
}
```

</TabItem>
</Tabs>

