---
title: ETL
sidebar_position: 9
slug: /tutorials/qs/developer/etl
tags:
  - quickstart
  - odsl
  - developer
  - etl
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module is an overview on extracting data from remote services, transforming and loading it." />

## Extract
The extract part of ETL is the process of scraping data from an external source, usually a website or FTP server.

In general, the extraction of data falls into 2 categories:
* Reading data in a certain format directly from a URL
* Navigating a website (filling forms, clicking buttons) to get to the page to extract the data

### Direct Extraction
The OpenDataDSL service you use for the extraction depends on the file format the external data is stored in.

Here are some examples:

#### ECB FX Rates in XML
```
XML=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}
```

#### AHDB Commodity Curves from a HTML page using an xpath selector
```
url = "https://ahdb.org.uk/dairy/uk-wholesale-prices"
selector="#content > div > article > div.orchard-layouts-root > div > div:nth-child(4) > div.col-xs-12.col-sm-7.cell"
html = ${html:url, selector}
```

#### Extracting data from a PDF from ZuivelNL
```
url = "https://www.zuivelnl.org/uploads/images/Noteringen-week-"+(${date:"today"}.week-01)+"-"+${date:"today"}.year+".pdf"
params = "table_content_type=text,separator= ,page_start=2,page_end=2"
table = ${pdf:url, params}
```

<InDepth href="/docs/odsl/service/services#external-data-collection-services" />

### Website Navigation
Navigating through a website can be tricky and you need to understand how individual websites operate and navigate using Developer Tools built into modern browsers.

Once you have determined how a website works, you can use an [Extractor](/docs/odsl/variable/extractor) to perform the navigation.

The extractor is a pipeline of instructions that are sent to the website.

Below is an example:

```js
TODO
```

<MoreInfo href="/docs/odsl/variable/extractor" />

## Transform
The transform part of ETL is the process of mapping data from some externally defined model into our own defined model.

In most cases, the extracted data can be fed into a [Transformer](/docs/odsl/variable/transformer) to map the input data to the output data.

The transformer is a structure that iteratively builds the output models from the input data.

Here is an example of a transformer that transforms the XML read from the Bank of England website into a list of objects:

```js
#BOE_FX = transform xml into #ForeignExchange as fx
        create with Cube clear TIME, OBS_VALUE
        unique model = "#BOE_FX_GBP" + input.metadata.get(fx.SCODE, fx.SCODE)
        on error ignore
        ignore fx.TIME == null

        SPOT = TimeSeries(fx.TIME, "#HENG", fx.OBS_VALUE, "numeric")
        currency = input.metadata.get(fx.SCODE, fx.SCODE)
        currencyName = input.currency_metadata.CURRENCY.get(currency)
        source="BOE"
        sourceName = "Bank of England"
        name = "Bank of England Spot Exchange Rates GBP/"+ currency
        description = "Bank of England Spot Exchange Rates Pound Sterling Vs " + currencyName
        dataset = "BOE_FX"
        datasetName = "Bank of England Spot Exchange Rates"
        datasetType = "Exchange Rates Spot"
        product = "GBP Base"
        location = "United Kingdom"
        base = "GBP"
        baseName = "Pound Sterling"
        class = "SPOT"
        _access="#F1"
        tags = ["FX","BOE","GBP","EXCHANGE_RATES","SPOT"]
         _links = [Link("Supplier",`${object:"#BOE"}`)]
         _links = [Link("Dataset",`${object:"#BOE_FX"}`)]
end
```

To run this transformer, we simply call the run method on it passing in the input data, e.g.

```js
models = #BOE_FX.run(data)
```

<MoreInfo href="/docs/odsl/variable/transformer" />

## Load
The load part of ETL is the process of packaging up our transformed model and loading it into the database.

Once you have your transformed models, you have the choice of:
* Iterating through the list and saving them one-by-one
* Adding them to a batch and sending that via a queue to the server to be loaded into the database

The most robust way is to send them via a message queue in a batch and this can be done using the following code:

```js
// Create a batch
batch = PROCESS.createBatch()

// Add the models
batch.addAll(models)

// Send the batch to the server
send batch
```
