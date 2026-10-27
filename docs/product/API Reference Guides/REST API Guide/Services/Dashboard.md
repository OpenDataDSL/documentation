---
title: Dashboard Service
description: REST API for the dashboard service
slug: /api/rest/service/dashboard
tags:
  - api
  - service
  - dashboard
---
The dashboard resource holds the dashboards people build in the portal.

## Dashboard REST API

The Dashboard REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/dashboard
```

Dashboards are versioned. A list only shows your own dashboards and the ones that are shared.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/private|List your dashboards and the shared ones|
|GET|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Retrieve a dashboard|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/6721f0c2a4b9e85d3c0f1a77/*|List the versions of a dashboard|
|POST|\{release\}/\{source\}|v1/private|Create or update a dashboard|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Roll back to the previous version, or delete the dashboard if it has only one version|

## Entities

### Dashboard

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the dashboard, set by the platform when you create one|String|
|name|The name of the dashboard (required)|String|
|shared|True to share the dashboard with everyone in your tenant, defaults to false|Boolean|
|owner|The email of the owner, defaults to the person who creates it|String|

The rest of the dashboard is its layout, as saved by the portal. Only the owner can update a dashboard.
