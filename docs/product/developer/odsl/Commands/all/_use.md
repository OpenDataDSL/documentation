Instructs OpenDataDSL to use a specific named environment

#### Syntax
```js
use environmentname
```
#### Description

You can create multiple environments such as dev and test which are separate from your production environment, this command instructs OpenDataDSL that from this point it should use that named environment for the rest of the running script.

NOTE: For more information on environments - see [here](/docs/odsl/service/environment)

#### Example

If you have created an environment called test, you can use it with the following command:
```js
use test
```
