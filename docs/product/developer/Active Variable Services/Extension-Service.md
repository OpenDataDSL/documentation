---
title: Extension Service
description: The extension service in the ODSL language
slug: /odsl/service/extension
tags:
- service
- extension
---

[Extensions](/docs/odsl/variable/extension) allow you to create or use application extensions which extend the GUI and Excel Add-in.

## Creating and saving extensions

Creating extensions are described in detail here, and once you have created your extension, saving it is as easy as calling the **save** method as follows:

```js
save ${extension:e}

// or simply
save e
```

E.g.
```js
e = Extension()
e.id = "odsl.example"
e.publisher = "odsl"
e.code = "example"
e.name = "Example Extension"

e.resources.script.install = "example-odsl\examples\Extension\odsl.example.install"
e.resources.script.upgrade = "example-odsl\examples\Extension\odsl.example.upgrade"
e.resources.script.uninstall = "example-odsl\examples\Extension\odsl.example.uninstall"
e.resources.policy = ["extension.odsl.example"]

v = e.addView("test")
v.excel = false
v.feature = "odsl.example.test"
v.icon = "graph-up-arrow"
v.script = "example-odsl\examples\Extension\odsl.example.test"
v.section = "Examples"

save e
```

## Listing extensions

You can get a list of extensions by using the **find** command as follows:

```js
var = find ${extension:source/"query"} [where conditions]
```

An example of getting all public extensions:

```js
ext = find ${extension:public}

for e in ext
	print e.name
next
```

An example of getting all private (installed) extensions:

```js
ext = find ${extension}

for e in ext
	print e.name
next
```

## Getting a specific extension

You can get an extension by assigning it to a variable, e.g.

```js
ext = ${extension:public/"odsl.example"}
print ext.description
```

## Publishing an extension

```js
e = ${extension:"odsl.example"}
publish e to "public"
```


## Installing an extension

```js
e = ${extension:public/"odsl.example"}
publish e to "private"
```

## Uninstalling an extension

```js
delete ${extension:"odsl.example"}
```

:::warning
If you run the command to uninstall an extension that has been created by you, it will be completely removed and would need to be re-created if needed
:::


