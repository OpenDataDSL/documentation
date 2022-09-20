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
// Create a new secret
sec = Secret("password!")
```
If you try to print a secret, you just see the following:
```js
`********`
```

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The name of the secret|Scalar(String)|
|description|The description of the secret|Scalar(String)|
