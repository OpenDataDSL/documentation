---
title: The library
description: Install ready-made data loaders that OpenDataDSL publishes as plug-in extensions of Data Loaders, keep them up to date, and (for OpenDataDSL) publish loaders to the library
slug: /extensions/etl/library
sidebar_position: 6.9
tags: [extension, data loaders, etl, library, plug-in, install, publish]
---

# The library

Many clients load the same public data: exchange rates, gas storage, day-ahead power prices. OpenDataDSL builds and checks loaders for these and publishes them in the **library**. Each one is a **plug-in extension** of Data Loaders, named `odsl.etl_<code>`, that carries the loader and the types it uses. Install one and it becomes a data loader of your own: set its secrets, look over its steps, and deploy it.

---

## Opening the library

Select **Library** at the top of the list of data loaders.

![The data loader library, with installed loaders and an update](/img/extensions/etl/library.png)

Each card shows the loader's name and plug-in id, what it loads, the kind of source, its category and tags, and the library version with the date it was published. Type in **Find a loader** to search the names, descriptions and tags, and select a category to see only those.

| On the card | What it means |
|-|-|
| **Installed** | The plug-in is installed and a loader is set up from it, with links to your loaders |
| **Update available** | A newer version has been published since you installed it |
| **Installed, not set up** | The plug-in is installed (for example from the portal's extensions) but no loader has been set up from it yet |

**Details** shows the loader's settings and what installing it brings.

---

## Installing a loader

Select **Install** on the card. Give the loader a name and a code; the code is the library's unless you already have a loader with it.

![Installing a loader from the library](/img/extensions/etl/library-install.png)

Installing does two things:

1. It installs the plug-in extension, as installing any extension does. The plug-in brings the **types** the loader uses that are not standard platform types, such as its event type or the type of its master data records. A type with the same name in your tenant is replaced by the plug-in's: the dialog says so.
2. It sets up the data loader from the plug-in, with its **documentation** and the **data series set** of a spreadsheet upload loader (made only if you do not have it), and a **sample** of the source if it was published with one.

Nothing is deployed or run. The workflow, process, schedule and run report are not part of the plug-in: **Deploy** makes them in your tenant, run as you, with your schedule. The loader opens, marked **library version** with the version you installed. Then:

1. On the **Extract** step, set the values of its secrets, such as an API key. The library never holds secret values, only their names. A secret of the loader's own is named after your code, such as `etl_entsoe_da_prices_token`.
2. Read the source with **Extract**, and check each step.
3. Set its stage and deploy it on the **Deploy and run** step.

Your copy is yours: change any step, as with a loader you built. **Set up another copy** sets up a second loader from the same plug-in under another code, for example to load a second set of variables on a different schedule.

A plug-in installed from the portal's extensions, not from here, is listed above the data loaders as **Installed from the library, not set up yet**, with a **Set up** button.

---

## Updating a loader

When OpenDataDSL publishes a new version, the card shows **Update available**. Select **Update**, and choose the loader to update if you have more than one.

![Updating a loader from the library](/img/extensions/etl/library-update.png)

The plug-in is upgraded first, with its types. Then the loader's settings are replaced by those of the new version. These are kept:

- its name, stage, schedule and alerts;
- the secret records it uses, and the values of its variables;
- what is deployed.

Changes you made to other settings are replaced. The update is saved as a new [version](/docs/extensions/etl/running#versions) of the loader, so **Versions** can show what changed and restore your copy. If the loader is deployed, deploy it again to use the new settings. A series set and documents you already have are not changed; new documents are added.

---

## Removing a loader from the library

Delete the loader as any other (see [Deleting](/docs/extensions/etl/running#deleting)). When you delete it with all its versions and no other loader was set up from the same plug-in, you can tick **Also uninstall the library plug-in**. Uninstalling removes the plug-in's types too; events already loaded stay. Leave it unticked to keep the plug-in, and set up the loader again later from the library.

---

## Publishing to the library (OpenDataDSL)

This part is for OpenDataDSL staff. **Publish to library** is shown at the top of a loader only to OpenDataDSL users working in the OpenDataDSL tenant, not when working as a client.

![The Publish to library button](/img/extensions/etl/library-publish-button.png)

Save the loader first, then select **Publish to library**.

![Publishing a loader to the library](/img/extensions/etl/library-publish.png)

| Setting | What it is |
|-|-|
| **Name in the library** | The name of the plug-in extension and the card |
| **Description** | What it loads, from where, and what a client needs, such as an account or an API key |
| **Category** | Groups the cards, such as Power, Gas or FX |
| **Tags** | Words to find it by, separated by commas; the plug-in is also tagged DATA LOADER |
| **Include its documentation** | Publishes the loader's [documentation](/docs/extensions/etl/documentation); setting it up adds the documents |
| **Include the sample** | Publishes the sample. It is data read from the source: include it only if every client may see it |

The loader is published as the public extension `odsl.etl_<code>`, a plug-in that depends on Data Loaders (`odsl.etl`), so installing it installs Data Loaders too if a tenant does not have it. Publishing it again makes the next library version, and clients who installed an earlier one see **Update available**.

| Part of the plug-in | What it holds |
|-|-|
| Resources: types | The types of your own the loader uses. The platform copies them when publishing, so they must exist; a type that cannot be found is named in the message and left out |
| Configuration | The loader's settings, the names of its secrets and variables, its schedule as a suggestion, the series set of an upload loader, and the documentation and sample when ticked |
| Left out | The deployment, stage, uploads and items built, and every secret value |

The workflow, process and run report are left out on purpose. Deploy makes them in each client's tenant with that client's user and schedule; a process installed as an extension resource would have no schedule registered.

On a card, **Withdraw** takes a loader out of the library: clients can no longer install or update it, and tenants that installed it keep the plug-in and their loaders. The platform keeps published extensions, so withdrawing republishes it marked as withdrawn. Publishing the loader again brings it back.

---

## Where the library is kept

| What | Service and source | Id |
|-|-|-|
| A library loader | extension, public (a plug-in: `plugin`, `dependencies` `odsl.etl`, `configuration.etl`) | `odsl.etl_<code>` |
| Its types | extension, public (resources), installed into type, private | the type names |
| An installed plug-in | extension, private | `odsl.etl_<code>` |
| A loader set up from it | object, custom collection `etl_loaders` | your code; `installedFrom` records the plug-in and its version |

Publishing needs write access to public extensions, which OpenDataDSL has. Installing needs the right to install extensions in your tenant.
