---
slug: /training/technical/qs-etl
title: "QuickStart: ETL"
sidebar_position: 17
tags: [training, technical, odsl, quickstart]
---

# QuickStart: ETL

Extracting data from remote sources, transforming it into your data model, and loading it into the platform.

---

## Extract

The extraction step pulls data from an external source — typically a website, API, or FTP server.

### Direct Extraction

The service you use depends on the format of the external data:

```js
//#region
// ECB FX Rates from XML
XML = ${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}
print XML
//#endregion
```

```js
//#region
// HTML page with a CSS selector
url = "https://ahdb.org.uk/dairy/uk-wholesale-prices"
selector = "#content > div > article > div.orchard-layouts-root > div > div:nth-child(4) > div.col-xs-12.col-sm-7.cell"
html = ${html:url, selector}
print html
//#endregion
```

```js
//#region
// Extracting a table from a PDF
url = "https://www.zuivelnl.org/uploads/images/Noteringen-week-" + (${date:"today"}.week - 1) + "-" + ${date:"today"}.year + ".pdf"
params = "table_content_type=text,separator= ,page_start=2,page_end=2"
table = ${pdf:url, params}
print table
//#endregion
```

### Website Navigation

For websites that require interaction (form submission, button clicks), use an **Extractor** — a pipeline of instructions sent to the site. This is used for sites that cannot be scraped with a direct URL request.

---

## Transform

The transform step maps externally-structured data into your own model using a **Transformer**.

A transformer iteratively builds output objects from the input data. Here is an example that maps Bank of England FX XML data into a list of `#ForeignExchange` objects:

```js
#BOE_FX = transform xml into #ForeignExchange as fx
        create with Cube clear TIME, OBS_VALUE
        unique model = "#BOE_FX_GBP" + input.metadata.get(fx.SCODE, fx.SCODE)
        on error ignore
        ignore fx.TIME == null

        SPOT = TimeSeries(fx.TIME, "#HENG", fx.OBS_VALUE, "numeric")
        currency = input.metadata.get(fx.SCODE, fx.SCODE)
        source = "BOE"
        sourceName = "Bank of England"
        name = "Bank of England Spot Exchange Rates GBP/" + currency
        dataset = "BOE_FX"
end
```

To run the transformer against your extracted data:

```js
//#region
models = #BOE_FX.run(data)
print models
//#endregion
```

---

## Load

Once the data is transformed, you can load it into the database. The most robust approach is to send it as a **batch via a message queue**:

```js
//#region
// Create a batch
batch = PROCESS.createBatch()

// Add all transformed models
batch.addAll(models)

// Send to the server for processing
send batch
//#endregion
```

:::tip Batch vs Save
Iterating and saving objects one-by-one works for small datasets. For large ETL jobs, always use `batch` + `send` for reliability and throughput.
:::

:::note Next Step
In [QuickStart: Automation](/training/technical/qs-automation) you will create workflows and processes to automate your ETL pipelines.
:::
