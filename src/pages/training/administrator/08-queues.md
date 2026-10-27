---
slug: /training/administrator/queues
title: "Module 08: Queue Management"
sidebar_position: 9
tags: [training, administrator, operations, queues]
---

# Module 08: Queue Management

Message queues are the glue between the platform and your own systems: processes send batches to the data loader, external applications send data in, and automations send curves out to an ETRM. In this module you will create and configure queues, connect them to handlers and automations, and monitor what passes through them.

## Learning Objectives

By the end of this module you will be able to:

- Explain the default queue, named queues and handlers
- Create, configure, list and delete queues
- Set up a trigger queue that loads data through an automation
- Send data to a queue from ODSL
- Read the queue log to see what was sent and whether it worked
- Monitor message counts, including dead-lettered messages, with metrics

---

## Step 1: Queues and Handlers

You have one **default** queue, which is not handled by anything: data sent there sits for the retention time and is then removed. You can create named queues up to your quota, each with its own **handler**:

| Handler | What consumes the messages |
|---------|----------------------------|
| `loader` | The internal data loader, which loads a batch of objects into the object service |
| `trigger` | An automation on the queue's `message` event, which sends each message to a script or process |
| (empty) | An external application, which connects with the Azure Service Bus SDK |

---

## Step 2: Create a Queue

```js
//#region Create a queue
q = Queue("etrm-curves")
q.description = "Forward curves for the ETRM"
q.retention = "P7D"
q.timeout = "PT5M"
save q
print q
//#endregion
```

| Property | Description |
|----------|-------------|
| `queue` | The name. Letters, numbers, `-`, `.` and `_`, starting and ending with a letter or number |
| `description` | What the queue is for |
| `retention` | How long a message is kept before it is removed, as an ISO 8601 duration |
| `timeout` | How long a receiving client has to process a message before it is made available to other clients |
| `handler` | The internal handler, or empty for an external consumer |

:::note Check the limits
The documentation gives different defaults and limits for `retention` and `timeout` in different places. The [Queue REST reference](/docs/api/rest/service/queue) is the most specific: retention defaults to `P14D`, timeout defaults to `PT1M` and is at most `PT5M`. Set both explicitly so you know what you have.
:::

Queue configurations are versioned, so `${queue:"etrm-curves":*}` lists the changes.

---

## Step 3: List and Inspect Queues

```js
//#region List queues
queues = find ${queue}
print queues

etrm = ${queue:"etrm-curves"}
print etrm
//#endregion
```

Reading a queue also returns its current state:

| Field | Meaning |
|-------|---------|
| `messageCount` | Messages on the queue |
| `activeMessageCount` | Messages waiting to be received |
| `deadLetterMessageCount` | Messages that could not be delivered |
| `scheduledMessageCount` | Messages scheduled for later |
| `sizeInBytes` | Size of the queue |
| `connection` | The connection string an external application uses |

:::warning
The `connection` value gives access to the queue. Treat it like a password: give it only to the team that runs the consumer, and keep it in their own secret store.
:::

---

## Step 4: Set Up a Trigger Queue

To load data that arrives on a queue:

1. Create the queue with the `trigger` handler.
2. Add an automation on the `message` event of the `queue` service, with the queue name as the id, targeting the script or process that transforms and loads the data.

```js
//#region Create a trigger queue
inbound = Queue("supplier-inbound")
inbound.description = "Supplier prices pushed to us"
inbound.handler = "trigger"
save inbound
//#endregion
```

See [Creating Automations](/docs/topics/automations/creating) for building the automation, and [Loading data from a message queue](/docs/odsl/dl/queue) for the full example. External senders must add an `origin` property to each message so the trigger knows the source queue.

---

## Step 5: Send Data to a Queue

The `send` command sends a batch to a queue. Without a queue name it goes to the default queue:

```js
//#region Send a batch
batch = PROCESS.createBatch()
obj1 = Object()
obj1.name = "Hello"
batch.add(obj1)

send batch to "supplier-inbound"

// Back-fill without triggering downstream processes and exports
send batch -noevent
//#endregion
```

Use `size` to change how many items are sent per message, for example `send batch size 10`.

---

## Step 6: Read the Queue Log

Every message sent to your queues is logged in the queue log:

```js
//#region Messages sent to a queue
log = find ${queuelog} where queue = "etrm-curves"
for entry in log
    print entry.timestamp + " " + entry.status + " " + entry.statusMessage
next
//#endregion
```

| Field | Meaning |
|-------|---------|
| `timestamp` | When the message was sent |
| `messageId`, `subject`, `size` | The message |
| `contentType`, `contentId` | What was sent |
| `trigger`, `origin` | What sent it and where the request came from |
| `status`, `statusMessage` | Whether the send worked, and why not |
| `invocationId` | The request that sent it |

For automations that send to a queue, the automation log and the Automations extension's **Activity** tab show each run and the target's message (see [Module 09](/training/administrator/processes)).

---

## Step 7: Monitor with Metrics

The `AzureServiceBus` metric provider gives queue metrics such as `ActiveMessages`, `DeadletteredMessages`, `IncomingMessages` and `OutgoingMessages`, filtered by queue:

```js
//#region Average active messages per hour
cal = ${calendar:"#PT1H"}
ActiveMessages = MetricTimeSeries("AzureServiceBus", "ActiveMessages")
ActiveMessages.calendar = cal
ActiveMessages.filter = ?queue='etrm-curves'
ActiveMessages.observed = "averaged"
//#endregion
```

A rising active count means the consumer is not keeping up, or has stopped. A non-zero dead-letter count means messages could not be delivered. You will store and chart metrics like this in [Module 10](/training/administrator/metrics).

:::note
Replaying or clearing dead-lettered messages is not a platform feature described in the documentation. Fix the consumer, then resend the data from its source.
:::

---

## Step 8: Delete a Queue

```js
//#region Delete a queue
delete ${queue:"supplier-inbound"}
//#endregion
```

Check first that no automation or external application still uses it.

---

## Exercise

1. Create a queue called `training-queue` with a retention of `P1D` and a timeout of `PT5M`.
2. Read it back and note its message counts.
3. Send a small batch to it, then find the entry in the queue log.
4. Delete the queue.

---

## Summary

| Task | ODSL |
|------|------|
| Create or update | `q = Queue("name")` then `save q` |
| List | `find ${queue}` |
| Inspect | `${queue:"name"}` |
| Send | `send batch to "name"` |
| Log | `find ${queuelog} where queue = "name"` |
| Delete | `delete ${queue:"name"}` |

:::note Next Step
In [Module 09](/training/administrator/processes) you will monitor process executions and diagnose failures.
:::
