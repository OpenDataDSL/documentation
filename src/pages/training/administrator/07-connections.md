---
slug: /training/administrator/connections
title: "Module 07: Connections & Extractors"
sidebar_position: 8
tags: [training, administrator, integration, etl, connections]
---

# Module 07: Connections & Extractors

Data reaches the platform from web sites, file stores, mailboxes and message streams. In ODSL there is no separate connection object to configure: each source is read with an **active variable service**, given the location as its id and any credentials as options. In this module you will read from the main kinds of source, keep the credentials in secrets, and see where extractors fit.

## Learning Objectives

By the end of this module you will be able to:

- Choose the right service for a source: HTTP, Azure Blob, Azure Files, FTP, S3, mail or Kafka
- Read files over HTTP(S) in CSV, JSON, XML, HTML and other formats
- Read from Azure Blob Storage with an account key kept in a secret
- Keep a copy of each source file with the archive service
- Explain what an extractor is and how it is managed
- Turn a working read into a scheduled process

---

## Step 1: Choose a Service

| Source | Service | Notes |
|--------|---------|-------|
| HTTP or HTTPS file | `csv`, `json`, `xml`, `html`, `pdf`, `xls`, `ods` | The id is the URL. The service converts the file into variables |
| Site the standard download cannot read | `curl` | Downloads with the curl tool, then reads it by file type |
| Dynamic web page | `dhtml` | Reads a dynamic HTML page as an object |
| Azure Blob Storage | `azblob` | Reads and writes blobs. Account key in the `AccountKey` option |
| Azure Files | `azfile` | Reads files from an Azure Storage Account |
| FTP site | `ftp` | Reads files from an FTP site |
| AWS S3 bucket | `s3` | Reads files from an S3 bucket |
| Mailbox | `mail` | Reads emails over IMAP or POP3 and reads their attachments |
| Apache Kafka | `kafka` | Reads JSON messages from topics |

