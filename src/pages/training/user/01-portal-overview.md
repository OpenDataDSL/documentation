---
slug: /training/user/portal-overview
title: "Module 01: Portal Overview"
sidebar_position: 2
tags: [training, user, portal]
---

# Module 01: Portal Overview

The OpenDataDSL **Web Portal** is the browser-based window onto the platform. You use it to browse master data, chart timeseries and forward curves, monitor data deliveries and processes, run reports and set up notifications, all without writing any code.

## Learning Objectives

By the end of this module you will be able to:

- Sign in to the portal with your company account
- Find your way around the left-hand menu and its sections
- Use the home screen and the search box
- Understand what master data is and how everything else hangs off it
- Organise your own workspace with favourite groups

## Prerequisites

- A user account in your company's OpenDataDSL tenant
- A modern web browser (the portal also works on mobile)

:::note The portal keeps evolving
New screens are added regularly, and extensions installed by your company add their own menu items. The screenshots in this module may not exactly match what you see, but the ideas are the same.
:::

---

## Step 1: Sign In

1. Go to [portal.opendatadsl.com](https://portal.opendatadsl.com)
2. Select the blue **Sign In** button in the top right corner
3. Sign in with your normal company (Microsoft) credentials

The first time anyone signs in, Microsoft may ask you to accept some permissions for the OpenDataDSL application. If you are the first person from your company, you are asked for the company name. Everyone is then asked for a few personal details. This only happens once, and the details can be changed later in the portal.

---

## Step 2: The Home Screen

After signing in you land on the **Home** screen. It shows a summary of your vital statistics as widgets:

- The status of your process executions over the past 24 hours (running, success, failed)
- A count of the public curves and timeseries
- A count of the public objects by type

![The home screen widgets](/img/portal/home_screen.png)

Select the menu button at the top right of a widget for more options, and select a chart to jump to that part of the portal.

---

## Step 3: The Left-hand Menu

The menu on the left groups the screens into sections. The exact list depends on your company's set-up, but these are the screens you will use most in this track:

| Screen | What it is for |
|-|-|
| **Master Data** | Browse, filter and open master data records (older guides call this the Objects view) |
| **Data** | Direct access to every timeseries and curve: filter, find, chart and export |
| **Smart Data** | Create, edit and view smart timeseries and curves |
| **Events** | Browse stored events, such as trades or nominations |
| **Reports** | Run and view reports and insight reports (Module 07) |
| Dataset monitoring | Track whether data arrived on time and passed its checks (Module 06) |
| **Executions**, **Processes**, **Process Timeline** | Dashboards that show the processes loading your data, and whether they succeeded |
| **Auditing** | A filterable list of who did what, and when |
| **Settings** | Personalise the portal to your own preferences |

Extensions add more items, often in sections such as **Information**, **Operations** or **Manage**. For example, the Automations extension adds **Operations**, **Automations**, which you will use in Module 08.

:::tip
If you cannot see a screen mentioned in this training, it may not be installed in your tenant, or your access may not include it. Ask your administrator.
:::

---

## Step 4: Searching

There are two ways to find things.

**The search box** at the top of the portal lets you type words to look for quickly.

**Filters** on screens such as Master Data and Data let you narrow a list precisely:

1. Go to **Master Data**
2. Select **public** from the sources dropdown
3. Select **Add filter** and choose **source**
4. Select the source box and choose **ECB**

You now see only the master data records supplied by the European Central Bank.

### Search terms

When you type words into a search box, they are matched against the **id**, **name** and **description** of each item. All the words must be present, so more words means fewer results:

| You type | You find |
|-|-|
| `europe` | Everything mentioning *europe* |
| `europe power` | Only items mentioning both *europe* and *power* |
| `europe \| usa` | Items mentioning either word |
| `europe -potato` | Items mentioning *europe* but not *potato* |
| `#wheat` | Items tagged *wheat* |
| `location==Belgium` | Items whose location is exactly *Belgium* |

---

## Step 5: Understanding Master Data

**Master data** (also called an **object**) is the record that represents a real-world thing: a commodity, a trading hub, a data source, a counterparty. Everything else is attached to it:

- **Properties**: descriptive information such as name, description and category
- **TimeSeries**: values over time, such as a daily settlement price
- **Curves**: forward curves, one for each valuation date (the *ondate*)
- **Events**: time-bounded records such as trades or nominations
- **Reports** and **documentation** linked to the record

Every data item has an id made of the master data id and the data name, joined by a colon. For example `#ECB_FX.EURGBP:SPOT` is the `SPOT` timeseries on the `#ECB_FX.EURGBP` record.

:::note Public, private and common
Ids starting with `#` are **public** data provided by OpenDataDSL. Your company's own data is **private**. **Common** data is shared data, such as exchange datasets, that your company has access to.
:::

---

## Step 6: Your Workspace

### Favourites

Favourites are groups of master data records or data items that you can get back to quickly. They are available from the **Favourites** button on the **Master Data** and **Data** screens.

- A **dynamic** group saves a filter, so new matching items appear automatically. Build the filter, then select the save button and fill in the group details.
- A **static** group is a list you maintain yourself. Find an item, select the **Add to group** button, and add it to an existing group or a new one.

![The favourites menu](/img/portal/fav_screen1.png)

Selecting a group takes you back to the screen, showing only the items in that group.

### Settings and account

- **Settings** lets you personalise the portal
- **Account** management lets you update your personal details, and lets administrators manage company settings

:::tip Environments
Your company may have more than one data **environment**, for example production and a test environment. Screens show the data of the environment you are signed in to. Training exercises are often done in a test environment so they cannot affect production data.
:::

---

## Exercise

1. Sign in to the portal and look at the home screen widgets. How many process executions failed in the last 24 hours?
2. Go to **Master Data**, choose the **public** source and filter on source **ECB**
3. Search for `EURGBP` and open the record you find. Which data items are attached to it?
4. Create a static favourite group called `My training items` and add the record to it
5. Open **Favourites** and select your new group

---

## Summary

| Topic | Key point |
|-|-|
| Sign in | Use your company Microsoft credentials at portal.opendatadsl.com |
| Home screen | Summary widgets for executions, data and objects |
| Menu | Screens grouped in sections; extensions add their own |
| Search | All words must match; use `\|`, `-`, `#` and `=` to refine |
| Master data | The record everything else is attached to; ids are `object:item` |
| Favourites | Dynamic (saved filter) or static (hand-picked) groups |

**Further reading:** [Web Portal guide](/docs/user/portal), [Home screen](/docs/user/portal/home), [Favourites](/docs/user/portal/favourites), [Find Data](/docs/poc/find-data)

:::note Next Step
In [Module 02](/training/user/viewing-data) you will find timeseries and forward curves and explore them in the portal.
:::
