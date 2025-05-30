---
title: odsl-toolbar
description: A toolbar
slug: /public/components/odsl-toolbar
tags:
- component
- toolbar
- javascript
- html
---

## Description
The odsl-toolbar component configures a toolbar.
The odsl-toolbar component can have child components of type [odsl-toolbar-item](odsl-toolbar-item) components.

## Attributes
There are no attributes to configure.

## Examples

### A toolbar with 2 buttons
```html
<odsl-toolbar>
    <odsl-toolbar-item icon="bag-plus-fill" title="Add a new portfolio" onclick="addPortfolio()">
    </odsl-toolbar-item>
    <odsl-toolbar-item icon="node-plus-fill" title="Add a new trade" onclick="addTrade()">
    </odsl-toolbar-item>
</odsl-toolbar>

```