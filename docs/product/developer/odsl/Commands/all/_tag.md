Tags a version of an item with a name

#### Syntax
```js
tag var AS name
```
#### Description

The tag command is used to name a specific version of an item so that it can be read using the supplied name, e.g. you can tag versions of your actions with PROD or TEST to ensure that you use a specific version of an action in a workflow.

#### Examples

```js
tag ${action:"ReadStuff":1} as PROD

prodaction = ${action:"ReadStuff":PROD}
```
