---
slug: /odsl/variable/extension
tags:
- extension
---
# Extension

An extension variable is the definition of an ODSL platform extension.

## Construction
An extension is created using the **Extension()** function, e.g.

```js
e = Extension()
```

## Properties
An extension has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the extension (must be {publisher}.{code}|String|
|publisher|The publisher of the extension|String|
|code|The code id of the extension|String|
|name|The name of the extension|String|
|description|The long description of the extension to be shown in the extension catalog|String|
|documentation|A URL to some external documentation|String|
|icon|The icon (bootstrap icons) to be shown next the extension name in the catalog|String|
|views|An array of views to be shown in the portal or excel add-in|ExtensionView[]|
|resources|A set of resources used by this extension that will be published/installed|Object (See Below)|

### Extension View

The Extension View entity is used to configure the views in the portal and excel add-in and contains the following:

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The unique identifier for this view in the extension|String|
|section|The section in the menu to display this view, defaults to Extension|String|
|name|The name of the view as shown in the menu|String|
|description|A description of the view|String|
|tabname|The name of the tab, defaults to 'Main'|String|
|appname|The name of the view in the Apps catalogue, only used if the tabname is 'Apps'|String|
|excel|True if this is an Excel Add-in view, defaults to false|Boolean|
|icon|The icon shown next to the name in the GUI|String|
|feature|The feature policy used to determine if a user can see this view|String|
|script|The mustache script containing the code for this view|String|
|insights|Set this to true if this app is a new menu item and you want to show an Insights tab|Boolean|

### Resources

Extension resources are a list of entities which need to be installed with the extension.
Resources are a SimpleObject, with each key in the document being a service name.
The value of the service can either be key=values or an array, e.g.

```js
e.resources.script.uninstall = "example-odsl\examples\Extension\odsl.example.uninstall"
e.resources.policy = ["extension.odsl.example"]
```

## Methods
An extension has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addView(name)|Adds a view to an extension and returns the new view|ExtensionView|

## Examples

### Creating a simple extension

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

### Publishing an extension

```js
e = ${extension:"odsl.example"}
publish e to "public"
```


### Installing an extension

```js
e = ${extension:public/"odsl.example"}
publish e to "private"
```

### Uninstalling an extension

```js
delete ${extension:"odsl.example"}
```

:::warning
If you run the command to uninstall an extension that has been created by you, it will be completely removed and would need to be re-created if needed
:::

## Further Reading
* [Extension service](/docs/odsl/service/extension) for saving and using extensions.