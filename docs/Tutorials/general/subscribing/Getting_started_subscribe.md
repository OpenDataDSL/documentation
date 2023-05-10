---
slug: /tutorials/gettingstarted1
title: Subscribing to Data-Feeds - Part 1
description: Subscribe to data changes
sidebar_position: 2
tags:
  - tutorial
  - subscription
  - getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

A "Getting Started" guide to OpenDataDSL - subscribe to our **FREE** public data feeds.

This is the first of the "Getting Started" series of tutorials which take you through real-world examples of how to 
work with OpenDataDSL.

In this tutorial, we take you step-by-step through the process of subscribing to a FREE data feed and take you through
various options for feeding that data into databases and applications within your own enterprise. 

The diagram below explains the areas that this tutorial covers.

![](/img/tutorial/getting-started-1-overview.png)

We are going to feed the data file to your choice of 3 different consumers:
* A C# application which will feed the data into a local SQL Server Database
* A Java application that uses [Camel](https://camel.apache.org/) Enterprise Integration Pattern (EIP) which will feed into a local Kafka topic
* A Cloud BI Reporting tool

:::info
In our tutorial, only one consumer will work at a time. 
You can implement all the consumers if you like by configuring addition queue targets to send the subscriptions to.  
::: 

## Step 1 - Subscribing to a data feed

In this tutorial, we are going to subscribe to a daily feed of FX rates as provided by the European Central Bank. 
The dataset code is [ECB_FX](/docs/data/fx#ecb_fx), there are 32 exchange rates against the Euro from various other currencies.

### Create a queue

In this step we will create a queue that will be used with the subscription that we create.

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Queues**
* Click the **New** button to open up the queue creation screen.
* Give the queue the name **tutorial**
* Ignore the handler as we are going to handle the queue consumption ourself
* After creation, you will see the queue details on the screen, copy the **connection** string, you will need this for later on


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
tutorial = Queue("tutorial")
save tutorial
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/service/queue/v1
Authorization: Bearer {{token}}

{
  "queue": "tutorial"
}
```

</TabItem>
</Tabs>

### Subscribe to data

We now need to create a subscription that will feed some FX TimeSeries into our newly created queue.

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Click the **New** button to open up the subscription creation screen
* Give the subscription the name **sub_ecb_fx**
* Click on the **Add Data** button
* Add a **Filter** by clicking the + button and select **Dataset**
* Find **ECB_FX** in the list
* Click the check-box next to a few of the data items
* Click **OK**
* Click on the **Add Target** button
* Select **Queue Target** from the dropdown and then select the **tutorial** queue that we created in the previous step
* Click **OK** to save our subscription


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Create the subscription
sub = Subscription()
sub.name = "sub_ecb_fx"
sub.addQueueTarget("tutorial")
sub.addItem("#ECB_FX.EURGBP:SPOT", "GBP")
sub.addItem("#ECB_FX.EURJPY:SPOT", "JPY")
sub.addItem("#ECB_FX.EURUSD:SPOT", "USD")
sub.addProcessTarget("MYPROCESS")
save sub
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/service/subscription/v1
Authorization: Bearer {{token}}

{
    "name": "sub_ecb_fx",
    "objects": [{
        "key": "GBP",
        "id": "#ECB_FX.EURGBP:SPOT"
    },{
        "key": "JPY",
        "id": "#ECB_FX.EURJPY:SPOT"
    },{
        "key": "USD",
        "id": "#ECB_FX.EURUSD:SPOT"
    }],
    "targets":[{
      "name": "QueueTarget",
      "queue": "tutorial"
    }]
}
```

</TabItem>
</Tabs>

### Trigger the subscription
We now need to trigger the subscription to feed some data into the queue so that we can test.
You can do this as many times as you need when you are testing our subscription consumer.

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Click on the **sub_ecb_fx** subscription.
* Click the trigger item
* Select a date that you know there is some data (e.g. 4th October 2021) for and click **ok**

</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
trigger sub_ecb_fx for 2021-10-04
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/service/subscriptionrecord/v1
Authorization: Bearer {{token}}

{
  "name": "sub_ecb_fx",
  "date": "2021-10-04"
}
```

</TabItem>
</Tabs>

This will send a subscription record to the queue, which will look something like this:

```json
{
  "subscription": "61602bc1b5a8223b48998ce6",
  "name": "sub_ecb_fx",
  "date": "Mon, 04 Oct 2021 00:00:00 GMT",
  "status": {
    "GBP": {
      "_type": "#Delta",
      "id": "#ECB_FX.EURGBP:SPOT",
      "action": "create",
      "time": "Mon, 04 Oct 2021 00:00:00 GMT",
      "tenors": [
        {
          "_type": "#DeltaTenor",
          "time": "2021-10-04T00:00:00.000Z",
          "tenor": "SPOT",
          "value": 0.8553
        }
      ]
    },
    "JPY": {
      "_type": "#Delta",
      "id": "#ECB_FX.EURJPY:SPOT",
      "action": "create",
      "time": "Mon, 04 Oct 2021 00:00:00 GMT",
      "tenors": [
        {
          "_type": "#DeltaTenor",
          "time": "2021-10-04T00:00:00.000Z",
          "tenor": "SPOT",
          "value": 129.21
        }
      ]
    },
    "USD": {
      "_type": "#Delta",
      "id": "#ECB_FX.EURUSD:SPOT",
      "action": "create",
      "time": "Mon, 04 Oct 2021 00:00:00 GMT",
      "tenors": [
        {
          "_type": "#DeltaTenor",
          "time": "2021-10-04T00:00:00.000Z",
          "tenor": "SPOT",
          "value": 1.1636
        }
      ]
    }
  }
}
```

## Step 2 - Create our consumer

Here we need to decide which consumer(s) we want to create for our subscription

* [Feed SQL Server Database](/docs/tutorials/gettingstarted1sql)
* [Feed ServiceBus](/docs/tutorials/gettingstarted1camel)

