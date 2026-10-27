---
title: Setting Service
description: REST API for the user setting service
slug: /api/rest/service/setting
tags:
  - api
  - service
  - setting
---
The setting resource stores your own settings: preferences that the portal, the Excel add-in and extensions remember for you, such as the last filter used on a screen.

## Setting REST API

The Setting REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/setting
```

Settings are personal: you only see and change your own. They are identified by name.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your settings|
|GET|\{release\}/\{name\}|v1/odsl.export.lastGroup|Retrieve a setting by name|
|POST|\{release\}|v1|Save a setting. A setting with the same name is replaced|
|DELETE|\{release\}/\{name\}|v1/odsl.export.lastGroup|Delete a setting|

## Entities

### Setting

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the setting (required)|String|
|(any)|The values you want to keep|Any|

Settings whose name starts with # are kept centrally, outside your tenant's own database, and are listed with your other settings.
