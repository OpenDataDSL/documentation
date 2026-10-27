---
slug: /odsl/variable/documentation
title: Documentation
tags:
- documentation
---

# Documentation

A **Documentation** variable holds documentation for an item or a service: markdown content, JSON with a template to render it, or a link to a web page. It is saved with the [documentation service](/docs/api/rest/service/documentation).

## Construction

|**Function**|**Description**|
|-|-|
|Documentation()|Creates a new default documentation configuration|
|DocumentationLink(url)|Creates a new documentation URL Link configuration|
|DocumentationLink(url, selector)|Creates a new documentation URL Link configuration|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|content|The markdown content of this documentation|String|
|documentationType|The type of this documentation, one of Default, JSON or Link|String|
|entity|The entity or id this documentation is for|String|
|json|JSON content - only use if this is a JSON type|Object|
|language|The language of this documentation (optional - default to English en)|String|
|name|The name of this documentation|String|
|scope|The scope or service this documentation is for|String|
|selector|The optional selector used with the Web URL to select part of a web page - only if this is a link type|String|
|tags|Tags for this documentation|List|
|template|Template to convert JSON to HTML - only use if this is a JSON type|String|
|url|The Web URL of this documentation - only if this is a link type|String|


## Example

```js
doc = Documentation()
doc.entity = "NGE.GAS.TTF"
doc.scope = "object"
doc.name = "TTF gas prices"
doc.content = "## TTF\nSettlement prices for the Dutch TTF gas hub."
save ${documentation:doc}
```
