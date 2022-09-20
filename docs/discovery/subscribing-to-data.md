---
title: Subscribing To Data
hide_title: true
sidebar_position: 3
tags:
  - discovery
  - odsl
  - subscription
  - queue
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth} from '/src/components/Discovery.js';

<Discovery title="Subscribing to Data" text="This discovery guide gives information on how to integrate both the public data and your proprietary data into other cloud systems or your local database infrastructure." />

## Introduction to Queues
OpenDataDSL queues are used to move data between between applications in a robust and orderly fashion.
You send data as a message on a queue that can then be read by a 'handler' application.
This handler can be the OpenDataDSL data loader which expects batches of objects or can be an external application either in the cloud or on your internal infrastructure.

<InDepth href="/docs/odsl/dm/queues" />

## Subscribing to Data
In OpenDataDSL we classify data as either `public` or `private`.

### Public Data
Public data is any data which is in the public domain and is freely accessible, distributable and usable.
We collect this data, store it in our database and make it easily and freely accessable for you.

Public data identities always start with a `#` for example: `#AHDB`

### Private Data
Private data is any data that you have loaded which can either be from an external restricted provider or your own internal proprietary data.
This data is stored in your own private database which by default is hosted in the OpenDataDSL database cluster, but can also be your own private MongoDB Atlas cluster.

### Subscriptions
OpenDataDSL subscriptions define a list of objects or data that you are interested in and a list of targets that you want to send these objects to.
Subscriptions get fulfilled whenever an object is updated (thereby making it event-driven) and you can choose whether to wait until all or some objects are updated before sending to the targets.
The target generally is a queue, but can also be other special targets, e.g. a forward curve build configuration.

<InDepth href="/docs/odsl/dm/subscriptions" />

## Integration Examples
The main reason for subscribing to data is to feed that data into an application or database.
The subscription remains the same no matter what the downstream target is.
Integration into the downstream target can be done in a large variety of ways, using various off-the-shelf tools and APIs.

Some example integrations:
* Feed an on-premise Relational Database - such as Microsoft SQL Server or Oracle etc.
* Feed an on-premise Enterprise Service Bus - such as TIBCO or BizTalk etc.
* Feed a cloud Service Bus - such as Microsoft Azure Service Bus
* Feed a BI Reporting Tool - such as SAP Business Objects, QlikSense or Tableau etc.

<InDepth href="/docs/tutorials/gettingstarted1" />

---

<StartBuilding />