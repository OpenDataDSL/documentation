---
title: odsl-grid-column
description: A column within an odsl-grid-panel
slug: /public/components/odsl-grid-column
tags:
- component
- grid
- javascript
- html
---

## Description
The odsl-grid-column component defines a column within a table.
The odsl-grid-column component must be a child component of an [odsl-grid-panel](odsl-grid-panel) component.

## Attributes
### field
The name of the property to be displayed.

### headername
The name to put at the top of the column, defaults to the value of the field property.

### width
The width of the column in pixels

### flex
When flex is set on one or more columns, any width value is ignored and instead the remaining free space in the grid is divided among flex columns in proportion to their flex value, so a column with flex: 2 will be twice the size as one with flex: 1.

### resizable
A boolean indicating that the user can resize this column, defaults to true.

