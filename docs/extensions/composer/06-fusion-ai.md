---
title: Designing with Fusion AI
description: Describe a composition in your own words and let Fusion AI find the data and design it, or ask it to change one
slug: /extensions/composer/fusion-ai
sidebar_position: 6
tags: [extension, composer, fusion-ai, ai-assistant]
---

# Designing with Fusion AI

Fusion AI can design a composition from a description in your own words. It looks up the curves and timeseries on your platform, chooses the worksheet type and the tenors or calendar, writes the expressions, and opens the result for you to check.

---

## Creating a composition

Select **Create with Fusion AI** on the Compositions tab (or on a record's Composer tab), or choose **Describe it to Fusion AI** under **New composition**. Then fill in:

| Field | |
|-|-|
| **What should it show?** | A description, as you would ask a colleague |
| **Worksheet type** | **Let Fusion decide**, **Curve** or **Timeseries** |
| **Store in** | Where to save it, as for any composition |

For example:

> **You:** The clean spark spread for German baseload power, TTF gas and EUA carbon, with a 49% efficient plant, monthly for a year and quarterly after that

Fusion finds the data, which can take a minute, then the composition opens in the workspace, **not saved yet**. A note at the top says it was designed with Fusion AI, with anything Fusion wants you to check, for example data it could not find:

> **Fusion AI:** I could not find a German peak power curve, so the PEAK column has no data. Check the gas units: TTF is in EUR/MWh.

Check the columns and their data, select **Run**, make any changes, then **Save**.

:::note
Fusion is told never to invent a data id. When it cannot find the data for a column, it leaves the column's data empty and says so in its note.
:::

---

## Changing a composition

Open any composition and select **More**, **Ask Fusion AI to change it** (or **Ask Fusion to change it** in the note of one Fusion designed). Describe the change:

> **You:** Add the NBP gas price in EUR per MWh and a column for the spread to TTF

Fusion replies with the changed composition, shown as a line by line difference: the composition now in red, with the change in green. Select **Apply** to make the change, then check it, run it and save it. Nothing changes until you apply it.

Columns that keep their id keep their colours and conversion settings. Each change continues the same conversation with Fusion, so you can refine a composition a step at a time.

---

## Good descriptions

| Say | For example |
|-|-|
| What to compare | "Brent against WTI", "German power against French power" |
| How to calculate it | "the spread", "power less gas divided by 0.49", "the average of three curves weighted 50/30/20" |
| Units and currency | "in EUR per MWh", "products converted to barrels" |
| Which tenors or dates | "monthly for a year then quarters", "the last 90 days on the business day calendar", "the front month" |
| The data source, if it matters | "ICIS TTF", "the EEX settlement curve" |

---

## Where the conversation is kept

Each composition you design or change with Fusion is one conversation in the Fusion AI chat history, named `Composer:` followed by your description, in the category **composer**. Open it in Fusion AI to see what Fusion looked up. Fusion AI usage counts towards your organisation's Fusion AI tokens like any other conversation.
