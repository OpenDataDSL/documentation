---
title: Integration Codes by System
description: An insight report of the Integration extension that shows the codes (identities) each downstream system knows your curves and timeseries by, the required codes that are missing and codes given to more than one item
slug: /public/insights/integration-codes-by-system
catalog_summary: The codes each downstream system knows your curves and timeseries by, with the missing and duplicated ones
tags: [insight, report, integration, identities, codes, mapping, extension]
---

# Integration Codes by System

Every downstream system knows your data by its own codes: a Molecule product, a risk engine's curve name, a file code in the data lake. **Integration Codes by System** shows them all in one table, a column per system. It answers questions like:

- What is the TTF curve called in each system?
- Which items are missing a code a system needs?
- Has one code been given to two items by mistake?

At Northgate Energy, the report shows that the GB power curve has no Molecule product and the German power curve no Northgate Risk code, and that the NBP curve was given the TTF code `NG-TTF` in Northgate Risk, so the risk engine would have revalued NBP positions at TTF prices.

![The Codes tab: the codes of each data item, a column for each code of each system](/img/insights/integration-codes-by-system/overview.png)

---

## Opening the report

The report is on the **Insights** tab of **Operations**, **Integrations** (the [Integration extension](/docs/extensions/integration/overview)), as **Integration Codes by System** (`odsl.integration.codes`).

It shows the items of every group that sends to a system, as they are now.

| Control | What it does |
|-|-|
| **System** | All systems, or one |
| **Refresh**, **CSV**, **Help** | Read the codes again, download the table of the tab, open this page |
| **Filter the rows below** | Shows only the rows that have every word you type |

To change a code, open the group's **Items** tab on the Integrations screen.

---

## Key ideas

| Idea | What it means |
|-|-|
| Code | An identity of a data item, such as `molecule` = `M.TTF.F`. Each system names the identities it uses; some are required. |
| Missing code | A required code that an item sent to the system does not have. The item fails in every run until it has one. |
| Shared code | A required code with the same value on more than one item of the same system. The system would take both as the same data, the second overwriting the first. |

---

## Summary cards

| Card | What it shows |
|-|-|
| **Data items** | The items in groups that send to a system |
| **Systems** | The systems they are sent to |
| **Codes set** | The codes the items have, over all the systems |
| **Missing codes** | Required codes that are missing |
| **Shared codes** | Required codes given to more than one item |

---

## The tabs

### Codes

A row per data item and a column for each code of each system. A cell shows the code; **missing** in red for a required code that is not set; `-` for an optional code that is not set; and **not sent** when no group sends the item to that system.

### Missing codes

A row per missing code: the item, its kind, the system, the code and the groups that send the item.

![The Missing codes tab: the GB power curve has no Molecule product and the German power curve no Northgate Risk code](/img/insights/integration-codes-by-system/missing-codes.png)

### Shared codes

A row per code on more than one item: the system, the code, its value and the items that have it.

![The Shared codes tab: NG-TTF is on both the TTF and the NBP curve in Northgate Risk](/img/insights/integration-codes-by-system/shared-codes.png)

---

## Where the data comes from

The groups that send to a system, their items, and the identities of the items (read in bulk from the data service). Public data has no identities of your own, so its codes show as not set.

---

## Related

- [Getting started](/docs/extensions/integration/getting-started)
- [Integration Problem Items](/docs/public/insights/integration-problem-items)
- [Insights](/docs/odsl/insights/general)
