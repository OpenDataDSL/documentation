---
slug: /poc/extensions
title: Extensions
description: Build and deploy custom application extensions for the web portal and Excel add-in
sidebar_position: 10
tags:
- poc
- extensions
- portal
- customisation
---

# Extensions

Extensions let you build bespoke screens and functionality that appear directly inside the OpenDataDSL web portal and Excel add-in. If the standard platform views don't fully meet your team's workflow, you can create custom interfaces using your own HTML and the platform's data components.

## What is an extension?

An extension is a bundle of:

* **Views** — custom screens built using Mustache templates and OpenDataDSL's HTML component library, displayed as tabs or menu items in the portal or Excel add-in
* **Resources** — scripts, policies, and other entities that are installed with the extension
* **A manifest** — a configuration file that registers the extension and describes its views and resources

Extensions can be private (only visible within your own tenant) or published to the public extension catalog for other OpenDataDSL users to install.

## Extension Views

A view is a single screen within an extension. Views can be placed in different parts of the portal UI:

| Placement | How to configure |
|-|-|
| A new tab in an existing menu section | Set `section` to the section name (e.g. `Manage`) and `name` to the menu item |
| A new top-level menu item | Set `section` to a new name |
| The **Apps** tab within a menu item | Set `tabname` to `Apps` and provide an `appname` |
| An Excel Add-in view | Set `excel` to `true` |

### View configuration fields

| Field | Description |
|-|-|
| `id` | Unique identifier for this view within the extension |
| `section` | The menu section where this view appears |
| `name` | The menu item label |
| `tabname` | The tab label (defaults to `Main`; use `Apps` for the apps catalogue) |
| `icon` | A Bootstrap icon name shown next to the menu label |
| `feature` | The feature policy that controls who can see this view |
| `script` | The Mustache template file that renders the view |
| `excel` | Set to `true` to show this view in the Excel add-in |
| `insights` | Set to `true` to add an Insights tab to this view |

## Feature Policies

Each view is gated by a feature policy — an access control record that determines which users can see it. You must create the feature policy before deploying the extension.

```js
fp = FeaturePolicy()
fp.id = "extension.mycompany.myextension"
fp.description = "Show MyExtension views"
fp.features = ["mycompany.myextension.main"]
fp.addMember("*")   // grant to all users — restrict by email address if needed
fp.deny = false
fp.enabled = true
save fp
```

:::tip
By convention, name your feature policy `extension.{publisher}.{code}` and your feature codes `{publisher}.{code}.{viewid}`. This keeps extension permissions clearly grouped in the policy catalog.
:::

## Creating an Extension

### 1. Define the manifest

```js
e = Extension()
e.id = "mycompany.priceviewer"
e.publisher = "mycompany"
e.code = "priceviewer"
e.name = "Price Viewer"
e.icon = "graph-up"
e.description = "A custom view for browsing and comparing forward curves."
e.tags = ["CURVES", "PRICES"]

// Install/uninstall scripts
e.resources.script.install   = "my-extensions\priceviewer\install"
e.resources.script.uninstall = "my-extensions\priceviewer\uninstall"
e.resources.policy = ["extension.mycompany.priceviewer"]

// Add a view
v = e.addView("PriceViewer")
v.section   = "Extensions"
v.name      = "Price Viewer"
v.tabname   = "Main"
v.icon      = "graph-up"
v.feature   = "mycompany.priceviewer.main"
v.script    = "my-extensions\priceviewer\main"
v.insights  = true

save e
```

### 2. Build the view template

Views are written as Mustache files. Start by including the base extension script, which wires up the platform's authentication and component library:

```html
{{>#odsl-extension}}

<div class="container">
  <odsl-range-selector></odsl-range-selector>
  <odsl-chart-panel>
    <odsl-chart-series id="#ECB_FX.EURGBP:SPOT"></odsl-chart-series>
  </odsl-chart-panel>
</div>
```

The platform provides a library of data-connected [HTML components](/docs/category/html-components) for charts, grids, lists, forms, and selectors — no need to build data plumbing from scratch.

### 3. Upload the template

Create and save your Mustache file in VS Code using the ODSL extension, then upload it to the platform. Once uploaded, the view becomes available to any user covered by the feature policy.

## Publishing an Extension

If you want other OpenDataDSL tenants to be able to install your extension, you can publish it to the public extension catalog.

:::info
To publish extensions, you need a **publisher code**. Apply by raising a support request at the [support portal](https://support.desk.opendatadsl.com/servicedesk/customer/portal/4).
:::

```js
// Read your extension from private and publish it to public
e = ${extension:"mycompany.priceviewer"}
publish e to "public"
```

Once published, other users can find and install your extension from the extension catalog in the portal.

## Further Reading

* [Extension Basics reference](/docs/odsl/extension/extension-basics)
* [HTML Components catalog](/docs/category/html-components)
* [Example extension walkthrough](/docs/odsl/extension/odsl.example)
* [FeaturePolicy variable reference](/docs/odsl/variable/featurepolicy)
