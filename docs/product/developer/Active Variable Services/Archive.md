---
title: Archive Service
description: The archive service in the ODSL language
slug: /odsl/service/archive
tags:
  - service
  - archive
---

# Archive Service

The **archive** active variable service keeps a copy of a source file in your OpenDataDSL file archive, so you can see later exactly what a loader read. It downloads the file at the URL (HTTP, HTTPS or SFTP), stores it in your archive, and returns the text Archive Complete.

## Using the service

```js
status = ${archive:"https://www.example.com/prices/daily.csv"}
```

The type of the file is taken from the end of the URL. To give it yourself, put it in place of the source, for example `${archive:csv/"https://www.example.com/download?id=42"}`.
