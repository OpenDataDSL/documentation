---
title: CURL Service
description: The curl service in the ODSL language
slug: /odsl/service/curl
tags:
  - service
  - curl
---

# CURL Service

The **curl** active variable service downloads a file from a URL using the curl tool, and reads it with the file service that matches its type, in the same way as the [file service](./file). Use it for sites that the standard web download cannot read.

## Using the service

```js
data = ${curl:"https://www.example.com/prices/daily.csv"}
```
