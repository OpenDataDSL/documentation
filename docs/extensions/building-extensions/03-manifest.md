---
title: The extension manifest
description: The extension object, its views and resources, and the create-extension.odsl script that creates them
slug: /extensions/building/manifest
sidebar_position: 3
tags: [extension, building-extensions, manifest]
---

# The extension manifest

The **manifest** is the extension object: what the extension is called, which views it has and where they appear, and the resources installed with it. You create it with an ODSL script, usually kept in source control as `create-extension.odsl`, or let Fusion AI create it with the [Build an extension](/docs/extensions/building/fusion-ai) playbook.

---

## A complete create-extension.odsl

This script creates everything for a two-tab extension with one insight. The sections that follow explain each part.

```js
//#region Feature policy: who sees the views
fp = FeaturePolicy()
fp.id = "extension.acme.positions"
fp.description = "Show the Positions extension"
fp.features = ["acme.positions.main"]
fp.addMember("Trading desk")
fp.addMember("Risk")
fp.deny = false
fp.enabled = true
save fp
//#endregion

//#region Insight report
ir = InsightReport()
ir.id = "acme.positions.insight.history"
ir.category = "acme.positions"
ir.name = "Position history"
ir.description = "The total position per book per day"
ir.template = "acme\extensions\positions\acme.positions.insight.history"
ir.icon = "clock-history text-primary"
ir.hideList = true
ir.hideExcel = true
save ir
//#endregion

//#region The extension
e = Extension()
e.id = "acme.positions"
e.publisher = "acme"
e.code = "positions"
e.name = "Positions"
e.icon = "briefcase"
e.description = "Open positions by book and period, and each book against its limit"
e.documentation = "https://intranet.acme.example/trading/positions-extension"
e.tags = ["TRADING", "RISK"]

e.resources.policy = ["extension.acme.positions"]
e.resources.script = []
e.resources.script.add("acme\extensions\positions\acme.positions.style")
e.resources.script.add("acme\extensions\positions\acme.positions.common")
e.resources.script.add("acme\extensions\positions\acme.positions.positions")
e.resources.script.add("acme\extensions\positions\acme.positions.limits")
e.resources.script.add("acme\extensions\positions\acme.positions.insight.history")
e.resources.reportconfig = []
e.resources.reportconfig.add("acme.positions.insight.history")

v = e.addView("positions")
v.section = "Extensions"
v.name = "Positions"
v.tabname = "Positions"
v.description = "Open positions by book and period"
v.excel = false
v.insights = true
v.feature = "acme.positions.main"
v.icon = "briefcase"
v.script = "acme\extensions\positions\acme.positions.positions"

v = e.addView("limits")
v.section = "Extensions"
v.name = "Positions"
v.tabname = "Limits"
v.description = "Each book against its limit"
v.excel = false
v.feature = "acme.positions.main"
v.icon = "speedometer2"
v.script = "acme\extensions\positions\acme.positions.limits"

save e
//#endregion
```

Run it in VS Code with the OpenDataDSL extension. `save e` saves the extension to your tenant, where it appears in the portal for the people in its feature policy.

---

## The extension

| Property | Description |
|-|-|
| `id` | The unique id: the publisher and code joined with a dot, for example `acme.positions` |
| `publisher` | Your publisher code, for example `acme` |
| `code` | A short code for the extension, for example `positions` |
| `name` | The name shown in the extension catalogue |
| `description` | A description for the extension catalogue |
| `documentation` | A link to the extension's documentation |
| `icon` | A [Bootstrap icon](https://icons.getbootstrap.com/) name, optionally followed by a colour class such as `text-primary` |
| `tags` | Tags for the extension catalogue |
| `preview` | `true` if the extension uses features from the next platform release, so it can only be installed in the **preview** environment. Defaults to `false`. |
| `views` | The views, added with `e.addView(id)` |
| `resources` | Everything installed with the extension (see below) |

---

## Views

`e.addView(id)` adds a view and returns it. The id is unique within the extension.

| Property | Description |
|-|-|
| `section` | The section of the portal menu, for example `Extensions`, `Information` or `Manage`. Defaults to `Extension`. |
| `name` | The menu item. Views with the same section and name are tabs of one menu item. |
| `tabname` | The tab name. Defaults to `Main`. Use `Apps` to add the view to the menu item's **Apps** tab. |
| `appname` | The view's name in the **Apps** tab, when `tabname` is `Apps` |
| `description` | A description of the view |
| `icon` | The icon shown next to the menu item |
| `feature` | The feature that decides who sees the view. A feature policy must grant it. |
| `script` | The Mustache script for the page, without the `.mustache` suffix |
| `insights` | `true` to add an **Insights** tab listing the extension's insights |
| `excel` | `true` to show the view in the Excel add-in instead of the portal |

### Placing views

| To get | Set |
|-|-|
| A new menu item with tabs | The same `section` and `name` on each view, a different `tabname` on each |
| A new tab on an existing menu item | The existing item's `section` and `name`, and your own `tabname` |
| An app in the Apps tab | `tabname` to `Apps` and an `appname` |
| A view in the Excel add-in | `excel` to `true` |

---

## Resources

`e.resources` lists what is installed with the extension, by service. Anything not listed is not installed when the extension is installed in another environment or tenant, even if it works where you built it.

| Service | List |
|-|-|
| `script` | Every script the extension uses: each view's page, every partial the pages include, and every insight page |
| `reportconfig` | Every insight report id |
| `policy` | The feature policy and every data policy |

`script` can instead hold lifecycle scripts, which run when the extension is installed, upgraded or uninstalled:

```js
e.resources.script.install = "acme\extensions\positions\acme.positions.install"
e.resources.script.upgrade = "acme\extensions\positions\acme.positions.upgrade"
e.resources.script.uninstall = "acme\extensions\positions\acme.positions.uninstall"
```

Use them for one-off set-up, such as creating the master data types or default settings the extension needs.

---

## Naming conventions

| Thing | Convention | Example |
|-|-|-|
| Extension id | `publisher.code` | `acme.positions` |
| Feature policy | `extension.` and the extension id | `extension.acme.positions` |
| Feature | The extension id and the view id, or one feature for all views | `acme.positions.main` |
| Page scripts | A folder per extension, files named by extension id and view id | `acme\extensions\positions\acme.positions.limits` |
| Shared partials | The extension id with `.style` and `.common` | `acme.positions.style` |
| Insight reports | The extension id, `.insight.` and a name | `acme.positions.insight.history` |
| Insight category | The extension id | `acme.positions` |

Pages written by the Build an extension playbook are saved under `ai-generated\extensions\` instead, so they are easy to tell apart.

---

## Saving the manifest with Fusion AI

Fusion AI has tools that save the same objects without a script: `create_policy` for feature and data policies, `save_script` for pages, `create_report` for insight reports and `create_extension` for the extension. The [Build an extension](/docs/extensions/building/fusion-ai) playbook uses them after your approval, and hands back the equivalent `create-extension.odsl` script.
