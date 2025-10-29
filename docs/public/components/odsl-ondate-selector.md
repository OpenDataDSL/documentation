---
title: odsl-ondate-selector
description: A component to allow the user to select an ondate (trade date)
slug: /public/components/odsl-ondate-selector
tags:
- component
- ondate
- javascript
- html
---

## Description
The odsl-ondate-selector component creates a panel to allow the user to select an ondate.

## Events
### change
This custom event is fired whenever an ondate is selected, the event has the selected ondate.

## Examples

### A simple ondate selector

```html
<odsl-ondate-selector class="col-4" onchange="console.log(event.detail)"></odsl-ondate-selector>
```
