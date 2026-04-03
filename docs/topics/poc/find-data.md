---
slug: /poc/find-data
title: Find Data
description: Various ways to find data in the platform
sidebar_position: 4
tags:
- poc
- search
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Find Data

OpenDataDSL gives you several ways to search and filter data — from simple text searches to precise field-level queries. This page covers the available techniques and how to use them in code, the portal, and Excel.

## Filtering

Filtering narrows down results using conditions on master data properties, such as `source = "ECB"`.

### Example — finding data from ECB

<Tabs groupId="platform">
<TabItem value="odsl" label="ODSL Code" default>

```js
// Print the results to the console
find ${object} where source = "ECB"

// Assign the results to a variable
objects = find ${object} where source = "ECB"
```

</TabItem>
<TabItem value="portal" label="Portal">

1. Go to **Master Data**
2. Select **public** from the sources dropdown
3. Click **Add filter** and select **source**
4. Click in the source box and select **ECB**

</TabItem>
<TabItem value="excel" label="Excel">

1. In **Master Data**, click **Download**
2. Select **public** from the sources dropdown
3. Click **Add filter** and select **source**
4. Click in the source box and select **ECB**

</TabItem>
</Tabs>

## Text Search

Text search finds words within the `id`, `name`, and `description` fields of an object. The more words you include, the narrower the results — all terms must be present.

For example, searching for `europe` returns more results than `europe power`, since the second search only returns objects that contain both words.

## Advanced Search Operators

You can use operators in the search box to fine-tune your results.

### OR — match any term

Use the pipe (`|`) operator to find objects matching either term.

**Example:** `europe | potato`
Returns objects where `id`, `name`, or `description` contains either *europe* or *potato* (or both).

### NOT — exclude a term

Use the minus (`-`) operator to exclude results containing a specific word.

**Example:** `europe -potato`
Returns objects containing *europe* but not *potato*.

### Grouping

Use parentheses to control evaluation order when combining operators.

**Example:** `(europe | usa) potato`
Returns objects that contain *potato* and also contain either *europe* or *usa*.

### Tags

Use the `#` prefix to search within tags.

**Example:** `#wheat`
Searches the tags collection for *wheat*.

**Example:** `#wheat europe`
Returns objects tagged with *wheat* that also contain *europe* in their `id`, `name`, or `description`.

### Field-specific search

Target a specific field using `=` (contains) or `==` (exact match).

| Operator | Behaviour | Example |
|-|-|-|
| `=` | Field contains the term | `location=belgium` — finds objects with *belgium* anywhere in the location field |
| `==` | Field exactly matches the term | `location==Belgium` — finds objects where location is exactly *Belgium* |

## Further Reading

* [Searching tutorial](/docs/tutorials/searching)
* [Find command reference](/docs/odsl/command/find)
