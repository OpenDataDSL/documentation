---
slug: /odsl/service/secret
tags:
- service
- secret
---
Secret Service
==============

The secret service allows you to manage, browse, search for and use stored secrets

## Creating Secrets

You create a secret using the secret constructor. e/g/
```js
test = Secret("this_is_a_test")
save test
```
This creates a secret called **test** with a secret value of "this_is_a_test"

You can also set the following optional properties:
*   notBefore - to specify a date for when the secret is valid from
*   expires - to specify a date for when the secret is valid to
*   enabled - to indicate that the secret is ready to be used (defaults to true)

```js
test = Secret("this_is_a_test")
test.notBefore = "2024-06-01"
test.expires = "2024-12-31"
save test
```

## Updating secrets
You can either read the secret from the service and update it or save the secret with the same id as an existing secret, e.g.

```js
// Retrieve and update
ex = ${secret:"test"}
ex.expires = "2025-12-31"
save ex

// Overwrite using the same id as an existing secret
test = Secret("test")
save test
```

## Reading Secrets

You can find secrets using the [find](/docs/odsl/command/find) command e.g.
```js
find ${secret}
```

:::note
You will not have the actual secret value in the secret when using the find command, you have to specifically retrieve the secret using its id to get the real secret 
:::

You can get a secret using its id, e.g.

```js
ex = ${secret:"test"}
print ex
```

:::note
Printing a secret will only show stars, but you can use a secret value for a password
:::

## Using a secret

Example of using a secret for storing your ENTSOE security token:

```js
url = "https://web-api.tp.entsoe.eu/api?securityToken=" + ${secret:"ENTSOE_TOKEN"}
```

## Deleting Secrets

To delete a secret from the database, you use the delete command.
```js
delete ${secret:"test"}
```
