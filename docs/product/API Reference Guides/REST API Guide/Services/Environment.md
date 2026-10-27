---
title: Environment Service
description: REST API for the environment service
slug: /api/rest/service/environment
tags:
  - api
  - service
  - environment
---
Contains information about your data environments

## Environment REST API

The Environment REST API is a full CRUD API allowing you to search and filter your data environments as well as create, update and delete them. It is accessed through the following URL:
```js
https://api.opendatadsl.com/api/environment
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all the environments|
|GET|\{release\}/\{key\}|v1/TEST|Retrieve a single named environment using it’s unique id|
|POST|\{release\}|v1|Create or update an environment. The JSON body of the POST request is a simple JSON object with at least an _id property|
|DELETE|\{release\}/\{key\}|v1/TEST|Delete the environment. This completely removes the environment and all the data in it, with its automations. It cannot be done on the production or preview environments|

:::note
The production and preview environments always exist: they are created for you when you list your environments. The number of environments you can create is limited by your tenant's environment quota (see the tenant service's `quota` function).
:::

## Entities

### Environment Entity

The environment entity contains the following properties

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the data environment|String|
|name|The name of the data environment|String|
|description|A description of the data environment|String|
|_createdBy|The user id (email) of the user that created the environment|String|
|_timestamp|The timestamp of when the environment was created|String(DateTime)|
|_size|The size of the stored data in the environment|int|

