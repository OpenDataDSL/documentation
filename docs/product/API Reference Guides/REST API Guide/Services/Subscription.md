---
title: Subscription Service
description: REST API for the subscription service
slug: /api/rest/service/subscription
tags:
  - api
  - service
  - subscription
---
The subscription resource is used to manage subscriptions

## REST API

The Subscription REST API is a full CRUD API and is accessed through the following URL:

```js
https://api.opendatadsl.com/api/subscription
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all your subscriptions|
|GET|\{release\}/\{key\}|v1/TEST|Retrieve a subscriptions using its name|
|POST|\{release\}|v1|Create or update a subscription, the subscription configuration is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/TEST|Delete a subscription|

## Entities

### Subscription configuration

The subscription configuration contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Unique name for the subscription|String|
|enabled|A boolean indicating if this subscription is active|Boolean|
|objects|A list of resources to subscribe to|List(Object)|
|targets|A list of targets to send the subscribed resources to|List(Object)|

### Subscribed items

The ```objects``` element of the subscription configuration contains the resources that you want to subscribe to and has the following attributes:

|**Name**|**Description**|**Type**|
|-|-|-|
|service|The name of the service for the resource, e.g. object, data etc.|String|
|id|The id of the resource|String|
|key|A definable reference that can be used to identify this resource|String|
|action|A list of actions that will trigger this subscription|List(String)|

### Targets

The ```targets``` element of the subscription contains the targets that you want to send the data to, each target type has a different configuration.

#### BlobTarget

A target to send data to an Azure Blob

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'BlobTarget'|String|
|storage|The URL for the Azure storage|String|
|container|The name of the Blob storage container|String|
|path|Optional path within the storage container|String|
|adls|A boolean indicating if this is Azure Data Lake Storage|Boolean|

#### CurveTarget

A target to build a curve

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'CurveTarget'|String|
|curve|The id of the curve to build|String|

#### EmailTarget

A target to send data as an email

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'EmailTarget'|String|
|to|A comma or space separated list of recipient email addresses|String|
|html|An optional mustache template script to convert the data to html|String|
|subject|The subject of the email|String|
|attachment|A boolean indicating to send the data as an attachment, defaults to true|Boolean|

#### ProcessTarget

A target to trigger the running of a process

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'ProcessTarget'|String|
|process|The name of the process to trigger|String|

#### PublishTarget

A target to publish data to another tenant

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'PublishTarget'|String|
|to|The id of the tenant to publish to|String|

#### QueueTarget

A target to send data to a message queue

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'QueueTarget'|String|
|queue|The name of the queue to send the data to|String|
|subject|The optional subject to add to the message|String|

#### ReportTarget

A target to run a report

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'ReportTarget'|String|
|report|The id of the report to run|String|
|range|The optional date range to run the report for|String|

#### ScriptTarget

A target to run a script

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'ScriptTarget'|String|
|script|The id of the script to run|String|

#### WebhookTarget

A target to send data to a webhook URL

|**Name**|**Description**|**Type**|
|-|-|-|
|name|Always 'WebhookTarget'|String|
|url|The webhook url to send the data to|String|

## Examples

```js
### Get build info
GET {{url}}/subscription
Authorization: Bearer {{token}}

### List all my subscriptions
GET {{url}}/subscription/v1
Authorization: Bearer {{token}}

### List all my subscription names
GET {{url}}/subscription/v1?_distinct=name
Authorization: Bearer {{token}}

### List all my subscriptions of a specific target type
GET {{url}}/subscription/v1?targets.name=PublishTarget
Authorization: Bearer {{token}}

### Get a specific subscription
GET {{url}}/subscription/v1/EEX.NG.AT.CEGH_VTP.H8B.FUT:SC_BST_SETTLE
Authorization: Bearer {{token}}

### Create a subscription
POST {{url}}/subscription/v1
Authorization: Bearer {{token}}

\{
    "name": "QAExample",
    "objects": [\{
        "key": "PRIMARY",
        "id": "NZ_FONTERRA_SALTED_25KG_NZ:CURVE",
        "optional": false,
        "action": ["create","update"]
    \}],
    "targets":[\{
      "name": "ProcessTarget",
      "process": "SimpleScript"
    \}]
\}

### Delete a subscription
DELETE {{url}}/subscription/v1/QAExample
Authorization: Bearer {{token}}

```
