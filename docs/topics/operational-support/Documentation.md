---
slug: /odsl/os/documentation
sidebar_position: 2
title: Support Documentation
description: Creating and using Operational Support Documentation
tags:
- operations
- documentation
- topics
---

## Introduction
This topic covers how you can create operational support documentation and link it to processes and curves to be displayed in the portal.

## Creating documentation
All documentation is written in [Markdown](https://en.wikipedia.org/wiki/Markdown) format which will then be converted into HTML to be displayed in the portal.

The file extension for markdown is .md and these files can be created in Visual Studio Code and uploaded into OpenDataDSL using our VSCode extension.

### File layout
At the top of your markdown file, you should add some head matter which is used to describe the documentation.

#### Example head matter
```
---
scope: process
entity: AHDB_DAIRY_DATA
name: Information about the AHDB Dairy file loader
language: en
tags:
- agriculture
---
```

The head matter sets properties on the documentation as detailed below:

* scope 
 > The service or category of the documentation
* entity
 > The id of the documentation which will be combined with the scope
* name
 > A descriptive name for the documentation
* language
 > The [ISO 639-1](https://www.w3schools.com/tags/ref_language_codes.asp) language code that this documentation is written in
* tags
 > A list of tags used to find and filter documentation
 
### Full file example

Below is an example markdown documentation file with head matter:

```
---
scope: process
entity: AHDB_DAIRY_DATA
name: Information about the AHDB Dairy file loader
language: en
tags:
- agriculture
---
## AHDB Dairy Data

Load some milk etc.

|A|Table|
|-|-|
|Row1|Value|
|Row2|Value|
```

When this documentation is retrieved as HTML, it will look like this:

```html
<h2>AHDB Dairy Data</h2>
<p>Load some milk etc.</p>
<table>
<thead>
<tr>
<th>A</th>
<th>Table</th>
</tr>
</thead>
<tbody>
<tr>
<td>Row1</td>
<td>Value</td>
</tr>
<tr>
<td>Row2</td>
<td>Value</td>
</tr>
</tbody>
</table>
```

## Uploading documentation
From within Visual Studio Code, you can directly upload the documentation.

:::note
The file MUST have the extension ```.md```
:::

The process to upload is as follows:

* Right-click anywhere in the document
* Select **Upload this document** from the context menu

## Linking documents
You can link documents to most entities, but the most useful are:

* Process
* Curve

To add a link to an existing process, you can use ODSL code as shown below:

```js
p = ${process:"AHDB_DAIRY_DATA"}
p.add("Support", ref("documentation", "AHDB_DAIRY_DATA"))
save p
```
