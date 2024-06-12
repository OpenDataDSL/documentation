---
slug: /odsl/variable/secret
tags:
  - secret
  - scalar
---
Secret
======================

A secret is a scalar whose value cannot be printed or logged, it only really is useful when used with the Secret Service where secrets can be stored and then retrieved by scripts or workflows. Usually secrets are used to store passwords and database connection information etc.

## Construction

You can construct a secret using one of the constructor functions:
```js
// Create a new secret
sec = Secret("password!")
```
If you try to print a secret, you just see the following:
```js
`********`
```

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The name of the secret|Scalar(String)|
|value|String|The actual secret|
|enabled|Boolean|A boolean to enable or disable this secret, defaults to true|
|notBefore|String|An optional date string indicating when this secret is valid from|
|expires|String|An optional date string indicating when this secret is valid to|

## Example Usage

### Update a secret
```js
//#region Add a secret
test = Secret("this_is_a_test")
test.notBefore = "2024-06-01"
test.expires = "2024-12-31"
save test
//#endregion
```

### Use a secret

```js
//#region Using a secret
url = "https://web-api.tp.entsoe.eu/api?securityToken=" + ${secret:"ENTSOE_TOKEN"}
//#endregion
```

## More information
* [Secret Service](/docs/odsl/service/secret)
