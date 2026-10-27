---
slug: /odsl/variable/transformer
tags:
  - transformer
  - etl
---
Transformer
===========================

A wrapper for a data transformer, used with the transformer service

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|category|The category of this script, e.g. ETL|String|
|description|A description of what this script does|String|
|filename|The filename of this script|String|
|outputFormat|An optional output format, e.g. application/xml, text/html, text/csv|String|
|script|The script text|String|
|scriptType|The type of this script, e.g. one of [odsl, mustache, py, css, html, js, mjs, cjs]|String|

## Methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|loadFrom(file)|Load the script from a local file|Void|
|run()|Runs this script|Void|
|run(globalContext)|Runs this script|Void|

