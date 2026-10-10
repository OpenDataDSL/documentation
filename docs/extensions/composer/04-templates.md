---
title: Templates
description: Use library templates, copy them, and create your own composition templates with inputs
slug: /extensions/composer/templates
sidebar_position: 4
tags: [extension, composer, templates]
---

# Templates

A template is a composition with some of its settings left open as **inputs**, such as which curves to use or a plant efficiency. Using a template asks for the inputs and creates a composition from it.

---

## The library

The **Library** tab shows the OpenDataDSL templates as cards, grouped by category, with the featured ones first. Search by name, category or tag, or choose a category.

Open a template to see what it does, its columns and its inputs, and to:

| Button | |
|-|-|
| **Use template** | Create a composition from it |
| **Copy to my templates** | Make your own copy to change |
| **Preview** | Run it for today with its default input values |

See [Library templates](/docs/extensions/composer/library) for the full list.

---

## My templates

The **My templates** tab shows your organisation's templates. Create one with:

- **New template**: an empty template, opened in the workspace
- **Upload .json**: a template saved as a file, for example one downloaded from another tenant
- **Save as template**: from the **More** menu of any composition, to turn it into a template
- **Copy to my templates**: from a library template

Opening a template shows it in the workspace like a composition, with an extra **Inputs** tab in the side panel and a **Preview values** button in the toolbar. The preview uses the inputs' default values; **Preview values** changes them, and saves them as the defaults.

From a template you can also **Use template**, **Download JSON**, **Duplicate** and **Delete**.

Every save of a template increases its **revision**, shown under its name.

---

## Inputs

Add inputs on the **Inputs** tab. Each input has:

| Setting | |
|-|-|
| **Name** | Used in placeholders, for example `curveA` |
| **Label** | The field label shown when the template is used |
| **Type** | text, number, boolean, date, choice, curve, timeseries or calendar |
| **Default** | The value used to preview the template, and offered when it is used |
| **Help** | A line of help under the field |
| **Required** | Whether a value must be given |
| **Options** | For a choice: the values to choose from |
| **Validate** | For text: a regular expression the value must match, for example `^[A-Z]{3}$` for a currency code |

Curve and timeseries inputs search the platform as you type, and calendar inputs list the calendars.

---

## Using an input

Write `@{input.name}` wherever the value should go: a column's data id, an expression, a caption, a conversion setting, the calendar or the range. The chips under the data and expression fields of each column insert them for you.

| Where | Example |
|-|-|
| A column's data id | `@{input.curveA}` |
| One tenor of a curve, on a timeseries worksheet | `@{input.curve}:M01` |
| An expression | `POWER - GAS / @{input.efficiency}` |
| A caption | `In @{input.currency}` |
| A conversion setting | Currency `@{input.currency}` |
| The calendar | `@{input.calendar}` |

When the template is used, each placeholder is replaced by the value given. A setting that is only a placeholder takes the input's type, so a number input stays a number.

:::caution
Every placeholder must name an input on the Inputs tab, and Composer will not save a template that refers to an input it does not have.
:::

---

## Keeping copies up to date

A copy of a library template remembers the template and revision it was copied from. When OpenDataDSL publishes a newer revision:

- the copy shows an **update** badge on the My templates tab,
- opening it shows a note with **Compare with the library**, a line by line difference between your copy and the library, and **Mark as up to date** once you have made the changes you want.

Compositions created from a template remember the template, its revision and the values used, under **Properties**. Changing the template later does not change compositions already created from it.
