---
slug: /training/technical/gt-running-code
title: "Tutorial: Running ODSL Code"
sidebar_position: 20
tags: [training, technical, odsl, tooling]
---

# Tutorial: Running ODSL Code

All the different ways to run ODSL code in Visual Studio Code.

---

## Prerequisites

- Microsoft VS Code installed ([download here](https://code.visualstudio.com/download))
- The OpenDataDSL VS Code extension installed (search for `odsl` in the Extensions panel)
- A file with the `.odsl` extension open — VS Code will automatically activate the extension

There are two versions of the extension:

| Version | When to use |
|---------|-------------|
| FREE Community Version | For evaluation or community use |
| Standard Commercial Version | If you have a commercial OpenDataDSL plan |

---

## Running an Entire Script

Right-click anywhere in the text editor and select **Debug Editor Contents**.

If you have breakpoints set (click in the margin to the left of a line number), execution will pause at each breakpoint so you can inspect variable values before continuing.

---

## Running a Code Region

Regions are mini-scripts inside a file that can be run independently. Create one by wrapping code in `//#region` and `//#endregion`:

```js
//#region
zips = find ${object:"m101:sample_training.zips"} where state = "NY" and city = "ALBANY"
print zips
//#endregion
```

:::tip Quick Region Creation
Type the word `region` at the start of a new line and press Enter — VS Code will automatically insert the `//#region` and `//#endregion` markers.
:::

To run a region: right-click anywhere **inside** the region and select **Debug Region**.

Breakpoints within the region work the same as for a full script.

---

## Running Selected Text

Select one or more lines of code, right-click, and choose **Run Selected Text**.

The selected code runs independently of the rest of the file. Note that breakpoints are not supported in this mode.

---

## Summary

| Method | How to trigger | Breakpoints supported? |
|--------|---------------|----------------------|
| Full script | Right-click → **Debug Editor Contents** | ✅ Yes |
| Region | Right-click inside region → **Debug Region** | ✅ Yes |
| Selected text | Select lines → Right-click → **Run Selected Text** | ❌ No |
