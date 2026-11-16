---
title: Extensions
description: What extensions are, where they appear in the portal, how to see which ones your organisation has, and the list of every extension
sidebar_position: 3
slug: /user/portal/extensions
tags:
  - portal
  - extension
---
import ExtensionCatalog from '@site/src/components/ExtensionCatalog';

An **extension** adds screens to the portal for one job: exploring data, building compositions, loading and exporting data, checking quality, managing scripts, working with Fusion AI and more. Almost every item in the [menu](/docs/user/portal/menu) is an extension.

Extensions work with your own access rights: an extension can only show and change the data you are allowed to see and change.

---

## Where extensions appear

An extension can add any of these:

| What | Where you see it | Example |
|-|-|-|
| **Menu items** | In a menu group, with an icon and a short description | **Data** > **Data Explorer** |
| **Tabs on other screens** | Extra tabs when you open an item in another screen | The **Composer** tab when you open a composed curve in Data Explorer |
| **Insights** | Reports on the **Insights** tab of a screen | Timeseries Profile on a timeseries in Data Explorer |
| **Tasks** | Tasks on your [Home page](/docs/user/portal/home) | **Load data from a file or API** |
| **Automations** | Automations you can switch on for your data | Send an email when a curve is built |

So when an extension is installed, it may show up in more than one place. For example, **Composer** has its own menu item and also adds a tab to Data Explorer.

---

## Which extensions you have

To see the extensions your organisation has, open your profile menu at the top right, select **Account**, then **Organization** > **Extensions**.

![The organisation's extensions in Account Management](/img/portal/extensions-browse.png)

| Tab | What it lists |
|-|-|
| **Browse** | Every extension available to your organisation, with its version and publisher. Those already installed say **Installed**; the others have an **Install** button. |
| **Installed** | The extensions your organisation has installed, each with **Uninstall** |
| **Updates** | Installed extensions with a newer version waiting |

The buttons at the top right switch between **All extensions** and **Preview extensions**. A preview extension is marked **Preview**: it works, but it is new and may still change.

Installing or uninstalling an extension changes the portal for everyone in your organisation, so it is usually done by an administrator. If you need an extension your organisation does not have, ask your administrator.

---

## Every extension

Each card below opens the extension's user guide. The same list is on the [Extensions](/docs/extensions) page.

<ExtensionCatalog />

---

## Building your own

The extensions above are built in exactly the same way as the ones you can build yourself, with a Fusion AI playbook or by hand. Your extension can have its own menu item in any group, add tabs to Data Explorer and add tasks to the Home page. See [How extensions work](/docs/odsl/extension/extension-basics) to get started.
