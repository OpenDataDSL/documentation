---
slug: /topics/subscribe/email
title: Target - Email
description: A subscription target to automate sending emails
tags:
- tutorial
- subscription
- email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

To configure the email send action, you need to provide the following:
* **subject**
  > The optional email subject
* **to**
  > The email address of the recipient(s) of the email, separate multiple email addresses with either comma (,), semi-colon (;) or space
* **html**
  > The mustache template script name

### Adding an email target

To add an email target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select EmailTarget
* Fill out the to, subject and html fields appropriately
* Client the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding an email target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addEmailTarget("user1@company.com,user2@company.com", "Subject", "template")
save sub
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/service/queue/v1
Authorization: Bearer {{token}}

{
    "name": "MySubscription",
    "targets":[{
      "name": "EmailTarget",
      "subject": "Subject",
      "to": "user1@company.com,user2@company.com",
      "html": "template"
    }]
}
```

</TabItem>
</Tabs>

