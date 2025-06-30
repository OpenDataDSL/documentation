---
title: Automation Service
description: REST API for the automation service
slug: /api/rest/service/automation
tags:
- api
- service
- automation
---
The automation resource contains all the automations that you have configured

## Automation REST API

The Automation REST API is a full CRUD API allowing you to search and filter automations as well as update and delete them. 
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/automation
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all automations|
|GET|\{release\}/\{id\}|v1/68527adfe438ee467f057624|Get a specific automation using its _id|
|POST|\{release\}|v1|Create or update an automation, the automation is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/id|Delete an automation|

### Notes
Automation ids and log ids are ObjectID types.

## Special REST Calls

### Test an automation
To test an automation, use the GET an automation with a ```_run=true``` query parameter:

* Example running an automation
  > GET https://api.opendatadsl.com/api/automation/v1/629722af2fb32f0e13c7c3de?_run=true


## Entities

### Automation Entity

The automation entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the automation (an object id)|ObjectId|
|_type|The type of the automation - always VarAutomation|String|
|active|If true, this automation is live|Boolean|
|owner|ReadOnly: The person who created/updated the automation (uses their security policies)|String|
|conditions|An array of objects with the conditions that will fire this automation|Condition[]|
|target|The automation target to fire|String|
|icon|The icon (bootstrap icons) to be shown next the automation in the GUI - usually the same as the target icon|String|
|template|The text used to collect information from the user|String|
|name|ReadOnly: The name is generated from the template and properties|String|
|properties|The properties array to send to the target|Object|

### Condition Entity

The Condition entity is used to determine if this automation should fire:

|**Name**|**Description**|**Type**|
|-|-|-|
|source|The source of the data that the condition relates to|String|
|service|The name of the service the condition relates to|String|
|id|The id of the data|String|
|action|An array of actions that determines what triggers this condition|String|
|key|An optional custom key to name this data in the target system (_id in the data will be changed to this if it is set)|String|

### Properties Entity

The properties entity is used to configure an [Automation Target](automationtarget):

```json
{
  "varname": "value entered by user",
  "string": "A string property with no default value",
  "group": "group id",
  "transformer": "id of a script"
}
```

## Examples

### Example with a transformer
```json
{
    "_id": "\{objectid\}",
    "_type": "VarAutomation",
    "target": "odsl.email_attachment",
    "active": true,
    "template": "When AAA:CURVE is updated, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName].",
    "properties": {
      "to": "user@company.com",
      "subject": "Data is updated",
      "attachment": true,
      "attachmentName": "data_$\{date:yyyy-MM-dd\}.csv",
      "@transformer": "#VarCurve_CSV"
    },
    "conditions": [{
      "source": "private",
      "service": "data",
      "id": "AAA:CURVE",
      "action": "update"
    }]
}
```
### Example with a property name change
```json
{
  "_id": "6855145134ff6a7e14c20c10",
  "_type": "VarAutomation",
  "active": true,
  "target": "odsl.email_attachment",
  "icon": "envelope-paper",
  "template": "When property [@propertyName] on AAA changes to [@propertyValue], send an email to [to] with subject [subject], add the data as an attachment named [attachmentName].",
  "properties": {
    "to": "user@company.com",
    "subject": "Property Change Test",
    "attachment": true,
    "attachmentName": "AAA.json",
    "@propertyName": "isAutomated",
    "@propertyValue": "true"
  },
  "conditions": [{
    "source": "private",
    "service": "object",
    "id": "AAA",
    "action": "update"
  }]
}
```