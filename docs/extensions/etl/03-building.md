---
title: Building a data loader
description: A walk-through building Northgate Energy's broker settlements loader step by step, from extracting a sample to running it
slug: /extensions/etl/building
sidebar_position: 3
tags: [extension, data loaders, etl, getting-started, walk-through]
---

# Building a data loader

Priya's brokers send a file every evening at `https://files.northgate-energy.example/brokers/settlements/20261105.csv`, one file per trading day. It has a semicolon between columns, prices with a decimal comma, dates written day first, `n/a` when a contract did not settle, and a `TOTAL` line at the end. This page builds a loader for it.

Open **Operations**, **Data Loaders** and select **New data loader**.

![The New data loader dialog with the name Broker gas settlements and its code](/img/extensions/etl/new-loader.png)

| Field | Example | Notes |
|-|-|-|
| **Name** | `Broker gas settlements` | Shown in the list and the run reports. You can rename it later. |
| **Code** | `BROKER_GAS_SETTLEMENTS` | Made from the name. Capitals, digits and `_`. It names the workflow, the process and the run report, and cannot be changed. |

The editor has six steps, and a seventh, optional one. A step opens once the ones before it are done; you can go back to any step. **Save** keeps your work; **Next** checks the step and saves too.

---

## 1. Extract

Choose the kind of source, then fill in its settings.

![Step 1: the CSV source with the URL holding a date placeholder, the separator and the Extract a sample card](/img/extensions/etl/extract.png)

| Field | Example | Notes |
|-|-|-|
| **URL** | `https://files.northgate-energy.example/brokers/settlements/{date:yyyyMMdd}.csv` | `{date:yyyyMMdd}` is the date being loaded, today unless a date is given. The line under the URL shows the address it reads. |
| **Separator** | Semicolon | Comma, semicolon, tab, pipe or spaces. |
| **Header line** | `1` | The line with the column names. |
| **Lines to skip after the header** | `0` | |
| **Description** | `End of day gas settlements from our two brokers` | Optional. Fusion AI reads it too. |

