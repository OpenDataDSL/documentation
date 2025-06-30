---
title: Automation Target Service
description: REST API for the automation target service
slug: /api/rest/service/automationtarget
tags:
- api
- service
- automation
- target
---
The automation target resource contains all of the standard and custom created automation targets available in the platform.

An automation target is a resource where data can be sent to, i.e. Email, Message Queue etc.

An automation target is created in your private source and can be published to make it accessible to all clients using the OpenDataDSL platform (In the same way as [Extensions](extension))

## Automation Target REST API

The Automation Target REST API is a full CRUD API allowing you to search and filter automation targets as well as update, version and delete them. 

It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/automationtarget
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List all automation targets|
|GET|{release}/{key}|v1/odsl.email|Retrieve a single automation target using its unique id|
|GET|{release}/{key}/{version}|v1/odsl.email/1|Retrieve a version of a single automation target|
|GET|{release}/{key}/*|v1/odsl.email/*|Get a list of versions for a specific automation target|
|PUT|{release}/{key}/{version}/{tag}|v1/odsl.email/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update an automation target, the automation target is the body of the POST request|
|DELETE|{release}/{key}|v1/odsl.email|Rollback to the previous version of an automation target, if it is the only version then the automation target will be deleted|
|DELETE|{release}/{key}/{version}|v1/odsl.email/1|Delete a specific version of an automation target|
|DELETE|{release}/{key}/*|v1/odsl.email/*|Fully delete an automation target, including all versions|

## Special REST Calls

### Publish an automation target
To publish an automation target to the public repository, you need to:

* Make a POST request to public with the **_publish** query parameter, the id of the target and an empty body, e.g.
  > POST https://api.opendatadsl.com/api/automationtarget/v1/publisher.code?_publish=true

## Entities

### Automation Target Entity

The automation target entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the automation target (must be {publisher}.{code})|String|
|_type|The type - always VarAutomationTarget|String|
|publisher|The publisher of the automation target|String|
|code|The code id of the automation target|String|
|name|The name of the automation target|String|
|description|The long description of the automation target|String|
|icon|The icon (bootstrap icons) to be shown next the automation target name in the GUI|String|
|script|The script that performs the action|String (Script name)|
|template|The text used to collect information from the user and the data to collect|String|
|tags|A list of strings used to categorise this automation target|List(String)|
|properties|The properties array to send to the target|Object|
|inputs|The input configuration information|Object|
|services|The services this target can work with, * for all|List(String)|
|actions|The actions this target can work with, * for all|List(String)|
|allowTransformation|True if we allow the user to specify a transformer to transform the data to be submitted|Boolean|
|allowPropertyChange|True if we allow the user to specify a check for a property changing to either a specific value or anything|Boolean|

### Target Templates

The template on the automation target should be structured as an variable encoded string such that the GUI can collect information from the user.

The syntax for each variable in the string is as follows:

```js
[varname]
```

#### Example

```js
Send an email to [to] with subject [subject], add the data as an attachment named [attachmentName].
```

### Target Inputs

The inputs object must contain the configuration of the inputs defined in the target template.

Each property should have:
* A description to be shown as help in the GUI
* A type, if omitted it defaults to String
* An optional filter to be used to filter items if type is group, object, calendar, expiry, data  
* An optional default value


#### Example for above template
```json
{
    "to": {
        "description": "The email address of the recipient(s) of the email, separate multiple email addresses with either ,; or space"
    },
    "subject": {
        "description": "The message subject"
    },
    "attachmentName": {
        "description": "The name of the file in the attachment, default is the id of the variable, can use embedded dates"
    }
}

```

#### General example

```json
{
  "varname": {
    "description": "Text description of the input property",
    "type": "The type of input, e.g. String, Boolean, VarGroup etc.",
    "default": "An optional default value for this input property" 
  },
  "string": {
    "description": "A string property with no default value"
  },
  "group": {
    "description": "A property which expects a group id, the GUI will show a group selector",
    "type": "group",
    "filter": {
      "type": "Favourites"
    }
  },
  "object": {
    "description": "A property which expects a master data id, the GUI will show an object selector",
    "type": "object",
    "filter": {
      "_type": "#ForeignExchange"
    }
  }
}
```


### Target Properties
The properties object is sent to the target, you can set any defaults on this and all the inputs provided by the GUI will be appended to it.

#### Example

```json
{
  "attachment": true
}
```

## Examples

### The email target

```json
{
  "publisher": "odsl",
  "code": "email",
  "name": "Send an email",
  "description": "Send the data to 1 or more email addresses",
  "icon": "envelope-at",
  "script": "@EmailTarget",
  "template": "send an email to [to] with subject [subject]",
  "tags":["Communication"],
  "inputs": {
    "to": {
      "description": "The email address of the recipient(s) of the email, separate multiple email addresses with either ,; or space"
    },
    "subject": {
      "description": "The message subject"
    }
  },
  "properties": {
    "attachment": false
  },
  "services": ["*"],
  "actions": ["*"],
  "allowTransformation": true,
  "allowPropertyChange": true
}
```

### The curve build target

```json
{
	"publisher": "odsl",
	"code": "curve",
	"name": "Build a curve",
	"description": "Triggers a curve build",
	"icon": "graph-up",
	"script": "@CurveTarget",
	"template": "build curve [curve]",
	"tags":["Curves", "Process", "Automation"],
	"inputs": {
		"curve": {
			"description": "The id of the curve to build"
		}
	},
	"properties": {},
	"services": ["data"],
	"allowTransformation": false,
    "allowPropertyChange": false,	
    "actions": ["update"]
}
```