---
slug: /odsl/extension/extension-basics
title: Extension Basics
description: Read this first to get a good understanding of how extensions work
sidebar_position: 0
tags:
- extension
- example
---

## Introduction

This topic is a brief introduction to getting started building application extensions.

## Application extension

An extension comprises a set of components and an extension configuration (manifest).

:::info
If you are going to publish your extensions to the public repository, you will need a publisher code.
You can apply for one by logging a support request in the [support portal](https://support.desk.opendatadsl.com/servicedesk/customer/portal/4).
:::

### Configuration
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

### Feature policy
In order to see the extension views in your extension, you need to create a feature policy, an example is shown below:

```js
fp = FeaturePolicy()
fp.id = "extension.odsl.example"
fp.description = "Show odsl Example extension views"
fp.features = ["odsl.example.test"]
fp.addMember("*")
fp.deny = false
fp.enabled = true
save fp
```

The features array must include the feature names added to the views feature property.

:::info
For standardisation, it is good practice to name your feature policy as **extension.{publisher}.{code}**

Name your features as **{publisher}.{code}.{viewid}** - note you can also use a single feature code for all the views in the extension.
:::

### Resources

Extension resources are a list of entities which need to be installed with the extension.
Resources are a SimpleObject, with each key in the document being a service name.
The value of the service can either be key=values or an array, e.g.

```js
e.resources.script.uninstall = "example-odsl\examples\Extension\odsl.example.uninstall"
e.resources.policy = ["extension.odsl.example"]
```

## Extension views

Extension views are bespoke screens created using Mustache files and displayed in the web portal.

They can be placed in one of the following places:

* A tab in a new menu item
* A new tab in existing menu item
* Special Apps tab in a menu item

The following properties determine where the extension view is placed:

* section - this is the name of the section in the left-side menu, e.g. Manage
* name - this is the name of the menu item in the defined section, e.g. Groups
* tabname - this is the name of the tab to show - if it is **Apps**, it will be placed as an entry in the special Apps tab

### Configuring an extension view

Here are all the fields to define an extension view:

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

### HTML Components
We provide a useful set of data-connected [HTML components](/docs/category/html-components) which can be used in your extension views.

### Mustache file
The mustache file that provides the view can be created in VSCode and saved to the server using the OpenDataDSL add-in.

The best way to start the mustache file is by including the #odsl-extension script by adding the following line at the top of the file:

```js
{{>#odsl-extension}}
```

You can then proceed to add the HTML and javascript required for the desired functionality.

## Publishing an extension
If you want to publish your extension into the public repository so other companies that use the OpenDataDSL platform can install and use it, you need to become a publisher.

:::info
You can apply to be a publisher by logging a support request in the [support portal](https://support.desk.opendatadsl.com/servicedesk/customer/portal/4).
:::

To publish your extension, you need to read the extension from your private repository and publish it to public, e.g.

```js
e = ${extension:"odsl.example"}
publish e to "public"
```