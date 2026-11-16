---
title: Web Portal
description: The OpenDataDSL web portal, how to sign in, how the screen and menu are laid out, and where extensions fit in
sidebar_position: 1
slug: /user/portal
tags:
  - portal
---
import {InDepth} from '/src/components/Discovery.js';
import {Portal} from '/src/components/Schema'

<Portal />

The web portal is where you work with OpenDataDSL in your browser: find and chart your data, load and deliver it, check that it arrived and is right, build scripts and workflows, and run reports and dashboards. Most of its screens are **extensions**, so your portal shows the screens your organisation has installed.

![The portal with the Data group open](/img/portal/layout.png)

---

## Signing in

Open the portal from the **Portal** link on this site, or go to [portal.opendatadsl.com](https://portal.opendatadsl.com/).

1. Select **Sign in** at the top right of the page.
2. Sign in with your work account: the same Microsoft account you use for your company email.
3. Complete any checks your company asks for, such as a code on your phone.
4. The portal opens on your **Home** page.

There is no separate OpenDataDSL password. If you cannot get in, ask your administrator to add you to your organisation in the portal.

### First sign-in
The first time anyone from your company signs in, Microsoft may ask you to accept the permissions the OpenDataDSL application needs. If you are the first person from your organisation, you are then asked for the name of your company. You are also asked for your own name and a few other details.

:::tip
If the portal keeps asking you to sign in, or signs you in as the wrong account, open your profile menu and select **Fix sign-in...**. It clears the saved sign-in details and starts a fresh sign-in.
:::

---

## The screen

The screen has four parts:

| Part | Where | What it is for |
|-|-|-|
| **Rail** | Far left | The OpenDataDSL logo, **Home**, one button for each menu group, and **Panel** at the bottom |
| **Panel** | Next to the rail | The items in the selected menu group, each with a short description |
| **Header** | Top | The name of the screen you are on, **Notifications** (the bell) and your profile menu (your picture or initials) |
| **Page** | The rest | The screen you opened, with **About**, **Privacy** and **Terms of use** at the bottom |

Select **Panel** at the bottom of the rail to switch between keeping the panel open and showing the rail only. See [The menu](/docs/user/portal/menu) for the two layouts and everything in each group.

---

## The menu groups

| Group | What you find there |
|-|-|
| **Home** | Your task-based home page |
| **Data** | Find, view, chart and build data: Data Explorer, Composer, Smart Data, Event Data |
| **Monitor** | Check that everything ran and arrived: Alerts, Validation, Auditing, Executions, Processes, Curves, Datasets |
| **Deliver** | Get data in and out: Data Loaders, Integrations, Queues, Export data, Automations, Aggregator |
| **Build** | Scripts, types, calendars, workflows, notebooks and promotion between environments |
| **AI** | Fusion AI: Studio, Playbooks, Agents, Assistants and Tools |
| **Manage** | Groups and bulk changes to data and master data |
| **Solutions** | Extensions for a particular business problem, such as portfolios or data reconciliation |
| **Reports** | Reports, dashboards and the dashboards you have pinned |

A group shows only the items you have: if an extension is not installed, or you do not have access to it, its item is not in the menu.

<InDepth href="/docs/user/portal/menu" />

---

## Home
Home is the first page you see after signing in. It asks **What do you want to do today?** and shows your tasks in groups, with the ones that need you now at the top.

<InDepth href="/docs/user/portal/home" />

---

## Extensions
Almost every item in the menu is an **extension**: a screen, or a set of screens, for one job. Extensions can also add tabs to other screens, reports to the Insights tabs and tasks to your Home page. Your organisation chooses which ones are installed, and new extensions and new versions arrive without you having to install anything on your computer.

- See which extensions your organisation has in the portal: profile menu > **Account** > **Organization** > **Extensions**.
- See every extension, what it does and its user guide in the [Extensions catalog](/docs/extensions).

<InDepth href="/docs/user/portal/extensions" />

---

## Your profile, account and settings
Your profile menu, at the top right, has your account, your settings, the data environments you can switch between and **Sign out**.

<InDepth href="/docs/user/portal/settings" />

---

## The built-in screens
A few screens are part of the portal itself rather than extensions. Each has its own page:

| Screen | Menu | Guide |
|-|-|-|
| Executions | **Monitor** > **Executions** | [Executions](/docs/user/portal/executions) |
| Processes | **Monitor** > **Processes** | [Processes](/docs/user/portal/process) |
| Curves | **Monitor** > **Curves** | [Curve builds](/docs/user/portal/curves) |
| Datasets | **Monitor** > **Datasets** | [Dataset monitoring](/docs/user/portal/dataset) |
| Reports and Dashboards | **Reports** | [Reports and dashboards](/docs/user/portal/reports) |
| Types | **Build** > **Types** | [Modelling](/docs/odsl/dm/modelling) |
| Queues | **Deliver** > **Queues** | [Queues](/docs/odsl/dm/queues) |
