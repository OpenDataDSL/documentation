---
title: Azure Blob Service
description: The azblob service in the ODSL language
slug: /odsl/service/azblob
tags:
  - service
  - azure
  - azblob
---

# Azure Blob Service (azblob)

The **azblob** active variable service reads files from, and writes files to, Azure Blob Storage. A file that is read is converted with the file service that matches its type, for example CSV or JSON.

## Using the service

The id is the URL of the blob: the storage account, the container and the path. Give the storage account key in the `AccountKey` option, kept in a [secret](./secret):

```js
key = ${secret:"nge-blob-key"}
prices = ${azblob:"https://ngestorage.blob.core.windows.net/prices/daily/ttf.csv","AccountKey=" + key.value}
```

To write a variable to a blob as JSON, save it with the URL in the `url` option.