See [External Data Collection Services](/docs/odsl/service/services#external-data-collection-services) for the full list.

:::note FTP, S3 and Azure Files
These services exist, but their id and option formats are not yet described in the documentation. Check the [FTP](/docs/odsl/service/ftp), [S3](/docs/odsl/service/s3) and [Azure File](/docs/odsl/service/azfile) pages, or ask OpenDataDSL support, before you build a feed on them. Keep any password or access key in a secret as shown below.
:::

---

## Step 2: Read Over HTTP(S)

The id is the URL. Options follow as strings:

```js
//#region Read files over HTTPS
// XML: ECB reference rates
fx = ${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}

// CSV with no header row, as a table
balloons = ${csv:"https://archive.ics.uci.edu/ml/machine-learning-databases/balloons/adult+stretch.data","headerpos=0","output=table"}
print balloons.rows.size

// A site that needs the curl tool
daily = ${curl:"https://www.example.com/prices/daily.csv"}
//#endregion
```

Useful CSV options are `separator`, `headerpos`, `datapos` and `output`. The XML service takes `selector`, `ignoreContentType` and `xslt`.

If a source needs an API token, read it from a secret:

```js
//#region HTTP with a token
url = "https://web-api.tp.entsoe.eu/api?securityToken=" + ${secret:"ENTSOE_TOKEN"}
//#endregion
```

---

## Step 3: Read from Azure Blob Storage

The id is the blob URL (account, container and path). The account key goes in the `AccountKey` option, taken from a secret:

```js
//#region Read a blob
key = ${secret:"nge-blob-key"}
prices = ${azblob:"https://ngestorage.blob.core.windows.net/prices/daily/ttf.csv","AccountKey=" + key.value}
print prices
//#endregion
```

The file is converted with the service that matches its type, here CSV. The service can also write: saving a variable with the blob URL in the `url` option writes it as JSON.

---

## Step 4: Read from a Mailbox or Kafka

Many suppliers still email a daily file. The mail service reads the attachments of matching emails:

```js
//#region Read emailed attachments
pwd = ${secret:"PRICES_MAILBOX_PASSWORD"}
files = ${mail:"imap.example.com","user=prices@company.com,password=" + pwd.value + ",sender=settlements@example-broker.com,subject=Daily settlement prices"}
print files.size
//#endregion
```

Options include `agent` (imap or pop3), `port`, `folder`, `seen`, `sender`, `subject`, `fromDateTime`, `toDateTime` and `filter_files`.

The Kafka service returns the messages published since the consumer group last read the topic:

```js
//#region Read a Kafka topic
messages = ${kafka:"prices-*","bootstrap=b-1.example.com:9196;b-2.example.com:9196,group=nge_prices,username=nge_reader"}
//#endregion
```

Without a `password` option, Kafka uses the `KAFKA_SASL_PASSWORD` environment variable.

---

## Step 5: Keep a Copy of the Source

The archive service downloads a file over HTTP, HTTPS or SFTP and stores it in your file archive, so you can see later exactly what a loader read:

```js
//#region Archive the source file
status = ${archive:"https://www.example.com/prices/daily.csv"}
print status
//#endregion
```

:::tip
Archive the source file at the start of every loader. When a supplier says "the file was correct", you can check what you actually received.
:::

---

## Step 6: Extractors

Some sites need navigation (filling forms, clicking buttons) before the data can be read. An **extractor** is a pipeline of instructions sent to the website to do this. Extractors are stored in the `extractor` service and are versioned automatically, like scripts and transformers.

| Task | How |
|------|-----|
| List | `find ${extractor}` or `GET extractor/v1/private` |
| Read one | `${extractor:"NAME"}` or `GET extractor/v1/private/NAME` |
| See versions | `${extractor:"NAME":*}` |
| Tag a tested version | `tag ${extractor:"NAME":2} as PROD` |
| Roll back | `delete ${extractor:"NAME"}` |

Extractors belong to an environment, so build and test them in `test` and promote them with the Promotion extension. See [Extractor](/docs/odsl/variable/extractor).

---

## Step 7: Schedule the Feed

Once a script reads, transforms and loads correctly, run it as a process on a schedule:

```js
//#region Schedule a loader
p = Process()
p.service = "ETL"
p.name = "SUPPLIER_DAILY_PRICES"
p.description = "Load the supplier daily price file"
p.scriptName = 'loaders\supplier_daily_prices'
p.cron = "0 19 ? * MON-FRI *"
p.enabled = true
save ${process:p}
//#endregion
```

:::note
A process assumes the rights of the user who created it, at the time it was saved. If that user's rights change, save the process again.
:::

---

## Step 8: MongoDB Connections

If your company uses its own MongoDB Atlas cluster for private data, or named connections to other clusters, these are part of the tenant configuration: the `mongodb` and `connections` parts of the tenant, which must start with `mongodb`. See [Database Information](/docs/it/database).

---

## Exercise

1. Read the ECB XML feed and print the first currency and rate.
2. Create a secret with a placeholder storage key and write the `azblob` read that would use it.
3. Archive the ECB file with the archive service and check the returned status.
4. List the extractors in your environment and the versions of one of them.

---

## Summary

| Source | Read with | Credentials |
|--------|-----------|-------------|
| Web file | `${csv:url}`, `${xml:url}`, `${json:url}` and so on | Token from a secret in the URL |
| Azure Blob | `${azblob:url,"AccountKey=..."}` | Account key in a secret |
| Mailbox | `${mail:host,"user=...,password=..."}` | Password in a secret |
| Kafka | `${kafka:topic,"bootstrap=...,group=..."}` | SASL password option or environment variable |
| Website navigation | An extractor | As the extractor requires |

:::note Next Step
In [Module 08](/training/administrator/queues) you will manage the message queues that carry data into and out of the platform.
:::
