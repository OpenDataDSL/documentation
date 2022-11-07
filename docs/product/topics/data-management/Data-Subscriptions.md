---
slug: /odsl/dm/subscriptions
sidebar_position: 5
tags:
  - data_management
  - subscription
---
Data Subscriptions
=============

This guide takes you through how data subscriptions work

## Introduction
A data subscription is a record of one or more data objects that we want to perform an action on/with when they change.

## Subscription Definition
The subscription itself is created as an object of type **#Subscription** which also uses **#SubscriptionObject** and **#SubscriptionTarget**.
See the definitions below:

```js
#SubscriptionObject = type
    key as String()
    id as String()
    optional as Boolean()
end

#SubscriptionTarget = type
    name as String()
end

#Subscription = type
    name as String()
    description as String()
    enabled as Boolean()
    objects as List(#SubscriptionObject)
    targets as List(#SubscriptionTarget)
end
```

### Subscription Object
The SubscriptionObject defines each object that you are interested in, the properties of this are:
* key - A unique identifier for this object, this can be the same as the id of the object or can be an id used by the target system
* id - The id of the object or data that you want to subscribe to
* optional - When sending the subscription data to the targets, all non-optional objects must be present before anything is sent

Example:
```js
objects[0] = object as #SubscriptionObject
    key = "GBP"
    id = "#ECB_FX.EURGBP:SPOT"
    optional = false
end
```

### Subscription Target
The SubscriptionTarget defines where to send the data to, the type only defines a name property, but each target has it's own properties as shown below.

This following section defines each named target
#### QueueTarget
This sends the fulfilled subscription to a queue, the additional properties required on the target are:
* subject - The message subject
* queue - The name of the queue to send the fulfilled subscription to

Example:
```js
targets[0] = object as #SubscriptionTarget
    name = "QueueTarget"
    subject = "SQL Data"
    queue = "sql"
end
```

#### ProcessTarget
This triggers a process and sends the fulfilled subscription to the process as input data, the additional properties required on the target are:
* process - The name of the process

Example:
```js
targets[0] = object as #SubscriptionTarget
    name = "ProcessTarget"
    process = "ABC_LOADER"
end
```

#### CurveTarget
This triggers a curve build, the additional properties required on the target are:
* curve - The name of the curve configuration to trigger

Example:
```js
targets[0] = object as #SubscriptionTarget
    name = "CurveTarget"
    curve = "ABC_POWER_CURVE"
end
```

#### EmailTarget
This target sends an email which can be populated with information from the fulfilled subscription, the additional properties required on the target are:
* to - The recipient(s) of the email
* subject - The email subject message
* html - The HTML body of the message

The HTML body can include some variables which will be substituted when sent.
Each variable is surrounded by double curly braces, e.g. {{var}}

Here are the variables that can be substituted:
* subscription.name - The name of the subscription
* subscription.description - The description of the subscription
* record.date - The date of the subscription fulfillment
* record.idlist - A list of the id's of the fulfilled objects
* record.keylist - A list of the key's of the fulfilled objects

Example:
```js
targets[0] = object as #SubscriptionTarget
    name = "EmailTarget"
    to = "me@abc.com"
    subject = "Subscription Subject"
    html = "<p>Subscription: {{subscription.name}} for: {{record.date}}</p><p>{{record.idlist}}</p>"
end
```

### Subscription
This is the main configuration part of the subscription, the properties of this are:
* name - The name of the subscription
* description - A description of the subscription
* enabled - A boolean indicating whether this subscription is live (enabled)
* objects - A list of the subscibed objects
* targets - A list of the targets to send the fulfilled subscription to

Complete example:
```js
SQL_DATA_ECB_FX = object as #Subscription
    name = "SQL_DATA_ECB_FX"
    description = "Send ECB_FX data to SQL Server"
    enabled = true
    objects[0] = object as #SubscriptionObject
        key = "GBP"
        id = "#ECB_FX.EURGBP:SPOT"
    end
    objects[1] = object as #SubscriptionObject
        key = "JPY"
        id = "#ECB_FX.EURJPY:SPOT"
    end
    objects[2] = object as #SubscriptionObject
        key = "USD"
        id = "#ECB_FX.EURUSD:SPOT"
    end
    targets[0] = object as #SubscriptionTarget
        name = "QueueTarget"
        queue = "sql"
    end
end
```  

