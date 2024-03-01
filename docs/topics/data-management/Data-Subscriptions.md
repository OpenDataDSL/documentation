---
slug: /odsl/dm/subscriptions
sidebar_position: 5
tags:
  - data_management
  - subscription
  - topics
---
Data Subscriptions
=============

This guide takes you through how data subscriptions work

## Introduction
A subscription is a record of one or more items that we want to perform an action on/with when they change.

## Subscription Definition
The subscription itself is created using the Subscription constructor:

```js
sub = Subscription()
```

### Subscription Item
The subscription item defines each object that you are interested in, the properties of this are:
* key - A unique identifier for this object, this can be the same as the id of the object or can be an id used by the target system
* id - The id of the object or data that you want to subscribe to
* service - The service the item belongs to, defaults to data
* action - The action performed to trigger this subscription, can be one of:
    * all - Any action will invoke the subscription
    * create - Invoked when a new item is created
    * update - Invoked when an item is updated
    * delete - Invoked when an item is deleted

There are 5 addItem methods on a subscription to add your items.

Example:
```js
// Add just using the id of a data item
sub.addItem("#ECB_FX.EURGBP:SPOT")

// Add using the id of a data item and a key name to assign to it
sub.addItem("#ECB_FX.EURGBP:SPOT", "GBP")

// Add using a reference to the item
s.addItem(ref("calendar","USA"))

// Add using a reference to the item and a key name to assign to it
s.addItem(ref("calendar","USA"), "USACAL")

// Add using a reference to the item, a key name to assign to it and the action that triggers the subscription
s.addItem(ref("calendar","USA"), "USACAL", "update")
```

### Subscription Target
The subscription target defines where to send the data to, each target type has its own specific properties as shown below.

This following section defines each named target
#### QueueTarget
This sends the fulfilled subscription to a queue, the additional properties required on the target are:
* subject - The message subject
* queue - The name of the queue to send the fulfilled subscription to

Example:
```js
// With just the name of the queue - the subject will be an empty string
sub.addQueueTarget("sql")

// With both the message subject and queue name
sub.addQueueTarget("subject", "sql")
```

#### ProcessTarget
This triggers a process and sends the fulfilled subscription to the process as input data, the additional properties required on the target are:
* process - The name of the process

Example:
```js
sub.addProcessTarget("MYPROCESS")
```

#### CurveTarget
This triggers a curve build, the additional properties required on the target are:
* curve - The name of the curve configuration to trigger

Example:
```js
sub.addCurveTarget("MYCURVE")
```

#### EmailTarget
This target sends an email which can be populated with information from the fulfilled subscription, the additional properties required on the target are:
* to - The recipient(s) of the email
* subject - The email subject message
* html - The HTML body of the message
* attachment - A boolean indicating if the data should be sent in an attached file, defaults to true

The HTML body can include some variables which will be substituted when sent.
Each variable is surrounded by curly braces, e.g. {var}

Example:
```js
// Specify some HTML to send as the email body
sub.addEmailTarget("me@abc.com", "Subject", "<p>Object id: {_id}</p>", false)

// Use the default html template for the item being sent
sub.addEmailTarget("me@abc.com", "Subject", null, true)
```

#### ReportTarget
This target runs a report from a pre-defined [report configuration.](/docs/topics/reporting/basics).
The additional properties required are:
* report - The name of the report to run
* range - An optional date range to use for the report

Example:
```js
// Add a report target
sub.addReportTarget("MYREPORT")

// Add a report target with a date range for yesterday
sub.addReportTarget("MYREPORT", "between(T-1Dh0m0s0, T-1Dh23m59s59)")
```

#### ScriptTarget
This target runs a script stored in the server.
The additional properties required are:
* script - The name of the script to run

Example:
```js
// Add a script target
sub.addScriptTarget("MYSCRIPT")
```

#### PublishTarget
This target publishes the updated data to another tenant.
The additional properties required are:
* to - The name of the tenant to publish to

Example:
```js
// Add a publish target
sub.addPublishTarget("TENANT")
```

### Subscription
This is the main configuration part of the subscription, the properties of this are:
* name - The name of the subscription
* description - A description of the subscription
* enabled - A boolean indicating whether this subscription is live (enabled)
* system - Indicates that this is a system created subscription - READ ONLY
* objects - A list of the subscribed objects
* targets - A list of the targets to send the fulfilled subscription to

Complete example:
```js
sub = Subscription()
sub.name = "SQL_DATA_ECB_FX"
sub.environment = "production"
sub.addQueueTarget("sql")
sub.addItem("#ECB_FX.EURGBP:SPOT", "GBP")
sub.addItem("#ECB_FX.EURJPY:SPOT", "JPY")
sub.addItem("#ECB_FX.EURUSD:SPOT", "USD")
save sub
```  

