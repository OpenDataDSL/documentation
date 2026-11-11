---
title: Fusion AI
description: Ask Fusion AI to propose a data loader's event type, mapping, conditions, event id and dataset id from the sample
slug: /extensions/etl/fusion-ai
sidebar_position: 7
tags: [extension, data loaders, etl, fusion ai, mapping]
---

# Fusion AI

On the **Event type** and **Map** steps, **Ask Fusion AI** opens a panel where Fusion AI reads the sample and proposes how to load it.

![Fusion AI asking which column identifies the contract, then proposing the mapping of the broker settlements](/img/extensions/etl/fusion-ai.png)

---

## What Fusion AI sees

The loader's name and description, each column and what it looks like (kind, format, decimal comma, how full, examples), the first 8 rows of the sample, the chosen event type and its properties, and the current mapping, event id and dataset id. Nothing else of your data is sent.

---

## Questions and proposals

When a choice is yours, such as which date is the event time or which columns identify a row, Fusion AI asks with buttons; select one, or type your own answer. Its proposal lists:

| Part | What it holds |
|-|-|
| New event type | Only when none is chosen and one is needed: its id and properties. |
| Mapping | Each field, where its value comes from and its data type, format and decimal separator. |
| Conditions | The rows to leave out. |
| Event id, `_dsid` | The templates. |
| Problems | Anything in the proposal that cannot be used, such as an invalid field name or a column that does not exist. Those parts are dropped. |

**Apply** puts the proposal into the loader. Check it in the preview: you can change everything afterwards, and a proposed new type is saved only when you go past the Event type step. **Start again** (the arrow) begins a new conversation. The conversation is kept in your Fusion AI chat history.

---

## Sources in another language

When the column names or the values are not in English, such as a Japanese government table, Fusion AI gives the fields short English names and puts the original headings in its notes. It translates values that name things, such as prefectures, regions, products and grades, with a value map (one line for each value it sees in the sample: add any others later), and leaves numbers and dates as they are. For Japanese dates it proposes the **Japanese** date format. It also tells you which rows are data, so you can set the first and last row of data on the source. See [the e-Stat example](/docs/extensions/etl/sources#example-japanese-timber-prices-from-e-stat).

---

## Changing the text of a field

In a field's settings, under **Change the text**, describe how the values should change, in your own words, and select **Ask Fusion AI**. Fusion AI sees the values the field gets in the sample, writes the change, and shows what the values become. Select **Use this** to keep it, or say what to change and ask again.

When each value needs its own answer, such as *translate the product names into English* or *replace the codes with their names*, Fusion AI gives a value map instead: a table of each value from the source and the text to save. Values not in it are listed, as they are kept as they are. **Use this value map** adds it to the field's **Value map**, where you can edit it, replacing any entry for the same value. The map covers the values in the sample: add any others the source gives later. See [Changing the text](/docs/extensions/etl/mapping#changing-the-text).
