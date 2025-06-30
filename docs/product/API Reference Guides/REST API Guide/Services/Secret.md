---
title: Secret Service
description: REST API for the secret service for storing passwords
slug: /api/rest/service/secret
tags:
- api
- service
- secret
- password
---
The secret resource contains all your companys secrets

## Secret REST API

The Secret REST API is a full CRUD API allowing you to search and filter secrets as well as create, update and delete them. It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/secret
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all secrets (without listing the secret values)|
|GET|\{release\}/\{key\}|v1/TEST|Retrieve a single secret using its unique id|
|POST|\{release\}|v1|Create or update a secret, the secret is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/TEST|Delete a secret|

## Entities

### Secret Entity

The secret entity contains the following information:

|**Name**|**Type**|**Description**|
|-|-|-|
|_id|String|The unique identifier for this secret|
|_type|String|The type of the secret - always VarSecret|
|value|String|The actual secret|
|enabled|Boolean|A boolean to enable or disable this secret, defaults to true|
|notBefore|String|An optional date string indicating when this secret is valid from|
|expires|String|An optional date string indicating when this secret is valid to|

### Examples
Below are some examples of secrets:

#### List my companies secrets

```js
GET https://api.opendatadsl.com/api/secret/v1
```

#### Create a new secret

```js
POST https://api.opendatadsl.com/api/secret/v1

{
	"_type": "VarSecret",
	"_id": "example1",
	"value": "mysecret",
	"enabled": true,
	"notBefore": "2024-06-05",
	"expires": "2024-12-31"
}
```

#### Retrieve a secret

```js
GET https://api.opendatadsl.com/api/secret/v1/example1
```

#### Delete a secret

```js
DELETE https://api.opendatadsl.com/api/secret/v1/example1
```
