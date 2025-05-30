---
slug: /odsl/dl/queue
title: Message queue
description: Information and examples of loading data from a message queue
tags:
- data_loading
- queue
- topics
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Loading data from a message queue

This topic explains the process of loading data via a message queue and gives some examples of how to do it.

## Introduction
Message queues are a communication mechanism that allow systems to send and receive data asynchronously. 
They act as an intermediary, temporarily holding messages from producers and delivering them to consumers.
This asynchronous communication allows components to communicate without needing to be aware of each other, leading to a more decoupled and resilient architecture. 

## Loading data to OpenDataDSL
The steps required to load data into OpenDataDSL using queues are as follows:

#### Preparation - only done once
* Create a queue with a trigger handler
* Add a subscription to the queue to target a process or script to transform and load the data
  
#### Loading data
* Send input data to the queue

### Creating a queue
Queues in OpenDataDSL are created using the **Queue({name})** function.
In order for a queue to be used as a trigger to load data, you must set the **handler** property on the queue to be **trigger**.

Here is an example:

```js
tt = Queue("tt")
tt.handler = "trigger"
save tt
```

### Adding a subscription
A subscription on a queue will listen for messages and send the message to the specified targets.

Here is an example:

```js
s = Subscription()
s.name = "queue:trigger:example"
s.addItem(ref("queue", "tt"), "tt", "message")
s.addScriptTarget("#hello-world")
s.enabled = true
save s
```

### Send input data to the queue
Sending data to the queue can be done using any language, what is important is to add an **origin** property to the message in order for the trigger to know the source queue for the data.

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
message = `{'example':'feed'}`
send message to "tt"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import asyncio
from azure.servicebus.aio import ServiceBusClient
from azure.servicebus import ServiceBusMessage

async def run():
    servicebus_client = ServiceBusClient.from_connection_string(conn_str="--add connection string--")
    sender = servicebus_client.get_queue_sender(queue_name="--add full queue name--")
    message = ServiceBusMessage("{'example':'feed'}", application_properties={"origin": "--add full queue name--"})
    await sender.send_messages(message)
    
asyncio.run(run())
```

</TabItem>
</Tabs>