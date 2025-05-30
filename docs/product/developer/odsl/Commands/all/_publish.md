Publish data or an extension

#### Syntax
```js
publish {var} to {location} (log {reason})?
```
#### Description

The publish command can do the following:
* Publish data to another tenant (if you have the rights given by the receiving tenant)
* Publish an extension to the public repository or install a public extension to your private environment

#### Examples
```js
// Publishing an extension to the public repository
e = ${extension:"odsl.example"}
publish e to "public"
```

```js
// Installing an extension to an environment
e = ${extension:public/"odsl.example"}
publish e to "private"
```
