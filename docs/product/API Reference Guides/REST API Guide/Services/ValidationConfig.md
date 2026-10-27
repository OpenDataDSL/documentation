---
title: Validation Config Service
description: REST API for the validation configuration service
slug: /api/rest/service/validationconfig
tags:
  - api
  - service
  - validationconfig
  - validation
---
The validation configuration resource holds the validation configurations: for each curve or timeseries, the checks to run and their parameters. See [Validation](/docs/extensions/validation/overview).

## Validation Config REST API

The Validation Config REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/validationconfig
```

There is one configuration per data item, with the data id as its id. Configurations are versioned.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List validation configurations|
|GET|\{release\}/\{key\}|v1/NGE.GAS.TTF:MID|Retrieve the configuration of a data item|
|GET|\{release\}/\{key\}/*|v1/NGE.GAS.TTF:MID/*|List the versions of a configuration|
|POST|\{release\}|v1|Create or update a configuration|
|DELETE|\{release\}/\{key\}|v1/NGE.GAS.TTF:MID|Roll back to the previous version, or delete the configuration if it has only one version|

Use `_search` to search the name and description.

Saving a configuration also creates or updates the automation that runs its checks when the data is updated, and deleting it removes that automation. See [A validation configuration](/docs/extensions/validation/reference#a-validation-configuration) for the format.
