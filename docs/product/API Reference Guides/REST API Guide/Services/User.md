---
title: User Service
description: REST API for the user service
slug: /api/rest/service/user
tags:
  - api
  - service
  - user
---
The user resource is a service to view and record your user information

## User REST API

The User REST API is a private API allowing you to read and update your user information and is accessed through the following URL:
```json
https://api.opendatadsl.com/service/user
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List all users for your tenant|
|GET|{release}/me|v1|Get your user information|
|GET|{release}/{email}|v1|Get another users information from your tenant|
|POST|{release}|v1|Update your user information|

## Updating your user information

To update your company information you need to make a post request to the tenant service, you can use the template below to do this:
```json
POST https://api.opendatadsl.com/service/user/v1
Authorization: Bearer {{token}}

{
  "firstname": "",
  "lastname": "",
  "nickname": ""
}
```
