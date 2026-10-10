---
title: Getting started
description: Create your first composition from a library template, run it, change it and save it
slug: /extensions/composer/getting-started
sidebar_position: 2
tags: [extension, composer, composition, getting-started]
---

# Getting started

This walk-through creates a composition from the **Curve spread** library template: two curves side by side, with the spread between them, tenor by tenor.

---

## 1. Open Composer

Open **Composer** from the Extensions section of the menu. The **Compositions** tab lists the compositions in your organisation, with counts at the top: how many match the filters, how many are yours, how many came from a template, and how many templates there are.

---

## 2. Choose a template

Open the **Library** tab. The templates are grouped by category (Curves, Power, Gas, Oil, Carbon, Timeseries and so on), with the featured ones first. Select **Curve spread** to see:

- What it does
- Its columns
- The inputs it asks for

Select **Preview** to run it for today with its default inputs, then **Use template**.

---

## 3. Fill in the inputs

The **Use template** dialog asks for:

| Field | What to enter |
|-|-|
| **Name** | A name for your composition, for example "Brent WTI" |
| **Store in** | An analytics area to keep it in, or **A new analytics area** (give it a name, such as "Oil Analytics"), or **An existing master data record** |
| The template's inputs | For Curve spread: the first curve, the second curve, and names for them. Start typing part of an id in a curve field to search. |

Select **Create composition**. Composer saves the composition and opens it.

---

## 4. The workspace

The composition opens in the workspace: a toolbar, the chart and the table.

| Toolbar | |
|-|-|
| **Ondate** and **Run** | Run the composition for a date. A curve composition starts at the previous weekday, the latest settled curves. |
| **Build** | Build and store the composition for a range of ondates (see [Builds, composed curves and automation](/docs/extensions/composer/builds-and-automation)) |
| The three layout buttons | Show a table, a table and a chart, or a chart |
| **Columns**, **Properties** | Open the side panel |
| **Undo** and **Redo** | Step back through your changes, and forward again (Ctrl+Z, Ctrl+Y) |
| **Save** | Save your changes |
| **More** | Ask Fusion AI to change it, Export CSV, Clone, Move to, Save as template, Delete |

Select a column heading in the table, or a series in the chart, to open that column in the side panel.

---

## 5. Add a column

1. Select **Columns**. The side panel slides out from the right, and the data moves left so you can still see it.
2. Select **Add expression column**.
3. Give it a **Caption**, such as "Spread %", and an **Id**, such as `PCT`.
4. Type the **Expression**, for example `SPREAD / B * 100`. Suggestions appear as you type: the ids of the other columns, and the functions you can use.
5. Under **Display**, choose how it is charted, for example a column on axis 2.

The panel shows **Run to see your changes**. Select **Run**, or close the panel, to see the new column.

---

## 6. Save it

Select **Save**. The composition is saved where you chose in step 3, and appears in the **Compositions** tab.

:::tip
Composer keeps a record of the template a composition was created from, and the values it was given, under **Properties**.
:::

---

## Other ways to start

**New composition** on the Compositions tab offers:

| Start from | |
|-|-|
| **Describe it to Fusion AI** | Say what you want in your own words, and Fusion finds the data and designs the columns. See [Designing with Fusion AI](/docs/extensions/composer/fusion-ai). |
| **Blank curve composition** | An empty curve worksheet: add the curves and expressions yourself |
| **Blank timeseries composition** | An empty timeseries worksheet |
| **My template: ...** | One of your organisation's templates |
| **Library: ...** | One of the OpenDataDSL templates |

On the **Master Data** screen, the **Composer** tab of a record does the same, and stores the composition on that record. When you use a template there, its curve and timeseries inputs are filled in with the record's own data, and the Columns panel offers the record's data items as columns in one click.

---

## Next steps

- [The workspace](/docs/extensions/composer/workspace): every column and worksheet setting
- [Templates](/docs/extensions/composer/templates): make your own templates with inputs
- [Builds, composed curves and automation](/docs/extensions/composer/builds-and-automation)
