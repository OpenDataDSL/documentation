---
slug: /odsl/dm/queues
sidebar_position: 6
tags:
  - data_management
  - queue
  - messaging
  - topics
---
Message Queues
==============

A message queue is used as the glue to connect services together including your own on-premise services and applications

## Introduction

Message Queues allow you to send data from a process to another remote service or application. They act as a vehicle to transport data from one place to another.

### About Queues

By default, you have 1 queue which is not being handled by anything, so if you send data to that queue, it will sit there for the default retention time (4 days) and then be removed. You can create other named queues up to your quota maximum, each one can have it’s own handler for consuming the data.

### About Handlers

Handlers consume the data placed on a queue and can be external (Outside of our cloud and managed externally by yourself or a third party) or internal (Inside our cloud and attached to a process).

#### External Handlers

Check back here for more details soon.

#### Internal Handlers

The currently supported internal handlers are shown in the table below:

|**Name**|**Description**|**Data Type Handled**|
|-|-|-|
|loader|A data loader to load data to the object service|Batch of objects|

## Managing Queues

### Creating and updating queues

To create or update a new queue in ODSL code, use the following syntax:

```js
q = Queue("myqueue")
q.description = "My Queue"
print q
save q
```

### Queue properties

The properties of a queue are decribed below:

#### queue

This is the name of the queue, it can only contain alphanumeric characters and ‘-' and '_’.

#### handler

This is the name of the internal handler or empty if it is being handled externally

#### timeout

When a consumer receives and processes a message from a queue, the message remains in the queue. OpenDataDSL doesn't automatically delete the message. Because OpenDataDSL is a distributed system, there's no guarantee that the consumer actually receives the message (for example, due to a connectivity issue, or due to an issue in the consumer application). Thus, the consumer must delete the message from the queue after receiving and processing it.

![
	            Visibility Timeout
	        ](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/sqs-visibility-timeout-diagram.png)

Immediately after a message is received, it remains in the queue. To prevent other consumers from processing the message again, OpenDataDSL sets a _visibility timeout_, a period of time during which OpenDataDSL prevents other consumers from receiving and processing the message. The default visibility timeout for a message is 3 minutes. The minimum is 3 minutes. The maximum is 12 hours.

The value is set as a number and either ‘s' for seconds, ‘m’ for minutes or 'h’ for hours.

#### retention

This is the length of time that OpenDataDSL retains the message before it is automatically removed. The default is 4 days, The minimum is 1 minute. The maximum is 14 days.

The value is set as a number and either ‘s' for seconds, ‘m’ for minutes, ‘h’ for hours or 'd’ for days

### Deleting Queues

If you no longer need a queue, you can delete it using the ODSL **delete** command as follows:

```js
delete ${queue:"myqueue"}
```

### Listing your queues

To get a list of your currently configured queues, use the ODSL **find** command:

```js
queues = find ${queue}
print queues
```

### Getting a specific queue

You can get a specific queue by assigning the queue active variable to a variable, e.g.

```js
// Get the default queue
def = ${queue:""}
print def

// Get a named queue
myqueue = ${queue:"myqueue"}
print myqueue
```

### Using Queues

In OpenDataDSL you send data to a queue using the **send** command using the following syntax:

```js
send var [to queue]
```

If you don’t specify the queue name, the default queue will be used

For example, to send a batch of data to the internal loader:

```js
// Create a batch
batch=PROCESS.createBatch()

// Add some objects
obj1 = Object()
obj1.name = "Hello"
batch.add(obj1)
obj2 = Object()
obj2.name = "World"
batch.add(obj2)

// Send to the default queue
send batch
```

### Using Queues Externally

You can connect to a queue using the Microsoft Azure Service Bus SDK.
Whenever you create a queue, a shared access key is created for that queue which you can use to connect to the queue.

:::info
If you use the [Java](/docs/sdk/java) or [Matlab](/docs/sdk/matlab) SDK's, these have helper methods to help you work with message queues 
:::

To find out the connection string to use to connect to the queue, retrieve the queue and use the property ```connection```

For example, to get details for a queue named **export**
```
GET https://api.opendatadsl.com/api/queue/v1/export
Authorization: Bearer {{token}}
```

Example output:
```json
{
  "_id": "prod/<<redacted>>/export",
  "tid": "<<redacted>>",
  "tenant": "<<redacted>>",
  "queue": "export",
  "description": "Export Queue",
  "retention": "PT480H",
  "timeout": "PT5M",
  "connection": "<<redacted>>>>",
  "messageCount": 2,
  "sizeInBytes": 1598,
  "activeMessageCount": 2,
  "deadLetterMessageCount": 0,
  "scheduledMessageCount": 0
}
```
