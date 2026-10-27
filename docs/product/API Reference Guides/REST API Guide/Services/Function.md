---
title: Function Service
description: REST API for the ODSL function list service
slug: /api/rest/service/function
tags:
  - api
  - service
  - function
---
The function resource lists every built-in ODSL function, with its parameters, so tools such as editors can offer them. It is read-only.

## Function REST API

The Function REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/function
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all the ODSL functions, sorted by name|

## Entities

### Function

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The function name|String|
|category|The category of the function|String|
|class|The group of functions it belongs to|String|
|description|What the function does|String|
|constructor|How to call it, with its parameter names|String|
|params|The parameters, each with name, description and type|Object[]|
|returns|What it returns|String|
|tags|Tags for the function|String[]|
|link|The function's page in this documentation|String|
