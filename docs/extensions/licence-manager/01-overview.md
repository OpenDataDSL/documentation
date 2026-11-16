---
title: What is Data Licences?
description: An introduction to the Data Licences extension, one place for the data licences you hold with exchanges and vendors
slug: /extensions/licence-manager/overview
sidebar_position: 1
tags: [extension, data licences, licences, byol, contracts, renewals]
---

# What is Data Licences?

Much of the market data on OpenDataDSL is licensed by the exchange or vendor to you, not to us: you **bring your own licence** (BYOL). Your ICE Endex, EEX or CME licence says which data you may use, how many people may see it, what it costs and, most importantly, when it renews and how much notice you must give to change it. Those details usually live in a contract folder, an email thread and someone's calendar. **Data Licences** keeps them next to the data they cover, and answers questions like:

- Which data licences do we hold, with whom, and who looks after each one?
- When does our ICE Endex licence renew, and by when must we give notice if we want to renegotiate it?
- Which of the datasets we follow are not covered by a current licence?
- Has the vendor confirmed to OpenDataDSL that we are licensed?
- What do our licences cost each year, and when is the next invoice due?

Throughout these pages we follow Northgate Energy, a fictional gas and power trader. Priya Shah looks after its market data licences: ICE Endex and ICE Futures Europe, EEX, a CME DataMine archive it has decided not to renew, and a Nasdaq Commodities licence that ran out in October.

![Data Licences with the ICE Endex licence open](/img/extensions/licence-manager/overview.png)

---

## Key ideas

| Idea | What it means |
|-|-|
| Licence | One agreement with an exchange or vendor, identified by a code such as `ICE-ENDEX` |
| Term | The period the licence runs for: it ends on the **term end** date |
| Renews automatically | The licence rolls on for another renewal term (usually 12 months) unless you give notice |
| Notice period | How many days before the term end notice must be given; the **notice deadline** is the term end minus the notice period |
| Feed | The part of a dataset id that a licence covers: a provider such as `ICE`, or a provider and feed such as `ICE.NDEX` |
| Reminder | An alert raised by the daily check when a notice deadline, renewal or end date is coming up |
| Costs | Optional financial details of a licence, kept apart so only some people can see them |

---

## What you get

| Screen | What it is for |
|-|-|
| **Licences** tab | The list of licences and the details of the one you select: contract, term and renewal, feeds, usage rights, vendor, documents, costs and notes |
| **Renewals** tab | Every notice deadline, renewal and end date in the coming months |
| **Feed coverage** tab | Each feed of the datasets you follow and the licence that covers it, or that none does |
| **Costs** tab | Annual fees by currency and the next invoices (only for people allowed to see costs) |
| **Reminders** tab | The daily reminder check, its runs and the reminders open now |
| Home page tasks | **Review licences that are due** (with a count of open reminders), **Record a data licence** and **Check our data feeds are licensed** |

The extension adds **Data Licences** to the **Manage** menu.

---

## Where next

- [Licences](/docs/extensions/licence-manager/licences): add a licence and keep it up to date
- [Renewals](/docs/extensions/licence-manager/renewals): what comes up when, and how a renewal is recorded
- [Reminders](/docs/extensions/licence-manager/reminders): the daily check, the reminder alerts and the Home page task
- [Feed coverage](/docs/extensions/licence-manager/feed-coverage): find the datasets you follow that no licence covers
- [Costs](/docs/extensions/licence-manager/costs): licence fees and who can see them
- [Reference](/docs/extensions/licence-manager/reference): where everything is kept, the rules, permissions and troubleshooting
