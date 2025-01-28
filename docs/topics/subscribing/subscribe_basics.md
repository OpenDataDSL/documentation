---
slug: /topics/subscribe/basics
title: Subscribing Basics
description: The basics of event-driven programming in OpenDataDSL
sidebar_position: 1
tags:
- topics
- subscription
- basics
- event-driven
- real-time
---

## What is subscribing?
Subscribing in OpenDataDSL refers to one of the following:
* **Event-driven data flows**
  > Take an automatic action based on information changes 
* **Real-time data changes**
  > React to data changes in real-time

## What can you subscribe to?
There are minor differences between the 2 different method of subscription which are explained here:

### Event-driven subscriptions
With event-driven subscriptions, as well as the entity type and id, you can specify the action taken from the following:
* Create
* Update
* Delete
* Tag
* All

### Real-time subscriptions
For real-time subscriptions, you subscribe to the id of the entities you want to listen for, and the action that is taken using a method in the format:
* ```On{entity}Create``` - e.g. OnObjectCreate
* ```On{entity}Update``` - e.g. OnObjectUpdate
* ```On{entity}Delete``` - e.g. OnObjectDelete

With real-time subscriptions, you can also listen for process and process execution messages using:
* ```OnExecutionMessage```
* ```OnProcessMessage```

### Entities

The following table shows the entities that can be subscribed to by each method:

|Entity|Event-Driven|Real-Time|
|-|-|-|
|**Data Updates**|
|Object (Master Data)|yes|yes|
|Data - timeseries|yes|yes|
|Data - curve|yes|yes|
|Data - matrix|yes|yes|
|Event|yes|yes|
|Report|yes|-|
|Calendar|yes|yes|
|Expiry Calendar|yes|yes|
|Action|-|yes|
|Workflow|-|yes|
|**Alert Events**|
|DatasetAlert - alertrecord|yes|-|
|SystemAlert - alertrecord|yes|-|
|**Server Events**|
|Process Execution Message|-|yes|
|Process Run|-|yes|


## Event-driven data flows

Event-driven data flows refer to a design pattern or architecture where data processing and communication happen in response to events or changes in the system. In this pattern, events trigger the flow of data through a system, where each event is processed independently, and a corresponding action is taken based on the event.

### What does a subscription look like?

A subscription has the following properties:

|Name|Description|Type|
|-|-|-|
|_id|Unique Id|ObjectId|
|name|Name of the subscription|String|
|description|Description of the subscription|String|
|enabled|Flag to enable/disable this subscription|Boolean|
|system|Flag to say whether this subscription is system managed and cannot be changed|Boolean|
|environment|The name of the environment to run in (default production)|String|
|objects|An array of items to subscribe to|Array of [subscription items](#subscription-item-details)|
|targets|An array of target actions to call|Array of [subscription targets](#subscription-target-details)|

#### Subscription Item details

|Name|Description|Type|
|-|-|-|
|_id|Unique Id|ObjectId or String|
|key|A name that this item is referred to as|String|
|service|The name of the service this item belongs to|String|
|id|The id of the item to subscribe to|String|
|action|The action to subscribe to (create/update/delete/tag/all)|String|

#### Subscription Target details

|Name|Description|Type|
|-|-|-|
|name|The target name, e.g. EmailTarget|String|

The rest of the properties for the subscription target are specific to the type of target

### What actions can be taken?

In OpenDataDSL, as of today, you can perform one of the following event-driven actions (known as targets):

* [Build a forward curve](curve)
  > Usually when the input data for a curve is updated you would want to build a smart curve
* [Send an email](email)
  > Use the updated data and a template to send a HTML email to a user or users
* [Run a process/workflow](process)
  > Trigger a process to run possibly to load some other data
* [Publish the data to another tenant](publish)
  > Another independent tenant can be updated with this data
* [Send the data to a message queue](queue)
  > Send the updated data as a message to be consumed by a downstream system
* [Run a report](report)
  > Run a report, maybe aggregating data from other sources
* [Run an ODSL script](script)
  > The possibilities are endless, maybe you want to perform some derivations based on the updated data
* [Write a blob to an Azure Storage Container](blob)
  > Writes the data to a blob in a container, this can be used to trigger other Azure Middleware Services
* [Target Group](group)
  > This is a group of configured targets where the data will be sent to all of them
* [Teams Channel](teams)
  > Send the data to a teams channel using the webhook teams plug-in
* [Webhook](webhook)
  > Send the data to a webhook
* [JIRA Automation](jira)
  > Send the data to a JIRA webhook to trigger an automation, e.g. to create a JIRA ticket

## Real-time data changes

The underlying infrastructure for OpenDataDSL real-time is SignalR.

SignalR is an open-source real-time communication framework developed by Microsoft. It simplifies the process of adding real-time web functionality to applications by enabling bi-directional communication between the server and client.

SignalR supports multiple client platforms, including web browsers (JavaScript), .NET, Xamarin, and other platforms through the use of client libraries. It provides a unified API for working with these different client platforms.

Key features of SignalR include:

* **Real-time updates**
  > SignalR enables real-time communication, allowing the server to push updates to connected clients instantly.
* **Scalability**
  > SignalR can scale to handle a large number of concurrent connections by using techniques like message queuing and distributed caching.
* **Cross-platform support**
  > SignalR provides client libraries for various platforms, allowing developers to build real-time applications across different devices and technologies.
* **Automatic reconnection**
  > SignalR handles automatic reconnection for clients in case of network interruptions or server restarts, ensuring a seamless user experience.
* **Security**
  > SignalR includes features for authentication and authorization, allowing developers to secure their real-time applications.

