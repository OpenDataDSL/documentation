---
title: Tenant Service
description: REST API for the tenant service
slug: /api/rest/service/tenant
tags:
  - api
  - service
  - tenant
---
The tenant resource is a service to view and record your company information and tenancy configuration

## Tenant REST API

The Tenant REST API is a private API allowing you to read your tenant information and update your company information and is accessed through the following URL:
```js
https://api.opendatadsl.com/api/tenant
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|View your tenant information, including its quotas, features and properties|
|GET|\{release\}?_function=quota|v1?_function=quota|Your quota for each limited service, with how much of it you have used: a list of `service`, `quota` and `used`|
|POST|\{release\}|v1|Update your company information|

## Updating your company information

To update your company information you need to make a post request to the tenant service, you can use the template below to do this:
```js
POST https://api.opendatadsl.com/api/tenant/v1

{
  "properties": {
    "name": "",
    "address1": "",
    "address2": "",
    "city": "",
    "postcode": "",
    "email": "",
    "phone": "",
    "accountContact": ""
  }
}
```

You can update these parts of the tenant: `name`, `properties`, `accountContacts`, `preferences`, and the MongoDB connection strings in `mongodb` and `connections` (which must start with `mongodb`). Tenant settings can only be changed by OpenDataDSL.

:::caution
The `properties` you send replace all the existing properties: they are not merged. To change one property, read the tenant first, change the property, and send all the properties back.
:::