An API that needs a key or values in the URL, such as a latitude and longitude, uses the **Variables and secrets** card: see [Variables and secrets](/docs/extensions/etl/sources#variables-and-secrets).

Enter a **Date to load** (Priya uses 05/11/2026, a day with a file) and select **Extract a sample**. The platform reads the source as a run would and keeps the first 50 rows. The settings of the other kinds are in [Sources](/docs/extensions/etl/sources).

### Extract all

A source with a deep history may fill some columns only further down: a price published since 2020 next to a volume added in 2024, or records that gain a field later on. The first 50 rows then miss those columns, and you cannot map them. **Extract all** reads every row of the source, and every set of variables, and keeps the first 50 rows and then each later row that fills a column the rows before it left empty (up to 200 rows in all). So every column with a value anywhere in the source is in the sample, with an example value. The status shows how many rows were read, for example *Read all 4,812 rows: 9 columns. The sample keeps the first 50 rows and 3 later rows that fill other columns.*

It takes as long as a run's extract, so use it when a column you expect is missing from the sample, or once the loader reads a large file. A loader's runs always read every row, whichever you used.

:::note
The column names are the ones the platform gives: the CSV reader keeps only the letters and digits of a header, so `Trade Date` becomes `TradeDate` and `Volume (MWh)` becomes `VolumeMWh`.
:::

---

## 2. Examine

The sample, as a table you can filter, and a profile of each column.

![Step 2: the KPIs, the extracted rows and the filter box](/img/extensions/etl/examine.png)

The **Columns** table says what each column looks like: a number (and whether it uses a decimal comma), a date (and its format), true or false, or text, with how many rows have a value, how many distinct values there are, examples and the range of numbers. These guesses set the data types, formats and empty values in the mapping. Click a column to highlight it in the rows above.

![The Columns table: TradeDate is a date dd/MM/yyyy, the prices are numbers with a decimal comma, and Settle also has n/a](/img/extensions/etl/examine-columns.png)

:::caution
`05/11/2026` could be the 5th of November or the 11th of May. The profile says **day or month first? check** when no value settles it, and takes day first. Check the format on the Map step.
:::

### Columns to use

A spreadsheet often has columns you do not want: a change on the previous month next to each price, notes, or columns for something else. **Columns to use** at the top of the Examine step lists them, with the column letter of each for an Excel sheet: select **Choose**, then untick the ones to leave out. Type in the box to show only the columns whose name contains a text, then **Leave out the ... shown** or **Use the ... shown**.

For the MAFF timber prices, type ` 2` to show the change columns (the second column of each product is numbered 2) and leave them all out. Then tick column **C** again: it holds the dates, and its heading is merged with column B, so it is numbered 2 as well.

![Columns to use: the date column C used, and the change column E of the product left out, 2 of 3 columns used](/img/extensions/etl/columns-to-use.png)

The columns left out are taken out of the sample and the mapping, and with **Each column is a series** they are not series. A run leaves them out in the same way.

### Each column is a series

Many sources have the date in the first column and then one column for each product, so a row holds one date and many prices. **The shape of the data** at the top of the step turns them into one row for each product and date:

| Choice | What it does |
|-|-|
| **Each row is an event** | The default: the columns are the fields of one event. |
| **Each column is a series** | Each column you do not keep is a series. Every row gives one row for each series, with the columns you keep, `series` (the column's name), `value` (its cell) and, with the next option, `description`. |
| **Columns to keep on every event** | Usually the date. It starts with the first column. |
| **The first row describes each column** | For a source with a row of product ids as the header and a row of descriptions under it. The descriptions become the `description` column, and that row is not loaded. It is ticked when the first row is text and the rows below have numbers. |
| **Leave out empty cells** | Ticked: a series with no value for a date gives no event, as for products with a shorter history. |

For example, the EIA workbook of U.S. stocks has a title row, a row with **Sourcekey** and the series ids (`MTTSTUS1`, `MCRSTUS1`, ...), a row with **Date** and each series' description, then a row for each month. Set the **Header row** to `2` on the Extract step, so the ids are the column names, then choose **Each column is a series**:

![The shape of the data: keep Sourcekey (the dates), the first row describes each column, empty cells left out, and 4 series](/img/extensions/etl/shape-columns.png)

On the Map step, map **Sourcekey** to the event time, and `series`, `description` and `value` to fields. On the Destination step, choose **A record for each value of a field**: it splits on the series field and names each record from its description, such as `EIA.STOCKS.MCRSTUS1` named *U.S. Ending Stocks of Crude Oil (Thousand Barrels)*. See [A record for each value of a field](#a-record-for-each-value-of-a-field).

The sample shows up to 2,000 of these rows; a run makes them all. Use **Extract all** when the first rows of the source are empty for most series.

---

## 3. Event type

| Choice | When to use it |
|-|-|
| **Use an event type** | One of your private event types or a public one fits. Its properties are listed. |
| **Define a new event type** | Nothing fits. The properties are made from the columns: a name, a type (text, number, boolean or date) and a description each. The first date column is left out, as it becomes the event time. |
| **No event type** | The events get the type `#Event`, and every field is a free field. |

![Step 3: the new event type BrokerSettlement with a property for each column](/img/extensions/etl/event-type.png)

Priya defines `BrokerSettlement` and describes the price properties. A new type is saved as a private event type when you select **Next**, and the columns are mapped to the properties they were made from.

### When the sample changes after the type is saved

A new sample can have columns the first one did not, for example after **Extract all** finds a column whose history starts later. Go back to the **Event type** step:

![The saved type RigHistory, with a notice that the sample has two columns the type does not have, volume and region](/img/extensions/etl/type-new-columns.png)

- **Add them to the type** adds a property for each new column, made the same way as the others.
- **Change the type** opens the saved type for any other change: rename a property, change its type or description, remove one, or **Start again from the columns**.

The type keeps its id and is saved again over itself when you select **Next**. On the Map step, the new properties are mapped from their columns, and everything you had already mapped stays as it is. **Suggest a mapping** starts the mapping again from the type, using the column each property was made from. Events already loaded keep the fields they have.

With **Use an event type**, the step lists the columns that no property of the chosen type matches by name. Map them to a property with another name or as free fields on the Map step, or add properties to the type in the master data types.

---

## 4. Map

Drag each column onto a field, set the conditions for the rows to leave out and check the preview. This step has its own page: [Mapping columns to fields](/docs/extensions/etl/mapping).

![Step 4: the columns on the left joined by lines to the event fields on the right](/img/extensions/etl/map.png)

Priya keeps the suggested mapping, leaves out the `TOTAL` line with the condition **Hub does not equal TOTAL**, and adds a value map so the contracts are saved as period codes (`Dec-26` as `2026M12`).

---

## 5. Destination

![Step 5: the record NGE.BROKERS, the list SETTLEMENTS, the event id and the _dsid](/img/extensions/etl/destination.png)

| Field | Example | Notes |
|-|-|-|
| **Record** | `NGE.BROKERS` | Search your private master data records, or select **Create a new record**. |
| **Event list** | `SETTLEMENTS` | In capitals. A new name makes a new list; an existing one adds to it. |
| **Time zone of the times** | `UTC` | For dates and times in the source with no offset. |
| **Event id template** | `{eventtime}_{Hub}_{Contract}_{Broker}` | Tick the columns that make a row unique, or the **Mapped fields** under them. A mapped field gives its value after its changes and value map, such as `{eventtime}_{product}` with the product names translated into English. A column and a field with the same name: the column is used. The preview shows the first ids and warns when two sample rows get the same id. |
| **_dsid template** | `NGE.BROKER.{Hub}` | Optional: PROVIDER.FEED.PRODUCT, so the dataset monitoring tools can follow the events. |
| **Raise an alert when a run fails** | ticked, **high** | The next run that works closes it. |
| **Fail the run when any row cannot be loaded** | not ticked | When ticked, one problem row fails the whole run (and nothing is saved). |

:::tip
The event id is what makes a rerun safe. With the event time, hub, contract and broker in the id, loading the 5 November file again replaces those events instead of adding copies.
:::

### A record for each value of a field

All the events of a loader can go to one record, or to a record for each value of one of the mapped fields: a record for each commodity, hub or site. Choose **A record for each value of a field**. The loader makes the records it needs on each run, with the type and fields you choose.

![A record for each commodity on a page of metal prices: the record id template, the type MetalPrice, its fields and the four records the sample makes](/img/extensions/etl/split-records.png)

| Setting | Example | Notes |
|-|-|-|
| **Split on** | `commodity` | A mapped field. Each value gets its own record, and an event with no value is not saved. |
| **Record id** | `COOKSON.{commodity}` | Must contain the field split on. Other mapped fields can be used too. The id is made capitals, and anything but letters, digits, dots, `_` and `-` becomes `_`: `Gold (AU) AM` gives `COOKSON.GOLD_AU_AM`. |
| **Type of the records** | `MetalPrice` | A master data type (not an event type). The list offers your private types and the public ones. |
| **Records that are there already** | **Leave them as they are** | Or **Set their fields on every run**. A record made by the loader always gets the type and fields; an existing record keeps its type. |
| **Fields of the records** | `name` = `Cookson {commodity}` | A fixed value (`Cookson Gold`), a mapped field in braces (`{commodity}`), or both. **Add the fields of the type** adds a row for each field of the type, filled in when a mapped field has the same name. |

The values come from the first event of each record. Use text fields where you can: numbers are written without trailing zeros, and a date field as `yyyy-MM-dd`. **The records the sample makes** shows each record, how many sample events go to it, its fields, and whether it is **new** or **there already**.

The run report shows how many records the events went to and how many were made. The event list is the same name on every record, for example `COOKSON.GOLD_AU_AM:METALS`.

---

## 6. Deploy and run

![Step 6: the checks, the ETL actions the workflow runs and the result of deploying](/img/extensions/etl/deploy.png)

The checks list anything missing, with a link to its step, and whether the standard ETL actions are installed. Priya ticks **Run on a schedule**, chooses **Weekdays** at **18:30** **UK time (EU1)**, and selects **Deploy**. Then she enters 05/11/2026 as the **Date to load** and selects **Run now**.

![The Run card: the run of the process and the day's run report with 21 rows, 20 events saved and 1 row left out](/img/extensions/etl/runs.png)

The 20 settlements are now `BrokerSettlement` events in `NGE.BROKERS:SETTLEMENTS`; the TOTAL line was left out. More on runs, schedules and alerts: [Deploying, running and scheduling](/docs/extensions/etl/running).

---

## 7. Curves and series

Optional, and done once: make event timeseries, curves or options from the events, kept on `NGE.BROKERS`. With a record for each value of a field, they are made on each record (or one you choose). See [Curves and series](/docs/extensions/etl/curves-and-series).

---

## Next

- [Mapping columns to fields](/docs/extensions/etl/mapping)
- [Deploying, running and scheduling](/docs/extensions/etl/running)
