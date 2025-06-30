---
title: Extension Service 🆕
description: REST API for the extension service
slug: /api/rest/service/extension
tags:
- api
- service
- extension
- new
---
The extension resource contains all the application extensions available and the ability to create and publish your own extensions. 

## Extension REST API

The Extension REST API is a full CRUD API allowing you to search and filter extensions as well as update, version and delete them. 
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/extension
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/public|v1/public|List public extensions that you can install privately|
|GET|\{release\}/private|v1/private|List extensions that either your company has created or installed|
|GET|\{release\}/\{source\}/\{key\}|v1/private/odsl.example|Retrieve a single extension using its unique id|
|GET|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/odsl.example/1|Retrieve a version of a single extension|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/odsl.example/*|Get a list of versions for a specific extension|
|PUT|\{release\}/\{source\}/\{key\}/\{version\}/\{tag\}|v1/private/odsl.example/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|\{release\}|v1|Create or update an extension, the extension is the body of the POST request|
|DELETE|\{release\}/private/\{key\}|v1/private/odsl.example|Uninstall an extension|

## Special REST Calls

### Publish an extension
To publish an extension to the public repository, you need to:

* Read the extension from the private repository, e.g.
  > GET https://api.opendatadsl.com/api/extension/v1/private/odsl.example
* Make a POST request to public with the **_publish** query parameter and the body is the extension that was read, e.g.
  > POST https://api.opendatadsl.com/api/extension/v1/public?_publish=true

### Install/upgrade an extension
To install an extension to your own environment, you need to:

* Read the extension from the public repository, e.g.
  > GET https://api.opendatadsl.com/api/extension/v1/public/odsl.example
* Make a POST request to private with the **_publish** query parameter and the body is the extension that was read, e.g.
  > POST https://api.opendatadsl.com/api/extension/v1/private?_publish=true

### Uninstall an extension
To uninstall an extension from your private environment, you need to:

* Make a DELETE request to the private source, e.g.
  > DELETE https://api.opendatadsl.com/api/extension/v1/private/odsl.example

### Get a view
To get/run a view for an extension, you need to make a GET request with the name of the view, also adding an Accept header for text/html 
  
```
GET <https://api.opendatadsl.com/api/extension/v1/private/{_id}/view/{view.name}>

e.g. 

GET https://api.opendatadsl.com/api/extension/v1/private/odsl.example/view/test
Authorization: Bearer {token}
Accept: text/html
```

## Entities

### Extension Entity

The extension entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the extension (must be \{publisher\}.\{code\})|String|
|_type|The type - always VarExtension|String|
|publisher|The publisher of the extension|String|
|code|The code id of the extension|String|
|name|The name of the extension|String|
|description|The long description of the extension to be shown in the extension catalog|String|
|icon|The icon (bootstrap icons) to be shown next the extension name in the catalog|String|
|views|An array of views to be shown in the portal or excel add-in|ExtensionView[]|
|resources|A set of resources used by this extension that will be published/installed|Object (See Below)|

### Extension View Entity

The Extension View entity is used to configure the views in the portal and excel add-in and contains the following:

|**Name**|**Description**|**Type**|
|-|-|-|
|section|The section in the menu to display this view, defaults to Extension|String|
|name|The name of the view|String|
|description|Description of the view|String|
|tabname|The name of the tab, defaults to 'Main'|String|
|appname|The name of the app, this is only used if the view is in the **Apps** tab|String|
|excel|True if this is an Excel Add-in view, defaults to false|Boolean|
|insights|True if an **Insights** tab should be added, defaults to false|Boolean|
|icon|The icon shown next to the name in the GUI|String|
|feature|The feature policy used to determine if a user can see this view|String|
|script|The mustache script containing the code for this view|String|

### Resources
Extension resources and a list of entities which need to be installed with the extension.
Resources are a JSON document, with each key in the document being a service name.
The value of the service can either be a document or array, e.g.

```json
{
  "resources": {
    "policy": ["odsl.example.test"]
  }
}
```

```json
{
  "resources": {
    "policy": {
      "test" : "odsl.example.test"
    }
  }
}
```

#### Resource scripts
There are 3 optional special scripts which can be defined:

* **install** - This script will be run when an extension is installed into a client environment after all the defined resources have been copied
* **upgrade** - This script will be run when a new version of an extension is available and upgrades an already installed extension in a client environment
* **uninstall** - This script will be run after an extension is uninstalled and all the defined resources have been removed

The special resource scripts are defined as follows:

```json
{
  "resources": {
    "script": {
      "install" : "odsl.example.install",
      "upgrade" : "odsl.example.upgrade",
      "uninstall" : "odsl.example.uninstall"
    }
  }
}
```

## Example Extension Manifest

```json
{
  "_id": "odsl.example",
  "_type": "VarExtension",
  "publisher": "odsl",
  "code": "example",
  "name": "Example Extension",
  "views": [
    {
      "section": "Examples",
      "name": "test",
      "excel": false,
      "insights": true,
      "icon": "graph-up-arrow",
      "feature": "odsl.example.test",
      "script": "odsl-extensions\extensions\example\odsl.example.test"
    }
  ],
  "resources": {
    "policy": [
      "extension.odsl.example"
    ],
    "script": {
      "install": "odsl-extensions\extensions\example\odsl.example.install",
      "uninstall": "odsl-extensions\extensions\example\odsl.example.uninstall",
      "upgrade": "odsl-extensions\extensions\example\odsl.example.upgrade"
    }
  }
}
```

## Realtime Messages

When installing or uninstalling an extension, important information is sent as messages to the [Realtime Services](/docs/api/realtime).

The message is sent to the **OnExtensionMessage** method when subscribing to an extension, example message:

```json
{
  "message": "2025-05-09T11:48:17.090061400Z[UTC] info Upgrading extension in environment"
}
```

