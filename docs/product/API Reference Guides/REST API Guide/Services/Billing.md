---
title: Billing Service
description: REST API for the billing service
slug: /api/rest/service/billing
tags:
  - api
  - service
  - billing
---
The billing resource gives you read-only access to your invoices, your pricing plan and the usage you are billed for.

## Billing REST API

The Billing REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/billing
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your invoices|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve an invoice|
|GET|\{release\}/current|v1/current|Your invoice for this month so far|
|GET|\{release\}/pricing|v1/pricing|Your pricing plan|
|GET|\{release\}/users|v1/users|The user events (users added, deleted and invited) used to bill users|
|GET|\{release\}/storage|v1/storage|Your storage usage records|
|GET|\{release\}/process|v1/process|Your process usage records|
|GET|\{release\}/ai|v1/ai|Your Fusion AI usage records|

## Entities

### Invoice

|**Name**|**Description**|**Type**|
|-|-|-|
|tenant|Your tenant name|String|
|tid|Your tenant id|String|
|name|Your company name|String|
|address|Your company address|String|
|ref|The invoice reference|String|
|date|The invoice date|DateTime|
|year|The year billed|Integer|
|month|The month billed|String|
|pricingPlan|Your pricing plan|String|
|charges|The charges before VAT|Number|
|vat|The VAT|Number|
|total|The total|Number|
|detail|The invoice lines|Object[]|
