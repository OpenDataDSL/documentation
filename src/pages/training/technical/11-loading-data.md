---
slug: /training/technical/loading-data
title: "Module 11: Loading External Data"
sidebar_position: 12
tags: [training, etl, transformer, extractor, odsl]
---

# Module 11: Loading External Data

Until now the training data has been typed into scripts or uploaded from Excel. In practice, prices and volumes arrive from outside: a broker publishes a file on a website, a vendor drops a CSV into cloud storage, an exchange makes files available over FTP. In this module you will build a small **ETL** (extract, transform, load) script that turns a broker's settlement file into `SETTLEMENTS` events on `MY.GAS.HUB`.

## The Three Stages

| Stage | What happens | ODSL feature |
|-------|--------------|--------------|
| **Extract** | Read the source data into a variable | Active variable services such as `csv`, `xml`, `json`, `azblob`, `ftp`; extractors for interactive web pages |
| **Transform** | Map the source structure into your own model | Transformers (`transform ... into ... as ... end`) |
| **Load** | Save the result to the platform | `save`, or a batch sent to a queue for larger loads |

---

## Step 1: Extract from a Web Address

Each file format has its own active variable service. The id is the location of the file, followed by any options:

```js
//#region
// An XML file over HTTP
xml = ${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}
print xml

// A CSV file over HTTP, with the header on line 1
rows = ${csv:"https://www.example.com/prices/daily.csv", "headerpos=1"}
for row in rows
    print row
next
//#endregion
```

The `csv` service reads a file as a list of rows, or as a table with the option `output=table`:

| Option | Description | Example |
|--------|-------------|---------|
| `separator` | The column separator, a comma by default | `separator=;` |
| `headerpos` | The line that holds the column names, 1 by default, 0 if there are no headers | `headerpos=0` |
| `datapos` | The number of lines to skip from the header to the data, 0 by default | `datapos=1` |
| `output` | Set to `table` for a table instead of a list of rows | `output=table` |

:::note
The ECB address is a real public file you can try. The `example.com` address is a placeholder: replace it with a file you have access to.
:::

---

## Step 2: Extract from FTP and Cloud Storage

The same pattern applies to other locations. A file read from storage is converted with the service that matches its type, for example CSV or JSON.

| Service | Reads from |
|---------|------------|
| `ftp` | An FTP site |
| `s3` | An AWS S3 bucket |
| `azblob` | Azure Blob Storage, and can also write files |
| `azfile` | An Azure Storage Account file share |
| `curl` | A URL, downloaded with the curl tool, for sites the standard download cannot read |
| `html`, `pdf`, `xls` | Web pages, PDF tables and spreadsheets |

Credentials should never be written into a script. Store them as a **secret** and read the secret when you need it. For example, reading a CSV from Azure Blob Storage with the account key kept in a secret:

```js
//#region
key = ${secret:"training-blob-key"}
prices = ${azblob:"https://mystorage.blob.core.windows.net/prices/daily/settlements.csv", "AccountKey=" + key.value}
print prices
//#endregion
```

:::tip Secrets
Printing a secret only shows stars, but its value can be passed to a service as a password or key. See the [Secret service](/docs/odsl/service/secret) for how to create one.
:::

See the [service introduction](/docs/odsl/service/services) for the full list of data collection services and their pages.

---

## Step 3: The Source File

For the rest of this module we use a fixed copy of a broker file, so that everyone gets the same result. Each entry has a gas day, a price and a currency. Notice that one entry has no price.

```js
//#region
source = `{
    "provider": "Training Broker",
    "hub": "MY.GAS.HUB",
    "data": [
        { "gasday": "2025-03-10", "price": 0.86, "currency": "GBP" },
        { "gasday": "2025-03-11", "price": 0.87, "currency": "GBP" },
        { "gasday": "2025-03-12", "price": null, "currency": "GBP" },
        { "gasday": "2025-03-13", "price": 0.85, "currency": "GBP" }
    ]
}`

input = ${json:source}
print input.data
//#endregion
```

In a live load, this line would read the file from its real location, for example `${json:"https://..."}` or one of the services in Step 2.

---

## Step 4: Write a Transformer

A **transformer** walks through the input and builds a list of output items. Here we transform into `rows`, one row per gas day.

```js
//#region
use training

source = `{
    "provider": "Training Broker",
    "hub": "MY.GAS.HUB",
    "data": [
        { "gasday": "2025-03-10", "price": 0.86, "currency": "GBP" },
        { "gasday": "2025-03-11", "price": 0.87, "currency": "GBP" },
        { "gasday": "2025-03-12", "price": null, "currency": "GBP" },
        { "gasday": "2025-03-13", "price": 0.85, "currency": "GBP" }
    ]
}`
input = ${json:source}

settlementTx = transform input into rows as x
    // Broker settlement file to settlement rows
    create with data
    unique gasday = x.gasday
    on error ignore
    ignore x.price == null
    gasday = x.gasday
    price = x.price
    currency = x.currency
end

rows = settlementTx.run(input)
print rows.size + " rows"
for row in rows
    print row
next
//#endregion
```

| Option | What it does here |
|--------|-------------------|
| `create with data` | Creates an output row for each element of the `data` array |
| `unique gasday = x.gasday` | Uses the gas day as the key for each row |
| `on error ignore` | Logs and skips any mapping errors instead of stopping |
| `ignore x.price == null` | Discards the entry with no price |

You should see three rows: the 2025-03-12 entry is ignored.

:::tip Other Output Types
Instead of `rows` you can transform into `object` for a list of generic objects, or into a declared type such as `#ForeignExchange` to produce master data objects directly.
:::

---

## Step 5: Load the Rows as Settlement Events

Now turn each row into a settlement event on `MY.GAS.HUB`. The `_dsid` ties the events to the `TRAINING.MYGASHUB.SETTLEMENTS` dataset, so the dataset monitoring, quality checks and automations from the previous modules all apply to the loaded data.

Add this code to the end of the Step 4 region, just before `//#endregion`, and run the region again so that `rows` is available:

```js
// Make sure the settlement event type exists
SettlementType = type extends #Event
    price as Number()
    currency as String()
end
SettlementType.event = true
save ${type:SettlementType}

hub = ${object:"MY.GAS.HUB"}
settlements = []

for row in rows
    gasDay = Date(row.gasday)

    evt = Event(gasDay)
    evt.eventstart = gasDay
    evt.eventend = gasDay + 1
    evt.eventtype = "SettlementType"
    evt.price = row.price
    evt.currency = row.currency
    evt.id = "SET-" + format(gasDay, "yyyyMMdd") + "-001"
    evt._dsid = "TRAINING.MYGASHUB.SETTLEMENTS"
    settlements.add(evt)
next

hub.SETTLEMENTS = settlements
save hub
print "Loaded " + settlements.size() + " settlement events"
```

:::note
If you named your settlement event type differently in the Module 02 exercise, use that name instead of `SettlementType`.
:::

Read back `MY.GAS.HUB:SETTLEMENT_PRICE` from Module 04. Because it is an EventTimeSeries, it already includes the newly loaded gas days.

---

## Step 6: Loading Larger Volumes

Saving objects one at a time is fine for a handful of items. For large loads running as a process, collect the items into a **batch** and send it to be processed by the data loader:

```js
//#region
// Inside a script that runs as a process
// models is the list of items produced by your transformer
batch = PROCESS.createBatch()
batch.addAll(models)
send batch
//#endregion
```

`PROCESS.createBatch()` labels the batch with the service and name of the running process. Add `-noevent` to the `send` command when back-filling history, so that the load does not trigger downstream processes and exports.

---

## Step 7: Extractors for Interactive Web Pages

Some websites only show their data after you fill in a form or click a button. For these, an **extractor** describes how to interact with the page before reading it, using CSS selectors:

```js
varname = extract page (, selector)? into (object|rows) as name
    (fill selector with value)*
    (param selector with value)*
    (select selector)*
    (check selector | uncheck selector)*
    (click selector)*
    (assign)*
end
```

The page is usually read with the `dhtml` service, which loads dynamic HTML pages. The assignments at the end set the properties of the extracted data, in the same way as the body of a transformer.

Extractors and transformers can be stored on the platform in the `extractor` and `transformer` services, so that processes can reuse them.

---

## Step 8: Schedule the Load

To run the load every day, move the extract, transform and load code into a script, upload it and create a process for it, as you did in Module 10:

```js
//#region
use training

p = Process()
p.service = "TRAINING"
p.name = "MY_GAS_HUB_SETTLEMENT_LOAD"
p.description = "Load broker settlement prices for the training gas hub"
p.script = "my_gas_hub_settlement_loader"
p.cron = "15 18 ? * MON-FRI * EU1"
p.enabled = true
save ${process:p}
//#endregion
```

Because the events carry the settlements `_dsid`, the dataset `update` automation from Module 10 then runs the quality checks as soon as the load completes.

---

## Summary

| Stage | What you used |
|-------|---------------|
| Extract | `${json:...}`, with `csv`, `xml`, `azblob`, `ftp` and `s3` for other sources |
| Transform | A transformer into `rows`, with `create with`, `unique`, `on error ignore` and `ignore` |
| Load | Settlement events saved on `MY.GAS.HUB` with the settlements `_dsid` |
| Schedule | A process with a cron expression |

## Exercise

1. Add a fifth entry to the source file with a price of `-1` and add a second `ignore` condition so that negative prices are discarded
2. Change the transformer to also output a `source` column set to `input.provider`, and store it on each event
3. Re-run the load and confirm, using the event ids, that re-loading the same gas days updates the existing events rather than creating new ones

For more detail, see [Data Transformation](/docs/odsl/dm/transformation), the [transform command](/docs/odsl/command/transform) and the [CSV service](/docs/odsl/service/csv).

:::note Next Step
In [Module 12](/training/technical/etrm-integration) you will map the training hub's curves and timeseries to the identifiers used by a downstream ETRM system.
:::
